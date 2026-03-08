#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { program } = require('commander');

program
    .version('1.0.0')
    .description('BPS Kit Installer - The NextGen Modular AI Brain Setup')
    .option('-n, --normal', 'Instala apenas as skills essenciais (39 skills, ideal para Web/React/Next)')
    .option('-e, --extra', 'Instala as skills avançadas Premium (65 skills, inclui Python, QA, Cloud e Sec)')
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
    if (options.extra) {
        mode = 'extra';
    } else if (!options.normal && !options.extra) {
        console.log(chalk.yellow('⚠️  Nenhum perfil explicitado (--normal ou --extra). Utilizando default: --normal\\n'));
    }

    const spinner = ora('Montando diretórios base...').start();

    try {
        // 1. Setup Base Directories
        await fs.ensureDir(DEST_AGENTS);

        // 2. Copy Rule and Workflows
        spinner.text = `Copiando rule máster (GEMINI.md) e Workflows de IA...`;
        await fs.copy(
            path.join(TEMPLATES_DIR, '.agents', 'rules'),
            path.join(DEST_AGENTS, 'rules') // A rule já com paths relativos
        );
        await fs.copy(
            path.join(TEMPLATES_DIR, '.agents', 'workflows'),
            path.join(DEST_AGENTS, 'workflows')
        );

        // 2.1 Copy Agents and Scripts
        spinner.text = `Copiando Personas de Agentes e Scripts (Validadores Python)...`;
        await fs.copy(
            path.join(TEMPLATES_DIR, '.agents', 'agents'),
            path.join(DEST_AGENTS, 'agents')
        );
        await fs.copy(
            path.join(TEMPLATES_DIR, '.agents', 'scripts'),
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

        // Primeiro copia normais
        await fs.copy(
            path.join(TEMPLATES_DIR, 'skills_normal'),
            skillsDest
        );

        // Se extra, copia as complementares
        if (mode === 'extra') {
            await fs.copy(
                path.join(TEMPLATES_DIR, 'skills_extra'),
                skillsDest
            );
        }

        spinner.succeed(chalk.green('Cérebro de IA instanciado com sucesso!'));

        console.log(chalk.cyan('\n============== [ RESUMO DA INSTALAÇÃO ] =============='));
        console.log(chalk.white(`Perfil Carregado : `) + chalk.greenBright(mode.toUpperCase()));
        console.log(chalk.white(`Skills Ativas    : `) + chalk.greenBright(mode === 'extra' ? '65' : '39'));
        console.log(chalk.white(`Skills no Vault  : `) + chalk.greenBright('1197'));
        console.log(chalk.cyan('======================================================'));

        console.log(chalk.yellow('\n💡 Next Steps:'));
        console.log(chalk.white('1. O sistema Antigravity já deve estar lendo o `.agents/rules/GEMINI.md`.'));
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
