import Image from "next/image";
import GradientReveal from "./GradientReveal";

export default function Education() {
  return (
    <section className="px-6 py-16 sm:py-20 md:py-24">
      <div id="education" className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-white">
          Education
        </h2>
        <p className="mb-12 text-center text-neutral-500 dark:text-neutral-400">
          Academic background
        </p>
        <div className="mx-auto max-w-2xl">
          <GradientReveal className="card-hover rounded-2xl bg-white p-8 dark:bg-white/[0.02]">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                <Image src="/academic-cap.svg" alt="academic cap" width={28} height={28} className="dark:invert" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="font-medium text-primary dark:text-white">
                  University of Houston
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Houston, Texas
                </p>
                <p className="mt-1 text-sm text-neutral-400 dark:text-neutral-500">
                  August 2020 — December 2022
                </p>
              </div>
            </div>
          </GradientReveal>
        </div>
      </div>
    </section>
  );
}
