import React from "react";
import "../app/globals.css";

const AboutUsHeroSection: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <h1 className="text-7xl font-extrabold text-white ">
        GPU-Powered Innovation
      </h1>
      <p className="mt-8 max-w-7xl text-xl font-light text-[#717177]">
        At Neuralrack, founded by Rohith Hegde, we are not just a provider of
        GPU hosting services—we are innovators in a complex landscape of
        technology. Our approach goes beyond traditional service; we offer
        transformative solutions tailored to each client’s unique computational
        needs.
      </p>
    </div>
  );
};

export default AboutUsHeroSection;
