"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Bell,
  Settings,
  BarChart3,
  FileText,
  Calendar,
  MessageSquare,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
}

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      id: "dashboard",
      label: "仪表盘",
      icon: LayoutDashboard,
      badge: null,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "tasks",
      label: "任务管理",
      icon: CheckSquare,
      badge: "8",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "customers",
      label: "客户管理",
      icon: Users,
      badge: "156",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "notifications",
      label: "通知中心",
      icon: Bell,
      badge: "3",
      color: "from-orange-500 to-red-600",
    },
    {
      id: "analytics",
      label: "数据分析",
      icon: BarChart3,
      badge: null,
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: "reports",
      label: "报表中心",
      icon: FileText,
      badge: null,
      color: "from-violet-500 to-purple-600",
    },
    {
      id: "calendar",
      label: "日程安排",
      icon: Calendar,
      badge: "2",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "messages",
      label: "消息中心",
      icon: MessageSquare,
      badge: "12",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: "okr",
      label: "OKR管理",
      icon: Target,
      badge: null,
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "settings",
      label: "系统设置",
      icon: Settings,
      badge: null,
      color: "from-slate-500 to-gray-600",
    },
  ]

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white/80 backdrop-blur-sm border-r border-slate-200 shadow-lg transition-all duration-300 flex flex-col`}
    >
      {/* Logo区域 */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <div>
                <h2 className="font-bold text-indigo-500">{"YanYuCloud³"}</h2>
                <p className="text-xs text-blue-600"> Management System</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-slate-100"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeModule === item.id

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`w-full justify-start h-12 ${
                isActive ? `bg-gradient-to-r ${item.color} text-white shadow-lg` : "hover:bg-slate-100 text-slate-700"
              } transition-all duration-200`}
              onClick={() => setActiveModule(item.id)}
            >
              <div className="flex items-center space-x-3 w-full">
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge
                        className={`${
                          isActive
                            ? "bg-white/20 text-white border-white/30"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        } text-xs`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </Button>
          )
        })}
      </nav>

      {/* 底部用户信息 */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">管</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800 text-sm">管理员</p>
              <p className="text-xs text-slate-500">系统管理员</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
