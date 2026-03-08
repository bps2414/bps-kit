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
    const copilotInstructionsDir = path.join(gitHubDir, 'instructions');

    await fs.ensureDir(copilotInstructionsDir);

    console.log(chalk.dim('   [VS Code] Convertendo arquivos para sintaxe do Copilot...'));

    // 1. Converter a rule master GEMINI.md em copilot-instructions.md
    const geminiPath = path.join(destAgents, 'rules', 'GEMINI.md');
    if (await fs.pathExists(geminiPath)) {
        let content = await fs.readFile(geminiPath, 'utf8');
        // Adaptamos os caminhos na rule principal para o contexto do .github/ do VS Code
        // Agora, skills são arquivos normais .md fora da pasta .github/ para evitar a autoinjeção estática e o overhead de 66 referências.
        content = content.replace(/\.\/\.agents\/skills\//g, './.copilot-skills/');
        content = content.replace(/\.\/\.agents\/vault\//g, './.copilot-vault/');
        content = content.replace(/\.\/\.agents\/rules\/GEMINI\.md/g, './.github/copilot-instructions.md');
        content = content.replace(/\{skill-name\}\/SKILL\.md/g, '{skill-name}.md'); // Para buscar arquivos achatados invés de diretórios

        // Trocar sintaxe bruta de trigger pelo ApplyTo nativo
        content = content.replace(/trigger:\s*always_on/g, 'applyTo: "**/*"');

        // As workflows no VS Code estao desabrigadas da pasta nativa, sugerimos le-las do vault ou inline
        content += `\n\n## 🔄 Workflows Base\nAs workflows antigas de Cursor (/brainstorm, etc) agora devem ser invocadas naturalmente no chat: "Rode o fluxo de brainstorm". Consulte o diretório .github/prompts/ para contexto.\n`;

        await fs.writeFile(path.join(gitHubDir, 'copilot-instructions.md'), content);
    }

    // 2. Converter as skills nativas (ativas) em arquivo comum .md achatado
    // Importante: NÃO alocamos em .github/skills pois o Copilot engole todos os Markdowns de lá e causa sobrecarga de +60 referências!
    const skillsDest = path.join(destAgents, 'skills');
    const copilotSkillsDir = path.join(destBase, '.copilot-skills');
    await fs.ensureDir(copilotSkillsDir);

    if (await fs.pathExists(skillsDest)) {
        const skillsDirs = await fs.readdir(skillsDest);
        for (const skillName of skillsDirs) {
            const skillFile = path.join(skillsDest, skillName, 'SKILL.md');
            if (await fs.pathExists(skillFile)) {
                let content = await fs.readFile(skillFile, 'utf8');
                // Salvar como .md comum achatado para a IA consultar dinamicamente via "file read" só quando requisitado
                await fs.writeFile(path.join(copilotSkillsDir, `${skillName}.md`), content);
            }
        }
    }

    // 3. Converter o Vault Index (Tudo que esta no index vira uma instrução consultável)
    const vaultIndexSrc = path.join(destAgents, 'VAULT_INDEX.md');
    if (await fs.pathExists(vaultIndexSrc)) {
        let content = await fs.readFile(vaultIndexSrc, 'utf8');
        content = content.replace(/\.\/\.agents\/vault\//g, './.copilot-vault/');
        // Também trocar eventuais menções de SKILL.md para o formato achatado.md do VSCode
        content = content.replace(/\{name\}\/SKILL\.md/g, '{name}.md');
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
                // para o equivalente funcional da arquitetura VS Code.
                content = content.replace(/\.\/\.agents\/rules\/GEMINI\.md/g, './.github/copilot-instructions.md');
                content = content.replace(/\.\/\.agents\//g, './.github/');
                content = content.replace(/GEMINI\.md/g, 'copilot-instructions.md');
                content = content.replace(/VAULT_INDEX\.md/g, 'VAULT_INDEX.md');

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

    // Limpeza pesada! Como o ambiente ja foi migrado de .agents para .github e .copilot-vault, delete a origem da instalacao hibrida.
    await fs.remove(destAgents);
}

module.exports = { convertToVsCode };
