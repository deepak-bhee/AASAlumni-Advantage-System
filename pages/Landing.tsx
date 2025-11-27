import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Briefcase, Calendar } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">AAS</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium">
              Log in
            </Link>
            <Link to="/login" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium shadow-md transition-all">
              Join Network
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-50 pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">The Alumni Advantage:</span>
              <span className="block text-primary-600 mt-2">A College Placement Network</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Connect with SDM College alumni, find mentorship opportunities, land your dream job, and stay updated with campus events.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/login" className="px-8 py-3 bg-primary-600 text-white rounded-lg font-bold shadow-lg hover:bg-primary-700 transition-all text-lg">
                Get Started
              </Link>
              <button className="px-8 py-3 bg-white text-primary-700 border border-gray-200 rounded-lg font-bold hover:bg-gray-50 transition-all text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Networking</h3>
              <p className="text-gray-600">
                Bridge the gap between current students and successful alumni. Build professional relationships that last a lifetime.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Jobs & Mentorship</h3>
              <p className="text-gray-600">
                Access exclusive job postings and mentorship programs curated by alumni specifically for our students.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Events</h3>
              <p className="text-gray-600">
                Never miss a workshop, webinar, or reunion. Stay engaged with the college community through our event hub.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
               <span className="text-2xl font-bold">SDM College of Engineering</span>
               <p className="text-gray-400 mt-2">Department of Information Science & Engineering</p>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; 2025 Alumni Advantage System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};