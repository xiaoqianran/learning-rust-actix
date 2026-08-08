# Rust + Actix 实战学习

交互式中文 **Rust / actix-web** 教程：课程 + 测验 + 进度 + 代码操场 + 模拟 REST 工坊。

**仓库：** [https://github.com/xiaoqianran/learning-rust-actix](https://github.com/xiaoqianran/learning-rust-actix)

> 姊妹项目：[learning-vue3](https://github.com/xiaoqianran/learning-vue3)

---

## 这是什么

面向想系统学习 **Rust 后端** 与 **actix-web** 的同学。内容以「读一点、动手一点、测一点」组织。

你可以：

- 按路径学完 **40+ 节** 课程（讲解 + 对应源码 + 交互模拟 Demo + 小测验）
- 在 **代码操场** 阅读完整 Actix crate 模板并模拟 HTTP 请求
- 在 **REST 工坊** 练登录、401、笔记 CRUD（模拟 API）
- 用 **速查表 / 文档地图 / 学习中心 / 错题本 / 结业证明** 跟进度

> 说明：本站用 React + TanStack Start 承载教学内容；Actix 源码需在本机 `cargo run` 验证。Demo 为浏览器内行为模拟。

---

## 功能一览

| 模块 | 路径 | 说明 |
|------|------|------|
| 课程 | `/lesson/:slug` | 正文、源码、模拟 Demo、测验、笔记 |
| 首页大纲 | `/` | 搜索、路径筛选、进度条 |
| 代码操场 | `/playground` | Actix 多文件模板 + 请求模拟 |
| REST 工坊 | `/studio` | 模拟 API + 闯关任务 |
| 文档地图 | `/docs` | 对照 actix.rs / Rust Book |
| 主题 | 全局 | Catppuccin（Mocha/Macchiato/Frappé/Latte + Accent） |
| 速查表 | `/cheatsheet` | 一页核心 API |
| 学习中心 | `/hub` | 打卡、收藏、路径进度 |
| 练习场 | `/lab` | 综合练习 |
| 错题本 | `/mistakes` | 测验错题回顾 |
| 结业证明 | `/certificate` | 全部完成后解锁 |

### 工坊演示账号

```text
邮箱：demo@actix.dev
密码：password123
```

---

## 学习路径

| 路径 | 你学到什么 |
|------|------------|
| **Rust 基础** | 所有权、Result、async、Cargo、Serde |
| **Actix 入门** | HttpServer、App、路由、Handler、Scope |
| **请求提取** | Path / Query / Json / Data |
| **中间件** | Logger、鉴权、错误、CORS |
| **REST 实战** | 资源设计、CRUD、Token、校验 |
| **工程化** | 测试、配置、日志、部署 |
| **进阶模式** | 流、WebSocket、安全、面试串讲 |

建议顺序：

```text
Rust 基础 → Actix 入门 → 提取器 → 中间件 → 工坊闯关 → 工程化 → 进阶
```

---

## 本地运行

环境：Node 22+ 推荐。

```bash
git clone https://github.com/xiaoqianran/learning-rust-actix.git
cd learning-rust-actix
npm install
npm run dev
```

生产构建：

```bash
npm run build
# GitHub Pages:
npm run build:pages
```

---

## 技术栈

- React 19 + TanStack Start / Router
- Tailwind CSS v4 + Catppuccin
- Zustand（进度本地持久化）
- MSW（工坊模拟 API）

Actix 示例代码面向 **actix-web 4**。
