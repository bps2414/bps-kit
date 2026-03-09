# BPS Kit Architecture

> AI Agent Capability Expansion Toolkit — System Map

---

## 📋 Overview

BPS Kit is a modular system consisting of:

- **20 Specialist Agents** — Role-based AI personas
- **Active Skills** — Domain-specific knowledge modules (varies by profile)
- **1200+ Vault Skills** — Extended skill library discoverable via index
- **12 Workflows** — Slash command procedures
- **2 Master Scripts** — Validation & verification

---

## 🏗️ Directory Structure

```plaintext
.github/
├── ARCHITECTURE.md          # This file
├── VAULT_INDEX.md           # Vault skill discovery index
├── rules/
│   └── GEMINI.md            # Master rule file (always loaded)
├── agents/                  # 20 Specialist Agents
├── skills/                  # Active Skills (profile-dependent)
├── vault/                   # 1200+ Vault Skills
├── workflows/               # 12 Slash Commands
└── scripts/                 # Master Validation Scripts
```

---

## 🤖 Agents (20)

Specialist AI personas for different domains.

| Agent                    | Focus                      | Skills Used                                              |
| ------------------------ | -------------------------- | -------------------------------------------------------- |
| `orchestrator`           | Multi-agent coordination   | clean-code, behavioral-modes, plan-writing               |
| `project-planner`        | Discovery, task planning   | brainstorming, plan-writing                              |
| `frontend-specialist`    | Web UI/UX                  | frontend-design, react-patterns, tailwind-patterns       |
| `backend-specialist`     | API, business logic        | api-patterns, database-design                            |
| `database-architect`     | Schema, SQL                | database-design, prisma-expert                           |
| `mobile-developer`       | iOS, Android, RN           | mobile-design                                            |
| `game-developer`         | Game logic, mechanics      | —                                                        |
| `devops-engineer`        | CI/CD, Docker              | docker-expert                                            |
| `security-auditor`       | Security compliance        | vulnerability-scanner                                    |
| `penetration-tester`     | Offensive security         | vulnerability-scanner                                    |
| `test-engineer`          | Testing strategies         | testing-patterns, test-driven-development                |
| `debugger`               | Root cause analysis        | systematic-debugging                                     |
| `performance-optimizer`  | Speed, Web Vitals          | performance-profiling                                    |
| `seo-specialist`         | Ranking, visibility        | seo-fundamentals                                         |
| `documentation-writer`   | Manuals, docs              | —                                                        |
| `product-manager`        | Requirements, user stories | plan-writing, brainstorming                              |
| `product-owner`          | Strategy, backlog, MVP     | plan-writing, brainstorming                              |
| `qa-automation-engineer` | E2E testing, CI pipelines  | testing-patterns                                         |
| `code-archaeologist`     | Legacy code, refactoring   | clean-code                                               |
| `explorer-agent`         | Codebase analysis          | —                                                        |
| `site-builder`           | Landing pages, websites    | frontend-design, scroll-experience, enhance-prompt       |

---

## 🧩 Skills by Profile

Skills availability depends on the installed profile (`basic`, `normal`, or `extra`).

### Basic Profile (11 skills)

| Skill                          | Description                    |
| ------------------------------ | ------------------------------ |
| `behavioral-modes`             | Agent personas                 |
| `brainstorming`                | Socratic questioning           |
| `clean-code`                   | Coding standards (Global)      |
| `concise-planning`             | Quick planning                 |
| `executing-plans`              | Plan execution                 |
| `git-pushing`                  | Git workflow                   |
| `lint-and-validate`            | Linting, validation            |
| `plan-writing`                 | Task planning, breakdown       |
| `systematic-debugging`         | Troubleshooting                |
| `verification-before-completion` | Pre-completion checks        |
| `vulnerability-scanner`        | Security auditing              |

### Normal Profile (adds ~31 more skills)

| Skill                     | Description                    |
| ------------------------- | ------------------------------ |
| `api-patterns`            | REST, GraphQL, tRPC            |
| `app-builder`             | Full-stack scaffolding         |
| `backend-dev-guidelines`  | Backend standards              |
| `clerk-auth`              | Clerk authentication           |
| `copywriting`             | Marketing copy                 |
| `database-design`         | Schema design, optimization    |
| `design-md`               | Design documentation           |
| `dispatching-parallel-agents` | Multi-agent patterns       |
| `docker-expert`           | Containerization               |
| `enhance-prompt`          | Prompt enhancement             |
| `frontend-design`         | UI/UX patterns, design systems |
| `frontend-developer`      | Frontend standards             |
| `llm-app-patterns`        | LLM application patterns       |
| `micro-saas-launcher`     | SaaS scaffolding               |
| `nextjs-best-practices`   | Next.js optimization           |
| `nextjs-supabase-auth`    | Supabase authentication        |
| `page-cro`                | Conversion rate optimization   |
| `performance-profiling`   | Web Vitals, optimization       |
| `prisma-expert`           | Prisma ORM, migrations         |
| `prompt-engineer`         | Prompt engineering             |
| `rag-engineer`            | RAG patterns                   |
| `react-components`        | React component patterns       |
| `react-patterns`          | React best practices           |
| `scroll-experience`       | Scroll-based UX                |
| `senior-fullstack`        | Full-stack expertise           |
| `seo-fundamentals`        | SEO, Core Web Vitals           |
| `stripe-integration`      | Payment processing             |
| `tailwind-patterns`       | Tailwind CSS v4                |
| `test-driven-development` | TDD workflow                   |
| `testing-patterns`        | Jest, Vitest, strategies       |
| `vercel-deployment`       | Vercel deploy workflows        |

