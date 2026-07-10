# Patched Docker Image

[English](./README.md) | [中文](./README.zh.md)

## What this repository solves

This fork only keeps the GitHub Action needed to build a patched Docker image from upstream LobeHub.

The upstream image needs a small patch set for iOS viewport behavior, input zoom behavior, and other upstream fixes tracked here. This repository intentionally keeps only the minimal files required to build and publish that patched image.

## Active patch set

- Local fixes: `ios-viewport`, `sidebar-orphan-agents`, `lobehub-skill`, `docker-canvas-native-packages`
- Upstream PR patches still pending upstream merge: [#16325](https://github.com/lobehub/lobehub/pull/16325), [#16545](https://github.com/lobehub/lobehub/pull/16545), [#16609](https://github.com/lobehub/lobehub/pull/16609), [#16616](https://github.com/lobehub/lobehub/pull/16616)

## Trigger

Runs automatically every 30 minutes in Asia/Shanghai. If several upstream releases land between runs, the workflow catches up and builds every missed version. Manual dispatch builds the version you specify.
