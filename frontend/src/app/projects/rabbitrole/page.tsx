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
            className="text-sm text-base-content/60 transition-colors hover:text-base-content"
          >
            &larr; Back to projects
          </Link>

          <header className="mt-6">
          <div className="flex items-center gap-3">
            <Image
              src="/rabbitrole-logo.png"
              alt="rabbitrole logo"
              width={719}
              height={721}
              className="h-10 w-auto sm:h-12"
            />
            <h1 className="text-4xl font-bold tracking-tight">
              rabbitrole
            </h1>
          </div>
          <p className="mt-3 text-lg text-base-content/60">
            An AI resume reviewer and job matcher
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {TECH.map((tech) => (
              <span
                key={tech}
                className="badge badge-ghost badge-lg bg-base-300 text-sm dark:bg-base-200"
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
              className="btn btn-primary rounded-full px-6"
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
            className="btn btn-primary rounded-full px-6"
          >
            <span>Visit rabbitrole.com</span>
          </a>

          <Link
            href="/#projects"
            className="text-sm text-base-content/60 transition-colors hover:text-base-content"
          >
            &larr; Back to projects
          </Link>
        </FadeIn>
      </main>

      <Footer />
    </>
  );
}
