# Patched Docker Image

[English](./README.md) | [中文](./README.zh.md)

## 这个仓库解决什么问题

这个 fork 只保留用于构建 patched Docker 镜像的 GitHub Action。

上游镜像需要一组本地补丁，用来修正 iOS 场景下的 viewport、输入框缩放，以及这里记录的其他上游修复。这个仓库只保留构建和发布该镜像所需的最小文件集合。

## 触发

每 30 分钟自动触发一次，时区是 Asia/Shanghai。如果两次执行之间上游发布了多个版本，工作流会把漏掉的版本全部补建。
