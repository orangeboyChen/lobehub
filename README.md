# Patched Docker Image

[English](./README.md) | [中文](./README.zh.md)

## What this repository solves

This fork only keeps the GitHub Action needed to build a patched Docker image from upstream LobeHub.

The upstream image needs a small patch set for iOS viewport behavior, input zoom behavior, and other upstream fixes tracked here. This repository intentionally keeps only the minimal files required to build and publish that patched image.

## Active patch set

- Local fixes: `ios-viewport`, `lobehub-skill`, `docker-canvas-native-packages`
- Upstream PRs:
  - [#16609](https://github.com/lobehub/lobehub/pull/16609): make the connector detail header responsive
  - [#16616](https://github.com/lobehub/lobehub/pull/16616): localize the API Keys empty state
  - [#18239](https://github.com/lobehub/lobehub/pull/18239): show agents without sessions in the SPA sidebar
  - [#18240](https://github.com/lobehub/lobehub/pull/18240): preserve desktop group conversation routes
  - [#18242](https://github.com/lobehub/lobehub/pull/18242): allow group members to start under an active Supervisor
  - [#18449](https://github.com/lobehub/lobehub/pull/18449): use group avatars for supervisor surfaces
  - [#18266](https://github.com/lobehub/lobehub/pull/18266): preserve the original group agent when retrying a message

## Trigger

Runs automatically every 30 minutes in Asia/Shanghai. If several upstream releases land between runs, the workflow catches up and builds every missed version. Manual dispatch builds the version you specify.

## Patch repair

Before building, the workflow verifies every patch against `upstream/canary` in
order. If validation fails and AI repair is enabled, it invokes Codex to repair
only the patch set, revalidates the complete set, and opens a pull request for
review. It never merges the repair automatically. An existing repair PR is
treated as pending human review: later scheduled runs skip AI repair until that
PR is merged or closed, so the workflow does not repeatedly consume AI calls.

Configure these repository settings for the recovery path:

- Actions secret `OPENAI_API_KEY` (required): API key for Codex.
- Actions secret `CODEX_RESPONSES_API_ENDPOINT` (optional): full custom
  Responses API endpoint, for example `https://example.openai.azure.com/openai/v1/responses`.
- Actions secret `CODEX_MODEL` (optional): model passed to Codex. Leave empty
  to use the action default.
- Actions variable `ENABLE_AI_PATCH_REPAIR`: set to `true` to enable repair;
  leave unset or set another value to keep it disabled.

For a failed `patches/pr-*` patch, Codex also checks the matching upstream PR.
When the upstream PR is merged or closed, Codex removes its patch and its
README entry. Otherwise, the repaired patch must retain the intended
functionality, including behavior not yet in `upstream/canary`.
