'use client';

import React, { useState, useEffect } from 'react';
import { NutritionalNeeds, Deficits, FoodProfile, FoodEntry, DogStats } from '../utils/calculations';

interface ResultsDisplayProps {
    needs: NutritionalNeeds;
    intake: NutritionalNeeds;
    deficits: Deficits;
    foodEntries: FoodEntry[];
    dbFoods: FoodProfile[];
    stats: DogStats;
}

export default function ResultsDisplay({ needs, intake, deficits, foodEntries, dbFoods, stats }: ResultsDisplayProps) {

    const [microbiomeReport, setMicrobiomeReport] = useState<any>(null);
    const [loadingReport, setLoadingReport] = useState(false);

    useEffect(() => {
        const fetchReport = async () => {
            setLoadingReport(true);
            setMicrobiomeReport(null);
            try {
                const bodyPayload = {
                    foodEntries: foodEntries.map(e => ({
                        volume: e.foodVolume,
                        unit: e.foodUnit,
                        profile: e.selectedFoodId === '__custom__' ? e.customFood : dbFoods.find(f => f.id === e.selectedFoodId)
                    })).filter(e => e.profile),
                    stats 
                };

                const res = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyPayload)
                });
                if (res.ok) {
                    const data = await res.json();
                    setMicrobiomeReport(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingReport(false);
            }
        };
        fetchReport();
    }, [foodEntries, dbFoods, stats]);


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

            {/* Microbiome Report */}
            <div className="mt-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-2">Microbiome & Gut Health Report</h3>
                
                {loadingReport ? (
                    <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-slate-600">Analyzing diet against 6 microbiome wellness pillars...</p>
                    </div>
                ) : microbiomeReport ? (
                    <div className="space-y-6">
                        {microbiomeReport.hasDeficiencies && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">Critical Missing Nutrients</h3>
                                        <p className="mt-2 text-sm text-red-700">{microbiomeReport.summary}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {microbiomeReport.pillars?.map((pillar: any, idx: number) => {
                                const isMissing = pillar.status === 'missing' || pillar.status === 'insufficient';
                                return (
                                    <div key={idx} className={`p-4 rounded-xl border ${isMissing ? 'bg-red-50/50 border-red-200' : 'bg-emerald-50/50 border-emerald-200'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-slate-800">{pillar.name}</h4>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${isMissing ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {pillar.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-2">{pillar.analysis}</p>
                                        {pillar.criticalWarning && (
                                            <p className="text-xs font-medium text-red-600 flex items-start mt-2 pt-2 border-t border-red-100">
                                                <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                {pillar.criticalWarning}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
