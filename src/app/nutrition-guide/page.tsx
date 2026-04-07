import React from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

export const metadata = {
    title: "Canine Nutrition Guide | Diet Deficit Calculator",
    description: "Explore our comprehensive veterinary guide to understanding your dog's dietary needs, deciphering commercial dog food labels, and calculating breed-specific deficits.",
};

const articles = [
    {
        title: "Safe Weight Management and Energy Requirements",
        description: "Clinical guidelines for canine weight management, explaining the difference between RER and MER, the 9-point BCS system, and treat calorie allocation.",
        slug: "safe-weight-management",
        readTime: "8 min read",
    },
    {
        title: "The Canine Gut Microbiome and Eubiosis",
        description: "Detailed overview of the five dominant bacterial phyla, dysbiosis triggers, and how gut health impacts canine behavior and anxiety.",
        slug: "canine-gut-microbiome",
        readTime: "9 min read",
    },
    {
        title: "The 7 Pillars of Canine Gut Formulation",
        description: "Breakdown of the clinical approach to restoring eubiosis, from probiotic cores and prebiotics to the severe toxicity of human supplements.",
        slug: "7-pillars-of-gut-formulation",
        readTime: "10 min read",
    },
    {
        title: "Understanding Canine Macronutrients: Protein, Fat, and Calcium",
        description: "A deep dive into the physiological requirements of dogs, exploring why minimum protein and fat thresholds are critical for longevity and disease prevention.",
        slug: "understanding-macronutrients",
        readTime: "6 min read",
    },
    {
        title: "How to Read a Commercial Dog Food Label Correctly",
        description: "Learn to decode the 'Guaranteed Analysis' panel, understand ingredient splitting, and identify hidden caloric density in major dog food brands.",
        slug: "reading-dog-food-labels",
        readTime: "7 min read",
    },
    {
        title: "Why Breed Size and Activity Level Change Your Dog's Diet Deficits",
        description: "Discover the clinical differences in Resting Energy Requirements (RER) between toy breeds and working breeds, and how to adjust macronutrients accordingly.",
        slug: "breed-size-and-activity-levels",
        readTime: "5 min read",
    }
];

export default function NutritionGuideIndex() {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 selection:bg-amber-200 selection:text-amber-900">

            {/* Header */}
            <header className="w-full bg-white border-b border-stone-200 shadow-sm py-12">
                <div className="max-w-4xl mx-auto px-4 text-center mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-50 text-amber-600 rounded-2xl mb-4 mx-auto flex">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 tracking-tight">
                        Canine Nutrition Guide
                    </h1>
                    <p className="mt-4 text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Evidence-based veterinary insights into feeding your dog a biologically appropriate and complete diet.
                    </p>
                </div>
            </header>

            {/* Article Grid Layout */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <Link key={article.slug} href={`/nutrition-guide/${article.slug}`} className="block group h-full">
                            <article className="flex flex-col justify-between h-full bg-white rounded-xl shadow-sm border border-stone-200 p-6 transition-all duration-300 hover:-transtone-y-1 hover:shadow-lg hover:border-amber-300">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase text-amber-600">
                                            {article.readTime}
                                        </span>
                                        <svg className="w-5 h-5 text-stone-400 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-amber-700 transition-colors line-clamp-3">
                                        {article.title}
                                    </h2>
                                    <p className="text-sm text-stone-500 leading-relaxed line-clamp-4">
                                        {article.description}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
