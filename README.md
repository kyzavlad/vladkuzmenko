# VladKuzmenko.com

Production website and product ecosystem for Vlad Kuzmenko.

## Development

- Canonical branch: `main`
- Canonical hosting: the existing `vladkuzmenko` Vercel Project
- Release policy: [`docs/DEVELOPMENT_RELEASE_POLICY.md`](docs/DEVELOPMENT_RELEASE_POLICY.md)
- Local release verification: `npm run verify:release`
- GitHub Actions are intentionally not used for normal release validation.

## Local setup

```bash
npm install
npm run dev
```

## Release verification

```bash
npm run verify:release
```

The verification command runs TypeScript validation and a production Next.js build locally. Production success is not assumed from a commit alone; verify the exact Vercel deployment and the live production routes after release.
