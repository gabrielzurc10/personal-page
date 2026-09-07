const EXPERIENCES = [
  {
    title: "Software Developer IV, III, II",
    company: "Paycom",
    location: "Grapevine, Texas",
    period: "January 2023 — May 2026",
    metric: { value: "1,000+", label: "hours of manual work eliminated per year" },
    bullets: [
      "Led development of 5 automation initiatives using event-driven microservices, workflow engines, and REST API integrations, partnering with HR stakeholders to eliminate an estimated 1,000+ hours of manual work per year.",
      "Designed and built a notification scheduling dashboard utilizing Kafka-backed delivery pipeline, handling 100,000+ emails monthly and reducing email coordination time by 80%.",
      "Developed a configurable form-templating system using containerized microservices with Docker and Kubernetes, standardizing onboarding across 5 countries and reducing setup time by 60%.",
      "Implemented GitLab CI/CD pipelines to automate unit testing and deployment, cutting release time from 2 hours to 20 minutes.",
    ],
  },
  {
    title: "Application Developer",
    company: "University of Houston",
    location: "Houston, Texas",
    period: "October 2021 — December 2022",
    metric: { value: "47,000+", label: "students and faculty using my apps daily" },
    bullets: [
      "Built full-stack applications used daily by 47,000+ students and faculty for course registration, grade submission, and records management.",
      "Cut page load times by 70% on the student information dashboard and course marketplace by adding pagination and response caching to the REST APIs behind them.",
      "Reduced query times by 50% on high-volume endpoints by rewriting joins, adding indexes, and introducing caching.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "T-Mobile",
    location: "Frisco, Texas",
    period: "May 2022 — August 2022",
    metric: { value: "5G", label: "coverage map feature shipped for customer support" },
    bullets: [
      "Accelerated customer support by releasing a customer approximate location indicator component on T-Mobile's 5G coverage map, speeding coverage diagnosis and reducing average call-handle time.",
      "Published an internal Node.js library that standardized proof-of-possession token authorization across T-Mobile services, saving hours of boilerplate setup.",
    ],
  },
];

import SpotlightCard from "@/components/SpotlightCard";

export default function Experience() {
  return (
    <section className="px-6 py-16 sm:py-20 md:py-24">
      <div id="experience" className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold">Experience</h2>
        <p className="mb-12 text-center text-base-content/60">
          My professional journey
        </p>
        <ul className="timeline timeline-vertical timeline-compact w-full">
          {EXPERIENCES.map((exp, index) => (
            <li
              key={index}
              className="reveal-item w-full"
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
            >
              {index > 0 && <hr className="hidden bg-base-300 md:block" />}
              <div className="timeline-middle hidden md:block">
                <span className="block h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <div className="timeline-end w-full pb-8 md:pl-6">
                <SpotlightCard className="card shadow-md w-full bg-base-100 dark:bg-base-200">
                  <div className="card-body gap-6 p-6 sm:p-8 md:flex-row md:gap-10">
                    {/* Headline metric */}
                    <div className="shrink-0 border-b border-base-300 pb-5 md:w-44 md:border-b-0 md:border-r md:pb-0 md:pr-8 lg:w-52">
                      <p className="text-4xl font-bold tracking-tight sm:text-5xl">{exp.metric.value}</p>
                      <p className="mt-1.5 text-sm leading-snug text-base-content/60">{exp.metric.label}</p>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="card-title text-lg">{exp.title}</h3>
                          <p className="font-medium text-base-content">{exp.company}</p>
                          <p className="text-sm text-base-content/50">{exp.location}</p>
                        </div>
                        <span className="shrink-0 text-sm text-base-content/50">{exp.period}</span>
                      </div>
                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-3 text-sm leading-relaxed text-base-content/70">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-base-content/30" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
              {index < EXPERIENCES.length - 1 && <hr className="hidden bg-base-300 md:block" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
