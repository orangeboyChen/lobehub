# Patched Docker Image

[English](./README.md) | [中文](./README.zh.md)

## What this repository solves

This fork only keeps the GitHub Action needed to build a patched Docker image from upstream LobeHub.

The upstream image needs a local patch for iOS viewport behavior and input zoom behavior. This repository intentionally keeps only the minimal files required to build and publish that patched image.

## Trigger

Runs automatically every day at 02:20 Asia/Shanghai.
