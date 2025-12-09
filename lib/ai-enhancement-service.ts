// AI增强服务 - 全局AI能力集成
import { ollamaService } from "./ollama-service"

interface AIEnhancementConfig {
  enableSmartRecommendations: boolean
  enablePredictiveAnalytics: boolean
  enableAutomation: boolean
  enableNLPProcessing: boolean
  enableAnomalyDetection: boolean
}

interface SmartRecommendation {
  id: string
  type: "task" | "customer" | "finance" | "okr" | "general"
  title: string
  description: string
  priority: "high" | "medium" | "low"
  confidence: number
  actionable: boolean
  suggestedActions: string[]
  impact: string
  timestamp: number
}

interface PredictiveInsight {
  id: string
  category: string
  prediction: string
  confidence: number
  timeframe: string
  factors: string[]
  recommendations: string[]
  visualData?: any
}

interface AutomationRule {
  id: string
  name: string
  trigger: string
  conditions: any[]
  actions: any[]
  enabled: boolean
  lastExecuted?: number
  executionCount: number
}

class AIEnhancementService {
  private config: AIEnhancementConfig = {
    enableSmartRecommendations: true,
    enablePredictiveAnalytics: true,
    enableAutomation: true,
    enableNLPProcessing: true,
    enableAnomalyDetection: true,
  }

  private recommendations: SmartRecommendation[] = []
  private insights: PredictiveInsight[] = []
  private automationRules: AutomationRule[] = []
  private listeners: Map<string, Function[]> = new Map()

  // 初始化AI增强服务
  async initialize(): Promise<boolean> {
    try {
      console.log("🤖 初始化AI增强服务...")

      // 检查Ollama连接
      const connected = await ollamaService.checkConnection()
      if (!connected) {
        console.warn("⚠️ Ollama服务未连接，部分AI功能将受限")
      }

      // 加载默认自动化规则
      this.loadDefaultAutomationRules()

      console.log("✅ AI增强服务初始化完成")
      return true
    } catch (error) {
      console.error("❌ AI增强服务初始化失败:", error)
      return false
    }
  }

  // 生成智能推荐
  async generateSmartRecommendations(context: any): Promise<SmartRecommendation[]> {
    if (!this.config.enableSmartRecommendations) {
      return []
    }

    try {
      const analysisResult = await ollamaService.analyzeData({
        type: "recommendation",
        data: context,
        context: "基于当前业务数据生成智能推荐",
      })

      // 解析AI返回的推荐
      const recommendations = this.parseRecommendations(analysisResult, context)
      this.recommendations = recommendations

      // 通知监听器
      this.notifyListeners("recommendations", recommendations)

      return recommendations
    } catch (error) {
      console.error("生成智能推荐失败:", error)
      return this.getFallbackRecommendations(context)
    }
  }

  // 预测性分析
  async generatePredictiveInsights(data: any, category: string): Promise<PredictiveInsight[]> {
    if (!this.config.enablePredictiveAnalytics) {
      return []
    }

    try {
      const predictionResult = await ollamaService.analyzeData({
        type: "prediction",
        data,
        context: `对${category}进行预测分析`,
        parameters: { category, timeframe: "next_quarter" },
      })

      const insights = this.parsePredictions(predictionResult, category)
      this.insights = insights

      this.notifyListeners("insights", insights)

      return insights
    } catch (error) {
      console.error("生成预测性洞察失败:", error)
      return this.getFallbackInsights(category)
    }
  }

  // 异常检测
  async detectAnomalies(data: any[], metric: string): Promise<any[]> {
    if (!this.config.enableAnomalyDetection) {
      return []
    }

    try {
      // 使用统计方法检测异常
      const anomalies = this.statisticalAnomalyDetection(data, metric)

      // 如果有异常，使用AI分析原因
      if (anomalies.length > 0) {
        const analysis = await ollamaService.analyzeData({
          type: "data_analysis",
          data: { anomalies, originalData: data },
          context: `分析${metric}指标的异常情况`,
        })

        anomalies.forEach((anomaly) => {
          anomaly.aiAnalysis = analysis
        })
      }

      return anomalies
    } catch (error) {
      console.error("异常检测失败:", error)
      return []
    }
  }

  // 统计异常检测（使用Z-score方法）
  private statisticalAnomalyDetection(data: any[], metric: string): any[] {
    const values = data.map((d) => d[metric]).filter((v) => typeof v === "number")

    if (values.length < 3) return []

    const mean = values.reduce((sum, v) => sum + v, 0) / values.length
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length
    const stdDev = Math.sqrt(variance)

    const anomalies: any[] = []
    const threshold = 2 // Z-score阈值

    data.forEach((item, index) => {
      const value = item[metric]
      if (typeof value === "number") {
        const zScore = Math.abs((value - mean) / stdDev)
        if (zScore > threshold) {
          anomalies.push({
            index,
            value,
            zScore,
            deviation: value - mean,
            severity: zScore > 3 ? "high" : "medium",
            item,
          })
        }
      }
    })

    return anomalies
  }

