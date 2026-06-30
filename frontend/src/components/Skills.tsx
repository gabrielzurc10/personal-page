const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "PHP", "C#", "C++", "Bash", "SQL", "GraphQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    skills: ["Spring Boot", ".NET", "React", "Redux", "Express", "Angular", "Node.js", "Next.js", "FastAPI", "Tailwind", "Pandas", "LangChain"],
  },
  {
    category: "Databases & Caching",
    skills: ["MySQL", "MSSQL", "PostgreSQL", "DynamoDB", "MongoDB", "Redis", "Couchbase"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS", "GCP", "Microsoft Azure", "Lambda", "S3", "CloudFront", "CloudWatch", "API Gateway", "Cognito", "Docker", "Kubernetes", "Kafka", "RabbitMQ", "Terraform", "GitLab CI/CD", "GitHub Actions", "Git", "Gradle", "Maven", "npm", "Webpack"],
  },
  {
    category: "Practices",
    skills: ["Agile", "RESTful API Design", "Microservices", "Artificial Intelligence", "Retrieval-Augmented Generation", "Event-Driven Architecture", "CI/CD", "Test-Driven Development", "Distributed Systems", "Cloud Platform Architecture", "Cross-Functional Collaboration", "System Design"],
  },
];

export default function Skills() {
  return (
    <section className="px-6 py-16 sm:py-20 md:py-24">
      <div id="skills" className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-white">
          Skills
        </h2>
        <p className="mb-12 text-center text-neutral-500 dark:text-neutral-400">
          Technologies and tools I work with
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {SKILL_GROUPS.map((group, index) => {
            const isLastAlone =
              index === SKILL_GROUPS.length - 1 && SKILL_GROUPS.length % 2 === 1;
            return (
            <div
              key={group.category}
              className={`card-hover rounded-2xl bg-white p-6 dark:bg-white/[0.05]${
                isLastAlone ? " sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)]" : ""
              }`}
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
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
