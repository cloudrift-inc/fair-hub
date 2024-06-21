// pages/index.tsx
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import "../app/globals.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
