"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { UserAvatar } from "@/components/ui/user-avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Building,
  TrendingUp,
  Calendar,
  Edit,
  MoreHorizontal,
  Star,
} from "lucide-react"

interface Customer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  value: number
  status: "active" | "potential" | "inactive"
  lastContact: string
  tags: string[]
  satisfaction: number
}

export function CustomerManagement() {
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "张总",
      company: "华润集团",
      email: "zhang@huarun.com",
      phone: "138-0000-1234",
      address: "深圳市南山区",
      value: 500000,
      status: "active",
      lastContact: "2025-06-19",
      tags: ["VIP", "大客户"],
      satisfaction: 95,
    },
    {
      id: "2",
      name: "王经理",
      company: "万科地产",
      email: "wang@vanke.com",
      phone: "139-0000-5678",
      address: "广州市天河区",
      value: 300000,
      status: "potential",
      lastContact: "2025-06-18",
      tags: ["潜在客户", "房地产"],
      satisfaction: 78,
    },
    {
      id: "3",
      name: "刘总监",
      company: "碧桂园",
      email: "liu@bgy.com",
      phone: "137-0000-9012",
      address: "佛山市顺德区",
      value: 800000,
      status: "active",
      lastContact: "2025-06-17",
      tags: ["VIP", "长期合作"],
      satisfaction: 92,
    },
    {
      id: "4",
      name: "陈董事长",
      company: "腾讯科技",
      email: "chen@tencent.com",
      phone: "136-0000-3456",
      address: "深圳市南山区",
      value: 1200000,
      status: "active",
      lastContact: "2025-06-16",
      tags: ["VIP", "科技企业", "战略客户"],
      satisfaction: 98,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">活跃客户</Badge>
      case "potential":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">潜在客户</Badge>
      case "inactive":
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">非活跃</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const customerStats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    potential: customers.filter((c) => c.status === "potential").length,
    totalValue: customers.reduce((sum, c) => sum + c.value, 0),
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* 页面标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            客户管理中心
          </h1>
          <p className="text-slate-600 mt-2 text-lg">全方位的客户关系管理平台</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="搜索客户..."
              className="pl-10 w-full sm:w-64 border-slate-200 focus:border-blue-400 focus:ring-blue-400 bg-white/80 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            添加客户
          </Button>
        </div>
      </div>

      {/* 客户统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-slate-50 to-blue-50">
            <CardTitle className="text-sm font-medium text-slate-600">客户总数</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{customerStats.total}</div>
            <p className="text-xs text-slate-500 mt-1">全部客户</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="text-sm font-medium text-slate-600">活跃客户</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-emerald-600">{customerStats.active}</div>
            <p className="text-xs text-slate-500 mt-1">正在合作</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-sm font-medium text-slate-600">潜在客户</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{customerStats.potential}</div>
            <p className="text-xs text-slate-500 mt-1">待开发客户</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="text-sm font-medium text-slate-600">客户价值</CardTitle>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-purple-600">¥{(customerStats.totalValue / 10000).toFixed(0)}万</div>
            <p className="text-xs text-slate-500 mt-1">总客户价值</p>
          </CardContent>
        </Card>
      </div>

      {/* 客户列表 */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
          <CardTitle className="text-xl font-bold">客户列表</CardTitle>
          <CardDescription>管理您的客户关系和商业机会</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <Card
                key={customer.id}
                className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group"
              >
                <CardContent className="p-6">
                  {/* 客户头部信息 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <UserAvatar name={customer.name} size="lg" showRing ringColor="ring-blue-200" />
                      <div>
                        <h3 className="font-semibold text-slate-800">{customer.name}</h3>
                        <p className="text-sm text-slate-600">{customer.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(customer.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* 客户详细信息 */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{customer.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Building className="w-4 h-4" />
                      <span>客户价值: ¥{customer.value.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 满意度 */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">客户满意度</span>
                      <span className="font-semibold text-blue-600">{customer.satisfaction}%</span>
                    </div>
                    <Progress value={customer.satisfaction} className="h-2 bg-blue-100" />
                  </div>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {customer.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-blue-200 text-blue-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* 最后联系时间 */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>最后联系: {customer.lastContact}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Phone className="w-3 h-3 mr-1" />
                        拨打电话
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Edit className="w-3 h-3 mr-1" />
                        编辑
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
