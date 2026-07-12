import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    name: "rabbitrole",
    logo: { src: "/rabbitrole-logo.png", width: 719, height: 721 },
    tagline: "An AI resume reviewer and job matcher",
    description:
      "Upload a resume, pick the roles you're targeting, and get prioritized, explained feedback grounded in live job postings, then a list of real openings ranked by how well your resume actually fits them.",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Java", "Spring Boot", "AWS Lambda", "DynamoDB", "OpenAI", "Docker", "Amazon S3", "Amazon CloudFront", "Amazon Cognito", "Google OAuth"],
    caseStudy: "/projects/rabbitrole",
    liveUrl: "https://rabbitrole.com",
    liveLabel: "Visit rabbitrole.com",
  },
  {
    name: "Greppa",
    logo: { src: "/greppa-logo.svg", width: 64, height: 65 },
    tagline: "An AI-powered code security scanner",
    description:
      "Upload a file or folder and get a plain-language security report: Semgrep finds the vulnerabilities, and an LLM explains why each one matters and suggests a concrete fix.",
    tech: ["Angular", "TypeScript", "Chart.js", "C#", ".NET", "ASP.NET Core", "Semgrep", "OpenAI", "Model Context Protocol", "Docker", "Azure Container Apps", "Azure Static Web Apps", "Terraform"],
    caseStudy: "/projects/greppa",
    liveUrl: "https://red-sky-058c5590f.7.azurestaticapps.net",
    liveLabel: "Try Greppa live",
  },
];

export default function Projects() {
  return (
    <section className="px-6 py-16 sm:py-20 md:py-24">
      <div id="projects" className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-white">
          Projects
        </h2>
        <p className="mb-12 text-center text-neutral-500 dark:text-neutral-400">
          Things I&apos;ve designed and built
        </p>

        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="card-hover rounded-2xl bg-white p-6 dark:bg-white/[0.05] sm:p-8"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary dark:text-neutral-400">
                Featured project
              </p>

              <div className="flex items-center gap-2.5">
                <Image
                  src={project.logo.src}
                  alt={`${project.name} logo`}
                  width={project.logo.width}
                  height={project.logo.height}
                  className="h-8 w-auto"
                />
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {project.name}
                </h3>
              </div>

              <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {project.tagline}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600 dark:bg-white/10 dark:text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-5 dark:border-white/10">
                <Link
                  href={project.caseStudy}
                  className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  <span>View case study</span>
                </Link>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-neutral-100 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-white/10 dark:text-neutral-300 dark:hover:bg-white/20"
                >
                  {project.liveLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
