"use client"

type ActionType =
  | "schedule"
  | "notifications"
  | "profile"
  | "settings"
  | "create-task"
  | "add-customer"
  | "create-meeting"

interface ActionData {
  type: ActionType
  payload?: any
  timestamp: number
}

class ActionManager {
  private listeners: Map<ActionType, ((data: any) => void)[]> = new Map()
  private history: ActionData[] = []

  // 注册动作监听器
  on(actionType: ActionType, callback: (data: any) => void) {
    if (!this.listeners.has(actionType)) {
      this.listeners.set(actionType, [])
    }
    this.listeners.get(actionType)!.push(callback)
  }

  // 移除动作监听器
  off(actionType: ActionType, callback: (data: any) => void) {
    const callbacks = this.listeners.get(actionType)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  // 触发动作
  trigger(actionType: ActionType, payload?: any) {
    const actionData: ActionData = {
      type: actionType,
      payload,
      timestamp: Date.now(),
    }

    // 记录到历史
    this.history.push(actionData)
    if (this.history.length > 100) {
      this.history.shift() // 保持最近100条记录
    }

    // 触发监听器
    const callbacks = this.listeners.get(actionType)
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(payload)
        } catch (error) {
          console.error(`Action callback error for ${actionType}:`, error)
        }
      })
    }

    console.log(`Action triggered: ${actionType}`, payload)
  }

  // 获取动作历史
  getHistory(): ActionData[] {
    return [...this.history]
  }

  // 清空历史
  clearHistory() {
    this.history = []
  }
}

// 创建全局实例
export const actionManager = new ActionManager()

// 预定义的动作处理器
export const setupDefaultActions = () => {
  // 日程安排
  actionManager.on("schedule", (data) => {
    console.log("处理日程安排:", data)
    // 发送成功通知
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("日程已创建", {
        body: `会议"${data?.title || "新会议"}"已成功创建`,
        icon: "/images/yanyu-cloud-logo.png",
      })
    }
  })

  // 通知中心
  actionManager.on("notifications", (data) => {
    console.log("处理通知:", data)
    // 发送通知
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("言语云提醒", {
        body: data?.message || "通知功能正常工作！",
        icon: "/images/yanyu-cloud-logo.png",
      })
    }
  })

  // 个人资料
  actionManager.on("profile", (data) => {
    console.log("处理个人资料:", data)
    if (data?.updated) {
      // 发送更新成功通知
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("个人资料已更新", {
          body: "您的个人资料已成功保存",
          icon: "/images/yanyu-cloud-logo.png",
        })
      }
    }
  })

  // 系统设置
  actionManager.on("settings", (data) => {
    console.log("处理系统设置:", data)
    if (data?.updated) {
      // 发送设置保存成功通知
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("设置已保存", {
          body: "系统设置已成功更新",
          icon: "/images/yanyu-cloud-logo.png",
        })
      }
    }
  })

  // 创建任务
  actionManager.on("create-task", (data) => {
    console.log("创建新任务:", data)
    // 这里可以添加任务创建逻辑
  })

  // 添加客户
  actionManager.on("add-customer", (data) => {
    console.log("添加新客户:", data)
    // 这里可以添加客户创建逻辑
  })

  // 创建会议
  actionManager.on("create-meeting", (data) => {
    console.log("创建新会议:", data)
    // 这里可以添加会议创建逻辑
  })
}
