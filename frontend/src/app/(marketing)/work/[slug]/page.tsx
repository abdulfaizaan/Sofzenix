import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/shared/lib/sanity/queries";
import { Container } from "@/shared/components/ui/Container";
import { Heading } from "@/shared/components/ui/Heading";
import Image from "next/image";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug);
  
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.title} | Our Work`,
    description: project.summary || `Case study for ${project.client}`,
  };
}

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await getProjectBySlug(params.slug);
  
  if (!project) notFound();
  
  // Mapping logic similar to Portfolio widget
  const imageUrl = project.mainImage ? project.mainImage.asset._ref : "/images/placeholder.jpg";
  
  return (
    <article className="py-24 bg-background min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center gap-4 text-sm font-mono text-muted uppercase tracking-widest">
            <span>{project.category || "Platform"}</span>
            <span>&bull;</span>
            <span>{project.year || "2024"}</span>
          </div>
          
          <Heading level="h1" as="h1" className="mb-6">
            {project.title}
          </Heading>
          
          <p className="text-xl text-muted mb-12">
            {project.summary}
          </p>
          
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-surface mb-16">
            <Image 
              src={imageUrl} 
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* If there was a body field in sanity, we'd render it here using PortableText */}
            <p>
              This is a detailed case study view for {project.title}, built for {project.client}.
              More detailed content blocks, results, and testimonials would be dynamically rendered here based on the CMS data.
            </p>
            
            {project.metrics && project.metrics.length > 0 && (
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-surface-hover">
                {project.metrics.map((metric: any, i: number) => (
                  <div key={i}>
                    <div className="text-4xl font-display font-medium text-text mb-2">{metric.value}</div>
                    <div className="text-sm text-muted uppercase tracking-wider">{metric.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
