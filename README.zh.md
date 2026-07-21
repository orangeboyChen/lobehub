# Patched Docker Image

[English](./README.md) | [中文](./README.zh.md)

## 这个仓库解决什么问题

这个 fork 只保留用于构建 patched Docker 镜像的 GitHub Action。

上游镜像需要一组本地补丁，用来修正 iOS 场景下的 viewport、输入框缩放，以及这里记录的其他上游修复。这个仓库只保留构建和发布该镜像所需的最小文件集合。

## 当前 patch 清单

- 本地修复：`ios-viewport`、`sidebar-orphan-agents`、`lobehub-skill`、`docker-canvas-native-packages`
- 仍待上游合并的 PR patch：[#16325](https://github.com/lobehub/lobehub/pull/16325)、[#16545](https://github.com/lobehub/lobehub/pull/16545)、[#16609](https://github.com/lobehub/lobehub/pull/16609)、[#16616](https://github.com/lobehub/lobehub/pull/16616)

## 触发

每 30 分钟自动触发一次，时区是 Asia/Shanghai。如果两次执行之间上游发布了多个版本，工作流会把漏掉的版本全部补建。手动触发时会构建你指定的版本。

## Patch 自动修复

构建前，工作流会按顺序在 `upstream/canary` 上验证所有 patch。验证失败且启用
AI 修复时，它会调用 Codex，仅修复 patch 集合，重新验证完整集合后创建一个供审核的
PR，不会自动合并。已有修复 PR 会被视为等待人工处理；该 PR 未合并或关闭前，后续
定时运行会跳过 AI 修复，因此不会重复消耗 AI 调用。

请配置以下仓库设置以启用恢复流程：

- Actions secret `OPENAI_API_KEY`（必填）：Codex 的 API key。
- Actions secret `CODEX_RESPONSES_API_ENDPOINT`（可选）：完整的自定义 Responses
  API endpoint，例如 `https://example.openai.azure.com/openai/v1/responses`。
- Actions secret `CODEX_MODEL`（可选）：传给 Codex 的模型；留空则使用 action 默认值。
- Actions variable `ENABLE_AI_PATCH_REPAIR`：设为 `true` 时启用修复；不设置或设置为
  其他值时保持禁用。

对于失败的 `patches/pr-*` patch，Codex 还会查看对应的上游 PR。上游 PR 已合入或关闭
时，Codex 会删除对应 patch 及 README 条目；否则，修复后的 patch 必须保留原本预期的
功能，包括尚未进入 `upstream/canary` 的行为。
