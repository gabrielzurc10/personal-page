import Image from "next/image";

export default function Education() {
  return (
    <section className="px-6 py-16 sm:py-20 md:py-24">
      <div id="education" className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold">Education</h2>
        <p className="mb-12 text-center text-base-content/60">
          Academic background
        </p>
        <div className="mx-auto max-w-2xl">
          <div className="reveal-item card shadow-md bg-base-100 dark:bg-base-200">
            <div className="card-body flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                <Image src="/academic-cap.svg" alt="academic cap" width={28} height={28} className="dark:invert" />
              </div>
              <div>
                <h3 className="card-title text-xl">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="font-medium text-base-content">University of Houston</p>
                <p className="text-sm text-base-content/60">Houston, Texas</p>
                <p className="mt-1 text-sm text-base-content/50">
                  August 2020 — December 2022
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
