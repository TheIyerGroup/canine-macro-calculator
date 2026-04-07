import React from 'react';
import Link from 'next/link';
import { Calculator, BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <span className="font-extrabold text-lg tracking-tight hidden sm:inline-block">The Iyer Group</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-stone-600">
          <Link href="/" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
            <Calculator className="h-4 w-4 hidden sm:block" />
            <span>Calculator</span>
          </Link>
          <Link href="/nutrition-guide" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
            <BookOpen className="h-4 w-4 hidden sm:block" />
            <span>Nutrition Guide</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
