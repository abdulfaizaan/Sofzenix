import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from "next-sanity";

// We need to instantiate a sanity client on the backend to query projects
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    // 1. Search Prisma (Blog Posts) using Full-Text Search
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { search: q } },
          { content: { search: q } },
          { title: { contains: q, mode: 'insensitive' } }, // Fallback for partial matches
        ]
      },
      select: { id: true, title: true, slug: true, excerpt: true },
      take: 5
    });

    // 2. Search Sanity (Projects)
    // Force bypass strict typing mismatch
    const projects = await (sanityClient.fetch as any)(
      `*[_type == "project" && title match $query] {
        _id, title, "slug": slug.current, summary
      }[0...5]`,
      { query: `*${q}*` }
    );

    const results = [
      ...posts.map((p: { id: string; title: string; slug: string; excerpt: string | null }) => ({ type: 'post', id: p.id, title: p.title, url: `/blog/${p.slug}`, description: p.excerpt })),
      ...projects.map((p: any) => ({ type: 'project', id: p._id, title: p.title, url: `/work/${p.slug}`, description: p.summary }))
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
