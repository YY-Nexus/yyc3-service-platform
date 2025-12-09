"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { department: "销售部", completed: 85, target: 90, efficiency: 94 },
  { department: "技术部", completed: 92, target: 85, efficiency: 108 },
  { department: "客服部", completed: 78, target: 80, efficiency: 98 },
  { department: "市场部", completed: 88, target: 85, efficiency: 104 },
  { department: "财务部", completed: 95, target: 90, efficiency: 106 },
]

export function PerformanceChart() {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="department" stroke="#64748b" fontSize={12} />
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
          <Bar dataKey="completed" fill="#3b82f6" name="完成率" radius={[4, 4, 0, 0]} />
          <Bar dataKey="target" fill="#10b981" name="目标" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
