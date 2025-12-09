"use client"

import { useState, useCallback } from "react"
import { backgroundSync } from "@/lib/background-sync"

interface UseOfflineOperationOptions {
  module: string
  onSuccess?: (data: any) => void
  onError?: (error: Error) => void
  onOfflineQueued?: (actionId: number) => void
}

export function useOfflineOperation(options: UseOfflineOperationOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Validate endpoint to prevent SSRF
  const validateEndpoint = useCallback((endpoint: string): boolean => {
    try {
      const url = new URL(endpoint, window.location.origin)
      return url.origin === window.location.origin
    } catch {
      return false
    }
  }, [])

  // Sanitize headers to prevent injection
  const sanitizeHeaders = useCallback((headers?: Record<string, string>): Record<string, string> => {
    const sanitized: Record<string, string> = {}
    if (!headers) return sanitized
    
    const allowedHeaders = ['Content-Type', 'Authorization', 'Accept', 'X-CSRF-Token']
    for (const [key, value] of Object.entries(headers)) {
      if (allowedHeaders.includes(key) && typeof value === 'string') {
        sanitized[key] = value.replace(/[\r\n]/g, '')
      }
    }
    return sanitized
  }, [])

  const executeOperation = useCallback(
    async (
      endpoint: string,
      method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
      data?: any,
      headers?: Record<string, string>,
    ) => {
      setIsLoading(true)
      setError(null)

      // Validate endpoint
      if (!validateEndpoint(endpoint)) {
        const error = new Error("Invalid endpoint")
        setError(error)
        options.onError?.(error)
        throw error
      }

      // Sanitize headers
      const sanitizedHeaders = sanitizeHeaders(headers)

      try {
        if (navigator.onLine) {
          // Add timeout to prevent hanging requests
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 30000)

          // 在线时直接执行
          const response = await fetch(endpoint, {
            method,
            headers: {
              "Content-Type": "application/json",
              ...sanitizedHeaders,
            },
            body: data ? JSON.stringify(data) : undefined,
            signal: controller.signal,
          }).finally(() => {
            clearTimeout(timeoutId)
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
          }

          const result = await response.json()
          options.onSuccess?.(result)
          return result
        } else {
          // 离线时添加到队列
          const actionId = await backgroundSync.queueOfflineAction({
            type: method === "POST" ? "create" : method === "PUT" ? "update" : "delete",
            module: options.module,
            endpoint,
            method,
            data,
            headers: sanitizedHeaders,
          })

          options.onOfflineQueued?.(actionId)
          return { offline: true, actionId }
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error("操作失败")
        setError(error)
        options.onError?.(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [options, validateEndpoint, sanitizeHeaders],
  )

  return {
    executeOperation,
    isLoading,
    error,
  }
}
