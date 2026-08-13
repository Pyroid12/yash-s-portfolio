import type { Metadata } from "next";
import PageHeader from "../../components/shared/page-header";
import ProjectCard from "../../components/projects/project-card";
import FeaturedProjectCard from "../../components/projects/featured-project-card";
import { projectsData } from "../../data/projects";
import { createPageMetadata } from "../../lib/site";
import { personalData } from "../../data/personal";

export const metadata: Metadata = createPageMetadata({
  title: `Projects | ${personalData.name}`,
  description: `Projects by ${personalData.name} — AI-powered apps, full-stack web applications, and machine learning systems.`,
  path: "/projects",
});

export default function ProjectsPage() {
  const sorted = [...projectsData].sort((a, b) => a.order - b.order);
  const featured = sorted.find((p) => p.featured);
  const nonFeatured = sorted.filter((p) => !p.featured);

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Projects"
        title="Projects"
        description="A collection of hands-on projects exploring AI-powered applications, full-stack development, and machine learning-based systems."
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8 flex flex-col gap-8">
        {featured && (
          <div className="mb-2">
            <FeaturedProjectCard project={featured} />
          </div>
        )}

        {nonFeatured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nonFeatured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
