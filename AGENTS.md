# AGENTS — AI 代理指南

本文件为 AI 编码代理提供快速上手指引，目标是让代理在不耗费额外上下文的情况下，执行小而确定的变更。

**重要链接**

- 项目概览：[README.md](README.md)
- 行为指南：[CLAUDE.md](CLAUDE.md)

**快速命令**

- 安装依赖：`bun install`
- 本地开发：`bun run dev`
- 构建（验证变更）：`bun run build`
- 生产启动：`bun run start`
- 代码检查：`bun run lint`

**关键文件/目录**

- `app/` — Next.js 应用（app router），主要代码位于此。
- `package.json` — 脚本与依赖（参见上面的快速命令）。
- `next.config.ts` — Next 配置。
- `public/` — 静态资源。

**给代理的行为建议**

- 遵循 [CLAUDE.md](CLAUDE.md) 中的“最小可行改动 / 手术式修改”原则。
- 做出改动前，先阅读相关文件（在 commit 描述中引用它们的路径）。
- 变更后运行 `npm run build` 和 `npm run lint`（如有），并在 PR 描述中附上复现步骤。
- 避免大规模不经讨论的重构；在不确定时向用户提问并等待确认。

**建议的后续定制**

- 在 `.github/` 下添加 `copilot-instructions.md` 或者扩展 `AGENTS.md`，以便共享团队级别的指令。
- 创建 Skill：自动运行 `npm run lint && npm run build` 并在失败时返回可复制的错误信息。
- 创建 Prompt：任务模板（如“新增页面模板”“新增 API 路由模板”）。

如需我现在为你创建 `.github/copilot-instructions.md`、Skill、或将此内容合并到其他文件，请告诉我优先项。
