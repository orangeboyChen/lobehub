One or more paths listed in automation/patches/paths.txt is missing,
or a patch in automation/patches no longer applies to the repair
target checked out in source/. Treat paths.txt as the only
authoritative patch manifest. Repair the failed patch set so it
preserves its original intent and applies cleanly in listed order.
The repair target mode is `__REPAIR_TARGET_MODE__`
at `__REPAIR_TARGET_REF__`. Read
`automation/.codex-repair-pr-context.json` for the repair pull request
context; it may describe an existing PR or an empty context when creating
the first repair PR. If `automation/.codex-build-failure.log` exists, read it
before making changes: it contains the failed Docker build output that this
repair must reproduce and address. Do not claim a Docker failure is fixed
solely because a patch applies on a different ref.
Before changing any patch under patches/pr-*, read
automation/.codex-upstream-pr-status.jsonl. This file is
authoritative for the corresponding upstream pull request status.
Do not invoke gh, request network or sandbox escalation, or request
GitHub authentication. Determine whether the PR behavior is already
present in source/.
If that PR is merged or closed, you must delete its corresponding
patch file, remove its entry from both automation/README.md and
automation/README.zh.md, and remove exactly that patch path from
automation/patches/paths.txt. Do not leave a deleted patch listed
in paths.txt. Do not make any workflow changes. The only additional
file you may create is the temporary PR report described below.
Otherwise preserve
every intended
user-visible and functional behavior, translating it to the current
upstream canary implementation when necessary. Modify only files
under patches/, the two README files, and the matching paths.txt
entry when removing a merged or closed PR patch. Do not change
source/. Validate every remaining patch with
`git apply --unidiff-zero --check`, applying each successful patch
before checking the next one. Do not commit, push, or open a pull
request; the workflow will do that after validation.

Also create or replace automation/.codex-repair-pr.md as a temporary
pull request report. Do not add this file to the repair commit. Use
this exact structure and fill it with facts from the status file and
your changes:

Title: <short Conventional Commit title>

## Repair PR context
- PR number, URL, title, base, and head from automation/.codex-repair-pr-context.json.

## Upstream PR status
| PR | State | Merged at | Action |
| --- | --- | --- | --- |
| #... | ... | ... | ... |

## Changes
- List every patch added, removed, or rewritten and its user-visible intent.

## Validation
- List the exact patch validation command, repair target ref, and result.

The Title line is used as the GitHub pull request title. Do not
invent PR states, merge timestamps, changes, or validation results.
