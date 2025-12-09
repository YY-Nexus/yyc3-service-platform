import {
  localDB,
  type Customer,
  type Task,
  type OKR,
  type Invoice,
  type User,
  type Notification,
} from "./local-database"

// 数据库种子数据服务
class DatabaseSeeder {
  // 初始化示例数据
  async seedDatabase(): Promise<void> {
    console.log("开始初始化示例数据...")

    try {
      // 检查是否已有数据
      const customerCount = await localDB.count("customers")
      if (customerCount > 0) {
        console.log("数据库已有数据，跳过初始化")
        return
      }

      // 创建示例客户数据
      await this.seedCustomers()

      // 创建示例任务数据
      await this.seedTasks()

      // 创建示例OKR数据
      await this.seedOKRs()

      // 创建示例发票数据
      await this.seedInvoices()

      // 创建示例用户数据
      await this.seedUsers()

      // 创建示例通知数据
      await this.seedNotifications()

      console.log("示例数据初始化完成")
    } catch (error) {
      console.error("示例数据初始化失败:", error)
      throw error
    }
  }

  private async seedCustomers(): Promise<void> {
    const customers: Omit<Customer, "id" | "createdAt" | "updatedAt">[] = [
      {
        name: "张总",
        company: "华润集团",
        email: "zhang@huarun.com",
        phone: "138-0000-1234",
        address: "深圳市南山区科技园",
        status: "active",
        value: 500000,
        lastContact: "2025-06-19",
        assignedTo: "李销售",
        tags: ["VIP", "大客户"],
        notes: "重要客户，需要定期维护关系",
      },
      {
        name: "王经理",
        company: "万科地产",
        email: "wang@vanke.com",
        phone: "139-0000-5678",
        address: "广州市天河区珠江新城",
        status: "potential",
        value: 300000,
        lastContact: "2025-06-18",
        assignedTo: "陈销售",
        tags: ["潜在客户", "房地产"],
        notes: "正在洽谈中，有合作意向",
      },
      {
        name: "刘总监",
        company: "碧桂园",
        email: "liu@bgy.com",
        phone: "137-0000-9012",
        address: "佛山市顺德区",
        status: "active",
        value: 800000,
        lastContact: "2025-06-17",
        assignedTo: "李销售",
        tags: ["VIP", "长期合作"],
        notes: "长期合作伙伴，信任度高",
      },
      {
        name: "陈董事长",
        company: "腾讯科技",
        email: "chen@tencent.com",
        phone: "136-0000-3456",
        address: "深圳市南山区腾讯大厦",
        status: "active",
        value: 1200000,
        lastContact: "2025-06-16",
        assignedTo: "王销售",
        tags: ["VIP", "科技企业", "战略客户"],
        notes: "战略级合作伙伴，优先级最高",
      },
      {
        name: "李总经理",
        company: "阿里巴巴",
        email: "li@alibaba.com",
        phone: "135-0000-7890",
        address: "杭州市西湖区阿里巴巴园区",
        status: "potential",
        value: 900000,
        lastContact: "2025-06-15",
        assignedTo: "赵销售",
        tags: ["潜在客户", "电商", "大企业"],
        notes: "正在评估合作方案，需要技术支持",
      },
    ]

    await localDB.batchCreate("customers", customers)
    console.log("客户示例数据创建完成")
  }

