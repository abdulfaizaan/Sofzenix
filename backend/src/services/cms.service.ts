import { prisma } from '@/lib/prisma';
import { log } from '@/lib/logger';
import { Post, Project } from '@prisma/client';

export const cmsService = {
  // ----------------------------------------------------------------------------
  // Blog / Post Services
  // ----------------------------------------------------------------------------
  
  async getPosts(includeDrafts = false) {
    return prisma.post.findMany({
      where: includeDrafts ? { deletedAt: null } : { published: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { category: true, tags: true, seo: true }
    });
  },

  async getPostBySlug(slug: string, includeDrafts = false) {
    return prisma.post.findFirst({
      where: {
        slug,
        deletedAt: null,
        ...(includeDrafts ? {} : { published: true })
      },
      include: { category: true, tags: true, seo: true }
    });
  },

  async createPost(data: any, userId: string) {
    const post = await prisma.post.create({
      data,
    });
    log.info('cms', `Post created: ${post.slug}`, { userId });
    await triggerFrontendRevalidation('blog', post.slug);
    return post;
  },

  async updatePost(id: string, data: any, userId: string) {
    const post = await prisma.post.update({
      where: { id },
      data,
    });
    log.info('cms', `Post updated: ${post.slug}`, { userId });
    await triggerFrontendRevalidation('blog', post.slug);
    return post;
  },

  async archivePost(id: string, userId: string) {
    const post = await prisma.post.update({
      where: { id },
      data: { published: false, deletedAt: new Date() }
    });
    log.info('cms', `Post archived: ${post.slug}`, { userId });
    await triggerFrontendRevalidation('blog', post.slug);
    return post;
  },

  // ----------------------------------------------------------------------------
  // Portfolio / Project Services
  // ----------------------------------------------------------------------------
  
  async getProjects(includeDrafts = false) {
    // Assuming featured/active logic for projects
    return prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: { category: true, technologies: true, media: true, seo: true }
    });
  },

  async getProjectBySlug(slug: string) {
    return prisma.project.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
      include: { category: true, technologies: true, media: true, seo: true }
    });
  },

  async createProject(data: any, userId: string) {
    const project = await prisma.project.create({
      data,
    });
    log.info('cms', `Project created: ${project.slug}`, { userId });
    await triggerFrontendRevalidation('portfolio', project.slug);
    return project;
  },
};

/**
 * Trigger Next.js Frontend ISR Revalidation
 */
async function triggerFrontendRevalidation(type: 'blog' | 'portfolio' | 'services', slug: string) {
  try {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const secret = process.env.CMS_WEBHOOK_SECRET;
    
    if (!secret) {
      log.warn('cms', 'CMS_WEBHOOK_SECRET not configured, skipping ISR trigger');
      return;
    }

    const path = `/${type}/${slug}`;
    const url = `${frontendUrl}/api/revalidate?secret=${secret}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    });

    if (!response.ok) {
      throw new Error(`Frontend returned ${response.status}`);
    }
    
    log.info('cms', `ISR revalidated for ${path}`);
  } catch (error) {
    log.error('cms', `Failed to trigger ISR for ${slug}`, error);
  }
}
