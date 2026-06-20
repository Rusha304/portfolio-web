import Nav from "@/components/Nav";
import Background from "@/components/Background";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Coffee from "@/components/Coffee";
import Footer from "@/components/Footer";
import { PointerProvider } from "@/components/interactive/PointerProvider";
import InkTrail from "@/components/interactive/InkTrail";
import GridParticles from "@/components/interactive/GridParticles";
import ScrollColorShift from "@/components/interactive/ScrollColorShift";

export default function Home() {
  return (
    <PointerProvider>
      <Background />
      <ScrollColorShift />
      <GridParticles />
      <InkTrail />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Coffee />
      </main>
      <Footer />
    </PointerProvider>
  );
}
