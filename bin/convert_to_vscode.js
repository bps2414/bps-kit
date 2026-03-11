const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Converte toda a estrutura .agents importada para .github estrutural do Copilot
 * @param {string} destAgents O diretorio destino onde a copy crua (.agents) aportou
 * @param {string} destBase A raiz do repositorio final
 */
async function convertToVsCode(destAgents, destBase) {
    const gitHubDir = path.join(destBase, '.github');

    console.log(chalk.dim('   [VS Code] Convertendo arquivos para sintaxe do Copilot...'));

    // Garantir que o diretório .github existe antes de qualquer escrita
    await fs.ensureDir(gitHubDir);

    // 1. Converter a rule master GEMINI.md em copilot-instructions.md
    const geminiPath = path.join(destAgents, 'rules', 'GEMINI.md');
    if (await fs.pathExists(geminiPath)) {
        let content = await fs.readFile(geminiPath, 'utf8');
        // Adaptamos os caminhos na rule principal para o contexto do .github/ do VS Code
        // Agora, skills são arquivos normais .md fora da pasta .github/ para evitar a autoinjeção estática e o overhead de 66 referências.

        // Specific path patterns FIRST (before general .agents/ catch-all)
        content = content.replace(/\.?\/?\.agents\/skills\//g, '.copilot-skills/');
        content = content.replace(/\.?\/?\.agents\/vault\//g, '.copilot-vault/');
        content = content.replace(/\.?\/?\.agents\/rules\/GEMINI\.md/g, '.github/copilot-instructions.md');
        content = content.replace(/\.?\/?\.agents\/rules\/AGENTS\.md/g, '.github/AGENTS.md');
        content = content.replace(/\.?\/?\.agents\/VAULT_INDEX\.md/g, '.github/VAULT_INDEX.md');
        content = content.replace(/\.?\/?\.agents\/ARCHITECTURE\.md/g, '.github/ARCHITECTURE.md');
        content = content.replace(/\.?\/?\.agents\/agents\//g, '.github/agents/');
        content = content.replace(/\.?\/?\.agents\/scripts\//g, '.github/scripts/');

        // Trocar sintaxe bruta de trigger pelo ApplyTo nativo
        content = content.replace(/trigger:\s*always_on/g, 'applyTo: "**/*"');

        // As workflows no VS Code estao desabrigadas da pasta nativa, sugerimos le-las do vault ou inline
        content += `\n\n## 🔄 Workflows Base\nAs workflows antigas de Cursor (/brainstorm, etc) agora devem ser invocadas naturalmente no chat: "Rode o fluxo de brainstorm". Consulte o diretório .github/prompts/ para contexto.\n`;

        await fs.writeFile(path.join(gitHubDir, 'copilot-instructions.md'), content);
    }

    // 1.1 Converter AGENTS.md (routing rules) com os mesmos path replacements
    const agentsMdPath = path.join(destAgents, 'rules', 'AGENTS.md');
    if (await fs.pathExists(agentsMdPath)) {
        let content = await fs.readFile(agentsMdPath, 'utf8');
        content = content.replace(/\.?\/?\.agents\/skills\//g, '.copilot-skills/');
        content = content.replace(/\.?\/?\.agents\/vault\//g, '.copilot-vault/');
        content = content.replace(/\.?\/?\.agents\/rules\/GEMINI\.md/g, '.github/copilot-instructions.md');
        content = content.replace(/\.?\/?\.agents\/rules\/AGENTS\.md/g, '.github/AGENTS.md');
        content = content.replace(/\.?\/?\.agents\/VAULT_INDEX\.md/g, '.github/VAULT_INDEX.md');
        content = content.replace(/\.?\/?\.agents\/ARCHITECTURE\.md/g, '.github/ARCHITECTURE.md');
        content = content.replace(/\.?\/?\.agents\/agents\//g, '.github/agents/');
        content = content.replace(/\.?\/?\.agents\/scripts\//g, '.github/scripts/');
        content = content.replace(/trigger:\s*always_on/g, 'applyTo: "**/*"');
        await fs.writeFile(path.join(gitHubDir, 'AGENTS.md'), content);
    }

    // 2. Mover as skills ativas inteiras (em vez de achatar) para preservar scripts em python embutidos e sub documentações!
    // Importante: NÃO alocamos em .github/skills pois o Copilot engole todos os Markdowns de lá e causa sobrecarga de +60 referências!
    const skillsDest = path.join(destAgents, 'skills');
    const copilotSkillsDir = path.join(destBase, '.copilot-skills');

    if (await fs.pathExists(skillsDest)) {
        await fs.move(skillsDest, copilotSkillsDir, { overwrite: true });
    }

    // 3. Converter o Vault Index (Tudo que esta no index vira uma instrução consultável)
    const vaultIndexSrc = path.join(destAgents, 'VAULT_INDEX.md');
    if (await fs.pathExists(vaultIndexSrc)) {
        let content = await fs.readFile(vaultIndexSrc, 'utf8');
        content = content.replace(/\.?\/?\.agents\/vault\//g, '.copilot-vault/');
        await fs.writeFile(path.join(gitHubDir, 'VAULT_INDEX.md'), content);
    }

    // 4. Mover o Vault inteiro para uma pasta customizada oculta que nao polua a base restrita do Git / do Copilot local
    const vaultSrc = path.join(destAgents, 'vault');
    const copilotVaultDir = path.join(destBase, '.copilot-vault');
    if (await fs.pathExists(vaultSrc)) {
        await fs.move(vaultSrc, copilotVaultDir, { overwrite: true });
    }

    // 5. Mover as 20 personas (AGENTS) para a pasta especializada do Copilot `.github/agents/`
    const agentsSrc = path.join(destAgents, 'agents');
    const copilotAgentsDir = path.join(gitHubDir, 'agents');
    if (await fs.pathExists(agentsSrc)) {
        await fs.ensureDir(copilotAgentsDir);
        const agentFiles = await fs.readdir(agentsSrc);
        for (const agent of agentFiles) {
            if (agent.endsWith('.md')) {
                const content = await fs.readFile(path.join(agentsSrc, agent), 'utf8');
                const agentName = agent.replace('.md', '');

                // Formato exigido para GitHub Copilot Agents (.agent.md)
                const vsCodeAgentContent = `---
description: 'Agente especializado: ${agentName}. Use para tarefas relacionadas a esse domínio.'
tools: []
---
${content}`;

                // Adicionando a extensão exigida .agent.md
                await fs.writeFile(path.join(copilotAgentsDir, `${agentName}.agent.md`), vsCodeAgentContent);
            }
        }
    }

    // 6. Converter Workflows em Copilot Prompts locados em `.github/prompts/`
    const workflowsSrc = path.join(destAgents, 'workflows');
    const copilotPromptsDir = path.join(gitHubDir, 'prompts');
    if (await fs.pathExists(workflowsSrc)) {
        await fs.ensureDir(copilotPromptsDir);
        const workflowFiles = await fs.readdir(workflowsSrc);
        for (const workflow of workflowFiles) {
            if (workflow.endsWith('.md')) {
                let content = await fs.readFile(path.join(workflowsSrc, workflow), 'utf8');
                const promptName = workflow.replace('.md', '');

                // Converter referências visuais e lógicas residuais do Antigravity nativo 
                // para o equivalente funcional da arquitetura VS Code de forma escalonada!
                content = content.replace(/\.?\/?\.agents\/rules\/GEMINI\.md/g, '.github/copilot-instructions.md');
                content = content.replace(/\.?\/?\.agents\/skills\//g, '.copilot-skills/');
                content = content.replace(/\.?\/?\.agents\/vault\//g, '.copilot-vault/');
                content = content.replace(/\.?\/?\.agents\/VAULT_INDEX\.md/g, '.github/VAULT_INDEX.md');
                content = content.replace(/\.?\/?\.agents\/agents\//g, '.github/agents/');
                content = content.replace(/\.?\/?\.agents\/scripts\//g, '.github/scripts/');
                content = content.replace(/\.?\/?\.agents\//g, '.github/');
                content = content.replace(/GEMINI\.md/g, 'copilot-instructions.md');

                // Formato exigido para GitHub Copilot Prompts (.prompt.md)
                const vsCodePromptContent = `---
agent: agent
---
${content}`;

                // O copilot aceita prompts em .github/prompts/{name}.prompt.md
                await fs.writeFile(path.join(copilotPromptsDir, `${promptName}.prompt.md`), vsCodePromptContent);
            }
        }
    }

    // 7. Copiar ARCHITECTURE.md para .github/
    const archSrc = path.join(destAgents, 'ARCHITECTURE.md');
    if (await fs.pathExists(archSrc)) {
        let archContent = await fs.readFile(archSrc, 'utf8');
        archContent = archContent.replace(/\.agents\/skills\//g, '.copilot-skills/');
        archContent = archContent.replace(/\.agents\/vault\//g, '.copilot-vault/');
        archContent = archContent.replace(/\.agents\/agents\//g, '.github/agents/');
        archContent = archContent.replace(/\.agents\/scripts\//g, '.github/scripts/');
        archContent = archContent.replace(/\.agents\//g, '.github/');
        await fs.writeFile(path.join(gitHubDir, 'ARCHITECTURE.md'), archContent);
    }

    // 8. Mover scripts de validação (checklist.py, verify_all.py) para .github/scripts/
    const scriptsSrc = path.join(destAgents, 'scripts');
    const scriptsDestDir = path.join(gitHubDir, 'scripts');
    if (await fs.pathExists(scriptsSrc)) {
        await fs.move(scriptsSrc, scriptsDestDir, { overwrite: true });
    }

    // Limpeza pesada! Como o ambiente ja foi migrado de .agents para .github e .copilot-vault, delete a origem da instalacao hibrida.
    await fs.remove(destAgents);
}

module.exports = { convertToVsCode };
