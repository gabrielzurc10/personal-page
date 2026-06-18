import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownContent from "@/components/MarkdownContent";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "rabbitrole — Gabriel Cruz",
  description: "Case study: an AI resume reviewer and job matcher.",
};

const TECH = ["React", "Next.js", "Tailwind CSS", "TypeScript", "Java", "Spring Boot", "AWS Lambda", "DynamoDB", "OpenAI", "Docker", "Amazon S3", "Amazon CloudFront", "Amazon Cognito", "Google OAuth"];

// Read the source markdown at build time, then drop the leading title and bold
// tagline (shown in the designed hero below) so they aren't rendered twice.
function getBody(): string {
  const file = path.join(process.cwd(), "src", "content", "rabbitrole.md");
  return fs
    .readFileSync(file, "utf8")
    .replace(/^#\s+rabbitrole\s*\n+/i, "")
    .replace(/^\*\*An AI resume reviewer and job matcher\.\*\*\s*/i, "");
}

export default function RabbitrolePage() {
  const body = getBody();

  return (
    <>
      <Navbar showSections={false} />

      <main className="mx-auto max-w-3xl px-6 pb-16 pt-28">
        <FadeIn>
          <Link
            href="/#projects"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            &larr; Back to projects
          </Link>

          <header className="mt-6">
          <div className="flex items-center gap-3">
            <Image
              src="/rabbitrole-logo.png"
              alt="rabbitrole logo"
              width={656}
              height={710}
              className="h-10 w-auto sm:h-12"
            />
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              rabbit<span className="text-gradient-rabbit">role</span>
            </h1>
          </div>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            An AI resume reviewer and job matcher
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {TECH.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600 dark:bg-white/10 dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="https://rabbitrole.com"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-rabbit btn-gradient-hover inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm dark:bg-white dark:text-black"
            >
              <span>Visit rabbitrole.com</span>
            </a>
          </div>
          </header>
        </FadeIn>

        <FadeIn delay={150} className="mt-12">
          <MarkdownContent content={body} />
        </FadeIn>

        <FadeIn delay={150} className="mt-12 flex flex-col items-center gap-6">
          <a
            href="https://rabbitrole.com"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-rabbit btn-gradient-hover inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm dark:bg-white dark:text-black"
          >
            <span>Visit rabbitrole.com</span>
          </a>

          <Link
            href="/#projects"
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            &larr; Back to projects
          </Link>
        </FadeIn>
      </main>

      <Footer />
    </>
  );
}
