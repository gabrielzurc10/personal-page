import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 md:flex-row md:gap-16">
        <div className="shrink-0">
          <Image
            src="/profileShot.jpg"
            alt="Gabriel Cruz"
            width={280}
            height={280}
            priority
            className="rounded-full object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary dark:text-white">
            Software Developer
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl lg:text-6xl">
            Gabriel Cruz
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-neutral-500 dark:text-neutral-400">
            Software developer with 4+ years of experience building scalable
            cloud-native applications, automation systems, and LLM-powered
            solutions for enterprise clients.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#contact"
              className="btn-gradient-hover inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm dark:bg-white dark:text-black"
            >
              <span>Contact Me</span>
            </a>
            <a
              href="http://localhost:8000/api/resume"
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
