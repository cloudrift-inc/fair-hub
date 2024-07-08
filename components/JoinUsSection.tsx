import React from "react";
import "../app/globals.css";

const JoinUsSection: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <div className="">
        <h2 className="text-8xl font-extrabold text-white">Join Us</h2>
        <p className="mt-10 max-w-7xl text-xl font-light text-[#717177]">
          Join a community where technology meets trust, performance pairs with
          transparency, and customer relationships are valued deeply. At
          Neuralrack, we don’t just see ourselves as your service provider but
          as your dedicated partner in navigating the intricate world of GPU
          computing. Let us empower your projects with solutions that are
          thoughtfully designed around your specific needs.
        </p>
        <p className="mt-20 max-w-7xl text-xl font-bold text-[#B2B2B2]">
          Experience the Neuralrack Difference
        </p>
        <p className="mt-4 max-w-7xl text-xl font-light text-[#717177]">
          Discover a service where advanced technology is matched with
          unwavering trust and transparency. Engage with us, and let’s drive
          your projects to their fullest potential, ensuring every solution is
          not just effective but a benchmark in its own right.
        </p>
      </div>
    </div>
  );
};

export default JoinUsSection;
