export type System = 'imperial' | 'metric';

export interface DogStats {
    ageYears: number;
    weight: number;
    activityLevel: 'low' | 'moderate' | 'high' | 'working';
    isNeutered: boolean;
    breeds: string[];
}

export interface NutritionalNeeds {
    kcal: number;
    proteinMinGrams: number;
    fatMinGrams: number;
    calciumMinGrams: number;
}

export function getWeightInKg(weight: number, system: System): number {
    return system === 'imperial' ? weight * 0.453592 : weight;
}

export function calculateRER(weightKg: number): number {
    return 70 * Math.pow(weightKg, 0.75);
}

export function calculateDER(stats: DogStats, system: System): number {
    const weightKg = getWeightInKg(stats.weight, system);
    const rer = calculateRER(weightKg);

    let multiplier = 1.0;

    if (stats.activityLevel === 'low') {
        multiplier = stats.isNeutered ? 1.4 : 1.6;
    } else if (stats.activityLevel === 'moderate') {
        multiplier = stats.isNeutered ? 1.6 : 1.8;
    } else if (stats.activityLevel === 'high') {
        multiplier = 2.0;
    } else if (stats.activityLevel === 'working') {
        multiplier = 3.0;
    }

    if (stats.ageYears < 1) {
        multiplier = (stats.ageYears < 0.33) ? 3.0 : 2.0;
    } else if (stats.ageYears > 7) {
        multiplier *= 0.85;
    }

    return rer * multiplier;
}

export function calculateBaselineNeeds(stats: DogStats, system: System): NutritionalNeeds {
    const kcal = calculateDER(stats, system);
    const proteinMinGrams = (kcal / 1000) * 45;
    const fatMinGrams = (kcal / 1000) * 13.8;
    const calciumMinGrams = (kcal / 1000) * 1.25;

    return {
        kcal,
        proteinMinGrams,
        fatMinGrams,
        calciumMinGrams
    };
}

export interface FoodProfile {
    id: string;
    brand: string;
    name: string;
    type: string;
    kcalPerCup?: number;
    kcalPerKg?: number;
    kcalPerCan?: number;
    ouncesPerCan?: number;
    proteinPercent: number;
    fatPercent: number;
    fiberPercent: number;
    moisturePercent: number;
    calciumPercent: number;
    phosphorusPercent: number;
}

export type FoodUnit = 'cups' | 'grams' | 'cans' | 'ounces';

export function calculateFoodIntake(food: FoodProfile, volume: number, foodUnit: FoodUnit): NutritionalNeeds {
    let intakeKcal = 0;
    let weightFedGrams = 0;

    if (foodUnit === 'cups' && food.kcalPerCup) {
        intakeKcal = food.kcalPerCup * volume;
        if (food.kcalPerKg && food.kcalPerKg > 0) {
            weightFedGrams = (food.kcalPerCup / food.kcalPerKg) * 1000 * volume;
        } else {
            weightFedGrams = 100 * volume;
        }
    } else if (foodUnit === 'cans' && food.kcalPerCan && food.ouncesPerCan) {
        intakeKcal = food.kcalPerCan * volume;
        weightFedGrams = food.ouncesPerCan * volume * 28.3495; // 1 oz = 28.3495g
    } else if (foodUnit === 'ounces') {
        if (food.kcalPerCan && food.ouncesPerCan) {
            intakeKcal = (food.kcalPerCan / food.ouncesPerCan) * volume;
        } else if (food.kcalPerKg) {
            intakeKcal = (food.kcalPerKg / 1000) * (volume * 28.3495);
        }
        weightFedGrams = volume * 28.3495;
    } else {
        // grams
        weightFedGrams = volume;
        if (food.kcalPerKg) {
            intakeKcal = (food.kcalPerKg / 1000) * volume;
        }
    }

    const proteinMinGrams = weightFedGrams * (food.proteinPercent / 100);
    const fatMinGrams = weightFedGrams * (food.fatPercent / 100);
    const calciumMinGrams = weightFedGrams * (food.calciumPercent / 100);

    return {
        kcal: intakeKcal,
        proteinMinGrams,
        fatMinGrams,
        calciumMinGrams
    };
}

export interface Deficits {
    kcalDeficit: number;
    proteinDeficitGrams: number;
    fatDeficitGrams: number;
    calciumDeficitGrams: number;

    kcalPercent: number;
    proteinPercent: number;
    fatPercent: number;
    calciumPercent: number;
}

export function calculateDeficits(needs: NutritionalNeeds, intake: NutritionalNeeds): Deficits {
    return {
        kcalDeficit: needs.kcal - intake.kcal,
        proteinDeficitGrams: needs.proteinMinGrams - intake.proteinMinGrams,
        fatDeficitGrams: needs.fatMinGrams - intake.fatMinGrams,
        calciumDeficitGrams: needs.calciumMinGrams - intake.calciumMinGrams,

        kcalPercent: (intake.kcal / needs.kcal) * 100,
        proteinPercent: (intake.proteinMinGrams / needs.proteinMinGrams) * 100,
        fatPercent: (intake.fatMinGrams / needs.fatMinGrams) * 100,
        calciumPercent: (intake.calciumMinGrams / needs.calciumMinGrams) * 100,
    };
}
