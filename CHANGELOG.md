# Changelog

Todas as mudanças notáveis ​​neste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), 
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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
