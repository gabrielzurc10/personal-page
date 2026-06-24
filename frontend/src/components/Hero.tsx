import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function Hero() {
  return (
    <section className="flex min-h-dvh items-center justify-center px-6 py-24 sm:py-20">
      <div className="card-hover mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl bg-white p-8 dark:bg-white/[0.05] sm:gap-12 sm:p-12 md:flex-row md:gap-16">
        <div className="shrink-0">
          <Image
            src="/profileShot.jpg"
            alt="Gabriel Cruz"
            width={280}
            height={280}
            priority
            className="h-40 w-40 rounded-full object-cover sm:h-52 sm:w-52 md:h-64 md:w-64 lg:h-[280px] lg:w-[280px]"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary dark:text-white">
            Software Engineer
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl">
            Gabriel Cruz
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            Software Engineer with 4+ years building full-stack,
            cloud-native applications across HR technology, telecom,
            and higher education. Skilled in Java and Spring Boot
            microservices, React and TypeScript frontends, and AWS
            serverless architecture, with a record of shipping scalable
            systems and partnering with cross-functional teams to deliver
            measurable business impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              <span>Contact Me</span>
            </a>
            <a
              href={`${API_BASE}/api/resume`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-neutral-100 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-white/10 dark:text-neutral-300 dark:hover:bg-white/20"
            >
              <span>View Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
