import React from 'react';
import Calculator from '../components/Calculator';
import Waitlist from '../components/Waitlist';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import AdSenseUnit from '../components/AdSenseUnit';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">

      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
            Canine Diet Deficit Calculator
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the hidden nutritional gaps in your dog's commercial diet.
            Compare clinical baseline needs against established food profiles.
          </p>
        </div>
      </header>

      {/* Main Layout with Ad Margins */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Left Ad Space - Hidden on smaller screens */}
        <div className="hidden xl:block xl:col-span-2">
          <div className="sticky top-8 w-full">
            <AdSenseUnit />
          </div>
        </div>

        {/* Center Content */}
        <div className="col-span-1 xl:col-span-8 w-full max-w-4xl mx-auto">
          <Calculator />
          <Waitlist />
          <FAQ />
        </div>

        {/* Right Ad Space - Hidden on smaller screens */}
        <div className="hidden xl:block xl:col-span-2">
          <div className="sticky top-8 w-full">
            <AdSenseUnit />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
