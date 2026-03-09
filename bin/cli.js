#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { program } = require('commander');
const { execSync } = require('child_process');

const pkg = require('../package.json');

// Configuration
const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const DEST_BASE = process.cwd();
const DEST_AGENTS = path.join(DEST_BASE, '.agents');
const LOCKFILE = path.join(DEST_BASE, '.bps-kit.json');

// ──────────────────────────────────────────────────────────────────────────────
// Custom Help
// ──────────────────────────────────────────────────────────────────────────────
function printHelp() {
    console.log(`
${chalk.bold.cyan('🚀 BPS Kit')} ${chalk.dim(`v${pkg.version}`)} ${chalk.bold('— Antigravity IDE Brain Installer')}

${chalk.bold('USAGE:')}
  ${chalk.green('npx bps-kit')} ${chalk.dim('[profile] [options]')}

${chalk.bold('PROFILES:')}
  ${chalk.green('--basic')}     Modo economia extrema (11 skills) — ideal para Copilot simples
  ${chalk.green('--normal')}    Skills essenciais     (42 skills) — ideal para Web/React/Next  ${chalk.dim('[default]')}
  ${chalk.green('--extra')}     Skills Premium        (69 skills) — Python, QA, Cloud, Security

${chalk.bold('OPTIONS:')}
  ${chalk.green('--vscode')}    Converte para o formato VS Code GitHub Copilot ${chalk.dim('(.github/)')}
  ${chalk.green('--update')}    Re-instala o cérebro usando o perfil salvo neste projeto
  ${chalk.green('--upgrade')}   Atualiza o pacote bps-kit para a versão mais recente no npm
  ${chalk.green('--help')}      Exibe esta mensagem de ajuda
  ${chalk.green('--version')}   Exibe a versão atual

${chalk.bold('EXAMPLES:')}
  ${chalk.dim('npx bps-kit --normal')}
  ${chalk.dim('npx bps-kit --extra --vscode')}
  ${chalk.dim('npx bps-kit --update')}
  ${chalk.dim('npx bps-kit --upgrade')}

${chalk.bold('TARGETS:')}
  ${chalk.cyan('Antigravity IDE')} ${chalk.dim('(primary)')}  →  ${chalk.dim('.agents/')}
  ${chalk.cyan('VS Code Copilot')} ${chalk.dim('(--vscode)')} →  ${chalk.dim('.github/')} + ${chalk.dim('.copilot-skills/')}
`);
}

// ──────────────────────────────────────────────────────────────────────────────
// Upgrade — atualiza o próprio pacote npm
// ──────────────────────────────────────────────────────────────────────────────
async function runUpgrade() {
    console.log(chalk.bold.cyan('\n🔄 BPS Kit — Upgrade\n'));
    const spinner = ora('Verificando versão mais recente no npm...').start();

    try {
        const latest = execSync('npm show bps-kit version', { encoding: 'utf8' }).trim();

        if (latest === pkg.version) {
            spinner.succeed(chalk.green(`Você já está na versão mais recente: v${pkg.version}`));
            return;
        }

        spinner.text = `Atualizando bps-kit ${chalk.yellow(`v${pkg.version}`)} → ${chalk.green(`v${latest}`)}...`;
        execSync('npm install -g bps-kit@latest', { stdio: 'inherit' });
        spinner.succeed(chalk.green(`bps-kit atualizado para v${latest} com sucesso! 🎉`));
        console.log(chalk.dim('\nPróxima execução: npx bps-kit --update  (para re-instalar o cérebro com o novo pacote)\n'));

    } catch (err) {
        spinner.fail(chalk.red('Falha ao verificar ou instalar atualização.'));
        console.error(chalk.dim(err.message));
        process.exit(1);
    }
}

// ──────────────────────────────────────────────────────────────────────────────
// Update — re-instala usando o perfil salvo em .bps-kit.json
// ──────────────────────────────────────────────────────────────────────────────
async function runUpdate() {
    console.log(chalk.bold.cyan('\n♻️  BPS Kit — Update\n'));

    if (!await fs.pathExists(LOCKFILE)) {
        console.log(chalk.red('✖ Lockfile .bps-kit.json não encontrado neste diretório.'));
        console.log(chalk.yellow('  Execute a instalação inicial primeiro:'));
        console.log(chalk.dim('  npx bps-kit --normal        (ou --basic / --extra)\n'));
        process.exit(1);
    }

    const lock = await fs.readJson(LOCKFILE);
    const mode = lock.mode || 'normal';
    const wasVscode = lock.vscode || false;

    console.log(chalk.white(`Perfil detectado : `) + chalk.greenBright(mode.toUpperCase()));
    console.log(chalk.white(`VS Code mode     : `) + chalk.greenBright(wasVscode ? 'sim' : 'não'));
    console.log('');

    // Reutilizar a lógica de instalação
    await runInstaller({ basic: mode === 'basic', normal: mode === 'normal', extra: mode === 'extra', vscode: wasVscode });
}

// ──────────────────────────────────────────────────────────────────────────────
// Commander setup
// ──────────────────────────────────────────────────────────────────────────────

// Interceptar --help e ausência de flags ANTES do commander processar
const rawArgs = process.argv.slice(2);
if (rawArgs.length === 0 || rawArgs.includes('--help') || rawArgs.includes('-h')) {
    printHelp();
    process.exit(0);
}

