import React, { useState } from 'react';

const HirexInterestSection = () => {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    designation: '',
    email: '',
    contact: '',
    interestedIn: 'fulltime',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, interestedIn: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        // Reset form after successful submission
        setForm({
          fullName: '',
          companyName: '',
          designation: '',
          email: '',
          contact: '',
          interestedIn: 'fulltime',
        });
      } else {
        setError(data.message || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setError('Failed to submit. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-[500px] flex flex-col md:flex-row">
      {/* Left Info Section */}
      <div className="md:w-1/2 w-full bg-gradient-to-r from-[#a80000] to-[#e60000] text-white flex flex-col justify-center px-8 py-12 md:py-0 md:pl-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Want to be a part of</h2>
        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-2">
          India's Fresher<br />Hiring Revolution?
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Join us at <span className="font-bold">HIREX 2025</span> & meet the most industry-ready talent you've ever seen.<br />
          <span className="font-bold">We don't talk skills, we prove them</span>
        </p>
        <div className="flex items-center mt-8 space-x-8">
          <div className="flex items-center">
            <span className="bg-white text-red-700 rounded-full p-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            <span className="text-base md:text-lg">01<sup>st</sup> - 05<sup>th</sup> August, 2025</span>
          </div>
          <div className="flex items-center">
            <span className="bg-white text-red-700 rounded-full p-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4v4m0 0l-4 4m4-4l4 4" />
              </svg>
            </span>
            <span className="text-base md:text-lg">Online & Offline (@ Jaipur) available</span>
          </div>
        </div>
      </div>
      
      {/* Right Form Section */}
      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center px-8 py-12 md:py-0 md:pr-16">
        <h2 className="text-2xl md:text-3xl font-bold text-red-700 mb-6">
          Submit your Interest to hire validated, skilled tech talent at ZERO cost
        </h2>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <strong>Success!</strong> Thank you for your interest in HIREX 2025. We'll contact you soon!
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md font-bold transition-all duration-300"
            >
              Submit Another Interest
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                required
                disabled={loading}
                className="flex-1 border-b-2 border-red-700 focus:outline-none focus:border-red-900 py-2 px-2 mb-4 md:mb-0 bg-transparent placeholder:text-gray-500 disabled:opacity-50"
              />
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName}
                onChange={handleChange}
                required
                disabled={loading}
                className="flex-1 border-b-2 border-red-700 focus:outline-none focus:border-red-900 py-2 px-2 mb-4 md:mb-0 bg-transparent placeholder:text-gray-500 disabled:opacity-50"
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={form.designation}
                onChange={handleChange}
                required
                disabled={loading}
                className="flex-1 border-b-2 border-red-700 focus:outline-none focus:border-red-900 py-2 px-2 bg-transparent placeholder:text-gray-500 disabled:opacity-50"
              />
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="email"
                name="email"
                placeholder="Official E-mail ID"
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="flex-1 border-b-2 border-red-700 focus:outline-none focus:border-red-900 py-2 px-2 mb-4 md:mb-0 bg-transparent placeholder:text-gray-500 disabled:opacity-50"
              />
              <input
                type="tel"
                name="contact"
                placeholder="Contact No"
                value={form.contact}
                onChange={handleChange}
                required
                disabled={loading}
                className="flex-1 border-b-2 border-red-700 focus:outline-none focus:border-red-900 py-2 px-2 bg-transparent placeholder:text-gray-500 disabled:opacity-50"
              />
            </div>
            
            <div className="flex items-center space-x-8 mt-2">
              <span className="text-gray-700 font-medium">Interested in</span>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="interestedIn"
                  value="fulltime"
                  checked={form.interestedIn === 'fulltime'}
                  onChange={handleRadio}
                  disabled={loading}
                  className="accent-red-700 disabled:opacity-50"
                />
                <span className="text-gray-700">Hiring Full Time</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="interestedIn"
                  value="interns"
                  checked={form.interestedIn === 'interns'}
                  onChange={handleRadio}
                  disabled={loading}
                  className="accent-red-700 disabled:opacity-50"
                />
                <span className="text-gray-700">Hiring Interns</span>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white px-8 py-3 rounded-md font-bold text-lg mt-4 transition-all duration-300 shadow-md disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Interest'
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HirexInterestSection;