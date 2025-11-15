import React from 'react';

function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Choose Company',
      description: 'Select from 50+ top companies and filter by your preferences.'
    },
    {
      number: '02',
      title: 'Pick Your Round',
      description: 'Prepare for Aptitude, Technical, Communication, or HR rounds.'
    },
    {
      number: '03',
      title: 'Practice Questions',
      description: 'Solve curated questions with detailed solutions and explanations.'
    },
    {
      number: '04',
      title: 'Take Mock Tests',
      description: 'Attempt full-length mock tests to assess your readiness.'
    },
    {
      number: '05',
      title: 'Review & Improve',
      description: 'Analyze your performance and focus on weak areas.'
    },
    {
      number: '06',
      title: 'Ace the Interview',
      description: 'Walk into your interview with confidence and land the job!'
    },
  ];

  return (
    <div className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works 🚀
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to start your preparation journey.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Step Card */}
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
                {/* Step Number */}
                <div className="text-5xl font-bold text-blue-200 mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>

              {/* Arrow */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-5 top-1/2 transform -translate-y-1/2 text-3xl text-blue-400">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorksSection;
