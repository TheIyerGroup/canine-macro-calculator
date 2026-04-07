'use client';

import React from 'react';

export default function Waitlist() {
    return (
        <section className="mt-12 mb-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Missing Critical Nutrients?
            </h2>
            <p className="text-slate-700 max-w-2xl mx-auto mb-6 leading-relaxed">
                The Iyer Group, LLC. is currently working on food-based solutions to seamlessly fill these exact microbiome and nutritional deficiencies. Enter your email to join the waitlist for the upcoming <strong>Agentic Wellness Automator</strong>—totally optional, your calculator results above are always free and unlocked!
            </p>
            <form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                onSubmit={(e) => { e.preventDefault(); alert("Thanks for joining the waitlist!"); }}
            >
                <input
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 placeholder-slate-400"
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm whitespace-nowrap"
                >
                    Join Waitlist
                </button>
            </form>
        </section>
    );
}
