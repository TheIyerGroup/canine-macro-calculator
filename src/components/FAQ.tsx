import React from 'react';

const faqs = [
    {
        question: "What are the essential macronutrients for dogs?",
        answer: "Dogs require a balance of proteins, fats, and carbohydrates. Protein provides essential amino acids for muscle and tissue repair. Fats supply dense energy and support cell structure and nutrient absorption. While carbohydrates are not strictly essential, they provide an accessible energy source and valuable fiber for digestive health."
    },
    {
        question: "How do I know if my dog's diet has a nutritional deficit?",
        answer: "Common signs of a dietary deficit include a dull coat, dry or flaky skin, lethargy, unexpected weight loss or gain, frequent gastrointestinal issues, and poor muscle tone. Our deficit calculator can help you estimate invisible gaps in essential nutrients like calcium and protein based on your chosen food."
    },
    {
        question: "Why does my dog's breed and size matter for nutrition?",
        answer: "Different breeds and sizes have unique metabolic rates. Large and giant breeds require carefully controlled calcium and phosphorus levels during growth to prevent joint issues. Small breeds often need calorie-dense food because they have higher metabolic rates but smaller stomach capacities."
    },
    {
        question: "How much calcium does my dog really need?",
        answer: "Adult dogs generally need around 1.25g of calcium per 1000 calories consumed. Puppies, pregnant, and nursing dogs have significantly higher calcium requirements to support bone growth and milk production. It's crucial not to supplement calcium arbitrarily, as an excess can be just as harmful as a deficiency."
    },
    {
        question: "Is it safe to mix kibble with home-cooked or raw food?",
        answer: "Mixing different food types is common, but it can unbalance a complete commercial diet if the additions exceed 10% of your dog's daily caloric intake. If you're adding fresh foods systematically, you must calculate the new macronutrient and micronutrient totals to ensure no deficits are created."
    },
    {
        question: "What is the Resting Energy Requirement (RER)?",
        answer: "RER refers to the basic number of calories a dog needs to sustain essential bodily functions while at rest. By applying an activity multiplier to the RER, we determine the Maintenance Energy Requirement (MER), which is the number of calories needed for a dog's daily lifestyle."
    }
];

export default function FAQ() {
    return (
        <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">{faq.question}</h3>
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
