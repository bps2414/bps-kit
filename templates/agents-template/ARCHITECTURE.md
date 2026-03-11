# BPS Kit Architecture

> AI Agent Capability Expansion Toolkit — System Map

---

## 📋 Overview

BPS Kit is a modular system consisting of:

- **22 Specialist Agents** — Role-based AI personas
- **Active Skills** — Domain-specific knowledge modules (varies by profile)
- **1200+ Vault Skills** — Extended skill library discoverable via index
- **15 Workflows** — Slash command procedures
- **2 Master Scripts** — Validation & verification

---

## 🏗️ Directory Structure

```plaintext
.agents/
├── ARCHITECTURE.md          # This file
├── VAULT_INDEX.md           # Vault skill discovery index
├── rules/
│   └── GEMINI.md            # Master rule file (always loaded)
├── agents/                  # 22 Specialist Agents
├── skills/                  # Active Skills (profile-dependent)
├── vault/                   # 1200+ Vault Skills
├── workflows/               # 15 Slash Commands
└── scripts/                 # Master Validation Scripts
```

---

## 🤖 Agents (22)

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
| `automation-specialist`  | n8n workflow automation    | n8n-mcp-tools-expert, n8n-workflow-patterns, n8n-expression-syntax |

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
| `n8n-mcp-tools-expert`    | n8n MCP tool selection & usage |
| `n8n-workflow-patterns`   | n8n architectural patterns     |
| `n8n-expression-syntax`   | n8n expression `{{$json.*}}`   |
| `n8n-node-configuration`  | n8n node operation config      |
| `n8n-validation-expert`   | n8n validation error fixing    |
| `n8n-code-javascript`     | n8n Code node (JavaScript)     |
| `n8n-code-python`         | n8n Code node (Python)         |

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

## 🔄 Workflows (15)

Slash command procedures. Invoke with `/command`.

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `/brainstorm`    | Socratic discovery              |
| `/build-site`    | Full website creation workflow  |
| `/create`        | Create new features             |
| `/debug`         | Debug issues                    |
| `/deploy`        | Deploy application              |
| `/enhance`       | Improve existing code           |
| `/orchestrate`   | Multi-agent coordination        |
| `/plan`          | Task breakdown                  |
| `/preview`       | Preview changes                 |
| `/recall`        | Re-anchor AI to rules           |
| `/setup-brain`   | Initialize agent memory/context |
| `/status`        | Check project status            |
| `/test`          | Run tests                       |
| `/ui-ux-pro-max` | Full UI/UX design workflow      |
| `/automate`      | n8n workflow automation builder |

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
python .agents/scripts/checklist.py .

# Full verification before deployment
python .agents/scripts/verify_all.py . --url http://localhost:3000
```

### Skill-level Scripts

Scripts are embedded within skills at `.agents/skills/<skill>/scripts/`:

| Script                | Skill                 | When to Use         |
| --------------------- | --------------------- | ------------------- |
| `security_scan.py`    | vulnerability-scanner | Always on deploy    |
| `lint_runner.py`      | lint-and-validate     | Every code change   |
| `seo_checker.py`      | seo-fundamentals      | After page change   |
| `lighthouse_audit.py` | performance-profiling | Before deploy       |

> 🔴 **Agents can invoke ANY skill script** via `python .agents/skills/<skill>/scripts/<script>.py`

---

## 📊 Statistics

| Metric              | Value                         |
| ------------------- | ----------------------------- |
| **Total Agents**    | 22                            |
| **Basic Skills**    | 11                            |
| **Normal Skills**   | ~49                           |
| **Extra Skills**    | ~69                           |
| **Vault Skills**    | 1200+                         |
| **Total Workflows** | 15                            |

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
| Automate | `automation-specialist` | n8n-mcp-tools-expert, n8n-workflow-patterns |
