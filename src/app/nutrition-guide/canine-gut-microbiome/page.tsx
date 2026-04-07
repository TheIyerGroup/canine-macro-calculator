import React from 'react';
import Link from 'next/link';
import Footer from '../../../components/Footer';

export const metadata = {
    title: "The Canine Gut Microbiome & Eubiosis | Canine Diet Deficit Calculator",
    description: "Detailed overview of the five dominant bacterial phyla, dysbiosis triggers, and how gut health impacts canine behavior and anxiety.",
};

export default function ArticleGutMicrobiome() {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 selection:bg-amber-200 selection:text-amber-900">
            {/* Header */}
            <header className="w-full bg-white border-b border-stone-200 shadow-sm py-8 md:py-12 relative">
                <div className="absolute top-4 left-4 md:top-8 md:left-8">
                    <Link href="/nutrition-guide" className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-800 transition-colors">
                        &larr; Back to Hub
                    </Link>
                </div>
                <div className="max-w-3xl mx-auto px-4 text-center mt-8 md:mt-0">
                    <span className="text-sm font-bold tracking-widest text-amber-600 uppercase mb-3 block">Veterinary Nutrition Standard</span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
                        The Canine Gut Microbiome and Eubiosis
                    </h1>
                    <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-stone-500 font-medium">
                        <span>By the Clinical Nutrition Team</span>
                        <span>&bull;</span>
                        <span>9 min read</span>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 bg-white my-8 shadow-sm border border-stone-200 rounded-2xl">
                <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-stone-800 prose-a:text-amber-600 hover:prose-a:text-amber-800">
                    <p>
                        The canine gut microbiome is a complex ecosystem primarily dominated by five bacterial phyla: Firmicutes, Bacteroidetes, Fusobacteria, Proteobacteria, and Actinobacteria. When this ecosystem is balanced, a state known as 'eubiosis,' it supports healthy digestion, energy metabolism, and immune function. However, this balance can be disrupted by age, poor diet, chronic stress, or the use of antibiotics like metronidazole and tylosin, leading to a state of 'dysbiosis'. Dysbiosis doesn't just cause gastrointestinal upset; via the gut-brain axis, disruptions in the microbiome can alter stress hormone regulation and neurotransmitter production, contributing to behavioral changes such as fearfulness, anxiety, and aggression.
                    </p>
                </article>
            </main>
            <Footer />
        </div>
    );
}
