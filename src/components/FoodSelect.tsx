'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FoodProfile } from '../utils/calculations';

interface FoodSelectProps {
    foods: FoodProfile[];
    selectedId: string;
    onSelect: (id: string) => void;
}

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
                className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 cursor-pointer flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={0}
            >
                <span className={selectedFood ? "text-slate-900" : "text-slate-400"}>
                    {selectedFood ? `${selectedFood.brand} - ${selectedFood.name}` : "Select a dog food..."}
                </span>
                <svg className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    <div className="sticky top-0 bg-slate-50 p-2 border-b border-slate-100">
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                            placeholder="Search brand or product..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <div className="py-1">
                        {filteredFoods.length > 0 ? (
                            filteredFoods.map(food => (
                                <div
                                    key={food.id}
                                    className={`px-4 py-2 cursor-pointer hover:bg-blue-50 text-sm flex flex-col ${selectedId === food.id ? 'bg-blue-100' : ''}`}
                                    onClick={() => {
                                        onSelect(food.id);
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                >
                                    <span className="font-semibold text-slate-800">{food.brand}</span>
                                    <span className="text-slate-600 truncate">{food.name} <span className="text-slate-400 text-xs ml-1">({food.type})</span></span>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-slate-500 text-center">No foods found.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
