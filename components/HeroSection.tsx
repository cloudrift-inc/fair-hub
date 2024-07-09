// components/HeroSection.tsx
import React from "react";
import "../app/globals.css";
import Button from "./foundational/Button";
import Link from "./foundational/Link"

const HeroSection: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full max-w-none flex-col items-center justify-center bg-black px-4 text-center">
      <h1 className="text-5xl font-extrabold leading-snug text-white sm:text-5xl md:text-6xl">
        Peak Performance, Smart Pricing.
      </h1>
      <p className="mt-4 max-w-lg text-base text-gray-400 sm:text-lg">
        Datacenter-Hosted GPUs Starting at $0.34/Hour - Full Control, No
        Compromises.
      </p>
      <Link href="/console">
      <Button className="mt-6 rounded-full bg-white px-6 py-2 font-semibold text-[#191970] transition duration-300 ease-in-out sm:px-8 sm:py-3">
        Explore Pricing Plans
      </Button>
      </Link>
    </div>
  );
};

export default HeroSection;
