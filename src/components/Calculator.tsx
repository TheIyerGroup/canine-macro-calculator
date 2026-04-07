'use client';

import React, { useState, useMemo } from 'react';
import { Plus, X, ClipboardList } from 'lucide-react';
import FoodSelect from './FoodSelect';
import CustomFoodForm from './CustomFoodForm';
import ResultsDisplay from './ResultsDisplay';
import {
    DogStats,
    System,
    FoodProfile,
    FoodUnit,
    FoodEntry,
    calculateBaselineNeeds,
    calculateCumulativeIntake,
    calculateDeficits
} from '../utils/calculations';
import dogFoodsData from '../data/dog-foods.json';

const ALL_BREEDS = [
    "Affenpinscher", "Afghan Hound", "Airedale Terrier", "Akita", "Alaskan Malamute", "American Bulldog",
    "American English Coonhound", "American Eskimo Dog", "American Foxhound", "American Hairless Terrier",
    "American Leopard Hound", "American Staffordshire Terrier", "American Water Spaniel", "Anatolian Shepherd Dog",
    "Appenzeller Sennenhund", "Australian Cattle Dog", "Australian Kelpie", "Australian Shepherd", "Australian Terrier",
    "Azawakh", "Barbet", "Basenji", "Basset Fauve de Bretagne", "Basset Hound", "Beagle", "Bearded Collie", "Beauceron",
    "Bedlington Terrier", "Belgian Laekenois", "Belgian Malinois", "Belgian Sheepdog", "Belgian Tervuren",
    "Bergamasco Sheepdog", "Berger Picard", "Bernese Mountain Dog", "Bichon Frise", "Biewer Terrier",
    "Black and Tan Coonhound", "Black Russian Terrier", "Bloodhound", "Bluetick Coonhound", "Boerboel",
    "Bohemian Shepherd", "Bolognese", "Border Collie", "Border Terrier", "Borzoi", "Boston Terrier",
    "Bouvier des Flandres", "Boxer", "Boykin Spaniel", "Bracco Italiano", "Braque du Bourbonnais",
    "Braque Francais Pyrenean", "Briard", "Brittany", "Broholmer", "Brussels Griffon", "Bull Terrier", "Bulldog",
    "Bullmastiff", "Cairn Terrier", "Canaan Dog", "Cane Corso", "Cardigan Welsh Corgi", "Carolina Dog",
    "Catahoula Leopard Dog", "Caucasian Shepherd Dog", "Cavalier King Charles Spaniel", "Central Asian Shepherd Dog",
    "Cesky Terrier", "Chesapeake Bay Retriever", "Chihuahua", "Chinese Crested", "Chinese Shar-Pei", "Chinook",
    "Chow Chow", "Cirneco dell'Etna", "Clumber Spaniel", "Cocker Spaniel", "Collie", "Coton de Tulear",
    "Croatian Sheepdog", "Curly-Coated Retriever", "Czechoslovakian Vlcak", "Dachshund", "Dalmatian",
    "Dandie Dinmont Terrier", "Danish-Swedish Farmdog", "Doberman Pinscher", "Dogo Argentino", "Dogue de Bordeaux",
    "Drentsche Patrijshond", "Drever", "Dutch Shepherd", "English Cocker Spaniel", "English Foxhound", "English Setter",
    "English Springer Spaniel", "English Toy Spaniel", "Entlebucher Mountain Dog", "Estrela Mountain Dog", "Eurasier",
    "Field Spaniel", "Finnish Lapphund", "Finnish Spitz", "Flat-Coated Retriever", "French Bulldog", "French Spaniel",
    "German Longhaired Pointer", "German Pinscher", "German Shepherd Dog", "German Shorthaired Pointer", "German Spitz",
    "German Wirehaired Pointer", "Giant Schnauzer", "Glen of Imaal Terrier", "Golden Retriever", "Gordon Setter",
    "Grand Basset Griffon Vendeen", "Great Dane", "Great Pyrenees", "Greater Swiss Mountain Dog", "Greyhound",
    "Hamiltonstovare", "Hanoverian Scenthound", "Harrier", "Havanese", "Hokkaido", "Hovawart", "Ibizan Hound",
    "Icelandic Sheepdog", "Irish Red and White Setter", "Irish Setter", "Irish Terrier", "Irish Water Spaniel",
    "Irish Wolfhound", "Italian Greyhound", "Jack Russell Terrier", "Japanese Akitainu", "Japanese Chin",
    "Japanese Spitz", "Japanese Terrier", "Jindo", "Kai Ken", "Karelian Bear Dog", "Keeshond", "Kerry Blue Terrier",
    "Kishu Ken", "Kromfohrlander", "Kuvasz", "Labrador Retriever", "Lagotto Romagnolo", "Lakeland Terrier",
    "Lancashire Heeler", "Leonberger", "Lhasa Apso", "Lowchen", "Maltese", "Manchester Terrier", "Mastiff",
    "Miniature American Shepherd", "Miniature Bull Terrier", "Miniature Pinscher", "Miniature Schnauzer",
    "Mountain Cur", "Mudi", "Neapolitan Mastiff", "Nederlandse Kooikerhondje", "Newfoundland", "Norfolk Terrier",
    "Norrbottenspets", "Norwegian Buhund", "Norwegian Elkhound", "Norwegian Lundehund", "Norwich Terrier",
    "Nova Scotia Duck Tolling Retriever", "Old English Sheepdog", "Otterhound", "Papillon", "Parson Russell Terrier",
    "Pekingese", "Pembroke Welsh Corgi", "Perro de Presa Canario", "Peruvian Inca Orchid", "Petit Basset Griffon Vendeen",
    "Pharaoh Hound", "Plott Hound", "Pointer", "Polish Lowland Sheepdog", "Pomeranian", "Poodle", "Portuguese Podengo",
    "Portuguese Podengo Pequeno", "Portuguese Pointer", "Portuguese Sheepdog", "Portuguese Water Dog", "Porcelaine",
    "Pudelpointer", "Pug", "Puli", "Pumi", "Pyrenean Mastiff", "Pyrenean Shepherd", "Rafeiro do Alentejo",
    "Rat Terrier", "Redbone Coonhound", "Rhodesian Ridgeback", "Romanian Mioritic Shepherd Dog", "Rottweiler",
    "Russell Terrier", "Russian Toy", "Russian Tsvetnaya Bolonka", "Saint Bernard", "Saluki", "Samoyed", "Schapendoes",
    "Schipperke", "Scottish Deerhound", "Scottish Terrier", "Sealyham Terrier", "Segugio Italiano", "Shetland Sheepdog",
    "Shiba Inu", "Shih Tzu", "Shikoku", "Siberian Husky", "Silky Terrier", "Skye Terrier", "Sloughi",
    "Slovak Rough-Haired Pointer", "Slovensky Cuvac", "Slovensky Kopov", "Small Munsterlander", "Smooth Fox Terrier",
    "Soft Coated Wheaten Terrier", "Spanish Mastiff", "Spanish Water Dog", "Spinone Italiano", "Stabyhoun",
    "Staffordshire Bull Terrier", "Standard Schnauzer", "Sussex Spaniel", "Swedish Lapphund", "Swedish Vallhund",
    "Taiwan Dog", "Teddy Roosevelt Terrier", "Thai Ridgeback", "Tibetan Mastiff", "Tibetan Spaniel", "Tibetan Terrier",
    "Tornjak", "Tosa", "Treeing Tennessee Brindle", "Treeing Walker Coonhound", "Vizsla", "Volpino Italiano",
    "Weimaraner", "Welsh Springer Spaniel", "Welsh Terrier", "West Highland White Terrier", "Whippet", "Wire Fox Terrier",
    "Wirehaired Pointing Griffon", "Wirehaired Vizsla", "Working Kelpie", "Xoloitzcuintli", "Yakutian Laika",
    "Yorkshire Terrier", "Unknown/Mutt"
].sort();

