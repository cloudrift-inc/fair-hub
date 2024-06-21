import React from "react";
import "../app/globals.css";

type Testimonial = {
  id: number;
  name: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dosvak Inc.",
    text: "We got premium compute power at most competitive pricing from neuralrack.ai. Their build quality is very good, and they stress test each and every machine before delivering. We will highly recommend it to anyone who needs best-in-class GPU compute power.",
  },
  {
    id: 2,
    name: "sloT",
    text: "The best thing about NeuralRack is that I can discuss my specific requirements for either a GPU or CPU rig with the engineer. I don't have to pick an off-the-shelf build that doesn't fit my requirements exactly. This extends into support too: I can request changes based on performance metrics so my hardware is always aligned to my needs. I would recommend NeuralRack, no question. 5 Stars",
  },
  {
    id: 3,
    name: "Andrew O'Flaherty",
    text: `The NeuralRack team, especially Rohith, have been a pleasure to do business with. The on-site support, fast response times, and vast knowledge are leaps and bounds above the providers I used to use. They've customized hardware to suit my needs, performed upgrades during late hours of the night, and have troubleshooted issues I couldn't figure out. The personal and tailored experiences I've had with them, matched with the affordability and quality of the work they do, are why they're my preferred hosting provider.`,
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-12">
      <h2 className="mb-20 text-4xl text-white">
        Hear from Our Satisfied Users
      </h2>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <blockquote
            key={testimonial.id}
            className="mb-10 flex h-full flex-col justify-between text-left text-lg italic text-zinc-400"
          >
            <p className="mb-0">"{testimonial.text}"</p>
            <div className="relative flex items-end not-italic text-white">
              <span className="border-t-2 border-blue-500 text-zinc-400">
                {testimonial.name}
              </span>
            </div>
          </blockquote>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
