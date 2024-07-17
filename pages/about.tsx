import React from "react";
import Navbar from "../components/Navbar";
import AboutUsHeroSection from "../components/AboutUsHeroSection";
import PhilosophySection from "../components/PhilosophySection";
import WhyChooseUs from "../components/WhyChooseUs";
import FounderSection from "../components/FounderSection";
import JoinUsSection from "../components/JoinUsSection";
import Footer from "../components/Footer";
import { PageTitle } from '../components/PageTitle';


const AboutUsPage: React.FC = () => {
  return (
    <div>
      <PageTitle />
      <Navbar />
      <AboutUsHeroSection />
      <PhilosophySection />
      <WhyChooseUs />
      <FounderSection />
      <JoinUsSection />
      <Footer />
    </div>
  );
};

export default AboutUsPage;
