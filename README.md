# Project LabelV2 - 图像标注工具

## 项目概述

Project LabelV2 是一个基于 React + TypeScript + Paper.js 开发的图像标注工具，提供丰富的绘图工具和标注功能。该项目主要用于图像标注、数据标注和可视化编辑等场景。

## 技术栈

### 核心技术
- **React 18.2.0** - 前端框架
- **TypeScript 5.4.3** - 类型安全
- **Paper.js 0.12.17** - 2D 矢量图形库
- **Redux Toolkit 2.2.1** - 状态管理
- **React Router 6.22.3** - 路由管理

### UI 组件库
- **Ant Design 5.15.1** - UI 组件库
- **Tailwind CSS 3.0.2** - 样式框架
- **Framer Motion 11.3.8** - 动画库
- **React Icons 5.2.1** - 图标库

### 图形和动画
- **Three.js 0.162.0** - 3D 图形库
- **Lottie React 2.4.0** - 动画渲染
- **TSParticles 3.3.0** - 粒子效果
- **Lucky Canvas 0.1.13** - 抽奖转盘组件

### 开发工具
- **Webpack 5.64.4** - 模块打包
- **Babel** - JavaScript 编译器
- **Jest 27.4.3** - 测试框架
- **ESLint** - 代码检查

## 项目结构

```
src/
├── components/           # 通用组件
│   ├── ui/              # UI 组件
│   ├── ButtonCommon.tsx # 通用按钮
│   ├── Card.tsx         # 卡片组件
│   └── ...
├── pages/
│   └── Label/           # 标注功能模块
│       ├── Center/      # 居中组件
│       ├── Draw/        # 绘图区域
│       ├── Tool/        # 绘图工具
│       │   ├── Brush/   # 画笔工具
│       │   ├── Pencil/ # 铅笔工具
│       │   └── Rect/    # 矩形工具
│       ├── PathItem/    # 路径项组件
│       └── ColorProvider/ # 颜色管理
├── utils/               # 工具函数
│   ├── paperjsWeapon.ts # Paper.js 工具函数
│   └── threejsWeapon.ts # Three.js 工具函数
├── store/               # 状态管理
├── assets/              # 静态资源
└── router/              # 路由配置
```

## 核心功能

### 1. 图像标注系统
- **多工具支持**: 铅笔、画笔、矩形、喷枪等多种绘图工具
- **颜色选择**: 实时颜色选择器，支持十六进制颜色输入
- **路径管理**: 标注路径的创建、编辑和删除
- **图像导入**: 支持导入图片进行标注

### 2. 绘图工具
- **铅笔工具 (Pencil)**: 自由绘制线条
- **画笔工具 (Brush)**: 圆形画笔，支持不同大小
- **矩形工具 (Rect)**: 绘制矩形框
- **喷枪工具 (Spray)**: 喷枪效果绘制
- **指针工具 (Pointer)**: 选择和移动工具

### 3. 画布功能
- **缩放控制**: 鼠标滚轮缩放
- **平移操作**: 拖拽移动画布
- **坐标显示**: 实时显示鼠标坐标
- **导出功能**: 支持导出为 PNG 图片

### 4. 状态管理
- **Redux Toolkit**: 全局状态管理
- **Context API**: 颜色状态管理
- **本地存储**: 标注数据持久化

## 主要组件说明

### LabelComponent (主标注组件)
```typescript
// 位置: src/pages/Label/index.tsx
// 功能: 标注工具的主界面，整合所有绘图工具和功能
```

### DrawComponent (绘图区域)
```typescript
// 位置: src/pages/Label/Draw/index.tsx
// 功能: 基于 Paper.js 的绘图画布，支持多种绘图工具
```

### 绘图工具组件
- **Pencil**: 铅笔工具，支持自由绘制
- **Brush**: 画笔工具，圆形画笔效果
- **Rect**: 矩形工具，绘制矩形框
- **Spray**: 喷枪工具，粒子效果绘制

### PathItem (路径管理)
```typescript
// 位置: src/pages/Label/PathItem/index.tsx
// 功能: 管理所有标注路径，支持选择和删除
```

## 开发环境设置

### 环境要求
- Node.js >= 16.0.0
- npm 或 yarn

### 安装依赖
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器
```bash
npm start
# 或
yarn start
```

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 运行测试
```bash
npm test
# 或
yarn test
```

## 使用说明

### 基本操作
1. **选择工具**: 点击左侧工具栏中的工具图标
2. **选择颜色**: 点击颜色选择器，选择绘制颜色
3. **开始绘制**: 在画布上拖拽鼠标进行绘制
4. **管理路径**: 右侧面板显示所有标注路径，可点击选择
5. **导出图片**: 点击"Export Picture"按钮导出标注结果

### 快捷键
- **鼠标滚轮**: 缩放画布
- **拖拽**: 移动画布视图
- **点击**: 选择工具或路径

## 技术特色

### 1. Paper.js 集成
- 基于 Paper.js 的强大 2D 图形能力
- 支持矢量图形操作
- 高性能的图形渲染

### 2. 模块化设计
- 组件化的工具系统
- 可扩展的架构设计
- 清晰的代码结构

### 3. 状态管理
- Redux Toolkit 全局状态
- Context API 局部状态
- 响应式数据更新

### 4. 用户体验
- 直观的界面设计
- 流畅的交互体验
- 实时反馈

## 扩展功能

### 已实现
- 多种绘图工具
- 颜色管理系统
- 路径管理
- 图片导出

### 可扩展
- 更多绘图工具（椭圆、多边形等）
- 图层管理
- 撤销/重做功能
- 标注数据导入/导出
- 协作功能

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- 项目维护者: didadida262
- 项目地址: [GitHub Repository]

## 更新日志

### v0.1.0
- 初始版本发布
- 基础标注功能
- 多种绘图工具
- 颜色管理
- 路径管理

---

*最后更新: 2025年1月*