  // 自然语言查询
  async processNaturalLanguageQuery(query: string, context?: any): Promise<string> {
    if (!this.config.enableNLPProcessing) {
      return "自然语言处理功能未启用"
    }

    try {
      const response = await ollamaService.askQuestion(query, context)
      return response
    } catch (error) {
      console.error("自然语言查询处理失败:", error)
      return "抱歉，无法处理您的查询。请稍后重试。"
    }
  }

  // 自动化规则执行
  async executeAutomationRules(trigger: string, data: any): Promise<void> {
    if (!this.config.enableAutomation) {
      return
    }

    const matchingRules = this.automationRules.filter((rule) => rule.enabled && rule.trigger === trigger)

    for (const rule of matchingRules) {
      try {
        // 检查条件
        const conditionsMet = this.evaluateConditions(rule.conditions, data)

        if (conditionsMet) {
          // 执行动作
          await this.executeActions(rule.actions, data)

          // 更新执行记录
          rule.lastExecuted = Date.now()
          rule.executionCount++

          console.log(`✅ 自动化规则执行成功: ${rule.name}`)
        }
      } catch (error) {
        console.error(`❌ 自动化规则执行失败: ${rule.name}`, error)
      }
    }
  }

  // 评估条件
  private evaluateConditions(conditions: any[], data: any): boolean {
    return conditions.every((condition) => {
      const { field, operator, value } = condition
      const fieldValue = this.getNestedValue(data, field)

      switch (operator) {
        case "equals":
          return fieldValue === value
        case "greater_than":
          return fieldValue > value
        case "less_than":
          return fieldValue < value
        case "contains":
          return String(fieldValue).includes(value)
        default:
          return false
      }
    })
  }

  // 执行动作
  private async executeActions(actions: any[], data: any): Promise<void> {
    for (const action of actions) {
      switch (action.type) {
        case "notify":
          this.sendNotification(action.message, data)
          break
        case "create_task":
          this.createAutomatedTask(action.taskData, data)
          break
        case "update_status":
          this.updateStatus(action.target, action.status, data)
          break
        case "send_email":
          this.sendEmail(action.recipient, action.subject, action.body, data)
          break
        default:
          console.warn(`未知的动作类型: ${action.type}`)
      }
    }
  }

