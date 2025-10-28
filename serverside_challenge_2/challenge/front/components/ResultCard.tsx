import { ElectricityPlanResult } from "@/types/electricity";

export function ResultCard({ result }: { result: ElectricityPlanResult }) {
  return (
    <div className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition">
      <p className="text-gray-800 font-semibold text-lg">
        {result.provider_name}
      </p>
      <p className="text-gray-600">{result.plan_name}</p>
      <p className="text-2xl font-bold text-blue-600 mt-2">
        {result.price.toLocaleString()}円
      </p>
    </div>
  );
}
