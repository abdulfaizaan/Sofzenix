"use client";

import { useState, useMemo } from "react";
import { Project, ProjectCard } from "@/entities/project";
import { Container } from "@/shared/components/ui/Container";
import Link from "next/link";

export function WorkGalleryClient({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                            p.client.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || p.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [projects, search, filter]);

  return (
    <section className="py-24 bg-background">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                role="tab"
                aria-selected={filter === cat}
                aria-label={`Filter by ${cat}`}
                tabIndex={0}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-text text-background"
                    : "bg-surface text-muted hover:text-text"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-surface-hover rounded-full px-6 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted text-lg">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <Link 
                key={project.id} 
                href={`/work/${project.slug}`} 
                className="block h-[500px]"
                aria-label={`View details for project ${project.title}`}
              >
                <ProjectCard project={project} className="h-full" />
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
