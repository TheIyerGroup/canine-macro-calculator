import React from 'react';
import Link from 'next/link';
import Footer from '../../../components/Footer';

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
                    <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-slate-500 font-medium">
                        <span>By the Clinical Nutrition Team</span>
                        <span>&bull;</span>
                        <span>8 min read</span>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 bg-white my-8 shadow-sm border border-slate-200 rounded-2xl">
                <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-800 prose-a:text-blue-600 hover:prose-a:text-blue-800">
                    <p className="lead text-xl text-slate-700 font-medium pb-6 border-b border-slate-100">
                        Canine obesity is an epidemic, but the solution isn't as simple as drastically reducing kibble volume. Understanding the precise metabolic needs of your dog is critical to ensuring they lose fat while maintaining essential muscle mass and preventing severe nutrient deficiencies.
                    </p>

                    <h2 className="text-2xl mt-8 mb-4">RER vs. MER: The Foundations of Caloric Needs</h2>
                    <p className="mb-6 leading-relaxed">
                        The baseline measurement for any canine dietary plan is the <strong>Resting Energy Requirement (RER)</strong>. This represents the basic number of calories a dog needs to sustain essential biological functions—such as breathing, digestion, and brain activity—while completely at rest in a thermoneutral environment.
                    </p>
                    <p className="mb-6 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm">
                        RER Formula: 70 &times; (Body Weight in kg)<sup>0.75</sup>
                    </p>
                    <p className="mb-6 leading-relaxed">
                        However, dogs aren't perpetually at rest. To account for their daily activity, we must calculate their <strong>Maintenance Energy Requirement (MER)</strong>. The MER applies a specific multiplier to the RER based on the dog's life stage, spay/neuter status, and daily activity level. For example, a neutered adult dog generally requires an MER of 1.6 &times; RER, whereas a working dog might require 2.0 to 5.0 &times; RER during intense exercise.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">Evaluating Body Fat: The 9-Point BCS System</h2>
                    <p className="mb-6 leading-relaxed">
                        Weight on a scale only tells half the story. The <strong>9-point Body Condition Score (BCS)</strong> system is the clinical gold standard for evaluating a dog's physical condition. A score of 4 to 5 out of 9 indicates an ideal body condition.
                    </p>
                    <ul className="mb-6 space-y-2 list-disc list-inside text-slate-700">
                        <li><strong>Under ideal (1-3):</strong> Ribs, lumbar vertebrae, and pelvic bones are easily visible. No palpable fat.</li>
                        <li><strong>Ideal (4-5):</strong> Ribs are easily palpable with minimal fat covering. A clear waist is observed from above, and an abdominal tuck is evident from the side.</li>
                        <li><strong>Over overweight (6-9):</strong> Ribs are difficult or impossible to palpate under a layer of fat. The waist is absent, and the abdomen may pendulate.</li>
                    </ul>
                    <p className="mb-6 leading-relaxed">
                        By consistently assessing your dog's BCS and adjusting the MER multiplier accordingly, you can proactively manage their weight before obesity sets in.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">The Danger of Portion Restriction</h2>
                    <p className="mb-6 leading-relaxed">
                        A common mistake owners make when attempting to help their dog lose weight is simply reducing the volume of their standard maintenance diet (e.g., cutting from 2 cups to 1 cup a day). <strong>We strongly warn owners against this practice.</strong>
                    </p>
                    <p className="mb-6 leading-relaxed text-red-600 font-medium">
                        Standard maintenance diets are formulated to deliver the minimum required percentages of essential amino acids, vitamins, and minerals at a specific caloric intake. If you cut calories by 30%, you also cut calcium, selenium, and protein by 30%, inducing severe nutrient deficiencies in your pet over time.
                    </p>
                    <p className="mb-6 leading-relaxed">
                        Instead of severe portion restriction, dogs requiring significant weight loss should be transitioned to a therapeutic diet specifically formulated with a lower caloric density but a proportionately higher concentration of essential nutrients.
                    </p>

                    <h2 className="text-2xl mt-10 mb-4">Treat Restrictions: The 10% Rule</h2>
                    <p className="mb-6 leading-relaxed">
                        No matter how complete and balanced the main diet is, excessive treats can rapidly unbalance it. The clinical rule is strict but necessary:
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                        <p className="font-bold text-blue-900 m-0">Treats, table scraps, and chews should never exceed 10% of a dog's total daily caloric intake (MER).</p>
                    </div>
                    <p className="mb-8 leading-relaxed">
                        If a dog requires 1000 calories a day, a maximum of 100 calories should come from non-complete sources. Exceeding this threshold displaces essential nutrients and acts as the primary driver of both obesity and dietary deficiency.
                    </p>
                </article>
            </main>
            <Footer />
        </div>
    );
}
