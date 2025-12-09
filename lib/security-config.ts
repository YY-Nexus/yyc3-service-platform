// Security configuration and utilities

// Content Security Policy configuration
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': ["'self'", 'https://oapi.dingtalk.com', 'https://qyapi.weixin.qq.com', 'https://open.feishu.cn'],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
}

// Security headers configuration
export const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
}

// Generate CSP header string
export function generateCSPHeader(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ')
}

// CSRF token management
class CSRFTokenManager {
  private token: string | null = null
  private readonly TOKEN_KEY = 'csrf_token'
  private readonly TOKEN_HEADER = 'X-CSRF-Token'

  // Generate a cryptographically secure random token
  generateToken(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
    this.token = token
    
    // Store in sessionStorage (not localStorage for better security)
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(this.TOKEN_KEY, token)
    }
    
    return token
  }

  // Get current CSRF token
  getToken(): string | null {
    if (this.token) return this.token
    
    // Try to retrieve from sessionStorage
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.token = window.sessionStorage.getItem(this.TOKEN_KEY)
    }
    
    return this.token
  }

  // Validate CSRF token
  validateToken(token: string): boolean {
    const currentToken = this.getToken()
    return currentToken !== null && token === currentToken
  }

  // Get header name for CSRF token
  getHeaderName(): string {
    return this.TOKEN_HEADER
  }

  // Clear token (e.g., on logout)
  clearToken(): void {
    this.token = null
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(this.TOKEN_KEY)
    }
  }
}

export const csrfTokenManager = new CSRFTokenManager()

// Input sanitization utilities
export class InputSanitizer {
  // Sanitize HTML to prevent XSS
  static sanitizeHTML(input: string): string {
    // Check if running in browser environment
    if (typeof document === 'undefined') {
      // In server-side environment, use simple string escaping
      return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
    }
    
    // In browser environment, use DOM API
    const div = document.createElement('div')
    div.textContent = input
    return div.innerHTML
  }

  // Sanitize URL to prevent injection
  static sanitizeURL(url: string, baseURL?: string): string | null {
    try {
      // Check if running in browser environment
      const base = baseURL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost')
      const parsed = new URL(url, base)
      // Only allow http and https protocols
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return null
      }
      return parsed.toString()
    } catch {
      return null
    }
  }

  // Sanitize string for SQL-like queries (remove dangerous special characters)
  // Allows alphanumeric, spaces, hyphens, underscores, and dots
  static sanitizeQueryString(input: string): string {
    return input.replace(/[^\w\s\-\.]/gi, '')
  }

  // Validate email format
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Sanitize phone number
  static sanitizePhoneNumber(phone: string): string {
    return phone.replace(/[^\d+()-]/g, '')
  }

  // Limit string length to prevent buffer overflow
  static limitLength(input: string, maxLength: number): string {
    return input.substring(0, maxLength)
  }

  // Remove null bytes to prevent null byte injection
  static removeNullBytes(input: string): string {
    return input.replace(/\0/g, '')
  }
}

// Rate limiting utilities
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private readonly windowMs: number
  private readonly maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 100) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  // Check if request is allowed
  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []
    
    // Remove old requests outside the time window
    const recentRequests = requests.filter(time => now - time < this.windowMs)
    
    if (recentRequests.length >= this.maxRequests) {
      return false
    }
    
    recentRequests.push(now)
    this.requests.set(identifier, recentRequests)
    
    return true
  }

  // Get remaining requests
  getRemaining(identifier: string): number {
    const now = Date.now()
    const requests = this.requests.get(identifier) || []
    const recentRequests = requests.filter(time => now - time < this.windowMs)
    
    return Math.max(0, this.maxRequests - recentRequests.length)
  }

  // Reset rate limit for identifier
  reset(identifier: string): void {
    this.requests.delete(identifier)
  }
}

// API request rate limiter instance
export const apiRateLimiter = new RateLimiter(60000, 100) // 100 requests per minute

// Secure storage utilities
// WARNING: This provides basic obfuscation only, NOT encryption
// Do NOT use for storing sensitive data like passwords, tokens, or personal information
// For sensitive data, use server-side storage or proper encryption libraries
export class SecureStorage {
  // Check if storage is available
  private static isStorageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
      const storage = window[type]
      const testKey = '__storage_test__'
      storage.setItem(testKey, 'test')
      storage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  }

  // Store data with basic obfuscation (NOT secure encryption)
  // WARNING: This only provides basic obfuscation, not real security
  // Use only for non-sensitive data or preferences
  static setItem(key: string, value: string, useSession: boolean = false): boolean {
    const storageType = useSession ? 'sessionStorage' : 'localStorage'
    
    if (!this.isStorageAvailable(storageType)) {
      console.warn('Storage not available')
      return false
    }

    try {
      // Basic obfuscation using base64 (not encryption, just harder to read)
      const encoded = btoa(encodeURIComponent(value))
      window[storageType].setItem(key, encoded)
      return true
    } catch (error) {
      console.error('Failed to store data')
      return false
    }
  }

  // Retrieve data securely
  static getItem(key: string, useSession: boolean = false): string | null {
    const storageType = useSession ? 'sessionStorage' : 'localStorage'
    
    if (!this.isStorageAvailable(storageType)) {
      return null
    }

    try {
      const encoded = window[storageType].getItem(key)
      if (!encoded) return null
      
      return decodeURIComponent(atob(encoded))
    } catch (error) {
      console.error('Failed to retrieve data')
      return null
    }
  }

  // Remove item
  static removeItem(key: string, useSession: boolean = false): void {
    const storageType = useSession ? 'sessionStorage' : 'localStorage'
    
    if (!this.isStorageAvailable(storageType)) {
      return
    }

    window[storageType].removeItem(key)
  }

  // Clear all storage
  static clear(useSession: boolean = false): void {
    const storageType = useSession ? 'sessionStorage' : 'localStorage'
    
    if (!this.isStorageAvailable(storageType)) {
      return
    }

    window[storageType].clear()
  }
}
