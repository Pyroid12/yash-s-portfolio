import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "../../../components/projects/project-detail";
import { projectsData } from "../../../data/projects";
import { createPageMetadata } from "../../../lib/site";
import { buildProjectJsonLd } from "../../../lib/structured-data";
import { personalData } from "../../../data/personal";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) {
    return { title: `Project Not Found | ${personalData.name}` };
  }
  return createPageMetadata({
    title: `${project.title} | Projects | ${personalData.name}`,
    description:
      project.shortDescription ||
      `${project.title} — a project by ${personalData.name}.`,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = buildProjectJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={project} />
    </>
  );
}
