# VendorVerse

**A Daraz-model multi-vendor e-commerce marketplace with agentic AI automation.**
CSE327 (Software Engineering) project — North South University.

**Team QuadCore:** Al Nahian Niloy · Tashfiq Mahmud Niloy · Ihtishamul Haq Shimanto · Sk. Arif Bin Ekram

---

## Repository structure

This is a monorepo — every part of the project lives in one GitHub repository.

| Folder | What lives here | Status |
| --- | --- | --- |
| [`frontend/`](frontend) | Customer website — Next.js 16, React 19, TypeScript, Tailwind CSS v4 | Homepage in progress |
| `backend/` | REST API — NestJS, Prisma, PostgreSQL (added by the backend developer) | Planned |
| [`docs/`](docs) | Team documents — [Git workflow](docs/GIT_WORKFLOW.md) | Active |
| [`.github/`](.github) | GitHub Actions CI and the pull request template | Active |

## Run the customer website locally

Requirements: [Node.js](https://nodejs.org) 20.9 or newer (24 LTS recommended) and [Git](https://git-scm.com).

```bash
git clone https://github.com/<your-username>/vendorverse.git
cd vendorverse/frontend
npm install
npm run dev
```

Then open http://localhost:3000.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide icons |
| Backend (planned) | NestJS, Prisma ORM, Socket.IO, BullMQ |
| Databases (planned) | PostgreSQL + pgvector, Redis, Meilisearch |
| Agentic AI (planned) | Google Gemini API (free tier) + Google Agent Development Kit |
| DevOps | Git + GitHub, GitHub Actions CI, Docker Compose (planned) |

## How we work

- `main` always holds working code. Nobody pushes to `main` directly.
- Every task gets its own branch → pull request → CI must pass → review → merge.
- Commit messages follow `type(scope): message`, for example `feat(home): add flash sale section`.
- Never commit `.env` files or any password, API key or token.

Full rules and commands: [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md).
