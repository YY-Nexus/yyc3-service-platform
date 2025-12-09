// 第三方系统集成服务
interface IntegrationConfig {
  appId: string
  appSecret: string
  baseUrl?: string
  webhookUrl?: string
  enabled: boolean
}

interface SyncResult {
  success: boolean
  message: string
  data?: any
  error?: string
}

class IntegrationService {
  private configs: Map<string, IntegrationConfig> = new Map()
  private webhookHandlers: Map<string, Function> = new Map()

  // Validate integration config to prevent injection
  private validateConfig(config: IntegrationConfig): boolean {
    if (!config || typeof config !== 'object') return false
    if (!config.appId || typeof config.appId !== 'string') return false
    if (!config.appSecret || typeof config.appSecret !== 'string') return false
    
    // Validate format to prevent injection
    const validIdPattern = /^[a-zA-Z0-9_-]{8,128}$/
    const validSecretPattern = /^[a-zA-Z0-9_-]{16,256}$/
    
    return validIdPattern.test(config.appId) && validSecretPattern.test(config.appSecret)
  }

  // 钉钉集成
  async configureDingTalk(config: IntegrationConfig): Promise<boolean> {
    try {
      // Validate config before using
      if (!this.validateConfig(config)) {
        console.error("钉钉集成配置验证失败")
        return false
      }

      // Note: DingTalk API requires GET with query params (not ideal for security)
      // In production, consider using a backend proxy to keep secrets server-side
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      // Use POST via backend API proxy for better security (recommended)
      // For now, using GET as per DingTalk API requirements
      const url = new URL("https://oapi.dingtalk.com/gettoken")
      url.searchParams.append("appkey", config.appId)
      url.searchParams.append("appsecret", config.appSecret)

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        // Store config without exposing secrets in logs
        this.configs.set("dingtalk", config)
        console.log("钉钉集成配置成功")
        return true
      } else {
        console.error("钉钉集成配置失败: HTTP", response.status)
      }
    } catch (error) {
      // Don't expose error details that might contain sensitive info
      console.error("钉钉集成配置失败")
    }
    return false
  }

  // 企业微信集成
  async configureWeChatWork(config: IntegrationConfig): Promise<boolean> {
    try {
      // Validate config before using
      if (!this.validateConfig(config)) {
        console.error("企业微信集成配置验证失败")
        return false
      }

      // Add timeout and proper URL encoding
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const url = new URL("https://qyapi.weixin.qq.com/cgi-bin/gettoken")
      url.searchParams.append("corpid", config.appId)
      url.searchParams.append("corpsecret", config.appSecret)

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        this.configs.set("wechat-work", config)
        console.log("企业微信集成配置成功")
        return true
      } else {
        console.error("企业微信集成配置失败: HTTP", response.status)
      }
    } catch (error) {
      console.error("企业微信集成配置失败")
    }
    return false
  }

  // 飞书集成
  async configureFeishu(config: IntegrationConfig): Promise<boolean> {
    try {
      // Validate config before using
      if (!this.validateConfig(config)) {
        console.error("飞书集成配置验证失败")
        return false
      }

      // Add timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch("https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          app_id: config.appId,
          app_secret: config.appSecret,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        this.configs.set("feishu", config)
        console.log("飞书集成配置成功")
        return true
      } else {
        console.error("飞书集成配置失败: HTTP", response.status)
      }
    } catch (error) {
      console.error("飞书集成配置失败")
    }
    return false
  }

  // 同步用户数据
  async syncUsers(platform: string): Promise<SyncResult> {
    const config = this.configs.get(platform)
    if (!config || !config.enabled) {
      return { success: false, message: "集成未配置或未启用" }
    }

    try {
      switch (platform) {
        case "dingtalk":
          return await this.syncDingTalkUsers(config)
        case "wechat-work":
          return await this.syncWeChatWorkUsers(config)
        case "feishu":
          return await this.syncFeishuUsers(config)
        default:
          return { success: false, message: "不支持的平台" }
      }
    } catch (error) {
      return { success: false, message: "同步失败", error: String(error) }
    }
  }

  // 钉钉用户同步
  private async syncDingTalkUsers(config: IntegrationConfig): Promise<SyncResult> {
    // 模拟钉钉用户同步
    console.log("开始同步钉钉用户数据...")

    // 这里应该调用真实的钉钉API
    const mockUsers = [
      { id: "001", name: "张三", department: "技术部", phone: "13800138001" },
      { id: "002", name: "李四", department: "销售部", phone: "13800138002" },
      { id: "003", name: "王五", department: "市场部", phone: "13800138003" },
    ]

    return {
      success: true,
      message: `成功同步 ${mockUsers.length} 个用户`,
      data: mockUsers,
    }
  }

  // 企业微信用户同步
  private async syncWeChatWorkUsers(config: IntegrationConfig): Promise<SyncResult> {
    console.log("开始同步企业微信用户数据...")

    const mockUsers = [
      { id: "001", name: "赵六", department: "人事部", phone: "13800138004" },
      { id: "002", name: "孙七", department: "财务部", phone: "13800138005" },
    ]

    return {
      success: true,
      message: `成功同步 ${mockUsers.length} 个用户`,
      data: mockUsers,
    }
  }

  // 飞书用户同步
  private async syncFeishuUsers(config: IntegrationConfig): Promise<SyncResult> {
    console.log("开始同步飞书用户数据...")

    const mockUsers = [
      { id: "001", name: "周八", department: "产品部", phone: "13800138006" },
      { id: "002", name: "吴九", department: "运营部", phone: "13800138007" },
    ]

    return {
      success: true,
      message: `成功同步 ${mockUsers.length} 个用户`,
      data: mockUsers,
    }
  }

  // 发送消息通知
  async sendNotification(platform: string, message: string, users: string[]): Promise<SyncResult> {
    const config = this.configs.get(platform)
    if (!config || !config.enabled) {
      return { success: false, message: "集成未配置或未启用" }
    }

    try {
      console.log(`向 ${platform} 发送通知:`, message, "目标用户:", users)

      // 模拟发送通知
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: true,
        message: `成功发送通知给 ${users.length} 个用户`,
      }
    } catch (error) {
      return { success: false, message: "发送通知失败", error: String(error) }
    }
  }

  // 创建审批流程
  async createApprovalProcess(platform: string, processData: any): Promise<SyncResult> {
    const config = this.configs.get(platform)
    if (!config || !config.enabled) {
      return { success: false, message: "集成未配置或未启用" }
    }

    try {
      console.log(`在 ${platform} 创建审批流程:`, processData)

      // 模拟创建审批流程
      await new Promise((resolve) => setTimeout(resolve, 1500))

      return {
        success: true,
        message: "审批流程创建成功",
        data: { processId: `${platform}_${Date.now()}` },
      }
    } catch (error) {
      return { success: false, message: "创建审批流程失败", error: String(error) }
    }
  }

  // 同步日程
  async syncCalendar(platform: string, events: any[]): Promise<SyncResult> {
    const config = this.configs.get(platform)
    if (!config || !config.enabled) {
      return { success: false, message: "集成未配置或未启用" }
    }

    try {
      console.log(`向 ${platform} 同步日程:`, events)

      // 模拟同步日程
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: true,
        message: `成功同步 ${events.length} 个日程事件`,
      }
    } catch (error) {
      return { success: false, message: "同步日程失败", error: String(error) }
    }
  }

  // Validate webhook signature to prevent unauthorized access
  private validateWebhookSignature(platform: string, signature: string, data: any): boolean {
    const config = this.configs.get(platform)
    if (!config || !config.appSecret) {
      return false
    }

    // Implement signature verification based on platform
    try {
      // For production, implement proper HMAC-SHA256 signature verification
      // Each platform has its own signature algorithm
      // This is a placeholder that requires the signature to exist
      // TODO: Implement platform-specific signature verification:
      // - DingTalk: HMAC-SHA256 with timestamp
      // - WeChat Work: SHA256 hash verification
      // - Feishu: Encrypt verification
      
      // For now, require signature to be present and non-empty as minimum security
      if (!signature || signature.trim().length === 0) {
        return false
      }
      
      // In production, implement actual cryptographic verification here
      // Example for DingTalk:
      // const timestamp = data.timestamp
      // const sign = crypto.createHmac('sha256', config.appSecret)
      //   .update(`${timestamp}\n${config.appSecret}`)
      //   .digest('base64')
      // return sign === signature
      
      console.warn("Webhook signature validation not fully implemented - implement before production use")
      return true
    } catch (error) {
      console.error("Webhook signature validation error")
      return false
    }
  }

  // 处理Webhook回调
  setupWebhook(platform: string, handler: Function) {
    // Validate platform name
    const validPlatforms = ["dingtalk", "wechat-work", "feishu"]
    if (!validPlatforms.includes(platform)) {
      console.error("不支持的平台")
      return
    }
    
    this.webhookHandlers.set(platform, handler)
    console.log(`设置 ${platform} Webhook处理器`)
  }

  // 处理Webhook请求
  async handleWebhook(platform: string, data: any, signature?: string): Promise<any> {
    // Validate platform
    const validPlatforms = ["dingtalk", "wechat-work", "feishu"]
    if (!validPlatforms.includes(platform)) {
      console.error("不支持的平台")
      return null
    }

    // Verify webhook signature if provided
    if (signature && !this.validateWebhookSignature(platform, signature, data)) {
      console.error("Webhook签名验证失败")
      return null
    }

    const handler = this.webhookHandlers.get(platform)
    if (handler) {
      try {
        return await handler(data)
      } catch (error) {
        console.error(`Webhook处理失败`)
        return null
      }
    }
    console.warn(`未找到 ${platform} 的Webhook处理器`)
    return null
  }

  // 获取集成状态
  getIntegrationStatus(platform: string) {
    const config = this.configs.get(platform)
    return {
      configured: !!config,
      enabled: config?.enabled || false,
      lastSync: new Date().toISOString(), // 模拟最后同步时间
    }
  }

  // 获取所有集成状态
  getAllIntegrationStatus() {
    const platforms = ["dingtalk", "wechat-work", "feishu", "tencent-meeting", "alipay", "wechat-pay"]
    const status: Record<string, any> = {}

    platforms.forEach((platform) => {
      status[platform] = this.getIntegrationStatus(platform)
    })

    return status
  }
}

// 导出服务实例
export const integrationService = new IntegrationService()

// 便捷函数
export const syncPlatformUsers = async (platform: string) => {
  return await integrationService.syncUsers(platform)
}

export const sendPlatformNotification = async (platform: string, message: string, users: string[]) => {
  return await integrationService.sendNotification(platform, message, users)
}

export const createPlatformApproval = async (platform: string, processData: any) => {
  return await integrationService.createApprovalProcess(platform, processData)
}
