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

interface OperationProps {
  index?: number;
  activeStep: number;
  hasTitle?: boolean;
  [x: string]: any;
}

// 先定义 Operation 组件
function Operation({ index, activeStep, hasTitle, ...props }: OperationProps) {
  if (index !== undefined && index !== activeStep) return null;

  return (
    <div className="md:w-2/3" {...props}>
      {hasTitle && <h3 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h3>}
      <p className="mb-6">{steps[activeStep].description}</p>
    </div>
  )
}

interface OperationFlowSectionProps {
  [x: string]: any;
}

export default function OperationFlowSection({ ...props }: OperationFlowSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-white" {...props}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How Notodo Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Simple steps to transform your habits and improve your life.</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 max-w-5xl mx-auto">
          <div className="md:w-1/3 bg-gray-50 rounded-xl p-6 shadow-md">
            {steps.map((step, index) => (
              <Fragment key={index}>
                <div
                  className={`flex items-center p-4 mb-4 cursor-pointer transition-all duration-300 rounded-lg ${
                    activeStep === index 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                    activeStep === index ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-semibold">{step.title}</span>
                </div>
                <Operation activeStep={activeStep} index={index} className="block md:hidden mt-4 mb-8" />
              </Fragment>
            ))}
          </div>
          
          <div className="md:w-2/3 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{steps[activeStep].title}</h3>
            <p className="text-lg text-gray-600 mb-6">{steps[activeStep].description}</p>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-500">Example</div>
              {activeStep === 0 && <p>"I want to stop checking social media during work hours."</p>}
              {activeStep === 1 && <p>"Create 'No Social Media' NotoDo and activate it during work hours."</p>}
              {activeStep === 2 && <p>"Set threshold: 4 hours without checking social media = 10 points."</p>}
              {activeStep === 3 && <p>"Create 'Social Media Free Week' achievement when you reach 200 points."</p>}
              {activeStep === 4 && <p>"Create 'Movie Night' reward for 100 points, unlocked after 'Social Media Free Week'."</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
