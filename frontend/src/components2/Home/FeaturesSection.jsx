import React from 'react';

function FeaturesSection() {
  const features = [
    {
      icon: '📚',
      title: 'Curated Content',
      description: 'Hand-picked questions from actual company interviews and online platforms.'
    },
    {
      icon: '⚡',
      title: 'Practice Tests',
      description: 'Full-length mock tests with real-time scoring and detailed explanations.'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your performance across different topics and companies.'
    },
    {
      icon: '💡',
      title: 'Expert Tips',
      description: 'Learn strategies and techniques from people who cracked top companies.'
    },
    {
      icon: '🎯',
      title: 'Round-Wise Prep',
      description: 'Master Aptitude, Technical, Communication, and HR rounds separately.'
    },
    {
      icon: '🏆',
      title: 'Success Stories',
      description: 'Get inspired by students who landed their dream jobs.'
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Placify? ✨
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to crack your dream company interviews in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
