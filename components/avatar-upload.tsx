"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Camera, Upload, User, RotateCcw, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

interface AvatarUploadProps {
  currentAvatar?: string
  userName?: string
  onAvatarChange?: (avatarUrl: string) => void
  size?: "sm" | "md" | "lg" | "xl"
}

export function AvatarUpload({ currentAvatar, userName = "用户", onAvatarChange, size = "lg" }: AvatarUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar || null)
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const [avatarType, setAvatarType] = useState<"upload" | "generated" | "default">("default")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  const predefinedColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
    "#14b8a6",
    "#eab308",
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith("image/")) {
        alert("请选择图片文件")
        return
      }

      // 验证文件大小 (最大 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("图片大小不能超过 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewUrl(result)
        setAvatarType("upload")
      }
      reader.readAsDataURL(file)
    }
  }

  const generateAvatar = (color: string) => {
    // 创建一个简单的字母头像
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 200
    canvas.height = 200

    // 绘制背景
    const gradient = ctx.createLinearGradient(0, 0, 200, 200)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, adjustBrightness(color, -20))

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 200, 200)

    // 绘制文字
    ctx.fillStyle = "white"
    ctx.font = "bold 80px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const firstChar = userName.charAt(0).toUpperCase()
    ctx.fillText(firstChar, 100, 100)

    const avatarUrl = canvas.toDataURL("image/png")
    setPreviewUrl(avatarUrl)
    setAvatarType("generated")
  }

  const adjustBrightness = (hex: string, percent: number) => {
    const num = Number.parseInt(hex.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  const handleSave = () => {
    if (previewUrl && onAvatarChange) {
      onAvatarChange(previewUrl)

      // 保存到本地存储
      localStorage.setItem("userAvatar", previewUrl)
      localStorage.setItem("avatarType", avatarType)
    }
    setIsOpen(false)
  }

  const handleReset = () => {
    setPreviewUrl(null)
    setAvatarType("default")
    localStorage.removeItem("userAvatar")
    localStorage.removeItem("avatarType")
  }

  return (
    <>
      <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
        <Avatar
          className={cn(
            sizeClasses[size],
            "transition-all duration-200 group-hover:ring-2 group-hover:ring-sky-500 group-hover:ring-offset-2",
          )}
        >
          <AvatarImage src={previewUrl || currentAvatar} alt={userName} />
          <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-500 text-white font-semibold">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-sky-600" />
              自定义头像
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* 头像预览 */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32 border-4 border-sky-200">
                <AvatarImage src={previewUrl || currentAvatar} alt={userName} />
                <AvatarFallback className="bg-gradient-to-br from-sky-400 to-blue-500 text-white text-4xl font-bold">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="text-center">
                <p className="text-sm text-gray-600">当前头像</p>
                <p className="text-xs text-gray-400 mt-1">
                  {avatarType === "upload" && "自定义上传"}
                  {avatarType === "generated" && "系统生成"}
                  {avatarType === "default" && "默认头像"}
                </p>
              </div>
            </div>

            {/* 上传选项 */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">上传自定义头像</Label>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    选择图片
                  </Button>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">支持 JPG、PNG 格式，文件大小不超过 5MB</p>
              </div>

              {/* 生成头像选项 */}
              <div>
                <Label className="text-sm font-medium mb-2 block">生成字母头像</Label>
                <div className="space-y-3">
                  <div className="grid grid-cols-6 gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all duration-200",
                          selectedColor === color
                            ? "border-gray-800 scale-110"
                            : "border-gray-300 hover:border-gray-400",
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setSelectedColor(color)
                          generateAvatar(color)
                        }}
                      />
                    ))}
                  </div>

                  <Button variant="outline" size="sm" onClick={() => generateAvatar(selectedColor)} className="w-full">
                    <Palette className="w-4 h-4 mr-2" />
                    生成头像
                  </Button>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={handleReset} className="text-red-600 hover:text-red-700">
                <RotateCcw className="w-4 h-4 mr-2" />
                重置默认
              </Button>

              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700">
                  保存头像
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
