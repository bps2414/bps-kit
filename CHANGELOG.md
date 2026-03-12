# Changelog

Todas as mudanças notáveis ​​neste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), 
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.5.1] - 2026-03-12
### Modificado
- **Skills ativas agora vão para `.github/skills/`** ao usar `--vscode`, em vez de `.copilot-skills/` — alinhado com a convenção nativa do GitHub Copilot (dentro de `.github/`).
  - `applyPathReplacements()`: regex `.agents/skills/` → `.github/skills/` atualizado nas 3 cópias do converter.
  - Scripts Python (`checklist.py`, `verify_all.py`) têm referências internas `.agents/skills/` reescritas para `.github/skills/` automaticamente ao serem movidos para `.github/scripts/`.
- **`cli.js`**: Texto de help atualizado: `.copilot-skills/` → `.github/skills/`.
- **`README.md`**: Referência de destino das skills atualizada.
- **`.gitignore`**: Entrada stale `.copilot-skills/` removida (coberta por `.github/`).

## [1.5.0] - 2026-03-12
### Modificado
- **Migração estrutural completa para GitHub Copilot**: A conversão `--vscode` agora segue rigorosamente a arquitetura nativa do Copilot:
  - **Rules** (`GEMINI.md`, `AGENTS.md`) agora vão para `.github/instructions/` como `gemini.instructions.md` e `agents.instructions.md` com frontmatter `applyTo: "**"` — anteriormente exportavam para `.github/copilot-instructions.md` e `.github/AGENTS.md` flat files.
  - **Agents** permanecem em `.github/agents/*.agent.md` (sem mudança).
  - **Workflows/Prompts** permanecem em `.github/prompts/*.prompt.md` (sem mudança).
  - **Skills** permanecem em `.copilot-skills/` (sem mudança).
- **`convert_to_vscode.js`**: Refatorado com helper centralizado `applyPathReplacements()` eliminando duplicação de regex em 3 blocos. Todas as 3 cópias do script (bin/, templates/, src/) foram sincronizadas.
- **`cli.js`**: Mensagem pós-instalação VS Code atualizada para referenciar `.github/instructions/`.
- **`README.md`**: Seção "O que acontece após a instalação (VS Code)" reescrita com mapeamento correto.
- **`setup-brain.md`**: Lista de arquivos protegidos atualizada (ambas cópias: templates/ e src/).

## [1.4.1] - 2026-03-11
### Corrigido
- **`automation-specialist.md`**: Arquivo faltando em `src/agents/` — criado e sincronizado com `templates/`.
- **`debugger.md`**: Frontmatter incompleto em `src/` e `templates/` — adicionados campos `tools` e `model: inherit` faltantes.
- **`frontend-specialist.md`**: Dois skills (`design-md`, `enhance-prompt`) faltando em `src/` — sincronizado com template.
- **`setup-brain.md`** em `src/`: Passo 6 ainda continha a versão antiga (editava GEMINI.md) — sincronizado com a versão corrigida do template.
- **`AGENTS.md`**: Coluna "Skills (frontmatter)" corrigida para 20/22 agentes — agora reflete exatamente o frontmatter `skills:` real de cada agente (removido `clean-code` genérico, adicionados skills específicos por domínio).
- **`orchestrate.md`**: Tabela de agentes listava apenas 16 agentes — atualizada para todos os 22, incluindo `qa-automation-engineer`, `site-builder`, `automation-specialist`, `code-archaeologist`, `product-manager`, `product-owner`. Checklist de domínios expandida com 4 novos domínios.
- **`ARCHITECTURE.md`**: Corrigidas contagens (20→22 agentes, 12→15 workflows), tabela de agentes atualizada com skills reais, workflows `/automate`, `/build-site` e `/recall` adicionados, Quick Reference atualizado.
- **`copy_templates.js`**: Adicionado step de cópia do `AGENTS.md` ao pipeline (com fallback de aviso). `NORMAL_SKILLS` expandida com `design-md`, `enhance-prompt`, `react-components` e 7 skills `n8n-*`. `EXTRA_SKILLS` expandida com `stitch-loop`.
- **`.agents/rules/AGENTS.md`**: Criado como fonte para o pipeline `copy_templates.js`.

