import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    name: "rabbitrole",
    logo: { src: "/rabbitrole-logo.png", width: 719, height: 721 },
    screenshot: "/rabbitrole-shot.webp",
    tagline: "AI resume reviewer and job matcher",
    description:
      "Upload a resume, pick the roles you're targeting, and get prioritized, explained feedback grounded in live job postings, then a list of real openings ranked by how well your resume actually fits them.",
    tech: ["Next.js", "TypeScript", "Spring Boot", "AWS Lambda", "DynamoDB", "OpenAI"],
    techTotal: 14,
    caseStudy: "/projects/rabbitrole",
    liveUrl: "https://rabbitrole.com",
    liveHost: "rabbitrole.com",
    liveLabel: "Visit rabbitrole.com",
  },
  {
    name: "Greppa",
    logo: { src: "/greppa-logo.svg", width: 64, height: 65 },
    screenshot: "/greppa-shot.webp",
    tagline: "AI-powered code security scanner",
    description:
      "Upload a file or folder and get a plain-language security report: Semgrep finds the vulnerabilities, and an LLM explains why each one matters and suggests a concrete fix.",
    tech: ["Angular", ".NET", "Semgrep", "OpenAI", "Model Context Protocol", "Azure"],
    techTotal: 13,
    caseStudy: "/projects/greppa",
    liveUrl: "https://red-sky-058c5590f.7.azurestaticapps.net",
    liveHost: "greppa.app",
    liveLabel: "Try Greppa live",
  },
];

/** A minimal browser chrome around a screenshot so it reads as a real product. */
function BrowserFrame({
  src,
  alt,
  host,
  href,
}: {
  src: string;
  alt: string;
  host: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-base-200"
    >
      <div className="flex items-center gap-2 border-b border-base-300 bg-base-200 px-3 py-2 dark:bg-base-300">
        <span className="h-2.5 w-2.5 rounded-full bg-base-content/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-base-content/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-base-content/15" />
        <span className="ml-2 flex-1 truncate rounded-md bg-base-100 px-2.5 py-0.5 text-center text-[11px] text-base-content/50 dark:bg-base-200">
          {host}
        </span>
      </div>
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={1440}
          height={900}
          className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section className="px-6 py-16 sm:py-20 md:py-24">
      <div id="projects" className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold">Projects</h2>
        <p className="mb-14 text-center text-base-content/60">
          Live products I&apos;ve designed, built, and deployed
        </p>

        <div className="flex flex-col gap-20 md:gap-28">
          {PROJECTS.map((project, index) => {
            const flipped = index % 2 === 1;
            return (
              <div
                key={project.name}
                className="reveal-item grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
                style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
              >
                <div className={flipped ? "md:order-2" : ""}>
                  <BrowserFrame
                    src={project.screenshot}
                    alt={`${project.name} screenshot`}
                    host={project.liveHost}
                    href={project.liveUrl}
                  />
                </div>

                <div className={flipped ? "md:order-1" : ""}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                    Featured project
                  </p>

                  <div className="mb-1 flex items-center gap-2.5">
                    <Image
                      src={project.logo.src}
                      alt={`${project.name} logo`}
                      width={project.logo.width}
                      height={project.logo.height}
                      className="h-8 w-auto"
                    />
                    <h3 className="text-2xl font-bold sm:text-3xl">{project.name}</h3>
                  </div>

                  <p className="text-sm font-medium text-base-content/60">{project.tagline}</p>

                  <p className="mt-4 leading-relaxed text-base-content/80">{project.description}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="badge badge-ghost badge-lg text-sm dark:bg-base-300">
                        {tech}
                      </span>
                    ))}
                    <Link
                      href={project.caseStudy}
                      className="badge badge-outline badge-lg border-base-300 text-sm text-base-content/60 hover:border-primary hover:text-base-content"
                    >
                      +{project.techTotal - project.tech.length} more
                    </Link>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={project.caseStudy}
                      className="btn btn-primary btn-sm h-10 rounded-full px-5"
                    >
                      Read the case study
                    </Link>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm h-10 rounded-full px-5"
                    >
                      {project.liveLabel}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
