import GradientReveal from "./GradientReveal";

const EXPERIENCES = [
  {
    title: "Software Developer IV",
    company: "Paycom",
    location: "Irving, Texas",
    period: "June 2025 — May 2026",
    bullets: [
      "Led the design and delivery of 5+ automation features for Paycom's onboarding platform, applying test-driven development to ship reliably for 36,000+ client organizations ranging from small businesses to Fortune 500 enterprises.",
      "Automated employee data flow across the Applicant Tracking, Background Checks, and Onboarding modules through close collaboration with each module team, eliminating manual re-entry and cutting average HR processing time per new hire by 80%.",
      "Mentored junior software developers through code reviews, technical guidance, pair programming, and collaborative debugging sessions, improving development velocity, code quality, and adherence to engineering best practices across the team.",
    ],
  },
  {
    title: "Software Developer III",
    company: "Paycom",
    location: "Irving, Texas",
    period: "May 2024 — June 2025",
    bullets: [
      "Architected and developed an onboarding email module with a dashboard built in React and a Control-M–orchestrated queue-worker platform, processing thousands of concurrent async jobs to deliver 100,000+ new hire emails per month at scale.",
      "Built and containerized microservices with REST APIs in PHP for managing communication configurations, using Docker and Kubernetes to orchestrate deployment and reducing manual email coordination time for HR teams by 60%.",
      "Streamlined the rehire workflow for Paycom by leveraging Couchbase to cache and surface prior employee records, reducing manual PAF submissions and saving client HR teams an estimated 1,000+ hours annually across the client base.",
    ],
  },
  {
    title: "Software Developer II",
    company: "Paycom",
    location: "Grapevine, Texas",
    period: "January 2023 — May 2024",
    bullets: [
      "Led development of international onboarding workflows across five countries, building an MVC architecture with PHP and JavaScript that dynamically rendered country-specific forms, streamlining onboarding and reducing manual setup effort by 80%.",
      "Designed, normalized, and optimized MySQL database schemas and query performance for high-traffic onboarding endpoints, improving average response times by an estimated 40%.",
      "Delivered features through two-week Agile sprints, collaborating with a cross-functional team to maintain steady releases across planning, stand-ups, and retrospectives.",
    ],
  },
  {
    title: "Application Developer",
    company: "University of Houston, Enterprise Systems",
    location: "Houston, Texas",
    period: "October 2021 — December 2022",
    bullets: [
      "Delivered full stack solutions for campus web applications used daily by 47,000+ students and 3,000+ faculty, developing backend services in Java and user interfaces with JavaScript.",
      "Modernized the UI/UX of the course marketplace and student information dashboard, leveraging JavaScript on the frontend and Java on the backend to improve navigation, accessibility, and visual consistency.",
      "Integrated PeopleSoft campus solution software with custom-built tools and tuned PostgreSQL schemas, improving query performance on high-volume endpoints.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "T-Mobile",
    location: "Frisco, Texas",
    period: "May 2022 — August 2022",
    bullets: [
      "Developed full stack customer location visualization for support agents, with Spring Boot REST APIs in Java and Angular dashboard components, reducing average call-handle time by 60% and accelerating issue resolution.",
      "Authored and published an internal Node.js npm package that standardized API authorization across T-Mobile services, eliminating repeated auth boilerplate for 10+ engineering teams.",
      "Delivered projects through full Agile development cycles and presented sprint demos to development teams and stakeholders, aligning on priorities and incorporating feedback across iterations.",
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
                <GradientReveal className="card-hover rounded-2xl border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.02]" dot>
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
                </GradientReveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
