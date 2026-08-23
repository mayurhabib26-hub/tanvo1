import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Work from "./components/Work";
import WhyTanvo from "./components/WhyTanvo";
import Process from "./components/Process";
import Technology from "./components/Technology";
import About from "./components/About";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/ui/Cursor";
import IntroAnimation from "./components/ui/IntroAnimation";

export default function App() {
  return (
    <>
      <IntroAnimation />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Work />
        <WhyTanvo />
        <Process />
        <Technology />
        <About />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