export default function Calculator() {
    const [system, setSystem] = useState<System>('imperial');

    const [stats, setStats] = useState<DogStats>({
        ageYears: 3,
        ageMonths: 0,
        weight: 50,
        activityLevel: 'moderate',
        behaviorLevel: 'calm',
        medications: 'none',
        isNeutered: true,
        breeds: []
    });

    const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([{
        selectedFoodId: '',
        foodVolume: 2,
        foodUnit: 'cups',
        customFood: null
    }]);

    const foods = dogFoodsData as FoodProfile[];

    const updateFoodEntry = (index: number, updates: Partial<FoodEntry>) => {
        setFoodEntries(prev => {
            const next = [...prev];
            const current = next[index];
            const updated = { ...current, ...updates };
            
            // Auto switch unit if food changed
            if (updates.selectedFoodId !== undefined) {
                const food = updates.selectedFoodId === '__custom__' ? updated.customFood : foods.find(f => f.id === updates.selectedFoodId);
                if (food) {
                    const isWetLike = ['wet', 'fresh', 'frozen_raw', 'fresh_wet'].includes(food.type);
                    if (isWetLike && system === 'imperial') updated.foodUnit = 'cans';
                    else if (isWetLike && system === 'metric') updated.foodUnit = 'grams';
                    else if (!isWetLike && system === 'imperial') updated.foodUnit = 'cups';
                    else if (!isWetLike && system === 'metric') updated.foodUnit = 'grams';
                }
            }
            
            next[index] = updated;
            return next;
        });
    };

    const addFoodEntry = () => {
        setFoodEntries(prev => [...prev, { selectedFoodId: '', foodVolume: 2, foodUnit: system === 'metric' ? 'grams' : 'cups', customFood: null }]);
    };

    const removeFoodEntry = (index: number) => {
        setFoodEntries(prev => prev.filter((_, i) => i !== index));
    };

    React.useEffect(() => {
        // Enforce system change units
        setFoodEntries(prev => prev.map(e => {
            const isWetLike = e.selectedFoodId && (e.selectedFoodId === '__custom__' ? e.customFood?.type : foods.find(f => f.id === e.selectedFoodId)?.type);
            let unit = e.foodUnit;
            if (['wet', 'fresh', 'frozen_raw', 'fresh_wet'].includes(isWetLike as string)) {
                if (system === 'imperial' && unit === 'grams') unit = 'cans';
                if (system === 'metric' && ['cups', 'cans', 'ounces'].includes(unit)) unit = 'grams';
            } else {
                if (system === 'imperial' && unit === 'grams') unit = 'cups';
                if (system === 'metric' && ['cups', 'cans', 'ounces'].includes(unit)) unit = 'grams';
            }
            return { ...e, foodUnit: unit };
        }));
    }, [system, foods]);

    const handleReset = () => {
        setSystem('imperial');
        setStats({
            ageYears: 3,
            ageMonths: 0,
            weight: 50,
            activityLevel: 'moderate',
            behaviorLevel: 'calm',
            medications: 'none',
            isNeutered: true,
            breeds: []
        });
        setFoodEntries([{ selectedFoodId: '', foodVolume: 2, foodUnit: 'cups', customFood: null }]);
    };

    // Derive results
    const needs = useMemo(() => calculateBaselineNeeds(stats, system), [stats, system]);

    const intake = useMemo(() => {
        if (!foodEntries.some(e => e.selectedFoodId)) return null;
        return calculateCumulativeIntake(foodEntries, foods);
    }, [foodEntries, foods]);

    const deficits = useMemo(() => {
        if (!needs || !intake) return null;
        return calculateDeficits(needs, intake);
    }, [needs, intake]);

    const toggleBreed = (breed: string) => {
        setStats(prev => {
            // If choosing "Unknown/Mutt", clear others, or if others chosen, uncheck Unknown
            if (breed === "Unknown/Mutt") {
                return prev.breeds.includes(breed) ? { ...prev, breeds: [] } : { ...prev, breeds: [breed] };
            } else {
                const withoutUnknown = prev.breeds.filter(b => b !== "Unknown/Mutt");
                if (withoutUnknown.includes(breed)) {
                    return { ...prev, breeds: withoutUnknown.filter(b => b !== breed) };
                } else {
                    return { ...prev, breeds: [...withoutUnknown, breed] };
                }
            }
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-visible">
            {/* Header & Toggle */}
            <div className="bg-stone-50 p-6 border-b border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-t-2xl">
                <div>
                    <h2 className="text-2xl font-bold text-stone-800">Dietary Assessment</h2>
                    <p className="text-stone-500 text-sm mt-1">Enter your dog's details to calculate exact nutritional needs.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-md text-sm font-medium border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                        Reset Calculator
                    </button>
                    <div className="inline-flex bg-stone-200 rounded-lg p-1">
                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${system === 'imperial' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
                            onClick={() => {
                                if (system !== 'imperial') {
                                    setSystem('imperial');
                                    // rough conversion: 1 kg = 2.204 lbs
                                    setStats(s => ({ ...s, weight: Math.round(s.weight * 2.20462) }));
                                }
                            }}
                        >
                            Imperial (lbs, cups)
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${system === 'metric' ? 'bg-white text-amber-600 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}
                            onClick={() => {
                                if (system !== 'metric') {
                                    setSystem('metric');
                                    // rough conversion: 1 lb = 0.453 kg
                                    setStats(s => ({ ...s, weight: Math.round(s.weight * 0.453592) }));
                                }
                            }}
                        >
                            Metric (kg, g)
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left Column: Input Form (Spans 5 cols) */}
                <div className="lg:col-span-5 space-y-8">

                    {/* Section 1: Basic Stats */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</div>
                            <h3 className="text-lg font-semibold text-stone-800">Basic Stats</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Age</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-full pl-3 pr-8 py-2 border border-stone-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 shadow-sm transition-colors"
                                                value={stats.ageYears}
                                                onChange={(e) => setStats({ ...stats, ageYears: parseInt(e.target.value) || 0 })}
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="text-stone-400 text-xs">Yrs</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="0"
                                                max="11"
                                                className="w-full pl-3 pr-8 py-2 border border-stone-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 shadow-sm transition-colors"
                                                value={stats.ageMonths}
                                                onChange={(e) => setStats({ ...stats, ageMonths: parseInt(e.target.value) || 0 })}
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="text-stone-400 text-xs">Mos</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Weight ({system === 'imperial' ? 'lbs' : 'kg'})</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 shadow-sm transition-colors"
                                    value={stats.weight}
                                    onChange={(e) => setStats({ ...stats, weight: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-stone-700 mb-2">Activity Level</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(['low', 'moderate', 'high', 'working'] as const).map(level => (
                                    <label key={level} className={`cursor-pointer border rounded-lg px-3 py-2 text-center text-sm capitalize transition-colors ${stats.activityLevel === level ? 'bg-amber-50 border-amber-500 text-amber-700 font-medium' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
                                        <input
                                            type="radio"
                                            name="activity"
                                            className="hidden"
                                            checked={stats.activityLevel === level}
                                            onChange={() => setStats({ ...stats, activityLevel: level })}
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 flex items-center">
                            <input
                                type="checkbox"
                                id="neutered"
                                className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                                checked={stats.isNeutered}
                                onChange={(e) => setStats({ ...stats, isNeutered: e.target.checked })}
                            />
                            <label htmlFor="neutered" className="ml-2 block text-sm text-stone-700 cursor-pointer">
                                Spayed / Neutered
                            </label>
                        </div>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Behavior / Stress Level</label>
                                <select
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
                                    value={stats.behaviorLevel}
                                    onChange={(e) => setStats({ ...stats, behaviorLevel: e.target.value as any })}
                                >
                                    <option value="calm">Calm</option>
                                    <option value="anxious">Anxious</option>
                                    <option value="aggressive">Aggressive</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-700 mb-1">Recent Medications</label>
                                <select
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white"
                                    value={stats.medications}
                                    onChange={(e) => setStats({ ...stats, medications: e.target.value as any })}
                                >
                                    <option value="none">None</option>
                                    <option value="metronidazole">Metronidazole</option>
                                    <option value="tylosin">Tylosin</option>
                                    <option value="other_antibiotics">Other Antibiotics</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Breed Selection */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</div>
                            <h3 className="text-lg font-semibold text-stone-800">Breed Profile</h3>
                        </div>

                        <div className="border border-stone-200 rounded-lg max-h-48 overflow-y-auto p-3 bg-stone-50">
                            {ALL_BREEDS.map(breed => (
                                <label key={breed} className="flex items-center py-1.5 px-2 hover:bg-white rounded cursor-pointer transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                                        checked={stats.breeds.includes(breed)}
                                        onChange={() => toggleBreed(breed)}
                                    />
                                    <span className="ml-2 text-sm text-stone-700">{breed}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Section 3: Diet Input */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="bg-amber-100 text-amber-700 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">3</div>
                                <h3 className="text-lg font-semibold text-stone-800">Current Diet</h3>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {foodEntries.map((entry, index) => {
                                const selectedFood = entry.selectedFoodId === '__custom__' ? entry.customFood : foods.find(f => f.id === entry.selectedFoodId);
                                
                                return (
                                <div key={index} className="p-4 border border-stone-200 rounded-xl bg-stone-50 relative">
                                    {foodEntries.length > 1 && (
                                        <button 
                                            onClick={() => removeFoodEntry(index)}
                                            className="absolute top-3 right-3 text-stone-400 hover:text-red-500 transition-colors"
                                            title="Remove food"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">Select Food Brand/Formula {index > 0 ? '(Base or Topper)' : ''}</label>
                                            <FoodSelect foods={foods} selectedId={entry.selectedFoodId} onSelect={(id) => updateFoodEntry(index, { selectedFoodId: id })} />
                                        </div>

                                        {entry.selectedFoodId === '__custom__' && (
                                            <CustomFoodForm onApply={(food) => {
                                                updateFoodEntry(index, { customFood: food });
                                            }} />
                                        )}

                                        {entry.selectedFoodId && (
                                            <div className="flex gap-3">
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">Daily Amount</label>
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        min="0"
                                                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 shadow-sm transition-colors"
                                                        value={entry.foodVolume}
                                                        onChange={(e) => updateFoodEntry(index, { foodVolume: parseFloat(e.target.value) || 0 })}
                                                    />
                                                </div>
                                                <div className="w-1/3">
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">Unit</label>
                                                    <select
                                                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 shadow-sm transition-colors bg-white"
                                                        value={entry.foodUnit}
                                                        onChange={(e) => updateFoodEntry(index, { foodUnit: e.target.value as FoodUnit })}
                                                    >
                                                        {(['wet', 'fresh', 'frozen_raw', 'fresh_wet'].includes(selectedFood?.type ?? '')) ? (
                                                            system === 'imperial' ? (
                                                                <>
                                                                    <option value="cans">Cans</option>
                                                                    <option value="ounces">Ounces</option>
                                                                </>
                                                            ) : (
                                                                <option value="grams">Grams</option>
                                                            )
                                                        ) : (
                                                            system === 'imperial' ? (
                                                                <option value="cups">Cups</option>
                                                            ) : (
                                                                <option value="grams">Grams</option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )})}
                            
                            <button
                                onClick={addFoodEntry}
                                className="w-full py-3 border-2 border-dashed border-amber-200 text-amber-600 rounded-xl font-medium hover:bg-amber-50 hover:border-amber-300 transition-colors flex items-center justify-center"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Another Food / Topper
                            </button>
                        </div>
                    </section>

                </div>

                {/* Right Column: Output & Analysis (Spans 7 cols) */}
                <div className="lg:col-span-7">
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-1 h-full min-h-[500px]">
                        <div className="bg-white rounded-lg h-full p-6 shadow-sm border border-stone-100">

                            {!foodEntries.some(e => e.selectedFoodId) ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-400">
                                    <ClipboardList className="w-16 h-16 mb-4 text-stone-300" strokeWidth={1} />
                                    <p className="text-lg font-medium text-stone-500 mb-2">Awaiting Diet Selection</p>
                                    <p className="text-sm max-w-sm">Please complete the setup steps on the left to reveal your dog's custom macro analysis.</p>
                                </div>
                            ) : (
                                <>
                                    {intake && deficits && (
                                        <ResultsDisplay 
                                            needs={needs} 
                                            intake={intake} 
                                            deficits={deficits} 
                                            foodEntries={foodEntries}
                                            dbFoods={foods}
                                            stats={stats}
                                        />
                                    )}
                                </>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
