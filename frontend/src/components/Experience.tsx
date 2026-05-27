const EXPERIENCES = [
  {
    title: "Software Developer IV",
    company: "Paycom",
    location: "Irving, Texas",
    period: "June 2025 — May 2026",
    bullets: [
      "Designed and shipped 5+ automation features for Paycom's onboarding platform, serving 36,000+ client organizations from small business through Fortune 500 companies.",
      "Automated employee data flow across Applicant Tracking, Background Checks, and Onboarding modules, eliminating 80% of manual re-entry and cutting average HR processing time per new hire.",
      "Mentored junior software developers through code reviews, technical guidance, and collaborative debugging sessions, improving development velocity, code quality, and adherence to engineering best practices across the team.",
      "Streamlined the rehire workflow for Paycom, removing manual PAF submissions and saving client HR teams an estimated 1,000+ hours annually across the client base.",
    ],
  },
  {
    title: "Software Developer III",
    company: "Paycom",
    location: "Irving, Texas",
    period: "May 2024 — June 2025",
    bullets: [
      "Led design and delivery of a new onboarding email communications module, automating 100,000+ new hire emails per month with a configurable scheduling system built in React.",
      "Architected a web-queue-worker system that orchestrated thousands of concurrent asynchronous email processes, boosting application throughput and enabling real-time email delivery.",
      "Built backend APIs in PHP and a React dashboard for managing communication configurations, reducing manual email coordination time for HR teams by 60%.",
    ],
  },
  {
    title: "Software Developer II",
    company: "Paycom",
    location: "Grapevine, Texas",
    period: "January 2023 — May 2024",
    bullets: [
      "Led automation of international onboarding workflows across five countries, dynamically rendering country-specific forms using an MVC architecture with PHP backend and JavaScript frontend.",
      "Authored detailed product specifications and translated cross-functional stakeholder and user feedback into clearly scoped engineering requirements, accelerating feature delivery cycles.",
      "Designed, normalized, and optimized MySQL database schemas and query performance for high-traffic onboarding endpoints, improving average read response times by an estimated 40%.",
    ],
  },
  {
    title: "Application Developer",
    company: "University of Houston, Enterprise Systems",
    location: "Houston, Texas",
    period: "October 2021 — December 2022",
    bullets: [
      "Developed and maintained backend services built in Java and user interfaces with JavaScript for campus web applications used daily by 47,000+ students and 3,000+ faculty.",
      "Modernized the UI/UX of the course marketplace and student information dashboard, improving navigation, accessibility, and visual consistency.",
      "Integrated PeopleSoft campus solution software with custom-built tools and tuned PostgreSQL schemas, improving query performance on high-volume endpoints.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "T-Mobile",
    location: "Frisco, Texas",
    period: "May 2022 — August 2022",
    bullets: [
      "Shipped a feature on T-Mobile's 5G Coverage Map that let chat support agents pinpoint customers' approximate locations, reducing average call-handle time. Wrote Spring Boot APIs and an Angular dashboard component.",
      "Authored an internal JavaScript library that simplified API authorization across T-Mobile services, adopted by 10+ teams and saving an estimated 200+ hours of boilerplate code.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-gray-50 px-6 py-24 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Experience
        </h2>
        <p className="mb-12 text-center text-gray-500 dark:text-gray-400">
          My professional journey
        </p>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gray-200 dark:bg-white/10 md:block" />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, index) => (
              <div key={index} className="relative md:pl-12">
                {/* Timeline dot */}
                <div className="absolute left-[11px] top-6 hidden h-2.5 w-2.5 rounded-full bg-primary dark:bg-[#5fe2b8] md:block" />
                <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-primary/30 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-[#5fe2b8]/30">
                  <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="font-medium text-primary dark:text-[#5fe2b8]">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        {exp.location}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400 dark:text-gray-500">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
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
