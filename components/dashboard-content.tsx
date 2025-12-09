"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesChart } from "@/components/charts/sales-chart"
import { FinanceChart } from "@/components/charts/finance-chart"
import { PerformanceChart } from "@/components/charts/performance-chart"
import { AIRecommendationsPanel } from "@/components/ai-recommendations-panel"
import {
  Users,
  DollarSign,
  ShoppingCart,
  Target,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  Bell,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"

const stats = [
  {
    title: "总销售额",
    value: "¥2,847,392",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-400 via-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    description: "本月销售业绩",
  },
  {
    title: "活跃客户",
    value: "1,247",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "from-blue-400 via-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50",
    description: "正在合作的客户",
  },
  {
    title: "待处理订单",
    value: "156",
    change: "-3.1%",
    trend: "down",
    icon: ShoppingCart,
    color: "from-orange-400 via-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50",
    description: "需要跟进的订单",
  },
  {
    title: "完成率",
    value: "87.5%",
    change: "+5.2%",
    trend: "up",
    icon: Target,
    color: "from-purple-400 via-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50",
    description: "任务完成效率",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "order",
    title: "新订单 #2024-001",
    description: "深圳华润集团下单 ¥125,000",
    time: "5分钟前",
    status: "success",
    icon: ShoppingCart,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    id: 2,
    type: "task",
    title: "任务完成",
    description: "Q4销售报告制作已完成",
    time: "15分钟前",
    status: "success",
    icon: CheckCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    type: "alert",
    title: "库存预警",
    description: "产品A库存不足，需要补货",
    time: "1小时前",
    status: "warning",
    icon: Bell,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: 4,
    type: "customer",
    title: "新客户注册",
    description: "广州万科地产完成注册",
    time: "2小时前",
    status: "info",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
]

const quickActions = [
  {
    label: "新建任务",
    icon: CheckCircle,
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-600 to-blue-700",
    description: "创建新的工作任务",
  },
  {
    label: "添加客户",
    icon: Users,
    color: "from-emerald-500 to-emerald-600",
    hoverColor: "from-emerald-600 to-emerald-700",
    description: "录入新客户信息",
  },
  {
    label: "创建订单",
    icon: ShoppingCart,
    color: "from-orange-500 to-orange-600",
    hoverColor: "from-orange-600 to-orange-700",
    description: "生成新的销售订单",
  },
  {
    label: "生成报表",
    icon: BarChart3,
    color: "from-purple-500 to-purple-600",
    hoverColor: "from-purple-600 to-purple-700",
    description: "导出数据分析报表",
  },
]

export function DashboardContent() {
  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 欢迎区域 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent md:text-2xl">
              Welcome back, Administrator!
            </h1>
            <p className="text-blue-100 text-base md:text-lg leading-relaxed">
              今天是{" "}
              {new Date().toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
            <p className="text-blue-200 text-sm mt-2">智能开启管理时刻，科技引导数据效率</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-blue-100">YanYuCloud³ Management System</p>
              <p className="text-xs text-blue-200">让管理更智能，让数据更效率</p>
            </div>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight

          return (
            <Card
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20"></div>
              <CardContent className="relative z-10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                    <p className="font-bold text-slate-800 mb-1 text-2xl">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.description}</p>
                  </div>
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 items-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendIcon className={`w-4 h-4 mr-2 ${stat.trend === "up" ? "text-emerald-500" : "text-red-500"}`} />
                  <span
                    className={`font-semibold text-xs ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-slate-500 ml-2">vs 上月</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* AI Recommendations Panel */}
      <AIRecommendationsPanel />

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 图表区域 */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
              <CardTitle className="flex items-center text-lg md:text-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                业务数据分析
              </CardTitle>
              <CardDescription className="text-slate-600">实时监控关键业务指标和趋势</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="sales" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-100/80 h-12 rounded-xl">
                  <TabsTrigger
                    value="sales"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md rounded-lg font-medium"
                  >
                    <LineChart className="w-4 h-4 mr-2" />
                    销售趋势
                  </TabsTrigger>
                  <TabsTrigger
                    value="finance"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md rounded-lg font-medium"
                  >
                    <PieChart className="w-4 h-4 mr-2" />
                    财务状况
                  </TabsTrigger>
                  <TabsTrigger
                    value="performance"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md rounded-lg font-medium"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    绩效指标
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="sales" className="mt-6">
                  <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                    <SalesChart />
                  </div>
                </TabsContent>
                <TabsContent value="finance" className="mt-6">
                  <div className="h-80 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4">
                    <FinanceChart />
                  </div>
                </TabsContent>
                <TabsContent value="performance" className="mt-6">
                  <div className="h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                    <PerformanceChart />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* 侧边栏信息 */}
        <div className="space-y-6">
          {/* 快速操作 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
              <CardTitle className="flex items-center text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                快速操作
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-20 flex flex-col items-center justify-center space-y-2 border-0 bg-gradient-to-br ${action.color} hover:${action.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group rounded-xl`}
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium">{action.label}</span>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* 最近活动 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
              <CardTitle className="flex items-center text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                最近活动
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50/80 transition-colors duration-200 group"
                    >
                      <div
                        className={`w-10 h-10 ${activity.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 mb-1">{activity.title}</p>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-2">{activity.description}</p>
                        <p className="text-xs text-slate-400">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl bg-transparent"
              >
                查看全部活动
              </Button>
            </CardContent>
          </Card>

          {/* 系统状态 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
              <CardTitle className="flex items-center text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                系统状态
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                  <span className="text-sm font-medium text-slate-700">系统运行时间</span>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-semibold">99.9%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <span className="text-sm font-medium text-slate-700">数据库状态</span>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 font-semibold">正常</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="text-sm font-medium text-slate-700">在线用户</span>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 font-semibold">24</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <span className="text-sm font-medium text-slate-700">待处理任务</span>
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-semibold">8</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
