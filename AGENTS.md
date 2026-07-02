# AGENTS.md

## Patch Workflow

- The patch working branch is `patch/patched-docker-release`.
- When a change adds, removes, or modifies any file under `patches/`, validate it against the **upstream** `canary` branch before committing.
- "Upstream canary" means `upstream/canary`, not the current repository's `canary` branch.
- Check patches one by one:
  - create or update a temporary worktree from `upstream/canary`
  - apply each patch individually with `git apply --unidiff-zero --check`
  - fix any patch that fails before moving on
- Do not commit patch changes until every affected patch passes on upstream `canary`.
- If you add or remove a PR patch, update the README files so the patch summary stays in sync.

## Issue Fix Workflow

- When the user asks to solve a problem, base the work on `upstream/canary` first.
- Reproduce or validate the fix against the upstream `canary` checkout, then apply the patch one by one.
- Avoid using the current repository's `canary` branch as the source of truth for patch verification.

## Commit Messages

- Commit messages must use **Conventional Commits**.
- Write commit messages in **English**.
- Prefer clear scopes when useful, for example:
  - `fix(ci): update patched docker workflow`
  - `fix(connector): handle narrow headers`
