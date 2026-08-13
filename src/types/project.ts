export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  description?: string;
  problem?: string;
  features?: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string; // Optional
  featured: boolean;
  order: number;
}
