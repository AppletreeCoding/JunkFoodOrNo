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
  'broccoli',
  'spinach',
  'carrot',
  'oatmeal',
  'salad',
  'brown rice',
  'grilled chicken',
  'egg',
  'yogurt',
  'beans',
  'lentils',
  'fish'
]);

export default function Home() {
  const [foodInput, setFoodInput] = useState('');
  const [checkedFood, setCheckedFood] = useState('');

  const result = useMemo(() => {
    if (!checkedFood) {
      return null;
    }

    const normalizedFood = checkedFood.trim().toLowerCase();

    if (!normalizedFood) {
      return {
        label: 'Please type a food item first.',
        tone: 'neutral'
      };
    }

    if (junkFoods.has(normalizedFood)) {
      return {
        label: `Yes, ${checkedFood} is usually considered junk food.`,
        tone: 'junk'
      };
    }

    if (healthyFoods.has(normalizedFood)) {
      return {
        label: `No, ${checkedFood} is generally not junk food.`,
        tone: 'healthy'
      };
    }

    return {
      label: `"${checkedFood}" is not in our simple list yet. Try a common food like pizza, apple, chips, or salad.`,
      tone: 'neutral'
    };
  }, [checkedFood]);

  function handleSubmit(event) {
    event.preventDefault();
    setCheckedFood(foodInput);
  }

  const resultClasses = {
    junk: 'border-red-300 bg-red-50 text-red-800',
    healthy: 'border-emerald-300 bg-emerald-50 text-emerald-800',
    neutral: 'border-slate-300 bg-white text-slate-800'
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-6 px-4 py-12">
      <section className="w-full rounded-2xl bg-white p-6 shadow-lg md:p-8">
        <h1 className="text-3xl font-bold tracking-tight">Junk or No</h1>
        <p className="mt-2 text-sm text-slate-600">
          Type a food and click <span className="font-semibold">Check Food</span>. This beginner-friendly app will tell
          you if it is commonly considered junk food.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
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
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
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
          <p className="mt-1 text-sm text-slate-600">chips, donut, soda, apple, fish, salad</p>
        </div>
      </section>
    </main>
  );
}
