import Image from "next/image";
import CopyButton from "@/components/CopyButton";

const CONTACTS = [
  {
    href: "mailto:gabrielarquizacruz@gmail.com",
    label: "Email",
    value: "gabrielarquizacruz@gmail.com",
    icon: "/email.svg",
    external: false,
    copy: "gabrielarquizacruz@gmail.com",
  },
  {
    href: "https://linkedin.com/in/gabriel-arquiza-cruz",
    label: "LinkedIn",
    value: "gabriel-arquiza-cruz",
    icon: "/linkedin.svg",
    external: true,
  },
  {
    href: "https://github.com/gabrielzurc10",
    label: "GitHub",
    value: "gabrielzurc10",
    icon: "/github.svg",
    external: true,
  },
];

export default function Contact() {
  return (
    <section className="px-6 py-16 sm:py-20 md:py-24">
      <div id="contact" className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold">Get in Touch</h2>
        <p className="mb-12 text-center text-base-content/60">
          Feel free to reach out
        </p>
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4">
          {CONTACTS.map((contact, index) => (
            <div
              key={contact.href}
              className="reveal-item w-full"
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
            >
            <div
              className="card shadow-md w-full bg-base-100 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl dark:bg-base-200"
            >
              <div className="flex w-full items-center gap-2 p-4">
                <a
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="flex min-w-0 flex-1 items-center gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                    <Image src={contact.icon} alt={contact.label} width={20} height={20} className="dark:invert" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-base-content/50">{contact.label}</p>
                    <p className="truncate text-sm font-medium text-base-content">{contact.value}</p>
                  </div>
                </a>
                {"copy" in contact && contact.copy && <CopyButton text={contact.copy} />}
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
