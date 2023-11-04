import React, { useState } from 'react';
import CreateCourse from './CourseCreation/CreateCourse';
import CurriculumForm from './CourseCreation/CurriculumForm';
import CourseOverview from './CourseCreation/CourseOverview';

const Navbar = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <nav className="bg-blue-500 py-4">
      <div className="max-w-3xl mx-auto flex items-center justify-center space-x-10">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`text-white font-semibold ${
              currentStep === index ? 'border-b-2 border-white' : ''
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

const CourseCreation = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0: CreateCourse, 1: CurriculumForm, 2: CourseOverview
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const steps = [
    { label: 'Create Course', component: <CreateCourse goBack={() => setCurrentStep(currentStep - 1)} nextStep={nextStep} /> },
    { label: 'Curriculum Form', component: <CurriculumForm goBack={() => setCurrentStep(currentStep - 1)} nextStep={nextStep} /> },
    { label: 'Course Overview', component: <CourseOverview goBack={() => setCurrentStep(currentStep - 1)} nextStep={nextStep} /> },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    <Navbar
      steps={steps}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      handlePreviousStep={() => setCurrentStep(currentStep - 1)}
    />
    <div className="flex-grow p-6">
      {steps[currentStep].component}
    </div>
  </div>
  );
};

export default CourseCreation;
