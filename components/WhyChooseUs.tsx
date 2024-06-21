import React from "react";
import Image from "next/image";
import "../app/globals.css";

const WhyChooseUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-black py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-6xl font-bold">
          Why Choose Neuralrack
        </h2>
        <div className="flex flex-col items-center space-y-6">
          <div className="flex w-full max-w-7xl items-center space-x-4 rounded-lg bg-gray-800 p-6">
            <Image
              src="/completecontrol.png"
              alt="Complete Control"
              width={50}
              height={50}
            />
            <div>
              <h3 className="mb-2 ml-5 text-xl font-semibold">
                Complete Control
              </h3>
              <p className="ml-5 font-light">
                We design, build, stress-test, and maintain all our equipment,
                which allows us to offer peak performance, reliability, and
                security.
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-7xl items-center space-x-4 rounded-lg bg-gray-800 p-6">
            <Image
              src="/customizedsolutions.png"
              alt="Customized Solutions"
              width={50}
              height={50}
            />
            <div>
              <h3 className="mb-2 ml-5 text-xl font-semibold">
                Customized Solutions
              </h3>
              <p className="ml-5 font-light">
                Each client relationship is valued, with services tailored to
                meet specific needs, ensuring effectiveness and client
                satisfaction.
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-7xl items-center space-x-4 rounded-lg bg-gray-800 p-6">
            <Image
              src="/competitivepricing.png"
              alt="Competitive Pricing"
              width={50}
              height={50}
            />
            <div>
              <h3 className="mb-2 ml-5 text-xl font-semibold">
                Competitive Pricing
              </h3>
              <p className="ml-5 font-light">
                Our direct management model eliminates unnecessary costs,
                offering transparent, fair, and predictable pricing without
                extra charges for storage or data usage.
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-7xl items-center space-x-4 rounded-lg bg-gray-800 p-6">
            <Image
              src="/uncompromisedtransparency.png"
              alt="Uncompromised Transparency"
              width={50}
              height={50}
            />
            <div>
              <h3 className="mb-2 ml-5 text-xl font-semibold">
                Uncompromised Transparency
              </h3>
              <p className="ml-5 font-light">
                We operate with complete transparency; our names and reputations
                stand firmly behind the quality of our work.
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-7xl items-center space-x-4 rounded-lg bg-gray-800 p-6">
            <Image
              src="/localexpertise.png"
              alt="Local Expertise"
              width={50}
              height={50}
            />
            <div>
              <h3 className="mb-2 ml-5 text-xl font-semibold">
                Local Expertise
              </h3>
              <p className="ml-5 font-light">
                All operations, including customer support, are based in the
                U.S., ensuring effective communication and dependable service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
