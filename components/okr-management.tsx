"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, TrendingUp, Users, Calendar, Plus, Edit, Eye, Award } from "lucide-react"

interface OKR {
  id: string
  title: string
  description: string
  owner: string
  department: string
  quarter: string
  status: "draft" | "active" | "completed" | "cancelled"
  progress: number
  keyResults: KeyResult[]
  createdAt: string
  dueDate: string
}

interface KeyResult {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  progress: number
  status: "on-track" | "at-risk" | "off-track"
}

export function OKRManagement() {
  const [selectedQuarter, setSelectedQuarter] = useState("2025-Q2")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // 模拟OKR数据
  const okrs: OKR[] = [
    {
      id: "1",
      title: "提升客户满意度和服务质量",
      description: "通过优化服务流程和提升团队能力，显著提高客户满意度",
      owner: "张经理",
      department: "客服部",
      quarter: "2025-Q2",
      status: "active",
      progress: 75,
      createdAt: "2025-04-01",
      dueDate: "2025-06-30",
      keyResults: [
        {
          id: "kr1",
          title: "客户满意度评分达到4.5分",
          description: "通过客户调研提升满意度评分",
          target: 4.5,
          current: 4.2,
          unit: "分",
          progress: 80,
          status: "on-track",
        },
        {
          id: "kr2",
          title: "客户投诉处理时间缩短至2小时内",
          description: "优化投诉处理流程，提升响应速度",
          target: 2,
          current: 3.5,
          unit: "小时",
          progress: 60,
          status: "at-risk",
        },
        {
          id: "kr3",
          title: "客户续约率提升至85%",
          description: "通过优质服务提高客户续约意愿",
          target: 85,
          current: 78,
          unit: "%",
          progress: 85,
          status: "on-track",
        },
      ],
    },
    {
      id: "2",
      title: "数字化转型和系统优化",
      description: "推进企业数字化转型，提升运营效率",
      owner: "李总监",
      department: "技术部",
      quarter: "2025-Q2",
      status: "active",
      progress: 60,
      createdAt: "2025-04-01",
      dueDate: "2025-06-30",
      keyResults: [
        {
          id: "kr4",
          title: "完成核心业务系统升级",
          description: "升级ERP和CRM系统，提升系统性能",
          target: 100,
          current: 65,
          unit: "%",
          progress: 65,
          status: "on-track",
        },
        {
          id: "kr5",
          title: "员工数字化技能培训覆盖率达到90%",
          description: "提升全员数字化操作能力",
          target: 90,
          current: 72,
          unit: "%",
          progress: 80,
          status: "on-track",
        },
      ],
    },
    {
      id: "3",
      title: "销售业绩突破和市场拓展",
      description: "实现销售目标突破，扩大市场份额",
      owner: "王总监",
      department: "销售部",
      quarter: "2025-Q2",
      status: "active",
      progress: 45,
      createdAt: "2025-04-01",
      dueDate: "2025-06-30",
      keyResults: [
        {
          id: "kr6",
          title: "季度销售额达到500万",
          description: "通过市场拓展和客户维护实现销售目标",
          target: 500,
          current: 320,
          unit: "万元",
          progress: 64,
          status: "at-risk",
        },
        {
          id: "kr7",
          title: "新客户获取数量达到50个",
          description: "开发新客户，扩大客户基础",
          target: 50,
          current: 28,
          unit: "个",
          progress: 56,
          status: "at-risk",
        },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800"
      case "at-risk":
        return "bg-yellow-100 text-yellow-800"
      case "off-track":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "on-track":
        return "进展顺利"
      case "at-risk":
        return "存在风险"
      case "off-track":
        return "进度滞后"
      default:
        return "未知状态"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "from-emerald-400 to-emerald-500"
    if (progress >= 60) return "from-blue-400 to-blue-500"
    if (progress >= 40) return "from-yellow-400 to-yellow-500"
    return "from-red-400 to-red-500"
  }

  const filteredOKRs = okrs.filter((okr) => {
    if (selectedDepartment !== "all" && okr.department !== selectedDepartment) return false
    if (okr.quarter !== selectedQuarter) return false
    return true
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">OKR目标管理</h1>
          <p className="text-muted-foreground">目标与关键结果管理系统</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-Q1">2025 Q1</SelectItem>
              <SelectItem value="2025-Q2">2025 Q2</SelectItem>
              <SelectItem value="2025-Q3">2025 Q3</SelectItem>
              <SelectItem value="2025-Q4">2025 Q4</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部部门</SelectItem>
              <SelectItem value="销售部">销售部</SelectItem>
              <SelectItem value="客服部">客服部</SelectItem>
              <SelectItem value="技术部">技术部</SelectItem>
              <SelectItem value="财务部">财务部</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                创建OKR
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>创建新的OKR</DialogTitle>
                <DialogDescription>设定目标和关键结果</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">目标标题</Label>
                  <Input id="title" placeholder="输入目标标题" />
                </div>
                <div>
                  <Label htmlFor="description">目标描述</Label>
                  <Textarea id="description" placeholder="详细描述目标内容" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="owner">负责人</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择负责人" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zhang">张经理</SelectItem>
                        <SelectItem value="li">李总监</SelectItem>
                        <SelectItem value="wang">王总监</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">所属部门</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="选择部门" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">销售部</SelectItem>
                        <SelectItem value="service">客服部</SelectItem>
                        <SelectItem value="tech">技术部</SelectItem>
                        <SelectItem value="finance">财务部</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                  >
                    创建OKR
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* OKR概览统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总OKR数量</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredOKRs.length}</div>
            <p className="text-xs text-muted-foreground">本季度活跃目标</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均完成度</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(filteredOKRs.reduce((acc, okr) => acc + okr.progress, 0) / filteredOKRs.length)}%
            </div>
            <p className="text-xs text-muted-foreground">整体进展情况</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">参与人数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">涉及团队成员</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">即将到期</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">30天内到期</p>
          </CardContent>
        </Card>
      </div>

      {/* OKR列表 */}
      <div className="space-y-6">
        {filteredOKRs.map((okr) => (
          <Card
            key={okr.id}
            className="bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{okr.title}</CardTitle>
                  <CardDescription className="mt-2">{okr.description}</CardDescription>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                    <span>负责人: {okr.owner}</span>
                    <span>部门: {okr.department}</span>
                    <span>截止: {okr.dueDate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{okr.quarter}</Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{okr.progress}%</div>
                    <div className="w-20 h-2 bg-sky-100 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full bg-gradient-to-r ${getProgressColor(okr.progress)} rounded-full transition-all duration-500`}
                        style={{ width: `${okr.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">关键结果 (Key Results)</h4>
                <div className="space-y-3">
                  {okr.keyResults.map((kr) => (
                    <div key={kr.id} className="border border-sky-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h5 className="font-medium">{kr.title}</h5>
                          <p className="text-sm text-muted-foreground mt-1">{kr.description}</p>
                        </div>
                        <Badge className={getStatusColor(kr.status)}>{getStatusText(kr.status)}</Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-sm">
                          <span className="font-medium">{kr.current}</span>
                          <span className="text-muted-foreground">
                            {" "}
                            / {kr.target} {kr.unit}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-sky-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${getProgressColor(kr.progress)} rounded-full transition-all duration-500`}
                              style={{ width: `${kr.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{kr.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    查看详情
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    编辑OKR
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    更新进度
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
