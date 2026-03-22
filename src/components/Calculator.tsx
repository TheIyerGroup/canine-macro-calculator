'use client';

import React, { useState, useMemo } from 'react';
import FoodSelect from './FoodSelect';
import CustomFoodForm from './CustomFoodForm';
import ResultsDisplay from './ResultsDisplay';
import {
    DogStats,
    System,
    FoodProfile,
    FoodUnit,
    calculateBaselineNeeds,
    calculateFoodIntake,
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
        weight: 50,
        activityLevel: 'moderate',
        isNeutered: true,
        breeds: []
    });

    const [selectedFoodId, setSelectedFoodId] = useState<string>('');
    const [foodVolume, setFoodVolume] = useState<number>(2);
    const [foodUnit, setFoodUnit] = useState<FoodUnit>('cups');
    const [customFood, setCustomFood] = useState<FoodProfile | null>(null);

    const foods = dogFoodsData as FoodProfile[];
    // Resolve the active food: either from the database or custom entry
    const selectedFood = selectedFoodId === '__custom__'
        ? customFood
        : foods.find(f => f.id === selectedFoodId) || null;

    React.useEffect(() => {
        if (!selectedFood) return;

        const isWetLike = ['wet', 'fresh', 'frozen_raw', 'fresh_wet'].includes(selectedFood.type);

        if (isWetLike) {
            if (system === 'imperial' && foodUnit !== 'cans' && foodUnit !== 'ounces') {
                setFoodUnit('cans');
            } else if (system === 'metric' && foodUnit !== 'grams') {
                setFoodUnit('grams');
            }
        } else {
            if (system === 'imperial' && foodUnit !== 'cups') {
                setFoodUnit('cups');
            } else if (system === 'metric' && foodUnit !== 'grams') {
                setFoodUnit('grams');
            }
        }
    }, [selectedFoodId, customFood, system]);

    const handleReset = () => {
        setSystem('imperial');
        setStats({
            ageYears: 3,
            weight: 50,
            activityLevel: 'moderate',
            isNeutered: true,
            breeds: []
        });
        setSelectedFoodId('');
        setFoodVolume(2);
        setFoodUnit('cups');
        setCustomFood(null);
    };

    // Derive results
    const needs = useMemo(() => calculateBaselineNeeds(stats, system), [stats, system]);

    const intake = useMemo(() => {
        if (!selectedFood) return null;
        return calculateFoodIntake(selectedFood, foodVolume, foodUnit);
    }, [selectedFood, foodVolume, foodUnit]);

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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-visible">
            {/* Header & Toggle */}
            <div className="bg-slate-50 p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-t-2xl">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Dietary Assessment</h2>
                    <p className="text-slate-500 text-sm mt-1">Enter your dog's details to calculate exact nutritional needs.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-md text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        Reset Calculator
                    </button>
                    <div className="inline-flex bg-slate-200 rounded-lg p-1">
                        <button
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${system === 'imperial' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
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
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${system === 'metric' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
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
                            <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</div>
                            <h3 className="text-lg font-semibold text-slate-800">Basic Stats</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Age (Years)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                                    value={stats.ageYears}
                                    onChange={(e) => setStats({ ...stats, ageYears: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Weight ({system === 'imperial' ? 'lbs' : 'kg'})</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                                    value={stats.weight}
                                    onChange={(e) => setStats({ ...stats, weight: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Activity Level</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(['low', 'moderate', 'high', 'working'] as const).map(level => (
                                    <label key={level} className={`cursor-pointer border rounded-lg px-3 py-2 text-center text-sm capitalize transition-colors ${stats.activityLevel === level ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
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
                                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                checked={stats.isNeutered}
                                onChange={(e) => setStats({ ...stats, isNeutered: e.target.checked })}
                            />
                            <label htmlFor="neutered" className="ml-2 block text-sm text-slate-700 cursor-pointer">
                                Spayed / Neutered
                            </label>
                        </div>
                    </section>

                    {/* Section 2: Breed Selection */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</div>
                            <h3 className="text-lg font-semibold text-slate-800">Breed Profile</h3>
                        </div>

                        <div className="border border-slate-200 rounded-lg max-h-48 overflow-y-auto p-3 bg-slate-50">
                            {ALL_BREEDS.map(breed => (
                                <label key={breed} className="flex items-center py-1.5 px-2 hover:bg-white rounded cursor-pointer transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                        checked={stats.breeds.includes(breed)}
                                        onChange={() => toggleBreed(breed)}
                                    />
                                    <span className="ml-2 text-sm text-slate-700">{breed}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Section 3: Diet Input */}
                    <section>
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">3</div>
                            <h3 className="text-lg font-semibold text-slate-800">Current Diet</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Select Food Brand/Formula</label>
                                <FoodSelect foods={foods} selectedId={selectedFoodId} onSelect={setSelectedFoodId} />
                            </div>

                            {/* Custom Food Form (dynamically shown) */}
                            {selectedFoodId === '__custom__' && (
                                <CustomFoodForm onApply={(food) => {
                                    setCustomFood(food);
                                }} />
                            )}

                            {/* Volume Input (shown when a DB food or custom food is applied) */}
                            {selectedFood && (
                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Daily Amount</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                                            value={foodVolume}
                                            onChange={(e) => setFoodVolume(parseFloat(e.target.value) || 0)}
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                                        <select
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white"
                                            value={foodUnit}
                                            onChange={(e) => setFoodUnit(e.target.value as FoodUnit)}
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
                    </section>

                </div>

                {/* Right Column: Output & Analysis (Spans 7 cols) */}
                <div className="lg:col-span-7">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-1 h-full min-h-[500px]">
                        <div className="bg-white rounded-lg h-full p-6 shadow-sm border border-slate-100">

                            {!selectedFood ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                                    <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    <p className="text-lg font-medium text-slate-500 mb-2">Awaiting Diet Selection</p>
                                    <p className="text-sm max-w-sm">Please complete the setup steps on the left to reveal your dog's custom macro analysis.</p>
                                </div>
                            ) : (
                                <>
                                    {intake && deficits && (
                                        <ResultsDisplay needs={needs} intake={intake} deficits={deficits} />
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