  private async seedTasks(): Promise<void> {
    const tasks: Omit<Task, "id" | "createdAt" | "updatedAt">[] = [
      {
        title: "产品原型设计",
        description: "完成新产品的原型设计和用户体验优化",
        status: "in-progress",
        priority: "high",
        assignee: "张设计师",
        dueDate: "2025-06-25",
        progress: 65,
        tags: ["设计", "原型", "UX"],
        project: "新产品开发",
      },
      {
        title: "数据库优化",
        description: "优化数据库查询性能，提升系统响应速度",
        status: "todo",
        priority: "medium",
        assignee: "李工程师",
        dueDate: "2025-06-30",
        progress: 0,
        tags: ["技术", "优化", "数据库"],
        project: "系统维护",
      },
      {
        title: "市场调研报告",
        description: "完成Q2季度市场调研报告的撰写和分析",
        status: "completed",
        priority: "medium",
        assignee: "王分析师",
        dueDate: "2025-06-20",
        progress: 100,
        tags: ["调研", "报告", "分析"],
        project: "市场分析",
      },
      {
        title: "客户需求分析",
        description: "分析重点客户的需求变化和市场趋势",
        status: "review",
        priority: "high",
        assignee: "陈经理",
        dueDate: "2025-06-22",
        progress: 90,
        tags: ["客户", "分析", "需求"],
        project: "客户服务",
      },
      {
        title: "系统安全审计",
        description: "进行全面的系统安全检查和漏洞修复",
        status: "todo",
        priority: "urgent",
        assignee: "赵工程师",
        dueDate: "2025-06-28",
        progress: 0,
        tags: ["安全", "审计", "修复"],
        project: "系统维护",
      },
    ]

    await localDB.batchCreate("tasks", tasks)
    console.log("任务示例数据创建完成")
  }

  private async seedOKRs(): Promise<void> {
    const okrs: Omit<OKR, "id" | "createdAt">[] = [
      {
        title: "提升客户满意度和服务质量",
        description: "通过优化服务流程和提升团队能力，显著提高客户满意度",
        owner: "张经理",
        department: "客服部",
        quarter: "2025-Q2",
        status: "active",
        progress: 75,
        dueDate: "2025-06-30",
        keyResults: [
          {
            id: "kr1",
            title: "客户满意度评分达到4.5分",
            description: "通过客户调研提升满意度评分",
            target: 4.5,
            current: 4.2,
            unit: "分",
            progress: 80,
            status: "on-track",
          },
          {
            id: "kr2",
            title: "客户投诉处理时间缩短至2小时内",
            description: "优化投诉处理流程，提升响应速度",
            target: 2,
            current: 3.5,
            unit: "小时",
            progress: 60,
            status: "at-risk",
          },
          {
            id: "kr3",
            title: "客户续约率提升至85%",
            description: "通过优质服务提高客户续约意愿",
            target: 85,
            current: 78,
            unit: "%",
            progress: 85,
            status: "on-track",
          },
        ],
      },
      {
        title: "数字化转型和系统优化",
        description: "推进企业数字化转型，提升运营效率",
        owner: "李总监",
        department: "技术部",
        quarter: "2025-Q2",
        status: "active",
        progress: 60,
        dueDate: "2025-06-30",
        keyResults: [
          {
            id: "kr4",
            title: "完成核心业务系统升级",
            description: "升级ERP和CRM系统，提升系统性能",
            target: 100,
            current: 65,
            unit: "%",
            progress: 65,
            status: "on-track",
          },
          {
            id: "kr5",
            title: "员工数字化技能培训覆盖率达到90%",
            description: "提升全员数字化操作能力",
            target: 90,
            current: 72,
            unit: "%",
            progress: 80,
            status: "on-track",
          },
        ],
      },
    ]

    await localDB.batchCreate("okrs", okrs)
    console.log("OKR示例数据创建完成")
  }

  private async seedInvoices(): Promise<void> {
    const invoices: Omit<Invoice, "id" | "createdAt" | "updatedAt">[] = [
      {
        number: "INV-2025-001",
        customerName: "华润集团",
        customerEmail: "finance@huarun.com",
        issueDate: "2025-01-15",
        dueDate: "2025-02-15",
        amount: 10000,
        taxAmount: 1300,
        totalAmount: 11300,
        status: "paid",
        items: [
          {
            id: "item1",
            description: "企业管理系统开发服务",
            quantity: 1,
            unitPrice: 10000,
            taxRate: 0.13,
            amount: 10000,
          },
        ],
      },
      {
        number: "INV-2025-002",
        customerName: "万科地产",
        customerEmail: "accounting@vanke.com",
        issueDate: "2025-01-20",
        dueDate: "2025-02-20",
        amount: 25000,
        taxAmount: 3250,
        totalAmount: 28250,
        status: "sent",
        items: [
          {
            id: "item2",
            description: "系统集成和实施服务",
            quantity: 1,
            unitPrice: 25000,
            taxRate: 0.13,
            amount: 25000,
          },
        ],
      },
      {
        number: "INV-2025-003",
        customerName: "碧桂园",
        customerEmail: "finance@bgy.com",
        issueDate: "2025-01-25",
        dueDate: "2025-01-25",
        amount: 15000,
        taxAmount: 1950,
        totalAmount: 16950,
        status: "overdue",
        items: [
          {
            id: "item3",
            description: "技术咨询和培训服务",
            quantity: 1,
            unitPrice: 15000,
            taxRate: 0.13,
            amount: 15000,
          },
        ],
      },
    ]

    await localDB.batchCreate("invoices", invoices)
    console.log("发票示例数据创建完成")
  }

