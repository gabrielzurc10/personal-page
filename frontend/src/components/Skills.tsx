import SpotlightCard from "@/components/SpotlightCard";

const SKILL_GROUPS = [
  {
    category: "AI",
    blurb: "In production on this site, rabbitrole, and Greppa.",
    featured: true,
    span: "lg:col-span-2",
    skills: ["Claude Code", "OpenAI API", "LangChain", "Retrieval-Augmented Generation", "Agent Orchestration", "Prompt Engineering", "Model Context Protocol (MCP)"],
  },
  {
    category: "Cloud & DevOps",
    blurb: "Terraform-provisioned AWS and Azure, containers on Kubernetes, pipelines in GitLab and GitHub Actions.",
    span: "lg:col-span-4",
    skills: ["AWS", "GCP", "Microsoft Azure", "Lambda", "S3", "CloudFront", "CloudWatch", "API Gateway", "Cognito", "Docker", "Kubernetes", "Kafka", "RabbitMQ", "Terraform", "GitLab CI/CD", "GitHub Actions", "Git", "Gradle", "Maven", "npm", "Webpack"],
  },
  {
    category: "Languages",
    blurb: "Java and C# on the backend, TypeScript on the front.",
    span: "lg:col-span-2",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "PHP", "C#", "C++", "Bash", "SQL", "GraphQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    blurb: "Spring Boot and .NET services, React and Angular UIs.",
    span: "lg:col-span-2",
    skills: ["Spring Boot", ".NET", "React", "Redux", "Express", "Angular", "Node.js", "Next.js", "FastAPI", "Tailwind", "Pandas"],
  },
  {
    category: "Databases & Caching",
    blurb: "Relational at the core, DynamoDB and Couchbase where scale called for it.",
    span: "lg:col-span-2",
    skills: ["MySQL", "MSSQL", "PostgreSQL", "DynamoDB", "MongoDB", "Redis", "Couchbase"],
  },
  {
    category: "Practices",
    blurb: "How I work.",
    span: "md:col-span-2 lg:col-span-6",
    skills: ["Agile", "RESTful API Design", "Microservices", "Artificial Intelligence", "Event-Driven Architecture", "CI/CD", "Test-Driven Development", "Distributed Systems", "Cloud Platform Architecture", "Cross-Functional Collaboration", "System Design"],
  },
];

export default function Skills() {
  return (
    <section className="px-6 py-16 sm:py-20 md:py-24">
      <div id="skills" className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold">Skills</h2>
        <p className="mb-12 text-center text-base-content/60">
          Technologies and tools I work with
        </p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {SKILL_GROUPS.map((group, index) => (
            <SpotlightCard
              key={group.category}
              className={`reveal-item card shadow-md ${group.span} ${
                group.featured
                  ? "border border-info/30 bg-gradient-to-br from-info/10 via-base-100 to-base-100 dark:via-base-200 dark:to-base-200"
                  : "bg-base-100 dark:bg-base-200"
              }`}
              style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
            >
              <div className="card-body p-6">
                <div className="mb-3">
                  <h3 className="card-title text-base">
                    {group.category}
                    {group.featured && (
                      <span className="badge badge-info badge-sm ml-1 font-medium">New</span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-base-content/60">{group.blurb}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="badge badge-ghost badge-lg text-sm dark:bg-base-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
