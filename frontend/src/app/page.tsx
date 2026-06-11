import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ScrollReveal>
          <Skills />
        </ScrollReveal>
        <ScrollReveal>
          <Experience />
        </ScrollReveal>
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
        <ScrollReveal>
          <Education />
        </ScrollReveal>
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
      <ChatBot />
    </>
  );
}
