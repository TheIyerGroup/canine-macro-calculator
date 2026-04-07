'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FoodProfile } from '../utils/calculations';

interface FoodSelectProps {
    foods: FoodProfile[];
    selectedId: string;
    onSelect: (id: string) => void;
}

const TYPE_LABELS: Record<string, string> = {
    dry: 'Dry Kibble (Grain-Free)',
    standard_kibble: 'Standard Kibble (Non-Grain-Free)',
    wet: 'Wet / Canned',
    fresh: 'Fresh',
    fresh_wet: 'Fresh Wet (Subscription)',
    frozen_raw: 'Frozen Raw',
    freeze_dried: 'Freeze-Dried / Air-Dried',
};

export default function FoodSelect({ foods, selectedId, onSelect }: FoodSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selectedFood = foods.find(f => f.id === selectedId);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredFoods = foods.filter(f =>
        f.brand.toLowerCase().includes(search.toLowerCase()) ||
        f.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div
                className="w-full bg-white border border-stone-300 rounded-lg py-3 px-4 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
            >
                <span className={selectedFood ? "text-stone-900" : selectedId === '__custom__' ? 'text-amber-700 font-medium' : "text-stone-400"}>
                    {selectedId === '__custom__' ? '✏️ Custom Food (Enter from Label)' : selectedFood ? `${selectedFood.brand} - ${selectedFood.name}` : "Select a dog food..."}
                </span>
                <svg className={`w-5 h-5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-stone-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    <div className="sticky top-0 bg-stone-50 p-2 border-b border-stone-100">
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:outline-none focus:border-amber-500 text-sm"
                            placeholder="Search brand or product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="py-1">
                        {/* Custom Food Option */}
                        <div
                            className={`px-4 py-3 cursor-pointer hover:bg-amber-50 text-sm border-b border-stone-100 flex items-center gap-2 ${selectedId === '__custom__' ? 'bg-amber-100' : ''}`}
                            onClick={() => {
                                onSelect('__custom__');
                                setIsOpen(false);
                                setSearch('');
                            }}
                        >
                            <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            <div className="flex flex-col">
                                <span className="font-semibold text-amber-700">Custom Food (Enter from Label)</span>
                                <span className="text-stone-500 text-xs">Manually enter your food's Guaranteed Analysis</span>
                            </div>
                        </div>

                        {filteredFoods.length > 0 ? (
                            filteredFoods.map(food => (
                                <div
                                    key={food.id}
                                    className={`px-4 py-2 cursor-pointer hover:bg-amber-50 text-sm flex flex-col ${selectedId === food.id ? 'bg-amber-100' : ''}`}
                                    onClick={() => {
                                        onSelect(food.id);
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                >
                                    <span className="font-semibold text-stone-800">{food.brand}</span>
                                    <span className="text-stone-600 truncate">{food.name} <span className="text-stone-400 text-xs ml-1">({TYPE_LABELS[food.type] || food.type})</span></span>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-stone-500 text-center">No foods found.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
