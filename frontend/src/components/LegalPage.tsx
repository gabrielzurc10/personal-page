import Navbar from "./Navbar";
import Footer from "./Footer";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <>
      <Navbar showSections={false} />

      <main className="mx-auto max-w-3xl px-6 pb-16 pt-28">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{title}</h1>
        <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-500">Last updated: {lastUpdated}</p>
        <div className="legal-prose mt-10">{children}</div>
      </main>

      <Footer />
    </>
  );
}
