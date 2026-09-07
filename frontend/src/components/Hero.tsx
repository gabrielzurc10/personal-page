import Image from "next/image";
import CountUp from "@/components/CountUp";
import WinstonPrompts from "@/components/WinstonPrompts";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const STATS = [
  { value: 36000, suffix: "+", label: "organizations using features I shipped" },
  { value: 47000, suffix: "+", label: "students and faculty served daily" },
  { value: 100000, suffix: "+", label: "emails a month through my pipeline" },
  { value: 1000, suffix: "+", label: "hours of manual work eliminated yearly" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-24 sm:pb-20 sm:pt-32">
      {/* Soft glow so the hero doesn't sit on a flat wall of color. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 35%, color-mix(in oklab, var(--color-info) 14%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-8 md:grid-cols-[1.35fr_1fr] md:gap-16">
          {/* Copy */}
          <div className="order-2 text-center md:order-1 md:text-left">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-base-content/60 sm:text-sm sm:tracking-widest">
              Software Developer
            </p>
            <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Gabriel Cruz
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-base-content/70 md:mx-0">
              Four-plus years shipping cloud-native applications in HR tech,
              telecom, and higher education, owning every project from
              requirements through deployment.
            </p>

            <div className="mb-10 flex flex-wrap justify-center gap-3 md:justify-start">
              <a href="#projects" className="btn btn-primary rounded-full px-6">
                See my work
              </a>
              <a
                href={`${API_BASE}/api/resume`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline rounded-full px-6"
              >
                View Resume
              </a>
            </div>

            <WinstonPrompts className="mx-auto max-w-xl md:mx-0" />
          </div>

          {/* Portrait */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full bg-gradient-to-br from-info/40 via-transparent to-primary/30 blur-2xl"
              />
              <div className="avatar relative">
                <div className="w-32 rounded-full ring-2 ring-base-300 ring-offset-4 ring-offset-base-100 sm:w-48 md:w-64 lg:w-[300px]">
                  <Image
                    src="/profileShot.jpg"
                    alt="Gabriel Cruz"
                    width={300}
                    height={300}
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proof strip */}
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-base-300 pt-10 sm:mt-20 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col text-center md:text-left">
              <dt className="order-2 text-sm leading-snug text-base-content/60">{stat.label}</dt>
              <dd className="order-1 mb-1 text-3xl font-bold tracking-tight sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
