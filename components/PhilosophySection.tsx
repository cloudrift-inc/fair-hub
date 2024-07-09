import React from "react";
import "../app/globals.css";

const PhilosophySection: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
      <div className="">
        <h2 className="text-7xl font-extrabold text-white">Our Philosophy</h2>
        <p className="mt-10 max-w-7xl text-xl font-light text-[#717177]">
          At Neuralrack, we are committed to more than just providing
          cutting-edge GPU solutions; we aim to transform how our clients
          experience technology. Our philosophy is built on a foundation of deep
          technical expertise and personalized client engagement. By designing,
          building, stress-testing, and maintaining all our hardware, we have
          unparalleled control over the quality and reliability of our services.
          This comprehensive oversight allows us to deliver superior performance
          that our clients can depend on.
        </p>
        <p className="mt-3 max-w-7xl text-lg font-light text-[#717177]">
          At Neuralrack, we are committed to more than just providing
          cutting-edge GPU solutions; we aim to transform how our clients
          experience technology. Our philosophy is built on a foundation of deep
          technical expertise and personalized client engagement. By designing,
          building, stress-testing, and maintaining all our hardware, we have
          unparalleled control over the quality and reliability of our services.
          This comprehensive oversight allows us to deliver superior performance
          that our clients can depend on.
        </p>
      </div>
    </div>
  );
};

export default PhilosophySection;
