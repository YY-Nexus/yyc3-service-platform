/**
 * Avatar Generator Utility
 * Generates consistent, beautiful avatars for users without placeholder images
 */

export class AvatarGenerator {
  private static colors = [
    "from-blue-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-purple-400 to-pink-500",
    "from-orange-400 to-red-500",
    "from-cyan-400 to-blue-500",
    "from-green-400 to-emerald-500",
    "from-violet-400 to-purple-500",
    "from-amber-400 to-orange-500",
  ]

  /**
   * Generate a consistent gradient color based on name
   */
  static getGradientForName(name: string): string {
    const hash = name.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)

    const index = Math.abs(hash) % this.colors.length
    return this.colors[index]
  }

  /**
   * Get initials from name (supports Chinese and English)
   */
  static getInitials(name: string): string {
    if (!name) return "U"

    // For Chinese names, take the last character (usually the given name)
    if (/[\u4e00-\u9fa5]/.test(name)) {
      return name.slice(-1)
    }

    // For English names, take first letters of first and last name
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }

    return name.slice(0, 2).toUpperCase()
  }

  /**
   * Generate avatar data URL (for future use with canvas)
   */
  static generateAvatarDataUrl(name: string, size = 40): string {
    // This would generate a data URL with canvas in a real implementation
    // For now, we'll use CSS gradients in components
    return ""
  }
}

/**
 * User avatar data structure
 */
export interface UserAvatar {
  name: string
  initials: string
  gradient: string
  imageUrl?: string
}

/**
 * Create user avatar object
 */
export function createUserAvatar(name: string, imageUrl?: string): UserAvatar {
  return {
    name,
    initials: AvatarGenerator.getInitials(name),
    gradient: AvatarGenerator.getGradientForName(name),
    imageUrl,
  }
}
