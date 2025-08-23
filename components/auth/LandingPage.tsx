import React from 'react';
import { AuthState } from '../../App';
import { Icon } from '../ui/Icon';
import { useTheme } from '../../context/ThemeContext';

const LandingPage: React.FC<{ setAuthState: (state: AuthState) => void; }> = ({ setAuthState }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-primary text-gray-800 dark:text-gray-200">
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-primary/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Icon name="logo" />
            <div>
              <p className="font-bold text-lg text-gray-800 dark:text-white">QuizCraft</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI-Powered Quiz Creator</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-6 h-6" />
            </button>
            <button
              onClick={() => setAuthState(AuthState.Login)}
              className="hidden sm:inline-block font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-500 transition-colors px-3 py-2"
            >
              Login
            </button>
            <button
              onClick={() => setAuthState(AuthState.Signup)}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-brand-600 rounded-lg shadow-sm hover:bg-brand-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center text-center px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full px-4 py-1.5 mb-6 text-sm font-semibold shadow-sm">
            <Icon name="sparkles" className="w-5 h-5 mr-2 text-purple-500" />
            AI-Powered Question Generation
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-gray-900 dark:text-white">
            Transform Any PDF Into
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Engaging Quizzes
            </span>
          </h1>
          
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-400">
            Upload your educational content and let AI instantly generate multiple-choice and true/false questions with answer keys. Perfect for educators who want to save time while creating quality assessments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setAuthState(AuthState.Signup)}
              className="group inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Start Creating Quizzes
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-medium">
              <Icon name="check" className="w-5 h-5" />
              <span>Free to start • No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 bg-gray-50 dark:bg-primary/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gray-900 dark:text-white">Everything You Need to Create Amazing Quizzes</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">From upload to export, we've got every step covered</p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                <Icon name="file" className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Upload PDFs</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Simply drag and drop your educational content, study materials, or chapter PDFs</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                <Icon name="ai-processing" className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">AI Processing</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Advanced AI analyzes your content and generates relevant, high-quality questions</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                <Icon name="review-edit" className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Review & Edit</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Review generated questions, edit as needed, and add your own custom questions</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                <Icon name="export" className="w-8 h-8 text-white"/>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Export</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Download as PDF, DOCX, or CSV format for any platform or LMS integration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Section */}
      <section className="py-16 bg-white dark:bg-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Trusted by Educators Worldwide</h2>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white">Ready to Transform Your Teaching?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-purple-200">
            Join hundreds of educators who are already saving hours every week with AI-powered quiz generation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => setAuthState(AuthState.Signup)}
              className="group inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-purple-700 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Started for Free
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>
            <div className="flex items-center space-x-2 text-purple-200 font-medium">
              <Icon name="clock" className="w-5 h-5" />
              <span>Setup takes less than 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-primary border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <Icon name="logo" />
              <div>
                <p className="font-bold text-lg text-gray-800 dark:text-white">QuizCraft</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI-Powered Quiz Creator</p>
              </div>
            </div>
            <div className="flex space-x-6 text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-brand-600">Privacy Policy</a>
              <a href="#" className="hover:text-brand-600">Terms of Service</a>
              <a href="#" className="hover:text-brand-600">Contact</a>
            </div>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            © 2024 QuizCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;