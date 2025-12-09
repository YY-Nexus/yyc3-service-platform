"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AvatarGenerator } from "@/lib/avatar-generator"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  name: string
  imageUrl?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showRing?: boolean
  ringColor?: string
}

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-10 h-10 text-base",
  xl: "w-12 h-12 text-lg",
}

export function UserAvatar({
  name,
  imageUrl,
  size = "md",
  className,
  showRing = false,
  ringColor = "ring-blue-200",
}: UserAvatarProps) {
  const initials = AvatarGenerator.getInitials(name)
  const gradient = AvatarGenerator.getGradientForName(name)

  return (
    <Avatar className={cn(sizeClasses[size], showRing && `ring-2 ${ringColor}`, className)}>
      {imageUrl && <AvatarImage src={imageUrl || "/placeholder.svg"} alt={name} />}
      <AvatarFallback className={`bg-gradient-to-br ${gradient} text-white font-semibold`}>{initials}</AvatarFallback>
    </Avatar>
  )
}
