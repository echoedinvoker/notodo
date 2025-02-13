'use client';

import { Fragment, useState } from "react";

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: "Identify Habits",
    description: "Think of a bad habit you didn't do today or this week, or a good habit you want to maintain.",
  },
  {
    title: "Create NotoDo",
    description: "Create a NotoDo item and activate it to start tracking your progress.",
  },
  {
    title: "Set Threshold",
    description: "Set a threshold to define your goals and measure your success.",
  },
  {
    title: "Create Achievements",
    description: "Create achievements using thresholds to gamify your progress.",
  },
  {
    title: "Manage Rewards",
    description: "Create rewards, set point costs, and use achievement restrictions to motivate yourself.",
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
        <h2 className="text-stone-600 text-3xl font-bold uppercase tracking-wide text-center mb-12">How It Work</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {steps.map((step, index) => (
              <Fragment key={index}>
                <div
                  className={`flex items-center justify-center md:justify-start p-4 mb-4 cursor-pointer transition-all duration-300 ${activeStep === index ? 'bg-blue-100 rounded-lg' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveStep(index)}
                >
                  <span className={`font-semibold text-center whitespace-nowrap ${activeStep === index ? 'text-blue-600' : 'text-gray-700'}`}>{step.title}</span>
                </div>
                <Operation activeStep={activeStep} index={index} className="block md:hidden" />
              </Fragment>
            ))}
          </div>
          <Operation hasTitle activeStep={activeStep} className="opacity-0 md:opacity-100" />
        </div>
      </div>
    </section>
  )
};

interface OperationProps {
  index?: number;
  activeStep: number;
  hasTitle?: boolean;
  [x: string]: any;
}

function Operation({ index, activeStep, hasTitle, ...props }: OperationProps) {
  if (index !== undefined && index !== activeStep) return null;

  return (
    <div className="md:w-2/3" {...props}>
      {hasTitle && <h3 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h3>}
      <p className="mb-6">{steps[activeStep].description}</p>
    </div>
  )
}
