"use client"

// 通用按钮处理器
export class ButtonHandler {
  private static instance: ButtonHandler
  private handlers: Map<string, (data?: any) => void> = new Map()

  static getInstance(): ButtonHandler {
    if (!ButtonHandler.instance) {
      ButtonHandler.instance = new ButtonHandler()
    }
    return ButtonHandler.instance
  }

  // 注册按钮处理函数
  register(buttonId: string, handler: (data?: any) => void) {
    this.handlers.set(buttonId, handler)
    console.log(`按钮处理器已注册: ${buttonId}`)
  }

  // 执行按钮操作
  execute(buttonId: string, data?: any) {
    const handler = this.handlers.get(buttonId)
    if (handler) {
      console.log(`执行按钮操作: ${buttonId}`, data)
      try {
        handler(data)
      } catch (error) {
        console.error(`按钮操作执行失败: ${buttonId}`, error)
        this.showError(`操作失败: ${error}`)
      }
    } else {
      console.warn(`未找到按钮处理器: ${buttonId}`)
      this.showError(`功能暂未实现: ${buttonId}`)
    }
  }

  // 显示错误信息
  private showError(message: string) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("操作提示", {
        body: message,
        icon: "/images/yanyu-cloud-logo.png",
      })
    } else {
      alert(message)
    }
  }

  // 显示成功信息
  showSuccess(message: string) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("操作成功", {
        body: message,
        icon: "/images/yanyu-cloud-logo.png",
      })
    } else {
      console.log("成功:", message)
    }
  }

  // 获取所有已注册的处理器
  getRegisteredHandlers(): string[] {
    return Array.from(this.handlers.keys())
  }
}

// 导出单例实例
export const buttonHandler = ButtonHandler.getInstance()

// 预定义的通用操作
export const commonActions = {
  // 添加操作
  add: (type: string, data?: any) => {
    console.log(`添加${type}:`, data)
    buttonHandler.showSuccess(`${type}添加成功`)
  },

  // 编辑操作
  edit: (type: string, data?: any) => {
    console.log(`编辑${type}:`, data)
    buttonHandler.showSuccess(`${type}编辑成功`)
  },

  // 删除操作
  delete: (type: string, data?: any) => {
    if (confirm(`确定要删除这个${type}吗？`)) {
      console.log(`删除${type}:`, data)
      buttonHandler.showSuccess(`${type}删除成功`)
    }
  },

  // 导出操作
  export: (type: string, data?: any) => {
    console.log(`导出${type}:`, data)
    buttonHandler.showSuccess(`${type}导出成功`)
  },

  // 分析操作
  analyze: (type: string, data?: any) => {
    console.log(`分析${type}:`, data)
    buttonHandler.showSuccess(`${type}分析完成`)
  },

  // 搜索操作
  search: (query: string, filters?: any) => {
    console.log(`搜索: ${query}`, filters)
    buttonHandler.showSuccess("搜索完成")
  },

  // 筛选操作
  filter: (type: string, value: string) => {
    console.log(`筛选${type}: ${value}`)
    buttonHandler.showSuccess("筛选应用成功")
  },
}
