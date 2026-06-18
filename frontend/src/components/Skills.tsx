import GradientReveal from "./GradientReveal";

const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "Java", "PHP", "Python", "C++", "C#", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React", "Angular", "Spring Boot", "Node.js", "Next.js", "OpenAI API", "FastAPI", "Tailwind"],
  },
  {
    category: "Databases & Caching",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Firestore", "DynamoDB", "Redis", "Couchbase", "NoSQL"],
  },
  {
    category: "Deployment & Cloud Platforms",
    skills: ["Git", "GitHub Actions", "GitLab CI/CD", "npm", "Docker", "Kubernetes", "AWS", "GCP", "Terraform", "Gradle"],
  },
];

export default function Skills() {
  return (
    <section className="px-6 pb-16 pt-4 sm:pb-20 md:pb-24">
      <div id="skills" className="mx-auto max-w-6xl">
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
              className="card-hover rounded-2xl bg-white p-6 dark:bg-white/[0.02]"
            >
              <h3 className="mb-4 text-base font-semibold text-neutral-900 dark:text-white">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600 dark:bg-white/10 dark:text-neutral-300"
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