  private async seedUsers(): Promise<void> {
    const users: Omit<User, "id" | "createdAt" | "updatedAt">[] = [
      {
        name: "管理员",
        email: "admin@yanyu-cloud.com",
        phone: "138-0000-0001",
        role: "系统管理员",
        department: "技术部",
        avatar: "",
        status: "active",
        lastLogin: new Date().toISOString(),
        permissions: ["system_admin", "user_manage", "data_export"],
        settings: {
          theme: "light",
          language: "zh-CN",
          notifications: {
            email: true,
            push: true,
            sms: false,
          },
          layout: {
            compact: false,
            sidebar: "expanded",
          },
        },
      },
      {
        name: "张经理",
        email: "zhang@yanyu-cloud.com",
        phone: "138-0000-0002",
        role: "部门经理",
        department: "客服部",
        avatar: "",
        status: "active",
        lastLogin: "2025-06-21T14:30:00Z",
        permissions: ["customer_view", "customer_edit", "task_view"],
        settings: {
          theme: "light",
          language: "zh-CN",
          notifications: {
            email: true,
            push: true,
            sms: true,
          },
          layout: {
            compact: false,
            sidebar: "expanded",
          },
        },
      },
      {
        name: "李总监",
        email: "li@yanyu-cloud.com",
        phone: "138-0000-0003",
        role: "技术总监",
        department: "技术部",
        avatar: "",
        status: "active",
        lastLogin: "2025-06-21T13:45:00Z",
        permissions: ["system_config", "user_manage", "data_export"],
        settings: {
          theme: "dark",
          language: "zh-CN",
          notifications: {
            email: true,
            push: false,
            sms: false,
          },
          layout: {
            compact: true,
            sidebar: "collapsed",
          },
        },
      },
    ]

    await localDB.batchCreate("users", users)
    console.log("用户示例数据创建完成")
  }

  private async seedNotifications(): Promise<void> {
    const notifications: Omit<Notification, "id" | "timestamp">[] = [
      {
        type: "system",
        title: "系统维护通知",
        content: "系统将于今晚22:00-24:00进行维护升级",
        isRead: false,
        priority: "medium",
        sender: "系统管理员",
        actionRequired: false,
        userId: "user1",
      },
      {
        type: "task",
        title: "任务即将到期",
        content: "您的任务'产品原型设计'将在2小时后到期",
        isRead: false,
        priority: "high",
        sender: "任务系统",
        actionRequired: true,
        userId: "user1",
      },
      {
        type: "approval",
        title: "采购申请待审批",
        content: "办公用品采购申请金额¥15,000，需要您的审批",
        isRead: false,
        priority: "urgent",
        sender: "采购部",
        actionRequired: true,
        userId: "user1",
      },
      {
        type: "message",
        title: "新消息提醒",
        content: "张经理发送了一条消息：关于下周会议安排",
        isRead: true,
        priority: "medium",
        sender: "张经理",
        actionRequired: false,
        userId: "user1",
      },
    ]

    await localDB.batchCreate("notifications", notifications)
    console.log("通知示例数据创建完成")
  }

  // 清空所有数据
  async clearAllData(): Promise<void> {
    const stores = ["customers", "tasks", "okrs", "invoices", "users", "notifications", "logs"]

    for (const store of stores) {
      await localDB.clearStore(store)
    }

    console.log("所有数据已清空")
  }

  // 重置数据库
  async resetDatabase(): Promise<void> {
    await this.clearAllData()
    await this.seedDatabase()
    console.log("数据库重置完成")
  }
}

export const databaseSeeder = new DatabaseSeeder()
