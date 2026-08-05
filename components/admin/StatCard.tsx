import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color = "bg-green-600",
}: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div className={`${color} rounded-xl p-4 text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}