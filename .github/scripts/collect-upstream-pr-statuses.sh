#!/usr/bin/env bash
set -euo pipefail

: "${UPSTREAM_REPOSITORY:?UPSTREAM_REPOSITORY is required}"
status_file="${1:-.codex-upstream-pr-status.jsonl}"

: > "$status_file"
while IFS= read -r patch_path; do
  [ -n "$patch_path" ] || continue
  [[ "$patch_path" == patches/pr-*/* ]] || continue
  pr_number="${patch_path#patches/pr-}"
  pr_number="${pr_number%%/*}"
  gh pr view "$pr_number" --repo "$UPSTREAM_REPOSITORY" \
    --json number,state,mergedAt,url --jq '{number, state, mergedAt, url}' \
    >> "$status_file"
done < patches/paths.txt