## [1.4.0] - 2026-03-11
### Adicionado
- **AGENTS.md**: Novo arquivo de regras dedicado ao routing de agentes, extraído do `GEMINI.md`. Contém a tabela Keyword→Agent completa com 22 agentes mapeados, regras de boundary enforcement e file type ownership. Distribuído automaticamente em `.agents/rules/AGENTS.md` (Antigravity) e `.github/AGENTS.md` (VS Code Copilot via `--vscode`).
- **`convert_to_vscode.js`**: Suporte nativo ao `AGENTS.md` — o arquivo é convertido e copiado para `.github/AGENTS.md` com os mesmos path replacements do `GEMINI.md` (skills, vault, agents, scripts, frontmatter trigger).

### Corrigido
- **GEMINI.md**: 5 causas raiz que forçavam `Agent: orchestrator | Skill: none` como default foram eliminadas:
  - `Auto-Selection Protocol` genérico substituído por referência à tabela concreta do `AGENTS.md`.
  - Step 2 do checklist aponta explicitamente para `AGENTS.md` com instrução `NUNCA default orchestrator`.
  - `PRE-FLIGHT OBRIGATÓRIO` reposicionado para pós-roteamento (passos 1-7) com revalidação anti-orchestrator.
  - Step 5 agora carrega skills do frontmatter `skills:` do agente além do Intent Map.
  - Gemini Mode `edit` não mais hardcoded para `orchestrator` — redireciona para Keyword→Agent table.
  - Seção `Core Rule — Skills First` redundante removida (liberando espaço).
- `GEMINI.md` reduzido de 279 → 182 linhas (−35%) sem perda de informação.

## [1.2.0] - 2026-03-09
### Adicionado
- Novo template `ARCHITECTURE.md` distribuído junto ao kit, mapeando os 20 agentes com suas skills, skills organizadas por tier (basic/normal/extra), 12 workflows e scripts de validação disponíveis. Referenciado obrigatoriamente pelo `GEMINI.md` no startup da sessão.
- Passo de cópia do `ARCHITECTURE.md` adicionado ao `cli.js` — agora instalado em `.agents/ARCHITECTURE.md` (Gemini/Cursor/Windsurf) e `.github/ARCHITECTURE.md` (VS Code Copilot) automaticamente.
- Scripts de validação (`checklist.py`, `verify_all.py`) agora são movidos para `.github/scripts/` no modo `--vscode`, corrigindo bug crítico onde eram silenciosamente deletados junto com `.agents/`.

### Corrigido
- **GEMINI.md**: 12 problemas identificados e corrigidos no template global:
  - Todos os 6 paths `.agent/` (singular) corrigidos para `.agents/` (plural) com subpastas adequadas.
  - Protocolo Anti-Amnesia removido (instrução impossível para LLMs — causava loops).
  - Skill count hardcoded `(~69)` substituído por referência dinâmica ao `ARCHITECTURE.md`.
  - Skills e scripts fantasmas removidos do Routing Map e do Checklist Final (ex: `test_runner.py`, `ux_audit.py`).
  - Socratic Gate expandido com 5ª estratégia "Direct Proceed" + validação de edge cases.
  - TIER 2 corrigido para paths `.agents/agents/` ao invés de `.agents/` direto.
  - Seção `Path Awareness` adicionada ao TIER 0 com mapa completo de diretórios.
  - Seção `System Map Read` adicionada — leitura obrigatória do `ARCHITECTURE.md` no início da sessão.
  - Final Checklist Protocol atualizado com comandos Python executáveis.
  - `QUICK REFERENCE` expandido com listas de Scanners e Audits.
