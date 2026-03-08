# Changelog

Todas as mudanças notáveis ​​neste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), 
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

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
