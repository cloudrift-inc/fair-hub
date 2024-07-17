// components/HeroSection.tsx
import React from "react";
import "../app/globals.css";
import Button from "./foundational/Button";
import Link from "./foundational/Link"

const HeroSection: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full max-w-none flex-col items-center justify-center bg-black px-4 text-center">
      <h1 className="text-5xl font-extrabold leading-snug text-white sm:text-5xl md:text-6xl">
          Datacenter-Hosted GPUs for <span className="text-blue-400">85% Less</span>
      </h1>
      <p className="mt-4 max-w-xl text-base text-gray-400 sm:text-xl">
          8 x NVidia RTX 4090, AMD Epyc CPU, 200Gb/s network<br/>
          Backup power, cooling and networking<br/>
          Rent by minute, no commitment
      </p>
      <Link href="/console">
          <Button className="mt-6 rounded-full bg-white px-6 py-2 font-semibold text-[#191970] transition duration-300 ease-in-out sm:px-8 sm:py-3">
            Rent a GPU Now
          </Button>
      </Link>
    </div>
  );
};

export default HeroSection;