- **convert_to_vscode.js**: Regexes atualizadas para cobrir paths `.agents/` com e sem prefixo `./`. Novos padrões adicionados para `.agents/agents/`, `.agents/scripts/` e `.agents/ARCHITECTURE.md`. Passos 7 e 8 adicionados para copiar `ARCHITECTURE.md` e mover `scripts/` para `.github/`.

## [1.0.18] - 2026-03-08
### Modificado
- Universalização do *Lazy-Loading*: A instrução contida no template base `GEMINI.md` dizia que as habilidades (skills) na pasta raíz estariam "*always in context*" (sempre no contexto). Essa linha foi alterada para um comando forte que impõe as IAs nativas (Windsurf e Cursor) lerem a habilidade "explicitly read the SKILL.md file via file tools before using". Isso universaliza a redução de uso de Tokens Passivos (barrando possíveis alucinações de contexto) em todas as esferas e não apenas na arquitetura VS Code Copilot.
- Com isso, o construtor do VS Code (`convert_to_vscode.js`) não precisa mais realizar uma conversão *custom* desta *string* especifica visto que a performance de token foi regularizada no template Global.

## [1.0.17] - 2026-03-08
### Corrigido
- O script `convert_to_vscode.js` esvaziava os metadados e scripts em Python de `.copilot-skills/` durante o processo de migração por achatar ativamente e destrutivamente pastas em um `.md` individual. O conversor agora move a pasta preservando a sanidade estrutural e utilitária de cada *skill*.
- Regex deficiente fazia com que as worklows base herdadas referissem-se à pastas extintas (`.github/skills`). Normalizado para ditar o ponteiro `.copilot-skills/`.
- Deletado rastros estáticos e zumbis que persistiam a criar uma pasta `.github/instructions` vazia, causando confusão a usuários inspecionando o repositório.
- A regra global *GEMINI* foi adequada para informar ao Copilot para ativamente ler (`view_file`) skills em vez de achar estáticamente que já estão no seu contexto (como era no pre-requisito original para a IDE Cursor).

## [1.0.16] - 2026-03-08
### Corrigido
- Sincronização dos Paths Estáticos: O template global do projeto (`GEMINI.md`) possuía vestígios do path absoluto de leitura desvinculadas às regras autônomas implementadas para instâncias individuais. Isto estava impedindo o construtor regex do backend (`convert_to_vscode.js`) de ler e traduzir os caminhos originais em caminhos ocultados apropriados para lidar com o GitHub Copilot Agent.

## [1.0.15] - 2026-03-08
### Corrigido
- Eliminado Overhead Brutal (+66 Referências Vias Copilot) mudando os Markdowns de Skills ativas para uma pasta raiz independente `.copilot-skills/` em vez de abrigá-las no escopo autônomo do `.github/`.
- Adequado o formato do `copilot-instructions.md` trocando a propriedade estática de IA autônoma `trigger: always_on` pelo metadado padrão do GitHub Copilot `applyTo: "**/*"`.

## [1.0.14] - 2026-03-08
### Corrigido
- O conversor de Copilot deixou de exportar **Skills** com a sintaxe `.instructions.md` munida de `applyTo: "**/*"`. Anteriormente, isso engatilhava o VS Code a injetar todos os 65 contextos do Antigravity na engine do Copilot de uma única vez, provocando erro letal na API GenAI (`128558 exceeds the limit of 128000`).
- Skills exportadas via `--vscode` voltam a ser documentos `.md` puritanos em `.github/skills/nome.md`, encarregando o Copilot Agent de performar "file reads" inteligentes on-demand seguindo mapeamento semântico no próprio `copilot-instructions.md`.

## [1.0.13] - 2026-03-08
### Corrigido
- Workflows exportadas para Copilot Prompts (`.github/prompts/`) agora processam sua integridade lexical e efetuam substituições completas via RegEx, trocando qualquer referência contextual de `GEMINI.md` ou `.agents/` para adequação na nuvem do Copilot (`copilot-instructions.md` e `.github/`).

