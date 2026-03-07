import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-slate-200 py-12 bg-white text-center">
            <div className="max-w-4xl mx-auto px-4">

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 text-sm font-medium text-slate-600">
                    <Link href="/" className="hover:text-blue-600 transition-colors">Diet Deficit Calculator</Link>
                    <span className="hidden md:inline text-slate-300">|</span>
                    <Link href="/nutrition-guide" className="hover:text-blue-600 transition-colors">Veterinary Nutrition Guide</Link>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
                    Our core algorithms and nutritional models are developed in consultation with experienced veterinary professionals and grounded in established clinical guidelines. This tool is for educational purposes only and is not a substitute for professional veterinary advice.
                </p>
                <p className="text-slate-400 text-xs">
                    &copy; 2026 The Iyer Group, LLC. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
