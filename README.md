# Patched Docker Image

[English](./README.md) | [中文](./README.zh.md)

## What this repository solves

This fork only keeps the GitHub Action needed to build a patched Docker image from upstream LobeHub.

The upstream image needs a small patch set for iOS viewport behavior, input zoom behavior, and other upstream fixes tracked here. This repository intentionally keeps only the minimal files required to build and publish that patched image.

## Trigger

Runs automatically every 30 minutes in Asia/Shanghai. If several upstream releases land between runs, the workflow catches up and builds every missed version. Manual dispatch builds the version you specify.
