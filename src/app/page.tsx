import Calculator from '../components/Calculator';
import Waitlist from '../components/Waitlist';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Canine Diet Deficit Calculator",
            "operatingSystem": "Web",
            "applicationCategory": "HealthApplication",
            "description": "Veterinary clinical deficit calculator for comparing dog dietary needs to food nutritional profiles.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />

      {/* Header */}
      <header className="w-full bg-white border-b border-stone-200 shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-amber-50 text-amber-600 rounded-2xl mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-amber-900 tracking-tight">
            Canine Diet Deficit Calculator
          </h1>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed mb-6">
            Discover the hidden nutritional gaps in your dog's commercial diet.
            Compare clinical baseline needs against established food profiles.
          </p>
        </div>
      </header>

      {/* Main Layout (Centered for Auto Ads) */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Calculator />
        <Waitlist />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
