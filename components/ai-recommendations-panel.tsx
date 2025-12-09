"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle, X } from "lucide-react"
import { aiEnhancementService } from "@/lib/ai-enhancement-service"

export function AIRecommendationsPanel() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadRecommendations()

    // 订阅推荐更新
    const unsubscribe = aiEnhancementService.subscribe("recommendations", (newRecommendations: any[]) => {
      setRecommendations(newRecommendations)
    })

    return () => unsubscribe()
  }, [])

  const loadRecommendations = async () => {
    setIsLoading(true)
    try {
      // 模拟业务上下文
      const context = {
        sales: 2847392,
        target: 3000000,
        customerSatisfaction: 4.2,
        taskCompletionRate: 0.85,
      }

      const recs = await aiEnhancementService.generateSmartRecommendations(context)
      setRecommendations(recs)
    } catch (error) {
      console.error("加载推荐失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const dismissRecommendation = (id: string) => {
    setRecommendations((prev) => prev.filter((rec) => rec.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4" />
      case "medium":
        return <TrendingUp className="w-4 h-4" />
      case "low":
        return <Lightbulb className="w-4 h-4" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  if (recommendations.length === 0 && !isLoading) {
    return null
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>AI智能推荐</CardTitle>
              <CardDescription>基于数据分析的智能建议</CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={loadRecommendations} disabled={isLoading}>
            {isLoading ? "加载中..." : "刷新"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <Card
            key={rec.id}
            className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-lg ${getPriorityColor(rec.priority)}`}>
                    {getPriorityIcon(rec.priority)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        置信度: {(rec.confidence * 100).toFixed(0)}%
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {rec.type}
                      </Badge>
                    </div>
                    {rec.impact && (
                      <div className="flex items-center space-x-1 text-xs text-green-600 mb-2">
                        <TrendingUp className="w-3 h-3" />
                        <span>{rec.impact}</span>
                      </div>
                    )}
                    {rec.suggestedActions && rec.suggestedActions.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium mb-1">建议行动:</p>
                        <ul className="space-y-1">
                          {rec.suggestedActions.map((action: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2 text-xs">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => dismissRecommendation(rec.id)} className="h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
