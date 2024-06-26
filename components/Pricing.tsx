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
    name: "Standard Access",
    price: "$0.34 / per hour",
    description: "Economical Power for Everyday Tasks",
    features: [
      "Access to RTX 3090 servers",
      "Ideal for moderate AI tasks and data processing",
    ],
    buttonLabel: "Rent a GPU Now",
    link: "/console",
  },
  {
    id: 2,
    name: "Premium Access",
    price: "$0.46 / per hour",
    description: "Elite Performance for Advanced Projects",
    features: [
      "Access to RTX 4090 servers",
      "Designed for intensive AI training and high-performance computing",
    ],
    buttonLabel: "Rent a GPU Now",
    link: "/console",
  },
  {
    id: 3,
    name: "Dedicated Solutions",
    price: "Custom pricing",
    description: "Customized Configurations for Specialized Needs",
    features: [
      "Bare metal and VDS solutions",
      "Full customization for unmatched performance requirements",
    ],
    buttonLabel: "Rent a GPU Now",
    link: "#contactus",
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="min-h-4/5 flex items-center justify-center bg-black" id="pricing">
      <div className="w-full max-w-7xl px-2 py-12 text-white">
        <h1 className="mb-4 text-center text-4xl">Simple, easy pricing</h1>
        <p className="mb-10 text-center text-sm text-gray-300">
          Transparent GPU Pricing, No Hidden Fees
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {pricingPlans.map((plan, index) => (
            <div className={index === 1 ? "rounded-lg bg-white p-[1px]" : ""} key={plan.id}>
              <GPURentalCard
                name={plan.name}
                price={plan.price}
                description={plan.description}
                features={plan.features}
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
