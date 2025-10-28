"use client";

import { useState } from "react";
import { fetchElectricityCharges } from "@/lib/api/electricity";
import { ElectricityPlanResult } from "@/types/electricity";
import { ElectricityForm } from "@/components/ElectricityForm";
import { ResultCard } from "@/components/ResultCard";

export default function Home() {
  const [results, setResults] = useState<ElectricityPlanResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (ampere: number, usage: number) => {
    setError(null);
    setResults([]);
    setLoading(true);

    try {
      const data = await fetchElectricityCharges({ ampere, usage });
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          電気料金計算ツール
        </h1>

        <ElectricityForm onCalculate={handleCalculate} loading={loading} />

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
              計算結果
            </h2>
            <div className="grid gap-4">
              {results.map((r, i) => (
                <ResultCard key={i} result={r} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
