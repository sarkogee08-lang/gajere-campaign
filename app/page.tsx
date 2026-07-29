import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Biography from "@/components/home/Biography";
import Vision from "@/components/home/Vision";
import Manifesto from "@/components/home/Manifesto";
import Priorities from "@/components/home/Priorities";
import Stats from "@/components/home/Stats";
import News from "@/components/home/News";
import Gallery from "@/components/home/Gallery";
import Volunteer from "@/components/home/Volunteer";
import FadeIn from "@/components/ui/FadeIn";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      <main className="min-h-screen scroll-smooth bg-white pt-20">

        {/* Hero Section */}
        <Hero />

        {/* About Candidate */}
        <FadeIn>
          <About />
        </FadeIn>

        {/* Biography & Leadership Timeline */}
        <FadeIn>
          <Biography />
        </FadeIn>

        {/* Vision & Mission */}
        <FadeIn>
          <Vision />
        </FadeIn>

        {/* Manifesto */}
        <FadeIn>
          <Manifesto />
        </FadeIn>

        {/* Campaign Priorities */}
        <FadeIn>
          <Priorities />
        </FadeIn>

        {/* Campaign Statistics */}
        <FadeIn>
          <Stats />
        </FadeIn>

        {/* News & Updates */}
        <FadeIn>
          <News />
        </FadeIn>

        {/* Campaign Gallery */}
        <FadeIn>
          <Gallery />
        </FadeIn>

        {/* Volunteer Registration */}
        <FadeIn>
          <Volunteer />
        </FadeIn>

      </main>

      {/* Website Footer */}
      <Footer />
    </>
  );
}