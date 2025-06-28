# Vue3 设计与实现学习项目

这是一个专门用于学习Vue3核心原理和实现的项目，包含完整的开发环境和测试框架。

## 🎯 项目目标

- 深入理解Vue3的响应式系统原理
- 学习Vue3的组件系统设计
- 掌握虚拟DOM的diff算法
- 了解模板编译的完整流程
- 通过手写实现加深对Vue3的理解

## 📁 项目结构

```
src/
├── learning/           # 学习资料和文档
│   ├── reactivity/     # 响应式系统学习
│   ├── components/     # 组件系统学习
│   ├── vdom/          # 虚拟DOM学习
│   └── compiler/      # 模板编译学习
├── my-vue/            # 自己实现的Vue核心功能
│   └── reactivity/    # 响应式系统实现
├── tests/             # 测试用例
│   └── reactivity/    # 响应式系统测试
└── views/             # 页面组件
    └── learning/      # 学习页面
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 运行特定测试文件
pnpm test reactivity
```

## 📚 学习模块

### 1. 响应式系统 (Reactivity)

**学习内容：**
- `reactive()` - 创建响应式对象
- `ref()` - 创建响应式引用
- `computed()` - 创建计算属性
- `effect()` - 副作用函数
- 依赖收集与派发更新机制

**测试对比：**
- 官方Vue3 API测试
- 自己实现的API测试
- 功能对比和差异分析

### 2. 组件系统 (Components)

**学习内容：**
- 组件的创建和挂载
- 组件的更新和卸载
- 组件的生命周期
- 组件间的通信机制

### 3. 虚拟DOM (Virtual DOM)

**学习内容：**
- 虚拟DOM的创建
- diff算法的实现
- patch更新的过程
- 性能优化策略

### 4. 模板编译 (Compiler)

**学习内容：**
- 模板解析成AST
- AST优化和转换
- 代码生成
- 运行时编译

## 🧪 测试框架

项目使用Vitest作为测试框架，支持：

- 单元测试
- 组件测试
- 覆盖率报告
- 测试UI界面

### 测试文件命名规范

- `*.test.ts` - 单元测试
- `*.spec.ts` - 规范测试
- `__tests__/` - 测试目录

## 🛠️ 开发工具

- **Vue 3** - 前端框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Vitest** - 测试框架
- **Vue Router** - 路由管理
- **Pinia** - 状态管理
- **ESLint** - 代码检查
- **Prettier** - 代码格式化

## 📖 学习路径

1. **基础环境搭建** ✅
2. **响应式系统学习** 🔄
3. **组件系统学习** ⏳
4. **虚拟DOM学习** ⏳
5. **模板编译学习** ⏳
6. **完整框架实现** ⏳

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📝 学习笔记

在学习过程中，建议：

1. 先运行官方测试用例理解API行为
2. 阅读源码理解实现原理
3. 自己实现相同的功能
4. 用测试用例验证自己的实现
5. 对比差异，深入理解原理

## 🔗 相关资源

- [Vue3 官方文档](https://vuejs.org/)
- [Vue3 源码](https://github.com/vuejs/core)
- [Vue3 响应式原理](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Vitest 文档](https://vitest.dev/)

## �� 许可证

MIT License
