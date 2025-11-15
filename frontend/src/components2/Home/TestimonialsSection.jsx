import React from 'react';

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Raj Kumar',
      company: 'TCS',
      role: 'Software Developer',
      message: 'Placify helped me understand the actual interview pattern. I cracked TCS in my first attempt!',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Priya Sharma',
      company: 'Infosys',
      role: 'System Engineer',
      message: 'The mock tests were extremely helpful. They matched the actual difficulty level perfectly.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Arjun Singh',
      company: 'Wipro',
      role: 'Engineer',
      message: 'Best platform for company-specific preparation. Got selected with excellent offers!',
      rating: 5,
      image: '👨‍💻'
    },
    {
      name: 'Neha Verma',
      company: 'Accenture',
      role: 'Associate',
      message: 'Comprehensive content covering all interview rounds. Highly recommended!',
      rating: 5,
      image: '👩‍💻'
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Success Stories 🌟
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students who successfully landed their dream jobs using Placify.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-xl">⭐</span>
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.message}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.company} • {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
