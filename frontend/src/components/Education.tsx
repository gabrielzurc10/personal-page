export default function Education() {
  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-white">
          Education
        </h2>
        <p className="mb-12 text-center text-neutral-500 dark:text-neutral-400">
          Academic background
        </p>
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 transition-colors hover:border-primary/30 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/30">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center">
                <svg className="h-7 w-7 text-primary dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
          </div>
        </div>
      </div>
    </section>
  );
}
