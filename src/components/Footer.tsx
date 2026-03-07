import React from 'react';

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-slate-200 py-10 text-center">
            <div className="max-w-4xl mx-auto px-4">
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    Our core algorithms and nutritional models are developed in consultation with experienced veterinary professionals and grounded in established clinical guidelines. This tool is for educational purposes only and is not a substitute for professional veterinary advice.
                </p>
                <p className="text-slate-400 text-xs">
                    &copy; 2026 The Iyer Group, LLC. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
