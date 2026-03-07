const fs = require('fs');
const path = require('path');

const brands = [
    { brand: "Purina Pro Plan", type: "dry", flavors: ["Chicken", "Beef", "Salmon", "Lamb", "Turkey"], ages: ["Puppy", "Adult", "Senior 7+", "Weight Management", "Sport 30/20"], p: 26, f: 16, c: 1.0, kCup: 387, kKg: 3824 },
    { brand: "Purina Pro Plan", type: "wet", flavors: ["Chicken Entree", "Beef Entree", "Salmon Entree", "Turkey Entree"], ages: ["Puppy", "Adult", "Senior"], p: 10, f: 6, c: 0.25, kCan: 415, oz: 13.0, kKg: 1100 },
    { brand: "Royal Canin", type: "dry", flavors: ["Medium", "Large", "Mini", "Giant", "Small"], ages: ["Puppy", "Adult", "Aging 8+"], p: 24, f: 14, c: 0.85, kCup: 350, kKg: 3700 },
    { brand: "Royal Canin", type: "wet", flavors: ["Beauty Adult", "Digest Sensitive", "Weight Care", "Puppy", "Aging 12+"], ages: ["All"], p: 9, f: 5.5, c: 0.22, kCan: 386, oz: 13.5, kKg: 1002 },
    { brand: "Hill's Science Diet", type: "dry", flavors: ["Chicken & Barley", "Lamb & Rice", "Beef & Barley", "Chicken, Brown Rice & Oats"], ages: ["Puppy", "Adult 1-6", "Adult 7+"], p: 21, f: 13, c: 0.75, kCup: 365, kKg: 3650 },
    { brand: "Hill's Science Diet", type: "wet", flavors: ["Chicken & Barley Entree", "Beef & Barley Entree", "Turkey & Barley Entree"], ages: ["Puppy", "Adult", "Senior"], p: 6, f: 4, c: 0.2, kCan: 400, oz: 13.0, kKg: 1080 },
    { brand: "Orijen", type: "dry", flavors: ["Original", "Six Fish", "Regional Red", "Fit & Trim"], ages: ["Puppy", "Adult", "Senior"], p: 38, f: 18, c: 1.4, kCup: 470, kKg: 3940 },
    { brand: "Blue Buffalo", type: "dry", flavors: ["Chicken & Brown Rice", "Lamb & Brown Rice", "Fish & Sweet Potato"], ages: ["Puppy", "Adult", "Senior", "Healthy Weight"], p: 24, f: 14, c: 1.0, kCup: 378, kKg: 3618 },
    { brand: "Blue Buffalo Wilderness", type: "wet", flavors: ["Chicken Trail", "Beef Trail", "Turkey Trail", "Salmon Trail"], ages: ["Adult", "Puppy"], p: 10, f: 7, c: 0.3, kCan: 450, oz: 12.5, kKg: 1200 },
    { brand: "Wellness CORE", type: "dry", flavors: ["Original", "Ocean", "Wild Game", "Reduced Fat"], ages: ["Puppy", "Adult", "Senior"], p: 34, f: 16, c: 2.0, kCup: 417, kKg: 3698 },
    { brand: "Wellness", type: "wet", flavors: ["Chicken & Sweet Potato", "Turkey & Sweet Potato", "Whitefish & Sweet Potato", "Venison & Sweet Potato"], ages: ["Adult", "Puppy", "Senior"], p: 8, f: 5, c: 0.25, kCan: 350, oz: 12.5, kKg: 950 },
    { brand: "Taste of the Wild", type: "dry", flavors: ["High Prairie", "Pacific Stream", "Sierra Mountain", "Wetlands"], ages: ["Puppy", "Adult"], p: 32, f: 18, c: 2.1, kCup: 422, kKg: 3719 },
    { brand: "Taste of the Wild", type: "wet", flavors: ["High Prairie Stew", "Pacific Stream Stew", "Sierra Mountain Stew"], ages: ["Adult"], p: 8, f: 4.5, c: 0.25, kCan: 320, oz: 13.2, kKg: 850 },
    { brand: "Merrick", type: "dry", flavors: ["Real Texas Beef", "Real Chicken", "Real Salmon", "Real Lamb"], ages: ["Puppy", "Adult", "Senior"], p: 34, f: 15, c: 1.2, kCup: 390, kKg: 3650 },
    { brand: "Merrick", type: "wet", flavors: ["Grammy's Pot Pie", "Cowboy Cookout", "Thanksgiving Day Dinner"], ages: ["Adult"], p: 9, f: 4, c: 0.25, kCan: 350, oz: 12.7, kKg: 950 },
    { brand: "Iams", type: "dry", flavors: ["ProActive Minichunks", "ProActive Large Breed", "ProActive Healthy Weight"], ages: ["Puppy", "Adult", "Mature Adult"], p: 25, f: 14, c: 1.0, kCup: 390, kKg: 3680 },
];

let idCounter = 1;
const results = [];

brands.forEach(b => {
    b.flavors.forEach(flavor => {
        b.ages.forEach(age => {

            const flavorMod = (flavor.length % 5) * 0.5; // slight variance
            const ageModFiber = age.includes("Senior") || age.includes("Weight") ? 2.0 : 0;
            const ageModFat = age.includes("Senior") || age.includes("Weight") ? -3.0 : (age === "Puppy" ? 2.0 : 0);
            const ageModPro = age === "Puppy" ? 2.0 : 0;

            const name = `${age} ${flavor} ${b.type === "dry" ? "Recipe" : "Formula"}`;

            const item = {
                id: (idCounter++).toString(),
                brand: b.brand,
                name: name,
                type: b.type,
                proteinPercent: parseFloat((b.p + ageModPro + flavorMod * 0.2).toFixed(1)),
                fatPercent: parseFloat((b.f + ageModFat - flavorMod * 0.2).toFixed(1)),
                fiberPercent: parseFloat((b.type === "dry" ? 3.5 : 1.5) + ageModFiber).toFixed(1) * 1,
                moisturePercent: b.type === "dry" ? 10.0 : 78.0,
                calciumPercent: parseFloat((b.c + (age === "Puppy" ? 0.2 : 0)).toFixed(2)),
                phosphorusPercent: parseFloat((b.c * 0.8).toFixed(2)),
            };

            if (b.type === 'dry') {
                item.kcalPerCup = Math.round(b.kCup + (ageModFat * 10) + flavorMod * 5);
                item.kcalPerKg = Math.round(b.kKg + (ageModFat * 50) + flavorMod * 10);
            } else {
                item.kcalPerCan = Math.round(b.kCan + (ageModFat * 5) + flavorMod * 2);
                item.ouncesPerCan = b.oz;
                item.kcalPerKg = Math.round(b.kKg + (ageModFat * 20));
            }

            results.push(item);
        });
    });
});

const outPath = path.join(__dirname, '..', 'src', 'data', 'dog-foods.json');
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
console.log(`Generated ${results.length} foods to ${outPath}`);
