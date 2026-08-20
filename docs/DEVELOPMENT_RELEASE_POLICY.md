# Development & Release Policy

This repository follows the same operating rule used across Vlad Kuzmenko projects.

## Branching
- Work on the existing canonical repository and its `main` branch by default.
- Do not create feature, preview, redesign or release branches unless Vlad explicitly asks for one.
- Do not create duplicate repositories or duplicate Vercel projects for previews, fixes or staged work.

## Validation
- GitHub Actions are intentionally not used for normal development or release validation.
- Do not add or re-enable paid CI/CD, Actions minutes or other paid build services unless Vlad explicitly approves the cost first.
- Prefer local terminal validation before release.
- Canonical local command: `npm run verify:release`.
- When a more targeted check is enough, run the smallest relevant command first, then the full release verification before declaring the release complete.

## Deployment
- Use the existing canonical Vercel Project only.
- Main-branch commits may be released in coherent stages when needed.
- Do not create a new Vercel Project for a preview, branch, fix, QA pass, redesign or release.
- Avoid unnecessary deployments. Batch related changes into a coherent stage.

## Verification truth
Never claim build, typecheck, deployment or production success from assumption. Verify the exact commit, Vercel deployment state, production domain and relevant runtime behavior.

## Cost rule
Use free/currently included tooling whenever it is sufficient. Do not enable paid GitHub Actions, paid Vercel features, paid CI, paid monitoring or other optional paid infrastructure without explicit approval.
