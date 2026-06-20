import Image from "next/image";

export default function Contact() {
  return (
    <section className="px-6 pt-16 sm:pt-20 md:pt-24">
      <div id="contact" className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl flex-col">
        <h2 className="mb-4 text-center text-3xl font-bold text-neutral-900 dark:text-white">
          Get in Touch
        </h2>
        <p className="mb-12 text-center text-neutral-500 dark:text-neutral-400">
          Feel free to reach out
        </p>
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <div className="card-hover w-full rounded-2xl bg-white dark:bg-white/[0.02]">
            <a
              href="mailto:GabrielArquizaCruz@gmail.com"
              className="flex w-full items-center gap-4 p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                <Image src="/email.svg" alt="email" width={20} height={20} className="dark:invert" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">Email</p>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">GabrielArquizaCruz@gmail.com</p>
              </div>
            </a>
          </div>

          <div className="card-hover w-full rounded-2xl bg-white dark:bg-white/[0.02]">
            <a
              href="https://linkedin.com/in/gabriel-arquiza-cruz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-4 p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} className="dark:invert" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">LinkedIn</p>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">gabriel-arquiza-cruz</p>
              </div>
            </a>
          </div>

          <div className="card-hover w-full rounded-2xl bg-white dark:bg-white/[0.02]">
            <a
              href="https://github.com/gabrielzurc10"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center gap-4 p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                <Image src="/github.svg" alt="GitHub" width={20} height={20} className="dark:invert" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">GitHub</p>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">gabrielzurc10</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
