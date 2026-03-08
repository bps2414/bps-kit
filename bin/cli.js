#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { program } = require('commander');

program
    .version('1.0.0')
    .description('BPS Kit Installer - The NextGen Modular AI Brain Setup')
    .option('-b, --basic', 'Modo economia extrema (11 skills apenas o core analítico, ideal para Copilot)')
    .option('-n, --normal', 'Instala as skills essenciais (39 skills, ideal para Web/React/Next)')
    .option('-e, --extra', 'Instala as skills avançadas Premium (65 skills, inclui Python, QA, Cloud e Sec)')
    .option('--vscode', 'Converte a estrutura final herdada do Cursor/Windsurf (.agents) para o formato do VS Code GitHub Copilot (.github)')
    .parse(process.argv);

const options = program.opts();

// Configuration
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const DEST_BASE = process.cwd();
const DEST_AGENTS = path.join(DEST_BASE, '.agents');
const DEST_GEMINI = path.join(DEST_BASE, '.gemini'); // Symlink fake fallback or rules

async function runInstaller() {
    console.log(chalk.bold.cyan('\n🚀 BPS Kit Setup Inicializado'));
    console.log(chalk.dim('Instalando Cérebro de IA customizado para seu repositório...\n'));

    // Determinar o mode (default normal se nao passar args)
    let mode = 'normal';
    if (options.basic) {
        mode = 'basic';
    } else if (options.extra) {
        mode = 'extra';
    } else if (!options.normal && !options.extra && !options.basic) {
        console.log(chalk.yellow('⚠️  Nenhum perfil explicitado (--basic, --normal ou --extra). Utilizando default: --normal\n'));
    }

    const spinner = ora('Montando diretórios base...').start();

    try {
        if (options.vscode && await fs.pathExists(path.join(DEST_BASE, '.github'))) {
            spinner.warn(chalk.yellow('Aviso: Pasta .github detectada. Os artefatos do Copilot serão sobrescritos se existirem.'));
            spinner.start('Montando diretórios base...');
        } else if (!options.vscode && await fs.pathExists(DEST_AGENTS)) {
            spinner.warn(chalk.yellow('Aviso: Pasta .agents já existe. O BPS Kit a sobrescreverá.'));
            spinner.start('Montando diretórios base...');
        }

        // 1. Setup Base Directories
        await fs.ensureDir(DEST_AGENTS);

        // 2. Copy Rule and Workflows
        spinner.text = `Copiando rule máster (GEMINI.md) e Workflows de IA...`;
        await fs.copy(
            path.join(TEMPLATES_DIR, 'agents-template', 'rules'),
            path.join(DEST_AGENTS, 'rules') // A rule já com paths relativos
        );
        await fs.copy(
            path.join(TEMPLATES_DIR, 'agents-template', 'workflows'),
            path.join(DEST_AGENTS, 'workflows')
        );

        // 2.1 Copy Agents and Scripts
        spinner.text = `Copiando Personas de Agentes e Scripts (Validadores Python)...`;
        await fs.copy(
            path.join(TEMPLATES_DIR, 'agents-template', 'agents'),
            path.join(DEST_AGENTS, 'agents')
        );
        await fs.copy(
            path.join(TEMPLATES_DIR, 'agents-template', 'scripts'),
            path.join(DEST_AGENTS, 'scripts')
        );

        // 3. Copy Vault & Index
        spinner.text = `Sincronizando Vault (+1100 skills)...`;
        await fs.copy(
            path.join(TEMPLATES_DIR, 'vault'),
            path.join(DEST_AGENTS, 'vault')
        );
        await fs.copy(
            path.join(TEMPLATES_DIR, 'VAULT_INDEX.md'),
            path.join(DEST_AGENTS, 'VAULT_INDEX.md')
        );

        // 4. Copy Active Skills based on Profile
        const skillsDest = path.join(DEST_AGENTS, 'skills');
        await fs.ensureDir(skillsDest);

        spinner.text = `Injetando pacotes de skills do perfil [${chalk.yellow(mode)}]...`;

        // Copiar pacote baseado no mode
        if (mode === 'basic') {
            await fs.copy(path.join(TEMPLATES_DIR, 'skills_basic'), skillsDest);
        } else if (mode === 'normal') {
            await fs.copy(path.join(TEMPLATES_DIR, 'skills_normal'), skillsDest);
        } else if (mode === 'extra') {
            await fs.copy(path.join(TEMPLATES_DIR, 'skills_normal'), skillsDest);
            await fs.copy(path.join(TEMPLATES_DIR, 'skills_extra'), skillsDest);
        }

        // 5. Conversor para VS Code se solicitado
        if (options.vscode) {
            spinner.text = `Transformando arquitetura para padrão GitHub Copilot (VS Code)...`;
            const { convertToVsCode } = require('./convert_to_vscode');
            await convertToVsCode(DEST_AGENTS, DEST_BASE);
        }

        spinner.succeed(chalk.green('Cérebro de IA instanciado com sucesso!'));

        let finalCount = '39';
        if (mode === 'basic') finalCount = '11';
        if (mode === 'extra') finalCount = '65';

        console.log(chalk.cyan('\n============== [ RESUMO DA INSTALAÇÃO ] =============='));
        console.log(chalk.white(`Perfil Carregado : `) + chalk.greenBright(mode.toUpperCase()));
        console.log(chalk.white(`Skills Ativas    : `) + chalk.greenBright(finalCount));
        console.log(chalk.white(`Skills no Vault  : `) + chalk.greenBright('1197'));
        console.log(chalk.cyan('======================================================'));

        console.log(chalk.yellow('\n💡 Next Steps:'));
        if (options.vscode) {
            console.log(chalk.white('1. O GitHub Copilot Agent já deve estar lendo o `.github/copilot-instructions.md`.'));
        } else {
            console.log(chalk.white('1. O sistema Antigravity já deve estar lendo o `.agents/rules/GEMINI.md`.'));
        }
        console.log(chalk.white('2. Para auto-calibrar a sua IA baseada nos arquivos deste repositório, basta pedir para ele:\n'));
        console.log(chalk.dim('   "Rode a workflow setup-brain para otimizar minhas skills neste projeto"'));
        console.log('\n🌟 Boa codificação estruturada!\n');

    } catch (error) {
        spinner.fail(chalk.red('Falha na instalação.'));
        console.error(error);
        process.exit(1);
    }
}

runInstaller();
