import React from "react";
import "../app/globals.css";
import GPURentalCard from "./GPURentalCard";

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonLabel: string;
  link: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "On-Demand GPUs",
    price: "$0.46 / per hour",
    description: "Elite performance for advanced projects",
    features: [
      "NVidia RTX 4090 servers",
      "Run containerized workloads",
      "Versatile tooling for cluster management & monitoring"
    ],
    buttonLabel: "Rent a GPU Now",
    link: "/console",
  },
  {
    id: 2,
    name: "Dedicated Solutions",
    price: "Custom pricing",
    description: "Customized configurations for specialized needs",
    features: [
      "Full hardware customization",
      "Bare metal and VDS solutions",
      "Dedicated support and account management"
    ],
    buttonLabel: "Contact Us",
    link: "#contactus",
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="min-h-4/5 flex items-center justify-center bg-black" id="pricing">
      <div className="w-full max-w-7xl px-2 py-12 text-white">
        <h1 className="mb-8 text-5xl text-center font-bold text-white sm:text-4xl md:text-5xl">Simple and Flexible Pricing</h1>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {pricingPlans.map((plan, index) => (
            <div className={index === 1 ? "rounded-lg bg-white p-[1px]" : ""} key={plan.id}>
              <GPURentalCard
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
                buttonLabel={plan.buttonLabel}
                link={plan.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
