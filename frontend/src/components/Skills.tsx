import GradientReveal from "./GradientReveal";

const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "Java", "PHP", "Python", "C++", "C#", "SQL", "NoSQL", "HTML", "CSS", "Tailwind"],
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React", "Redux", "Angular", "Spring Boot", "Node.js", "Next.js", "LangChain", "Stripe", "OpenAI API", "FastAPI"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Firestore"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "GitLab", "Jira", "NPM", "Webpack", "Firebase", "Docker", "CI/CD", "Vercel", "AWS", "RAG", "Terraform"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 pb-24 pt-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-white">
          Skills
        </h2>
        <p className="mb-12 text-center text-neutral-500 dark:text-neutral-400">
          Technologies and tools I work with
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <GradientReveal
              key={group.category}
              className="card-hover rounded-2xl border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <h3 className="mb-4 text-base font-semibold text-neutral-900 dark:text-white">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </GradientReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
