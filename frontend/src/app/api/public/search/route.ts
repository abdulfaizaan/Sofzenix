import { NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { createClient } from "next-sanity";
import { unstable_cache } from 'next/cache';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dummy",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const getSearchResults = unstable_cache(
  async (q: string) => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { search: q } },
          { content: { search: q } },
          { title: { contains: q, mode: 'insensitive' } },
        ]
      },
      select: { id: true, title: true, slug: true, excerpt: true },
      take: 5
    });

    const projects = await (sanityClient.fetch as any)(
      `*[_type == "project" && title match $query] {
        _id, title, "slug": slug.current, summary
      }[0...5]`,
      { query: `*${q}*` }
    );

    return [
      ...posts.map((p: { id: string; title: string; slug: string; excerpt: string | null }) => ({ type: 'post', id: p.id, title: p.title, url: `/blog/${p.slug}`, description: p.excerpt })),
      ...projects.map((p: any) => ({ type: 'project', id: p._id, title: p.title, url: `/work/${p.slug}`, description: p.summary }))
    ];
  },
  ['search-results'],
  { revalidate: 60 }
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await getSearchResults(q.trim());
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
