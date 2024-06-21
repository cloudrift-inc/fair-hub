import { useState } from "react";
import Button from "./foundational/Button";

interface Question {
  id: number;
  question: string;
  answer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "Why should I use Neuralrack instead of a third-party marketplace?",
    answer:
      "Neuralrack avoids middleman fees, offers direct hardware access, and aligns our incentives with yours, ensuring high reliability and customer-focused service.",
  },
  {
    id: 2,
    question: "Can I get more than 16 CPU cores per GPU?",
    answer:
      "We may be able to provision up to 128 cores per GPU if you want a custom build.",
  },
  {
    id: 3,
    question: "How is support handled?",
    answer:
      "Support is unmanaged but proactive, with assistance available via email and Discord, plus preventive measures to avoid future issues.",
  },
];

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-12">
      <div className="w-full max-w-4xl">
        <h2 className="mb-10  py-3 text-center text-4xl text-white">
          Answers to our frequently asked questions
        </h2>
        <div className="space-y-2">
          {questions.map(({ id, question, answer }, index) => (
            <div
              key={id}
              className={`border-gray-700 ${index === 0 ? "border-t" : ""} ${
                index === questions.length - 1 ? "border-b" : "border-b"
              }`}
            >
              <Button
                onClick={() => toggle(id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-white transition-colors duration-300 ease-in-out"
              >
                {question}
                <span
                  className="text-3xl font-extrabold text-gray-500"
                  style={{ fontSize: "2rem" }}
                >
                  {openId === id ? "↑" : "→"}
                </span>
              </Button>
              <div
                className={`transition-opacity duration-500 ease-in-out ${
                  openId === id ? "max-h-96 py-2" : "max-h-0"
                } overflow-hidden`}
              >
                <p className="mb-5 px-6 text-gray-400">{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
