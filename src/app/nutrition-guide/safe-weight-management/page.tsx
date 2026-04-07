import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: "Safe Weight Management & Energy Requirements | Canine Diet Deficit Calculator",
    description: "Clinical guidelines for canine weight management, explaining the difference between RER and MER, the 9-point BCS system, and treat calorie allocation.",
};

export default function ArticleWeightManagement() {
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
                        Safe Weight Management and Energy Requirements
                    </h1>
                </div>
            </header>

            {/* Article Content */}
            <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 bg-white my-8 shadow-sm border border-slate-200 rounded-2xl">
                <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-blue-600 hover:prose-a:text-blue-800">
                    <p>
                        A critical first step in managing a dog's weight is determining their Body Condition Score (BCS) on a 9-point scale, where a 4 or 5 represents an ideal weight. For dogs that are overweight, simply feeding less of their standard maintenance diet is dangerous, as this can lead to severe nutrient deficiencies. Instead, veterinary therapeutic weight-loss foods are formulated with lower energy density (fewer calories per volume) but have higher concentrations of protein, fiber, vitamins, and minerals to preserve lean muscle mass. Additionally, owners should measure food in grams using a kitchen scale rather than using measuring cups, which are notoriously inaccurate. Finally, any weight-loss plan must strictly adhere to the 10% rule: treats and snacks must never exceed 10% of a dog's total daily caloric intake.
                    </p>
                </article>
            </main>
        </div>
    );
}