program
    .name('bps-kit')
    .version(pkg.version, '-v, --version', 'Exibe a versão atual')
    .description('BPS Kit — Antigravity IDE Brain Installer')
    .option('-b, --basic', 'Modo economia extrema (11 skills apenas o core analítico, ideal para Copilot)')
    .option('-n, --normal', 'Instala as skills essenciais (42 skills, ideal para Web/React/Next)')
    .option('-e, --extra', 'Instala as skills avançadas Premium (69 skills, inclui Python, QA, Cloud e Sec)')
    .option('--vscode', 'Converte a estrutura para o formato VS Code GitHub Copilot (.github/)')
    .option('--update', 'Re-instala o cérebro usando o perfil salvo (.bps-kit.json)')
    .option('--upgrade', 'Atualiza o pacote bps-kit para a versão mais recente no npm')
    .helpOption(false)
    .parse(process.argv);

const options = program.opts();

// Roteamento
if (options.upgrade) {
    runUpgrade();
} else if (options.update) {
    runUpdate();
} else {
    (async () => {
        // Determinar o mode (default normal se nao passar args)
        let mode = 'normal';
        if (options.basic) {
            mode = 'basic';
        } else if (options.extra) {
            mode = 'extra';
        }
        await runInstaller({ ...options, _mode: mode });
    })();
}

// ──────────────────────────────────────────────────────────────────────────────
// Installer principal
// ──────────────────────────────────────────────────────────────────────────────
async function runInstaller(opts = {}) {
    console.log(chalk.bold.cyan('\n🚀 BPS Kit Setup Inicializado'));
    console.log(chalk.dim('Instalando Cérebro de IA customizado para seu repositório...\n'));

    let mode = opts._mode || 'normal';
    if (opts.basic) mode = 'basic';
    else if (opts.extra) mode = 'extra';
    else if (opts.normal) mode = 'normal';

    const spinner = ora('Montando diretórios base...').start();

    try {
        if (opts.vscode && await fs.pathExists(path.join(DEST_BASE, '.github'))) {
            spinner.warn(chalk.yellow('Aviso: Pasta .github detectada. Os artefatos do Copilot serão sobrescritos se existirem.'));
            spinner.start('Montando diretórios base...');
        } else if (!opts.vscode && await fs.pathExists(DEST_AGENTS)) {
            spinner.warn(chalk.yellow('Aviso: Pasta .agents já existe. O BPS Kit a sobrescreverá.'));
            spinner.start('Montando diretórios base...');
        }

        // 1. Setup Base Directories
        await fs.ensureDir(DEST_AGENTS);

        // 2. Copy Rule, ARCHITECTURE.md, and Workflows
        spinner.text = `Copiando rule máster (GEMINI.md), ARCHITECTURE.md e Workflows de IA...`;
        await fs.copy(
            path.join(TEMPLATES_DIR, 'agents-template', 'rules'),
            path.join(DEST_AGENTS, 'rules') // A rule já com paths relativos
        );
        await fs.copy(
            path.join(TEMPLATES_DIR, 'agents-template', 'ARCHITECTURE.md'),
            path.join(DEST_AGENTS, 'ARCHITECTURE.md')
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
        if (opts.vscode) {
            spinner.text = `Transformando arquitetura para padrão GitHub Copilot (VS Code)...`;
            const { convertToVsCode } = require('./convert_to_vscode');
            await convertToVsCode(DEST_AGENTS, DEST_BASE);
        }

        // 6. Salvar lockfile com perfil utilizado
        await fs.writeJson(LOCKFILE, {
            mode,
            vscode: opts.vscode || false,
            version: pkg.version,
            installedAt: new Date().toISOString(),
        }, { spaces: 2 });

        spinner.succeed(chalk.green('Cérebro de IA instanciado com sucesso!'));

        let finalCount = '42';
        if (mode === 'basic') finalCount = '11';
        if (mode === 'extra') finalCount = '69';

        console.log(chalk.cyan('\n============== [ RESUMO DA INSTALAÇÃO ] =============='));
        console.log(chalk.white(`Perfil Carregado : `) + chalk.greenBright(mode.toUpperCase()));
        console.log(chalk.white(`Skills Ativas    : `) + chalk.greenBright(finalCount));
        console.log(chalk.white(`Skills no Vault  : `) + chalk.greenBright('1197'));
        console.log(chalk.white(`Lockfile         : `) + chalk.dim('.bps-kit.json'));
        console.log(chalk.cyan('======================================================'));

        console.log(chalk.yellow('\n💡 Next Steps:'));
        if (opts.vscode) {
            console.log(chalk.white('1. O GitHub Copilot Agent já deve estar lendo o `.github/copilot-instructions.md`.'));
        } else {
            console.log(chalk.white('1. O sistema Antigravity já deve estar lendo o `.agents/rules/GEMINI.md`.'));
        }
        console.log(chalk.white('2. Para auto-calibrar a sua IA baseada nos arquivos deste repositório, basta pedir para ele:\n'));
        console.log(chalk.dim('   "Rode a workflow setup-brain para otimizar minhas skills neste projeto"'));
        console.log(chalk.dim('\n   npx bps-kit --update    (para re-instalar o cérebro após um upgrade)'));
        console.log('\n🌟 Boa codificação estruturada!\n');

    } catch (error) {
        spinner.fail(chalk.red('Falha na instalação.'));
        console.error(error);
        process.exit(1);
    }
}
