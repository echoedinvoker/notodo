'use client';

import { useState } from "react";
import Image from 'next/image';

interface OperationFlowSectionProps {
  id: string;
}

interface Step {
  title: string;
  description: string;
  icon: string;
  image: string;
}

const steps: Step[] = [
  {
    title: "Identify Habits",
    description: "Think of a bad habit you didn't do today or this week, or a good habit you want to maintain.",
    icon: "/icons/lightbulb.svg",
    image: "/images/identify-habits.png"
  },
  {
    title: "Create NotoDo",
    description: "Create a NotoDo item and activate it to start tracking your progress.",
    icon: "/icons/pencil.svg",
    image: "/images/create-notodo.png"
  },
  {
    title: "Set Threshold",
    description: "Set a threshold to define your goals and measure your success.",
    icon: "/icons/target.svg",
    image: "/images/set-threshold.png"
  },
  {
    title: "Create Achievements",
    description: "Create achievements using thresholds to gamify your progress.",
    icon: "/icons/trophy.svg",
    image: "/images/create-achievements.png"
  },
  {
    title: "Manage Rewards",
    description: "Create rewards, set point costs, and use achievement restrictions to motivate yourself.",
    icon: "/icons/gift.svg",
    image: "/images/manage-rewards.png"
  }
];

interface OperationFlowSectionProps {
  [x: string]: any;
}

export default function OperationFlowSection({ ...props }: OperationFlowSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-16 bg-gray-50" {...props}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center p-4 mb-4 cursor-pointer transition-all duration-300 ${activeStep === index ? 'bg-blue-100 rounded-lg' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveStep(index)}
              >
                <span className={`font-semibold ${activeStep === index ? 'text-blue-600' : 'text-gray-700'}`}>{step.title}</span>
              </div>
            ))}
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h3>
            <p className="mb-6">{steps[activeStep].description}</p>
            <div className="relative h-64 w-full">
              <Image
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  return (
    <section className="py-16 bg-gray-50" {...props}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
            <p>Think of a bad habit you didn't do today or this week, or a good habit you want to maintain</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
            <p>Create a NotoDo item and activate it</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
            <p>Set a threshold</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
            <p>Create achievements using thresholds</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">5</div>
            <p>Create rewards, set point costs, and use achievement restrictions</p>
          </div>
        </div>
      </div>
    </section>
  );
};
