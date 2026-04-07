import React from 'react';
import Link from 'next/link';
import Footer from '../../../components/Footer';

export const metadata = {
    title: "The 7 Pillars of Canine Gut Formulation | Canine Diet Deficit Calculator",
    description: "Breakdown of the clinical approach to restoring eubiosis, from probiotic cores and prebiotics to the severe toxicity of human supplements.",
};

export default function ArticleGutFormulation() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
            {/* Header */}
            <header className="w-full bg-white border-b border-slate-200 shadow-sm py-8 md:py-12 relative">
                <div className="absolute top-4 left-4 md:top-8 md:left-8">
                    <Link href="/nutrition-guide" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                        &larr; Back to Hub
                    </Link>
                </div>
                <div className="max-w-3xl mx-auto px-4 text-center mt-8 md:mt-0">
                    <span className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3 block">Veterinary Nutrition Standard</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        The 7 Pillars of Canine Gut Formulation
                    </h1>
                    <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-slate-500 font-medium">
                        <span>By the Clinical Nutrition Team</span>
                        <span>&bull;</span>
                        <span>10 min read</span>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 bg-white my-8 shadow-sm border border-slate-200 rounded-2xl">
                <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-blue-600 hover:prose-a:text-blue-800">
                    <p>
                        Restoring and maintaining a healthy canine microbiome requires a multi-modal approach. Clinical formulations focus on 7 core pillars: 1) A Probiotic Core utilizing heat-stable spore-formers like Bacillus subtilis, 2) Prebiotic Synergy using diverse fibers like Baobab fruit pulp, 3) A Postbiotic Scaffold for immune modulation, 4) Adaptogens like Ashwagandha KSM-66 for stress resilience, 5) Aesthetic Support via marine collagen and Omega-3s, 6) A chelated Mineral Matrix, and 7) Polyphenol bioactives like Curcumin. CRITICAL WARNING: Owners must never use human supplements to fulfill these pillars. Common human supplement ingredients such as Xylitol, Alpha-Lipoic Acid, and grape-derived Resveratrol are highly toxic to dogs and can cause acute liver or kidney failure, or life-threatening hypoglycemia.
                    </p>

                </article>
            </main>
            <Footer />
        </div>
    );
}
