import Link from "next/link";
import GradientReveal from "./GradientReveal";

const TECH = ["React", "Next.js", "Tailwind CSS", "TypeScript", "Java", "Spring Boot", "AWS Lambda", "DynamoDB", "OpenAI", "Docker", "Amazon S3", "Amazon CloudFront", "Amazon Cognito", "Google OAuth"];

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

        <div className="mx-auto max-w-3xl">
          <GradientReveal className="card-hover rounded-2xl border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.02] sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary dark:text-neutral-400">
              Featured project
            </p>

            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
              rabbitrole
            </h3>

            <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              An AI resume reviewer and job matcher
            </p>

            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              Upload a resume, pick the roles you&apos;re targeting, and get prioritized, explained
              feedback grounded in live job postings, then a list of real openings ranked by how well
              your resume actually fits them.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {TECH.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-5 dark:border-white/10">
              <Link
                href="/projects/rabbitrole"
                className="btn-gradient-hover inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm dark:bg-white dark:text-black"
              >
                <span>View case study</span>
              </Link>
              <a
                href="https://rabbitrole.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-gradient-hover inline-flex items-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 dark:border-white/15 dark:bg-transparent dark:text-neutral-300"
              >
                Visit rabbitrole.com
              </a>
            </div>
          </GradientReveal>
        </div>
      </div>
    </section>
  );
}
