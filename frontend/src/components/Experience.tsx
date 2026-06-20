const EXPERIENCES = [
  {
    title: "Software Developer IV, III, II",
    company: "Paycom",
    location: "Grapevine, Texas",
    period: "January 2023 — May 2026",
    bullets: [
      "Led development of 5 automation initiatives across event-driven microservices, workflow engines, and REST API integrations, partnering with HR stakeholders to eliminate an estimated 1,000+ hours of manual work per year.",
      "Designed a high-throughput communication platform on a Kafka-backed delivery pipeline with a React and TypeScript frontend, delivering 100,000+ emails monthly and replacing a manual, cross-team coordination process.",
      "Containerized and deployed microservices on Docker and Kubernetes, building GitLab CI/CD pipelines with automated unit tests and lint checks to standardize releases and block broken builds.",
      "Developed a configurable form-templating system that localized onboarding across five countries, cutting manual setup time by 80%.",
      "Optimized high-traffic data endpoints by rewriting MySQL joins, adding indexes, and introducing Couchbase caching, reducing p95 read latency by 50%.",
    ],
  },
  {
    title: "Application Developer",
    company: "University of Houston, Enterprise Systems",
    location: "Houston, Texas",
    period: "October 2021 — December 2022",
    bullets: [
      "Delivered full-stack web applications used daily by 47,000+ students and faculty to register for courses, submit and access grades, and manage records, replacing manual, paper-based processes.",
      "Rebuilt the student information dashboard frontend in JavaScript with responsive mobile support and WCAG-compliant screen-reader accessibility, and refactored Java REST APIs to cut page load times by 70%.",
      "Normalized PostgreSQL schemas to eliminate redundant data slowing high-volume endpoints, reducing query times by 50%.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "T-Mobile",
    location: "Frisco, Texas",
    period: "May 2022 — August 2022",
    bullets: [
      "Equipped support agents with a TypeScript and Angular dashboard backed by Java and Spring Boot REST APIs that plotted customer location on T-Mobile's 5G coverage map, speeding coverage diagnosis and reducing average call-handle time by 30%.",
      "Published an internal JavaScript library that standardized proof-of-possession token authorization across T-Mobile services, driving adoption across 5+ engineering teams and saving an estimated 200+ hours of boilerplate setup.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="px-6 py-16 sm:py-20 md:py-24">
      <div id="experience" className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-white">
          Experience
        </h2>
        <p className="mb-12 text-center text-neutral-500 dark:text-neutral-400">
          My professional journey
        </p>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-neutral-200 dark:bg-white/10 md:block" />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, index) => (
              <div key={index} className="relative md:pl-12">
                {/* Timeline dot */}
                <div className="absolute left-[11px] top-0 hidden h-2.5 w-2.5 rounded-full bg-primary dark:bg-white md:block" />
                <div className="card-hover rounded-2xl bg-white p-6 dark:bg-white/[0.02]">
                  <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="font-medium text-primary dark:text-white">
                        {exp.company}
                      </p>
                      <p className="text-sm text-neutral-400 dark:text-neutral-500">
                        {exp.location}
                      </p>
                    </div>
                    <span className="text-sm text-neutral-400 dark:text-neutral-500">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