  // 获取嵌套值
  private getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => current?.[key], obj)
  }

  // 发送通知
  private sendNotification(message: string, data: any): void {
    window.dispatchEvent(
      new CustomEvent("aiNotification", {
        detail: { message, data, timestamp: Date.now() },
      }),
    )
  }

  // 创建自动化任务
  private createAutomatedTask(taskData: any, data: any): void {
    window.dispatchEvent(
      new CustomEvent("createAutomatedTask", {
        detail: { taskData, sourceData: data, timestamp: Date.now() },
      }),
    )
  }

  // 更新状态
  private updateStatus(target: string, status: string, data: any): void {
    window.dispatchEvent(
      new CustomEvent("updateStatus", {
        detail: { target, status, data, timestamp: Date.now() },
      }),
    )
  }

  // 发送邮件
  private sendEmail(recipient: string, subject: string, body: string, data: any): void {
    console.log(`📧 发送邮件: ${recipient} - ${subject}`)
    // 实际实现需要集成邮件服务
  }

  // 加载默认自动化规则
  private loadDefaultAutomationRules(): void {
    this.automationRules = [
      {
        id: "auto-1",
        name: "高价值客户自动跟进",
        trigger: "customer_created",
        conditions: [{ field: "value", operator: "greater_than", value: 100000 }],
        actions: [
          { type: "create_task", taskData: { title: "跟进高价值客户", priority: "high" } },
          { type: "notify", message: "发现高价值客户，请及时跟进" },
        ],
        enabled: true,
        executionCount: 0,
      },
      {
        id: "auto-2",
        name: "逾期任务自动提醒",
        trigger: "task_overdue",
        conditions: [],
        actions: [
          { type: "notify", message: "任务已逾期，请尽快处理" },
          { type: "update_status", target: "task", status: "urgent" },
        ],
        enabled: true,
        executionCount: 0,
      },
      {
        id: "auto-3",
        name: "销售目标达成庆祝",
        trigger: "sales_milestone",
        conditions: [{ field: "achievement", operator: "greater_than", value: 100 }],
        actions: [{ type: "notify", message: "🎉 恭喜！销售目标已达成！" }],
        enabled: true,
        executionCount: 0,
      },
    ]
  }

  // 解析推荐
  private parseRecommendations(aiResponse: string, context: any): SmartRecommendation[] {
    // 简化的解析逻辑，实际应该更复杂
    const recommendations: SmartRecommendation[] = []

    // 基于上下文生成推荐
    if (context.sales && context.sales < context.target) {
      recommendations.push({
        id: `rec-${Date.now()}-1`,
        type: "general",
        title: "提升销售业绩",
        description: "当前销售额低于目标，建议加强市场推广和客户跟进",
        priority: "high",
        confidence: 0.85,
        actionable: true,
        suggestedActions: ["增加营销预算", "优化销售流程", "加强客户关系管理"],
        impact: "预计可提升销售额15-20%",
        timestamp: Date.now(),
      })
    }

    if (context.customerSatisfaction && context.customerSatisfaction < 4.0) {
      recommendations.push({
        id: `rec-${Date.now()}-2`,
        type: "customer",
        title: "改善客户满意度",
        description: "客户满意度评分偏低，需要关注服务质量",
        priority: "high",
        confidence: 0.78,
        actionable: true,
        suggestedActions: ["收集客户反馈", "优化服务流程", "加强员工培训"],
        impact: "提升客户满意度可增加复购率25%",
        timestamp: Date.now(),
      })
    }

    return recommendations
  }

  // 解析预测
  private parsePredictions(aiResponse: string, category: string): PredictiveInsight[] {
    return [
      {
        id: `insight-${Date.now()}`,
        category,
        prediction: aiResponse,
        confidence: 0.82,
        timeframe: "下季度",
        factors: ["历史趋势", "市场环境", "季节性因素"],
        recommendations: ["保持当前策略", "适度增加投入"],
      },
    ]
  }

  // 获取后备推荐
  private getFallbackRecommendations(context: any): SmartRecommendation[] {
    return [
      {
        id: `rec-fallback-${Date.now()}`,
        type: "general",
        title: "优化业务流程",
        description: "建议定期审查和优化业务流程以提高效率",
        priority: "medium",
        confidence: 0.7,
        actionable: true,
        suggestedActions: ["流程审查", "效率分析", "持续改进"],
        impact: "预计可提升整体效率10-15%",
        timestamp: Date.now(),
      },
    ]
  }

  // 获取后备洞察
  private getFallbackInsights(category: string): PredictiveInsight[] {
    return [
      {
        id: `insight-fallback-${Date.now()}`,
        category,
        prediction: "基于历史数据，预计保持稳定增长趋势",
        confidence: 0.65,
        timeframe: "下季度",
        factors: ["历史数据", "行业趋势"],
        recommendations: ["保持现有策略", "密切监控市场变化"],
      },
    ]
  }

  // 订阅事件
  subscribe(event: string, callback: Function): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)

    return () => {
      const callbacks = this.listeners.get(event)
      if (callbacks) {
        const index = callbacks.indexOf(callback)
        if (index > -1) {
          callbacks.splice(index, 1)
        }
      }
    }
  }

  // 通知监听器
  private notifyListeners(event: string, data: any): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach((callback) => callback(data))
    }
  }

  // 获取配置
  getConfig(): AIEnhancementConfig {
    return { ...this.config }
  }

  // 更新配置
  updateConfig(updates: Partial<AIEnhancementConfig>): void {
    this.config = { ...this.config, ...updates }
  }

  // 获取推荐
  getRecommendations(): SmartRecommendation[] {
    return [...this.recommendations]
  }

  // 获取洞察
  getInsights(): PredictiveInsight[] {
    return [...this.insights]
  }

  // 获取自动化规则
  getAutomationRules(): AutomationRule[] {
    return [...this.automationRules]
  }

  // 添加自动化规则
  addAutomationRule(rule: Omit<AutomationRule, "id" | "executionCount">): void {
    this.automationRules.push({
      ...rule,
      id: `auto-${Date.now()}`,
      executionCount: 0,
    })
  }

  // 更新自动化规则
  updateAutomationRule(id: string, updates: Partial<AutomationRule>): void {
    const index = this.automationRules.findIndex((r) => r.id === id)
    if (index > -1) {
      this.automationRules[index] = { ...this.automationRules[index], ...updates }
    }
  }

  // 删除自动化规则
  deleteAutomationRule(id: string): void {
    this.automationRules = this.automationRules.filter((r) => r.id !== id)
  }
}

// 导出服务实例
export const aiEnhancementService = new AIEnhancementService()

// 便捷函数
export const generateSmartRecommendations = async (context: any) => {
  return await aiEnhancementService.generateSmartRecommendations(context)
}

export const generatePredictiveInsights = async (data: any, category: string) => {
  return await aiEnhancementService.generatePredictiveInsights(data, category)
}

export const detectAnomalies = async (data: any[], metric: string) => {
  return await aiEnhancementService.detectAnomalies(data, metric)
}

export const askAIAssistant = async (query: string, context?: any) => {
  return await aiEnhancementService.processNaturalLanguageQuery(query, context)
}
