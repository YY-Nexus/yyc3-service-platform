"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/ui/user-avatar"
import { Search, Bell, Settings, User, LogOut, MessageSquare, Calendar, HelpCircle } from "lucide-react"

export function Header() {
  const [notifications] = useState([
    { id: 1, title: "新任务分配", message: "您有一个新的任务需要处理", time: "5分钟前", unread: true },
    { id: 2, title: "客户反馈", message: "客户对项目进度提出了建议", time: "1小时前", unread: true },
    { id: 3, title: "系统更新", message: "系统将在今晚进行维护更新", time: "2小时前", unread: false },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* 左侧：搜索栏 */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            type="search"
            placeholder="搜索功能、客户、任务..."
            className="pl-10 pr-4 py-2 w-full border-slate-200 focus:border-blue-500 focus:ring-blue-500 bg-slate-50"
          />
        </div>
      </div>

      {/* 右侧：操作按钮 */}
      <div className="flex items-center space-x-4">
        {/* 快速操作 */}
        <Button variant="ghost" size="sm" className="hidden lg:flex text-slate-600 hover:text-blue-600">
          <Calendar className="w-4 h-4 mr-2" />
          日程
        </Button>

        <Button variant="ghost" size="sm" className="hidden lg:flex text-slate-600 hover:text-blue-600">
          <MessageSquare className="w-4 h-4 mr-2" />
          消息
        </Button>

        {/* 通知中心 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              通知中心
              <Badge variant="secondary">{unreadCount} 未读</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-sm">{notification.title}</span>
                  {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <p className="text-xs text-slate-600 mt-1">{notification.message}</p>
                <span className="text-xs text-slate-400 mt-1">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-blue-600 hover:text-blue-700">查看全部通知</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 帮助中心 */}
        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-600">
          <HelpCircle className="w-5 h-5" />
        </Button>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <UserAvatar name="管理员" size="lg" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">管理员</p>
                <p className="text-xs leading-none text-muted-foreground">admin@yanyu-cloud.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>个人资料</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>系统设置</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>退出登录</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