## [1.0.12] - 2026-03-08
### Adicionado
- Script conversor do VS Code agora transcreve dinamicamente blocos de Frontmatter YAML embutindo o parâmetro `description` e array vazio em `tools: []` para os Agentes Extraídos.
- Adicionado injeção do cabeçalho de metadados `agent: agent` nas extensões processadas do Copilot Prompts.
- Troca forçada da extensão canônica geradora de `.md` para `.agent.md` e `.prompt.md`.

## [1.0.11] - 2026-03-08
### Corrigido
- Expurgo do `node_modules/` do tracking source do sistema de repositórios do Git.
- Refinamentos drásticos na estrutura nativa tratada do Copilot (`--vscode` flag): Personas (Agents) baseadas em sistema consolidado foram re-desmembradas e alocadas organicamente em `.github/agents/`. Workflows foram mapeadas em `.github/prompts/*.prompt.md`.
- Instaladores agora emitem alertas amarelos prevenidos na interface se estiverem sobrescrevendo diretórios (`.agents/` ou `.github/`) previamente rastreados durante um setup de perfil repetido.

## [1.0.10] - 2026-03-08
### Corrigido
- Resolução do erro `MODULE_NOT_FOUND` reportado ao disparar a CLI contendo as flags combinadas de `--extra` / `--basic` e `--vscode`.
- O utilitário conversor do GitHub Copilot havia ficado ilhado na pasta ignorada do NPM (`src/`) pois fazia parte da raiz template de desenvolvedor invés da build da CLI final. Foi realocado para a diretriz `bin/` operante.

## [1.0.9] - 2026-03-08
### Modificado
- Refatoração visual completa do `README.md` com adição de emblemas (badges) e seções formatadas.
- Remoção de menções à ferramentas de terceiros no README, com foco centralizado na engine do Antigravity e na integração oficial do VS Code.
- Inclusão oficial garantida de `node_modules/` no `.gitignore` para limpezas.
- Finalização da auditoria do artefato de checkup para a infraestrutura do Copilot.

## [1.0.8] - 2026-03-08
### Adicionado
- **Flag `--basic`:** Incluída opção de economia extrema de tokens, importando apenas 11 skills do core cognitivo e analítico da IA, reduzindo o overflow da janela de contexto.
- **Flag `--vscode`:** Grande atualização de arquitetura. O CLI agora suporta a conversão "on-the-fly" da arquitetura `.agents` tradicional para a arquitetura `.github` requerida nativamente pelo **GitHub Copilot** no VS Code.

## [1.0.7] - 2026-03-08
### Corrigido
- Ajuste e inclusão das especificações de Licença (MIT) diretamente na documentação primária do repositório público.

## [1.0.6] - 2026-03-08
### Ajustado
- Remoção pesada das referências "fantasmas" dos paths do Antigravity nos templates do `GEMINI.md` e do `VAULT_INDEX.md`, para garantir independência de sistema para os usuários finais.

## [1.0.1] até [1.0.5] - 2026-03-08
### Corrigido
- Séries de patches resolutos para contornar o mecanismo de segurança rígido do NPM, que ignorava pastas `.agents` ocultas durante a montagem do pacote de publicação.
- Solução implementada através de pastas "mock" renomeadas durante a etapa de `dest` do instalador em Node.js.

## [1.0.0] - 2026-03-08
### Lançamento Inicial
- Projeto fundado.
- Criação do instalador executável `npx bps-kit`.
- Separação revolucionária de mais de 1.200 especialistas/skills em um `Vault` inabitado, resolvendo o problema de limite de context-window e "Attention Decay".
- Perfis `normal` (39 skills web) e `extra` (65 skills gerais) estabelecidos.
- Slash workflows, Rules customizadas e Scripts Python auditores importados com sucesso a partir do fork matriz.
