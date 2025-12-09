"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "1月", sales: 65000, target: 60000, growth: 8.5 },
  { month: "2月", sales: 72000, target: 65000, growth: 12.3 },
  { month: "3月", sales: 68000, target: 70000, growth: -2.1 },
  { month: "4月", sales: 85000, target: 75000, growth: 15.8 },
  { month: "5月", sales: 92000, target: 80000, growth: 18.2 },
  { month: "6月", sales: 98000, target: 85000, growth: 22.1 },
]

export function SalesChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
            name="实际销售额"
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            name="目标销售额"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
