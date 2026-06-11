import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:gap-12 md:flex-row md:gap-16">
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
            Software Engineer with 4+ years of experience designing and
            developing scalable cloud-native applications, distributed systems,
            and automation platforms across HR/payroll, telecommunications, and
            higher education, driving operational efficiency through automation
            and intelligent tooling that saves organizations thousands of hours
            annually.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#contact"
              className="btn-gradient-hover inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm dark:bg-white dark:text-black"
            >
              <span>Contact Me</span>
            </a>
            <a
              href={`${API_BASE}/api/resume`}
              target="_blank"
              rel="noopener noreferrer"
              className="border-gradient-hover inline-flex items-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 dark:border-white/15 dark:bg-transparent dark:text-neutral-300"
            >
              <span>View Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
