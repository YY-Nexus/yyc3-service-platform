# 言语云企业管理系统 (YanYu Cloud Enterprise Management System)

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**智能化、一体化的现代企业管理平台**

[功能特性](#功能特性) • [快速开始](#快速开始) • [技术栈](#技术栈) • [文档](#文档) • [贡献](#贡献)

</div>

---

## 📋 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [AI功能配置](#ai功能配置)
- [项目结构](#项目结构)
- [核心功能](#核心功能)
- [文档](#文档)
- [开发指南](#开发指南)
- [部署](#部署)
- [贡献](#贡献)
- [许可证](#许可证)

## 🎯 项目简介

言语云企业管理系统是一个功能全面、技术先进的现代化企业管理平台。系统集成了AI智能助手、数据分析、任务管理、客户关系管理、财务管理等核心功能，支持PWA离线使用，提供卓越的用户体验。

### 核心优势

- 🤖 **AI驱动**: 集成本地大语言模型，提供智能推荐和预测分析
- 📱 **多端适配**: 完美支持桌面端和移动端，响应式设计
- 🔄 **离线优先**: PWA支持，离线也能正常使用
- 📊 **数据可视化**: 丰富的图表和报表，数据一目了然
- ⚡ **高性能**: 优化的加载速度和流畅的交互体验
- 🎨 **现代UI**: 精美的界面设计，优秀的用户体验

## ✨ 功能特性

### 🤖 AI智能功能

- **AI智能助手**: 对话式AI助手，随时解答问题
- **智能推荐**: 基于数据分析的个性化业务建议
- **预测分析**: 销售预测、客户增长预测、需求预测
- **异常检测**: 自动识别业务数据异常
- **自然语言查询**: 用自然语言查询业务数据
- **自动化规则**: 智能自动化业务流程

### 📊 核心业务模块

- **仪表盘**: 实时业务数据概览和关键指标
- **任务管理**: 完整的任务生命周期管理
- **客户管理**: CRM功能，客户关系全流程管理
- **财务管理**: 收支管理、发票管理、财务报表
- **OKR管理**: 目标与关键结果管理
- **审批流程**: 灵活的审批工作流
- **沟通协作**: 团队协作和沟通工具
- **KPI管理**: 绩效指标跟踪和评估
- **数据分析**: 多维度数据分析和可视化

### 🔧 技术特性

- **PWA支持**: 可安装为桌面/移动应用
- **离线功能**: 离线数据存储和后台同步
- **实时通知**: Web Push推送通知
- **性能监控**: 实时性能监控和优化
- **移动优化**: 触摸手势、移动端专属UI
- **主题定制**: 支持自定义主题和样式

## 🛠 技术栈

### 前端框架
- **Next.js 14**: React框架，支持SSR和SSG
- **React 18.2**: 用户界面库
- **TypeScript 5.0**: 类型安全的JavaScript

### UI组件
- **Radix UI**: 无障碍组件库
- **Tailwind CSS 3.4**: 实用优先的CSS框架
- **Lucide React**: 精美的图标库
- **Recharts 2.8**: 数据可视化图表库

### AI集成
- **Ollama**: 本地大语言模型服务
- **Qwen2.5**: 阿里通义千问模型

### 数据管理
- **IndexedDB**: 浏览器本地数据库
- **Background Sync API**: 后台数据同步

### 测试
- **Vitest**: 单元测试框架
- **Testing Library**: React组件测试

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 或 pnpm

### 安装步骤

1. **克隆项目**
\`\`\`bash
git clone https://github.com/yourusername/enterprise-management-system.git
cd enterprise-management-system
\`\`\`

2. **安装依赖**
\`\`\`bash
npm install
# 或
yarn install
# 或
pnpm install
\`\`\`

3. **配置环境变量**
\`\`\`bash
cp .env.example .env.local
\`\`\`

编辑 `.env.local` 文件，配置必要的环境变量。

4. **启动开发服务器**
\`\`\`bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
\`\`\`

5. **访问应用**

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🤖 AI功能配置

### 安装Ollama

#### macOS/Linux
\`\`\`bash
curl -fsSL https://ollama.ai/install.sh | sh
\`\`\`

#### Windows
下载并安装: [https://ollama.ai/download](https://ollama.ai/download)

### 下载AI模型

\`\`\`bash
# 推荐使用 Qwen2.5 7B 模型
ollama pull qwen2.5:7b

# 或其他模型
ollama pull llama2
ollama pull mistral
\`\`\`

### 启动Ollama服务

\`\`\`bash
ollama serve
\`\`\`

### 配置环境变量

在 `.env.local` 中添加:

\`\`\`env
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434
NEXT_PUBLIC_OLLAMA_MODEL=qwen2.5:7b
OLLAMA_TIMEOUT=30000
OLLAMA_TEMPERATURE=0.7
OLLAMA_TOP_P=0.9
OLLAMA_MAX_TOKENS=2048
\`\`\`

## 📁 项目结构

\`\`\`
enterprise-management-system/
├── app/                    # Next.js应用目录
│   ├── page.tsx           # 主页面
│   ├── layout.tsx         # 根布局
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── ui/               # UI基础组件
│   ├── mobile/           # 移动端组件
│   ├── charts/           # 图表组件
│   ├── dashboard-content.tsx
│   ├── task-management.tsx
│   ├── customer-management.tsx
│   ├── ai-assistant-widget.tsx
│   └── ai-recommendations-panel.tsx
├── lib/                  # 工具库
│   ├── ai-enhancement-service.ts
│   ├── ollama-service.ts
│   ├── local-database.ts
│   └── background-sync.ts
├── hooks/                # React Hooks
├── docs/                 # 文档
│   ├── AI_SYSTEM_GUIDE.md
│   └── SYSTEM_ARCHITECTURE.md
├── public/               # 静态资源
│   ├── sw.js            # Service Worker
│   └── manifest.json    # PWA清单
└── package.json         # 依赖配置
\`\`\`

## 🎯 核心功能

### 仪表盘
- 实时业务数据展示
- 关键指标监控
- 快速操作入口
- 最近活动记录
- AI智能推荐

### 任务管理
- 任务创建和分配
- 优先级管理
- 进度跟踪
- 依赖关系管理
- 时间跟踪

### 客户管理
- 客户信息管理
- 客户生命周期跟踪
- 客户满意度分析
- 销售机会管理
- 客户标签分类

### 财务管理
- 收支记录
- 发票管理
- 财务报表
- 税务计算
- 预算管理

### 数据分析
- 销售分析
- 客户分析
- 产品分析
- 地区分析
- 绩效分析

## 📚 文档

- [AI系统指南](docs/AI_SYSTEM_GUIDE.md) - AI功能完整使用指南
- [系统架构文档](docs/SYSTEM_ARCHITECTURE.md) - 技术架构详解
- [API文档](docs/API_REFERENCE.md) - API接口文档
- [开发指南](docs/DEVELOPMENT_GUIDE.md) - 开发规范和最佳实践

## 💻 开发指南

### 开发命令

\`\`\`bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 运行测试
npm run test

# 类型检查
npm run type-check

# 代码检查
npm run lint
\`\`\`

### 代码规范

- 使用TypeScript进行类型安全开发
- 遵循ESLint规则
- 使用Prettier格式化代码
- 编写单元测试
- 提交前进行代码审查

### 分支管理

- `main`: 生产环境分支
- `develop`: 开发环境分支
- `feature/*`: 功能开发分支
- `bugfix/*`: 问题修复分支
- `hotfix/*`: 紧急修复分支

## 🚢 部署

### Vercel部署（推荐）

1. 连接GitHub仓库到Vercel
2. 配置环境变量
3. 自动部署

### Docker部署

\`\`\`bash
# 构建镜像
docker build -t enterprise-management-system .

# 运行容器
docker run -p 3000:3000 enterprise-management-system
\`\`\`

### 传统部署

\`\`\`bash
# 构建
npm run build

# 启动
npm run start
\`\`\`

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

### 贡献指南

- 遵循项目代码规范
- 编写清晰的提交信息
- 添加必要的测试
- 更新相关文档

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 团队

**YanYu Cloud Team**

- 项目负责人: [@YY-Nexus](https://github.com/YY-Nexus)
- 技术支持: support@yanyucloud.com
- 反馈建议: feedback@yanyucloud.com

## 🙏 致谢

感谢所有为本项目做出贡献的开发者！

特别感谢以下开源项目:
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Ollama](https://ollama.ai/)

---

<div align="center">

**[⬆ 回到顶部](#言语云企业管理系统-yanyu-cloud-enterprise-management-system)**

Made with ❤️ by YanYu Cloud Team

</div>
