const fs = require('fs-extra');
const path = require('path');

const SOURCE_GEMINI_DIR = path.join(process.env.USERPROFILE, '.gemini');
const SOURCE_SKILLS_DIR = path.join(SOURCE_GEMINI_DIR, 'antigravity', 'skills');
const SOURCE_VAULT_DIR = path.join(SOURCE_GEMINI_DIR, 'antigravity', 'vault');
const SOURCE_RULE_FILE = path.join('F:', 'VSCode', 'saas', 'bps-kit', '.agents', 'rules', 'GEMINI.md');
const SOURCE_AGENTS_DIR = path.join('F:', 'VSCode', 'saas', 'antigravity-kit', '.agent', 'agents');
const SOURCE_SCRIPTS_DIR = path.join('F:', 'VSCode', 'saas', 'antigravity-kit', '.agent', 'scripts');
const SOURCE_BASE_WORKFLOWS_DIR = path.join('F:', 'VSCode', 'saas', 'antigravity-kit', '.agent', 'workflows');
const SOURCE_RICH_SKILLS_DIR = path.join('F:', 'VSCode', 'saas', 'antigravity-kit', '.agent', 'skills');

const DEST_DIR = path.join(__dirname, '..', 'templates');
const DEST_SKILLS_NORMAL = path.join(DEST_DIR, 'skills_normal');
const DEST_SKILLS_EXTRA = path.join(DEST_DIR, 'skills_extra');
const DEST_VAULT = path.join(DEST_DIR, 'vault');

const SOURCE_WORKFLOWS_DIR = path.join(__dirname, '..', 'src', 'workflows');

const NORMAL_SKILLS = [
    "brainstorming", "plan-writing", "executing-plans", "concise-planning", "clean-code",
    "behavioral-modes", "app-builder", "frontend-design", "react-patterns", "tailwind-patterns",
    "nextjs-best-practices", "scroll-experience", "frontend-developer", "api-patterns",
    "backend-dev-guidelines", "database-design", "prisma-expert", "nextjs-supabase-auth",
    "clerk-auth", "stripe-integration", "vercel-deployment", "docker-expert",
    "systematic-debugging", "test-driven-development", "verification-before-completion",
    "testing-patterns", "seo-fundamentals", "page-cro", "copywriting", "git-pushing",
    "rag-engineer", "llm-app-patterns", "prompt-engineer", "dispatching-parallel-agents",
    "lint-and-validate", "vulnerability-scanner", "performance-profiling", "senior-fullstack",
    "micro-saas-launcher"
];

const EXTRA_SKILLS = [
    "python-pro", "fastapi-pro", "django-pro", "python-fastapi-development",
    "async-python-patterns", "python-testing-patterns", "pandas", "ethical-hacking-methodology",
    "api-security-best-practices", "security-auditor", "threat-modeling-expert",
    "top-web-vulnerabilities", "ui-ux-designer", "web-performance-optimization",
    "nodejs-best-practices", "microservices-patterns", "postgres-best-practices",
    "sql-optimization-patterns", "cloud-architect", "deployment-engineer", "playwright-skill",
    "seo-content-writer", "growth-engine", "software-architecture", "domain-driven-design",
    "code-reviewer"
];

async function copyTemplates() {
    console.log("Cleaning templates directory...");
    await fs.emptyDir(DEST_DIR);

    console.log("Copying GEMINI.md...");
    const ruleDest = path.join(DEST_DIR, 'agents-template', 'rules', 'GEMINI.md');
    await fs.copy(SOURCE_RULE_FILE, ruleDest);

    let ruleContent = await fs.readFile(ruleDest, 'utf8');
    // Update paths to be relative
    ruleContent = ruleContent.replace(/C:\/Users\/Administrator\/\.gemini/g, './.agents');
    ruleContent = ruleContent.replace(/~\/\.gemini/g, './.agents');
    ruleContent = ruleContent.replace(/F:\/VSCode\/saas\/\.agents/g, './.agents');
    await fs.writeFile(ruleDest, ruleContent);

    console.log("Copying Normal Skills...");
    for (const skill of NORMAL_SKILLS) {
        const richSrc = path.join(SOURCE_RICH_SKILLS_DIR, skill);
        const fallbackSrc = path.join(SOURCE_SKILLS_DIR, skill);
        if (await fs.pathExists(richSrc)) {
            await fs.copy(richSrc, path.join(DEST_SKILLS_NORMAL, skill));
        } else if (await fs.pathExists(fallbackSrc)) {
            await fs.copy(fallbackSrc, path.join(DEST_SKILLS_NORMAL, skill));
        } else {
            console.warn(`Missing normal skill: ${skill}`);
        }
    }

    console.log("Copying Extra Skills...");
    for (const skill of EXTRA_SKILLS) {
        const richSrc = path.join(SOURCE_RICH_SKILLS_DIR, skill);
        const fallbackSrc = path.join(SOURCE_SKILLS_DIR, skill);
        if (await fs.pathExists(richSrc)) {
            await fs.copy(richSrc, path.join(DEST_SKILLS_EXTRA, skill));
        } else if (await fs.pathExists(fallbackSrc)) {
            await fs.copy(fallbackSrc, path.join(DEST_SKILLS_EXTRA, skill));
        } else {
            console.warn(`Missing extra skill: ${skill}`);
        }
    }

    console.log("Copying Vault and Index...");
    if (await fs.pathExists(SOURCE_VAULT_DIR)) {
        await fs.copy(SOURCE_VAULT_DIR, DEST_VAULT);
    }

    const indexSrc = path.join(SOURCE_SKILLS_DIR, 'VAULT_INDEX.md');
    if (await fs.pathExists(indexSrc)) {
        let indexContent = await fs.readFile(indexSrc, 'utf8');
        indexContent = indexContent.replace(/C:\/Users\/Administrator\/\.gemini/g, './.agents');
        indexContent = indexContent.replace(/~\/\.gemini/g, './.agents');
        await fs.writeFile(path.join(DEST_DIR, 'VAULT_INDEX.md'), indexContent);
    }

    console.log("Copying Agents and Scripts...");
    if (await fs.pathExists(SOURCE_AGENTS_DIR)) {
        await fs.copy(SOURCE_AGENTS_DIR, path.join(DEST_DIR, 'agents-template', 'agents'));
    }
    if (await fs.pathExists(SOURCE_SCRIPTS_DIR)) {
        await fs.copy(SOURCE_SCRIPTS_DIR, path.join(DEST_DIR, 'agents-template', 'scripts'));
    }

    console.log("Copying Base Workflows...");
    if (await fs.pathExists(SOURCE_BASE_WORKFLOWS_DIR)) {
        await fs.copy(SOURCE_BASE_WORKFLOWS_DIR, path.join(DEST_DIR, 'agents-template', 'workflows'));
    }

    console.log("Injecting Custom Workflows (Setup Brain)...");
    if (await fs.pathExists(SOURCE_WORKFLOWS_DIR)) {
        await fs.copy(SOURCE_WORKFLOWS_DIR, path.join(DEST_DIR, 'agents-template', 'workflows'), { overwrite: true });
    }

    console.log("All templates copied successfully!");
}

copyTemplates().catch(console.error);
