'use client';

import React from 'react';
import { NutritionalNeeds, Deficits } from '../utils/calculations';

interface ResultsDisplayProps {
    needs: NutritionalNeeds;
    intake: NutritionalNeeds;
    deficits: Deficits;
}

export default function ResultsDisplay({ needs, intake, deficits }: ResultsDisplayProps) {

    const StatCard = ({ label, need, provided, deficitVal, pct, unit }: { label: string, need: number, provided: number, deficitVal: number, pct: number, unit: string }) => {
        const isDeficient = deficitVal > 0;

        // We only warn if deficit is substantial, say < 95% of needs.
        const hasWarning = pct < 95;
        const hasExcess = pct > 120; // Some excess might be fine, but let's highlight large excesses differently later if needed.

        return (
            <div className={`p-5 rounded-xl border ${hasWarning ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'} transition-all`}>
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-slate-700 capitalize">{label}</h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${hasWarning ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {Math.round(pct)}% Met
                    </span>
                </div>

                <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Target Minimim:</span>
                        <span className="font-medium text-slate-800">{Math.round(need)} {unit}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Diet Provides:</span>
                        <span className="font-medium text-slate-800">{Math.round(provided)} {unit}</span>
                    </div>
                </div>

                <div className={`mt-4 pt-3 border-t ${hasWarning ? 'border-red-200' : 'border-emerald-200'} text-sm font-medium`}>
                    {isDeficient ? (
                        <div className="flex items-center text-red-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            Deficit: {Math.abs(Math.round(deficitVal))} {unit}
                        </div>
                    ) : (
                        <div className="flex items-center text-emerald-600">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Surplus: {Math.abs(Math.round(deficitVal))} {unit}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Nutritional Gap Analysis</h3>

            {/* Calories Overview */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h4 className="text-lg font-semibold text-slate-800">Daily Calorie Balance</h4>
                        <p className="text-slate-500 text-sm mt-1">Comparing estimated energy requirement (DER) to food intake.</p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="text-center">
                            <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Required</div>
                            <div className="text-xl font-bold text-slate-800">{Math.round(needs.kcal)} <span className="text-sm font-normal text-slate-500">kcal</span></div>
                        </div>
                        <div className="text-slate-300 text-2xl font-light">|</div>
                        <div className="text-center">
                            <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Provided</div>
                            <div className={`text-xl font-bold ${deficits.kcalPercent < 90 ? 'text-orange-600' : deficits.kcalPercent > 110 ? 'text-orange-600' : 'text-emerald-600'}`}>
                                {Math.round(intake.kcal)} <span className="text-sm font-normal opacity-70">kcal</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Macros Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Protein"
                    need={needs.proteinMinGrams}
                    provided={intake.proteinMinGrams}
                    deficitVal={deficits.proteinDeficitGrams}
                    pct={deficits.proteinPercent}
                    unit="g"
                />
                <StatCard
                    label="Fat"
                    need={needs.fatMinGrams}
                    provided={intake.fatMinGrams}
                    deficitVal={deficits.fatDeficitGrams}
                    pct={deficits.fatPercent}
                    unit="g"
                />
                <StatCard
                    label="Calcium"
                    need={needs.calciumMinGrams}
                    provided={intake.calciumMinGrams}
                    deficitVal={deficits.calciumDeficitGrams}
                    pct={deficits.calciumPercent}
                    unit="g"
                />
            </div>
        </div>
    );
}
