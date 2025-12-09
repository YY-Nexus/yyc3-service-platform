"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserAvatar } from "@/components/ui/user-avatar"
import { Progress } from "@/components/ui/progress"
import { CheckSquare, Plus, Search, Calendar, Clock, AlertCircle, CheckCircle, Users, Target } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  dueDate: string
  progress: number
  tags: string[]
  project: string
  createdAt: string
  updatedAt: string
}

interface TeamMember {
  id: string
  name: string
  role: string
  tasks: number
  completedTasks: number
}

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "产品原型设计",
      description: "完成新产品的原型设计和用户体验优化",
      status: "in-progress",
      priority: "high",
      assignee: "张设计师",
      dueDate: "2025-06-25",
      progress: 65,
      tags: ["设计", "原型"],
      project: "新产品开发",
      createdAt: "2025-06-15",
      updatedAt: "2025-06-19",
    },
    {
      id: "2",
      title: "数据库优化",
      description: "优化数据库查询性能，提升系统响应速度",
      status: "todo",
      priority: "medium",
      assignee: "李工程师",
      dueDate: "2025-06-30",
      progress: 0,
      tags: ["技术", "优化"],
      project: "系统维护",
      createdAt: "2025-06-18",
      updatedAt: "2025-06-18",
    },
    {
      id: "3",
      title: "市场调研报告",
      description: "完成Q2季度市场调研报告的撰写和分析",
      status: "completed",
      priority: "medium",
      assignee: "王分析师",
      dueDate: "2025-06-20",
      progress: 100,
      tags: ["调研", "报告"],
      project: "市场分析",
      createdAt: "2025-06-10",
      updatedAt: "2025-06-19",
    },
    {
      id: "4",
      title: "客户需求分析",
      description: "分析重点客户的需求变化和市场趋势",
      status: "review",
      priority: "high",
      assignee: "陈经理",
      dueDate: "2025-06-22",
      progress: 90,
      tags: ["客户", "分析"],
      project: "客户服务",
      createdAt: "2025-06-12",
      updatedAt: "2025-06-19",
    },
  ])

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "张设计师",
      role: "UI/UX设计师",
      tasks: 5,
      completedTasks: 3,
    },
    {
      id: "2",
      name: "李工程师",
      role: "后端开发",
      tasks: 8,
      completedTasks: 6,
    },
    {
      id: "3",
      name: "王分析师",
      role: "数据分析师",
      tasks: 4,
      completedTasks: 4,
    },
    {
      id: "4",
      name: "陈经理",
      role: "项目经理",
      tasks: 6,
      completedTasks: 4,
    },
  ])

  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo":
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">待开始</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">进行中</Badge>
      case "review":
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">待审核</Badge>
      case "completed":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">已完成</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-700 border-red-200 font-semibold">紧急</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200 font-semibold">高优先级</Badge>
      case "medium":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">中优先级</Badge>
      case "low":
        return <Badge className="bg-slate-100 text-slate-600 border-slate-200">低优先级</Badge>
      default:
        return <Badge variant="secondary">普通</Badge>
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const taskStats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    review: tasks.filter((t) => t.status === "review").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            任务管理看板
          </h1>
          <p className="text-slate-600 mt-2 text-lg">高效的团队任务协作平台</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="搜索任务..."
              className="pl-10 w-full sm:w-64 border-slate-200 focus:border-blue-400 focus:ring-blue-400 bg-white/80 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-36 border-slate-200 bg-white/80 backdrop-blur-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="todo">待开始</SelectItem>
              <SelectItem value="in-progress">进行中</SelectItem>
              <SelectItem value="review">待审核</SelectItem>
              <SelectItem value="completed">已完成</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                创建任务
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">创建新任务</DialogTitle>
                <DialogDescription>填写任务详细信息</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="title">任务标题</Label>
                  <Input id="title" placeholder="请输入任务标题" className="border-slate-200" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">任务描述</Label>
                  <Textarea id="description" placeholder="请输入任务描述" className="border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignee">负责人</Label>
                  <Select>
                    <SelectTrigger className="border-slate-200">
                      <SelectValue placeholder="选择负责人" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.id} value={member.name}>
                          {member.name} - {member.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">优先级</Label>
                  <Select>
                    <SelectTrigger className="border-slate-200">
                      <SelectValue placeholder="选择优先级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">低优先级</SelectItem>
                      <SelectItem value="medium">中优先级</SelectItem>
                      <SelectItem value="high">高优先级</SelectItem>
                      <SelectItem value="urgent">紧急</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">截止日期</Label>
                  <Input id="dueDate" type="date" className="border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">所属项目</Label>
                  <Input id="project" placeholder="请输入项目名称" className="border-slate-200" />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-slate-200">
                  取消
                </Button>
                <Button
                  onClick={() => setIsAddDialogOpen(false)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                >
                  创建任务
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 任务统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-slate-50 to-blue-50">
            <CardTitle className="text-sm font-medium text-slate-600">总任务数</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{taskStats.total}</div>
            <p className="text-xs text-slate-500 mt-1">全部任务</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-slate-50 to-blue-50">
            <CardTitle className="text-sm font-medium text-slate-600">待开始</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{taskStats.todo}</div>
            <p className="text-xs text-slate-500 mt-1">等待开始的任务</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-sm font-medium text-slate-600">进行中</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</div>
            <p className="text-xs text-slate-500 mt-1">正在执行的任务</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardTitle className="text-sm font-medium text-slate-600">待审核</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-yellow-600">{taskStats.review}</div>
            <p className="text-xs text-slate-500 mt-1">等待审核的任务</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-sm font-medium text-slate-600">已完成</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-emerald-600">{taskStats.completed}</div>
            <p className="text-xs text-slate-500 mt-1">已完成的任务</p>
          </CardContent>
        </Card>
      </div>

      {/* 任务看板和团队成员 */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
              <CardTitle className="text-xl font-bold">任务看板</CardTitle>
              <CardDescription>拖拽任务卡片来更新状态</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* 待开始列 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-700">待开始</h3>
                    <Badge className="bg-slate-100 text-slate-600 border-slate-200">{taskStats.todo}</Badge>
                  </div>
                  <div className="space-y-3">
                    {filteredTasks
                      .filter((task) => task.status === "todo")
                      .map((task) => (
                        <Card
                          key={task.id}
                          className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-0 rounded-xl"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-sm text-slate-800">{task.title}</h4>
                              {getPriorityBadge(task.priority)}
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2">{task.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <UserAvatar name={task.assignee} size="sm" />
                                <span className="text-xs text-slate-600">{task.assignee}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-500">{task.dueDate}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs border-slate-200 text-slate-600">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* 进行中列 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-blue-700">进行中</h3>
                    <Badge className="bg-blue-100 text-blue-600 border-blue-200">{taskStats.inProgress}</Badge>
                  </div>
                  <div className="space-y-3">
                    {filteredTasks
                      .filter((task) => task.status === "in-progress")
                      .map((task) => (
                        <Card
                          key={task.id}
                          className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-0 rounded-xl border-l-4 border-l-blue-500"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-sm text-slate-800">{task.title}</h4>
                              {getPriorityBadge(task.priority)}
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2">{task.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-600">进度</span>
                                <span className="font-semibold text-blue-600">{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-2 bg-blue-100" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <UserAvatar name={task.assignee} size="sm" />
                                <span className="text-xs text-slate-600">{task.assignee}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-500">{task.dueDate}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs border-blue-200 text-blue-600">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* 待审核列 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-yellow-700">待审核</h3>
                    <Badge className="bg-yellow-100 text-yellow-600 border-yellow-200">{taskStats.review}</Badge>
                  </div>
                  <div className="space-y-3">
                    {filteredTasks
                      .filter((task) => task.status === "review")
                      .map((task) => (
                        <Card
                          key={task.id}
                          className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-0 rounded-xl border-l-4 border-l-yellow-500"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-sm text-slate-800">{task.title}</h4>
                              {getPriorityBadge(task.priority)}
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2">{task.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-600">进度</span>
                                <span className="font-semibold text-yellow-600">{task.progress}%</span>
                              </div>
                              <Progress value={task.progress} className="h-2 bg-yellow-100" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <UserAvatar name={task.assignee} size="sm" />
                                <span className="text-xs text-slate-600">{task.assignee}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-500">{task.dueDate}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs border-yellow-200 text-yellow-600"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* 已完成列 */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-emerald-700">已完成</h3>
                    <Badge className="bg-emerald-100 text-emerald-600 border-emerald-200">{taskStats.completed}</Badge>
                  </div>
                  <div className="space-y-3">
                    {filteredTasks
                      .filter((task) => task.status === "completed")
                      .map((task) => (
                        <Card
                          key={task.id}
                          className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-0 rounded-xl border-l-4 border-l-emerald-500 opacity-90"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-sm text-slate-800">{task.title}</h4>
                              {getPriorityBadge(task.priority)}
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2">{task.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <UserAvatar name={task.assignee} size="sm" />
                                <span className="text-xs text-slate-600">{task.assignee}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3 text-emerald-500" />
                                <span className="text-xs text-emerald-600 font-semibold">已完成</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {task.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs border-emerald-200 text-emerald-600"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 团队成员分工 */}
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
              <CardTitle className="flex items-center text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 text-white" />
                </div>
                团队成员
              </CardTitle>
              <CardDescription>成员分工情况</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <UserAvatar name={member.name} size="lg" showRing ringColor="ring-blue-200" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{member.name}</h4>
                      <p className="text-sm text-slate-600">{member.role}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-slate-500">任务: {member.tasks}</span>
                        <span className="text-xs text-emerald-600 font-semibold">完成: {member.completedTasks}</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">完成率</span>
                          <span className="font-semibold text-blue-600">
                            {Math.round((member.completedTasks / member.tasks) * 100)}%
                          </span>
                        </div>
                        <Progress value={(member.completedTasks / member.tasks) * 100} className="h-2 bg-blue-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
              <CardTitle className="flex items-center text-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-4 h-4 text-white" />
                </div>
                项目进度
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">新产品开发</span>
                    <span className="font-bold text-blue-600">75%</span>
                  </div>
                  <Progress value={75} className="h-3 bg-blue-100" />
                  <p className="text-xs text-slate-500">预计完成时间: 2025-07-15</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">系统维护</span>
                    <span className="font-bold text-orange-600">45%</span>
                  </div>
                  <Progress value={45} className="h-3 bg-orange-100" />
                  <p className="text-xs text-slate-500">预计完成时间: 2025-08-01</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">市场分析</span>
                    <span className="font-bold text-emerald-600">100%</span>
                  </div>
                  <Progress value={100} className="h-3 bg-emerald-100" />
                  <p className="text-xs text-emerald-600 font-semibold">✓ 已完成</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">客户服务</span>
                    <span className="font-bold text-purple-600">90%</span>
                  </div>
                  <Progress value={90} className="h-3 bg-purple-100" />
                  <p className="text-xs text-slate-500">预计完成时间: 2025-06-30</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
