'use client';

import { useMemo, useState } from 'react';

const junkFoods = new Set([
  'candy',
  'chips',
  'fries',
  'french fries',
  'donut',
  'doughnut',
  'cookie',
  'cookies',
  'soda',
  'soft drink',
  'burger',
  'pizza',
  'ice cream',
  'fried chicken',
  'hot dog',
  'milkshake'
]);

const healthyFoods = new Set([
  'apple',
  'banana',
  'orange',
  'strawberry',
  'blueberry',
  'broccoli',
  'spinach',
  'carrot',
  'cucumber',
  'tomato',
  'oatmeal',
  'salad',
  'quinoa',
  'brown rice',
  'grilled chicken',
  'baked salmon',
  'egg',
  'yogurt',
  'greek yogurt',
  'beans',
  'lentils',
  'fish',
  'avocado',
  'almonds'
]);

export default function Home() {
  const [foodInput, setFoodInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [howMadeInput, setHowMadeInput] = useState('');
  const [submission, setSubmission] = useState(null);

  const result = useMemo(() => {
    if (!submission) {
      return null;
    }

    const normalizedFood = submission.food.trim().toLowerCase();
    const normalizedDescription = submission.description.trim().toLowerCase();
    const normalizedHowMade = submission.howMade.trim().toLowerCase();

    if (!normalizedFood) {
      return {
        label: 'Please type a food item first.',
        tone: 'neutral'
      };
    }

    const allText = [normalizedFood, normalizedDescription, normalizedHowMade].join(' ');

    const hasJunkSignal =
      junkFoods.has(normalizedFood) ||
      Array.from(junkFoods).some((food) => allText.includes(food)) ||
      /(fried|deep[- ]fried|sugary|processed|fast food|high sugar)/.test(allText);

    if (hasJunkSignal) {
      return {
        label: `Likely junk food: ${submission.food}. The name/description/how it's made matches common junk-food signals.`,
        tone: 'junk'
      };
    }

    const hasHealthySignal =
      healthyFoods.has(normalizedFood) ||
      Array.from(healthyFoods).some((food) => allText.includes(food)) ||
      /(baked|grilled|steamed|fresh|whole grain|lean protein|vegetable)/.test(allText);

    if (hasHealthySignal) {
      return {
        label: `Likely not junk food: ${submission.food}. The details suggest a less-processed preparation.`,
        tone: 'healthy'
      };
    }

    return {
      label: `Not sure yet for "${submission.food}". Try adding clearer details in the description or preparation method.`,
      tone: 'neutral'
    };
  }, [submission]);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmission({
      food: foodInput,
      description: descriptionInput,
      howMade: howMadeInput
    });
  }

  const resultClasses = {
    junk: 'border-red-300 bg-red-50 text-red-800',
    healthy: 'border-emerald-300 bg-emerald-50 text-emerald-800',
    neutral: 'border-slate-300 bg-white text-slate-800'
  };

  return (
    <main className="min-h-screen bg-slate-200 bg-[image:url('/background-pattern.svg')] bg-cover bg-center bg-no-repeat px-4 py-12">
      <section className="mx-auto w-full max-w-2xl rounded-2xl bg-white/90 p-6 shadow-lg backdrop-blur-[2px] md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Junk or No</h1>
        <p className="mt-2 text-sm text-slate-600">Add the food, a short description, and how it is made to check if it is likely junk food.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <label htmlFor="food" className="sr-only">
            Food item
          </label>
          <input
            id="food"
            type="text"
            value={foodInput}
            onChange={(event) => setFoodInput(event.target.value)}
            placeholder="Example: pizza"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none ring-offset-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <label htmlFor="description" className="sr-only">
            Short description
          </label>
          <input
            id="description"
            type="text"
            value={descriptionInput}
            onChange={(event) => setDescriptionInput(event.target.value)}
            placeholder="Short description (e.g., cheesy, salty snack)"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none ring-offset-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <label htmlFor="howMade" className="sr-only">
            How it is made
          </label>
          <textarea
            id="howMade"
            value={howMadeInput}
            onChange={(event) => setHowMadeInput(event.target.value)}
            placeholder="How it's made (e.g., deep-fried in oil, baked with vegetables)"
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none ring-offset-2 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="self-start rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Check Food
          </button>
        </form>

        {result && (
          <div className={`mt-5 rounded-lg border p-4 text-sm ${resultClasses[result.tone]}`} role="status" aria-live="polite">
            {result.label}
          </div>
        )}

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold">Try these examples:</h2>
          <p className="mt-1 text-sm text-slate-600">
            Junk: chips, hamburger, soda, cake, hot dog. Not junk: apple, fish, salad, oatmeal, almonds.
          </p>
        </div>
      </section>
    </main>
  );
}
