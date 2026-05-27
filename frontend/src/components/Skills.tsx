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
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Skills
        </h2>
        <p className="mb-12 text-center text-gray-500 dark:text-gray-400">
          Technologies and tools I work with
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-primary/30 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-[#5fe2b8]/30"
            >
              <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
