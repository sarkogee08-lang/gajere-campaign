import Navbar from "@/components/layout/Navbar";
import { LanguageProvider } from "@/components/language/LanguageContext";
import Hero from "@/components/home/Hero";
import Countdown from "@/components/home/Countdown";
import About from "@/components/home/About";
import Biography from "@/components/home/Biography";
import Message from "@/components/home/Message";
import Vision from "@/components/home/Vision";
import Manifesto from "@/components/home/Manifesto";
import Priorities from "@/components/home/Priorities";
import Stats from "@/components/home/Stats";
import News from "@/components/home/News";
import Gallery from "@/components/home/Gallery";
import JoinMovement from "@/components/home/JoinMovement";
import Volunteer from "@/components/home/Volunteer";
import FadeIn from "@/components/ui/FadeIn";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />

      <main className="min-h-screen scroll-smooth bg-white pt-20">

        <Hero />

        <FadeIn>
          <Countdown />
        </FadeIn>

        <FadeIn>
          <About />
        </FadeIn>

        <FadeIn>
          <Biography />
        </FadeIn>

        <FadeIn>
          <Message />
        </FadeIn>

        <FadeIn>
          <Vision />
        </FadeIn>

        <FadeIn>
          <Manifesto />
        </FadeIn>

        <FadeIn>
          <Priorities />
        </FadeIn>

        <FadeIn>
          <Stats />
        </FadeIn>

        <FadeIn>
          <News />
        </FadeIn>

        <FadeIn>
          <Gallery />
        </FadeIn>

        <FadeIn>
          <JoinMovement />
        </FadeIn>

        <FadeIn>
          <Volunteer />
        </FadeIn>

      </main>

      <Footer />
    </LanguageProvider>
  );
}
