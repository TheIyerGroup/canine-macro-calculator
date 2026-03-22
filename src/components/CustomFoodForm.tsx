'use client';

import React, { useState } from 'react';
import { FoodProfile } from '../utils/calculations';

interface CustomFoodFormProps {
    onApply: (food: FoodProfile) => void;
}

export default function CustomFoodForm({ onApply }: CustomFoodFormProps) {
    const [proteinPercent, setProteinPercent] = useState<number>(25);
    const [fatPercent, setFatPercent] = useState<number>(15);
    const [fiberPercent, setFiberPercent] = useState<number>(4);
    const [moisturePercent, setMoisturePercent] = useState<number>(10);
    const [calciumPercent, setCalciumPercent] = useState<number>(1.0);
    const [phosphorusPercent, setPhosphorusPercent] = useState<number>(0.8);
    const [kcalValue, setKcalValue] = useState<number>(380);
    const [kcalUnit, setKcalUnit] = useState<'kcal_cup' | 'kcal_kg' | 'kcal_oz'>('kcal_cup');

    const handleApply = () => {
        // Derive a best-fit type from moisture content
        let derivedType: string;
        if (moisturePercent > 50) {
            derivedType = 'fresh_wet';
        } else if (moisturePercent > 15) {
            derivedType = 'wet';
        } else if (moisturePercent < 15 && kcalUnit === 'kcal_cup') {
            derivedType = moisturePercent < 12 ? 'freeze_dried' : 'standard_kibble';
        } else {
            derivedType = 'standard_kibble';
        }

        const customFood: FoodProfile = {
            id: '__custom__',
            brand: 'Custom Food',
            name: 'Manual Label Entry',
            type: derivedType,
            proteinPercent,
            fatPercent,
            fiberPercent,
            moisturePercent,
            calciumPercent,
            phosphorusPercent,
        };

        if (kcalUnit === 'kcal_cup') {
            customFood.kcalPerCup = kcalValue;
            customFood.kcalPerKg = Math.round(kcalValue * 9.5); // approximate
        } else if (kcalUnit === 'kcal_kg') {
            customFood.kcalPerKg = kcalValue;
            customFood.kcalPerCup = Math.round(kcalValue / 9.5);
        } else {
            // kcal_oz — treat as wet
            customFood.kcalPerCan = Math.round(kcalValue * 13); // approx 13oz can
            customFood.ouncesPerCan = 13;
            customFood.kcalPerKg = Math.round(kcalValue * 35.274); // 1 kg ~ 35.274 oz
        }

        onApply(customFood);
    };

    return (
        <div className="mt-4 p-5 border border-blue-200 bg-blue-50/50 rounded-xl space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wide">Enter from Label</h4>
            </div>
            <p className="text-xs text-slate-500 -mt-2">Copy values directly from the Guaranteed Analysis on your food's packaging.</p>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Protein %</label>
                    <input type="number" step="0.1" min="0" max="100" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={proteinPercent} onChange={e => setProteinPercent(parseFloat(e.target.value) || 0)} />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Fat %</label>
                    <input type="number" step="0.1" min="0" max="100" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={fatPercent} onChange={e => setFatPercent(parseFloat(e.target.value) || 0)} />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Fiber %</label>
                    <input type="number" step="0.1" min="0" max="100" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={fiberPercent} onChange={e => setFiberPercent(parseFloat(e.target.value) || 0)} />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Moisture %</label>
                    <input type="number" step="0.1" min="0" max="100" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={moisturePercent} onChange={e => setMoisturePercent(parseFloat(e.target.value) || 0)} />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Calcium % <span className="text-slate-400">(opt.)</span></label>
                    <input type="number" step="0.01" min="0" max="10" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={calciumPercent} onChange={e => setCalciumPercent(parseFloat(e.target.value) || 0)} />
                </div>
                <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Phosphorus % <span className="text-slate-400">(opt.)</span></label>
                    <input type="number" step="0.01" min="0" max="10" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={phosphorusPercent} onChange={e => setPhosphorusPercent(parseFloat(e.target.value) || 0)} />
                </div>
            </div>

            <div className="flex gap-3 items-end">
                <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Caloric Density</label>
                    <input type="number" step="1" min="0" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={kcalValue} onChange={e => setKcalValue(parseFloat(e.target.value) || 0)} />
                </div>
                <div className="w-1/3">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Unit</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white" value={kcalUnit} onChange={e => setKcalUnit(e.target.value as 'kcal_cup' | 'kcal_kg' | 'kcal_oz')}>
                        <option value="kcal_cup">kcal/cup</option>
                        <option value="kcal_kg">kcal/kg</option>
                        <option value="kcal_oz">kcal/oz</option>
                    </select>
                </div>
            </div>

            <button
                onClick={handleApply}
                className="w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
            >
                Apply Custom Food Values
            </button>
        </div>
    );
}