### Extra Profile (adds ~27 more skills)

| Skill                          | Description               |
| ------------------------------ | ------------------------- |
| `api-security-best-practices`  | API security              |
| `async-python-patterns`        | Python async patterns     |
| `cloud-architect`              | Cloud infrastructure      |
| `code-reviewer`                | Code review standards     |
| `deployment-engineer`          | Deployment workflows      |
| `django-pro`                   | Django framework          |
| `domain-driven-design`         | DDD patterns              |
| `ethical-hacking-methodology`  | Ethical hacking           |
| `fastapi-pro`                  | FastAPI framework         |
| `growth-engine`                | Growth strategies         |
| `microservices-patterns`       | Microservices             |
| `nodejs-best-practices`        | Node.js patterns          |
| `pandas`                       | Data analysis             |
| `playwright-skill`             | E2E testing               |
| `postgres-best-practices`      | PostgreSQL optimization   |
| `python-fastapi-development`   | Python FastAPI dev        |
| `python-pro`                   | Python standards          |
| `python-testing-patterns`      | Python testing            |
| `security-auditor`             | Security auditing         |
| `seo-content-writer`           | SEO content               |
| `software-architecture`        | System design patterns    |
| `sql-optimization-patterns`    | SQL optimization          |
| `stitch-loop`                  | Stitch design loop        |
| `threat-modeling-expert`       | Threat modeling           |
| `top-web-vulnerabilities`      | OWASP vulnerabilities     |
| `ui-ux-designer`               | UI/UX design              |
| `web-performance-optimization` | Web performance           |

---

## 🔄 Workflows (12)

Slash command procedures. Invoke with `/command`.

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `/brainstorm`    | Socratic discovery              |
| `/create`        | Create new features             |
| `/debug`         | Debug issues                    |
| `/deploy`        | Deploy application              |
| `/enhance`       | Improve existing code           |
| `/orchestrate`   | Multi-agent coordination        |
| `/plan`          | Task breakdown                  |
| `/preview`       | Preview changes                 |
| `/setup-brain`   | Initialize agent memory/context |
| `/status`        | Check project status            |
| `/test`          | Run tests                       |
| `/ui-ux-pro-max` | Full UI/UX design workflow      |

---

## 📜 Scripts (2 master + skill-level)

### Master Scripts

| Script          | Purpose                                 | When to Use              |
| --------------- | --------------------------------------- | ------------------------ |
| `checklist.py`  | Priority-based validation (Core checks) | Development, pre-commit  |
| `verify_all.py` | Comprehensive verification (All checks) | Pre-deployment, releases |

### Usage

```bash
# Quick validation during development
python .github/scripts/checklist.py .

# Full verification before deployment
python .github/scripts/verify_all.py . --url http://localhost:3000
```

### Skill-level Scripts

Scripts are embedded within skills at `.copilot-skills/<skill>/scripts/`:

| Script                | Skill                 | When to Use         |
| --------------------- | --------------------- | ------------------- |
| `security_scan.py`    | vulnerability-scanner | Always on deploy    |
| `lint_runner.py`      | lint-and-validate     | Every code change   |
| `seo_checker.py`      | seo-fundamentals      | After page change   |
| `lighthouse_audit.py` | performance-profiling | Before deploy       |

> 🔴 **Agents can invoke ANY skill script** via `python .copilot-skills/<skill>/scripts/<script>.py`

---

## 📊 Statistics

| Metric              | Value                         |
| ------------------- | ----------------------------- |
| **Total Agents**    | 20 (+1 site-builder)          |
| **Basic Skills**    | 11                            |
| **Normal Skills**   | ~42                           |
| **Extra Skills**    | ~69                           |
| **Vault Skills**    | 1200+                         |
| **Total Workflows** | 12                            |

---

## 🔗 Quick Reference

| Need     | Agent                 | Skills                                |
| -------- | --------------------- | ------------------------------------- |
| Web App  | `frontend-specialist` | frontend-design, react-patterns       |
| API      | `backend-specialist`  | api-patterns, backend-dev-guidelines  |
| Mobile   | `mobile-developer`    | mobile-design                         |
| Database | `database-architect`  | database-design, prisma-expert        |
| Security | `security-auditor`    | vulnerability-scanner                 |
| Testing  | `test-engineer`       | testing-patterns, test-driven-development |
| Debug    | `debugger`            | systematic-debugging                  |
| Plan     | `project-planner`     | brainstorming, plan-writing           |
| Deploy   | `devops-engineer`     | docker-expert, vercel-deployment      |
