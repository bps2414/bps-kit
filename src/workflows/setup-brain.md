---
description: Analisa a stack tecnológica do repositório atual e otimiza as skills ativas e o vault do Antigravity
---

# Workflow: Setup Brain & Repository Analysis

Este workflow permite que eu (o seu agente Antigravity) faça uma varredura completa da stack do seu projeto recém-criado, leia o que já está instalado (via BPS Kit), e sugira ou automatize a transferência de skills do `vault/` para a lista de `skills/` ativas (e vice-versa). 

### Passo a Passo da Análise

> **🚨 AVISO**: Leia e execute os passos um a um.

1. **Varredura Inicial**: 
   - Use as tools do sistema (ex: `list_dir`, `view_file` ou `find_by_name`) para encontrar manifestos de dependência na raiz do projeto (`package.json`, `requirements.txt`, `Pipfile`, `docker-compose.yml`, `go.mod`, etc.).
   - Analise tecnologias, frameworks, bibliotecas e estrutura arquitetural do repositório.

2. **Leitura do VAULT_INDEX**:
   - Faça `view_file` em `./.agents/VAULT_INDEX.md` para ter o mapa completo das +1100 skills inativas do seu cérebro de desenvolvedor.

3. **Check de Ativas vs Inativas**:
   - Compare o que o repositório usa com as skills que estão na pasta local de configuração (`./.agents/skills/`).
   - Elabore uma checklist baseada no contexto:
      - *Quais skills estão no vault mas deveriam ser ativadas?* (exemplo: se há Tailwind, devo puxar `tailwind-patterns`. Se for Python, `python-pro`).
      - *Existe alguma skill ativa desnecessária?* (e.g. ativou `nextjs-best-practices` mas o projeto é em Vue).

4. **Elaborar e Apresentar a Estratégia ao Usuário (`notify_user`)**:
   - Entre em modo `notify_user` e apresente ao humano:
     - As tecnologias detectadas.
     - A lista das skills ativas atuais.
     - Recomendações sólidas de X skills a serem puxadas do `vault/` para `skills/` (para turbinar o desenvolvimento) com seus respectivos motivadores.
   - Solicite aprovação do usuário para executar as movimentações locais.

5. **Execução Automática da Otimização**:
   - Assim que o usuário aprovar, utilize tools de shell para MOVER as pastas de skills:
     - Desativar: mover de `./.agents/skills/{skill}` → `./.agents/vault/{skill}`
     - Ativar: copiar de `./.agents/vault/{skill}` → `./.agents/skills/{skill}`
   - Confirme o total final de skills ativas após os movimentos.

6. **Atualização da Rule File (OBRIGATÓRIO após mover skills)**:
   - Detecte qual formato está instalado no repositório:
     - **VS Code / Copilot**: Rule File = `.github/copilot-instructions.md`
     - **Antigravity padrão (Cursor/Windsurf)**: Rule File = `.agents/rules/GEMINI.md`
   - Após mover as skills, edite a Rule File atualizando TODOS os trechos que referenciam nomes de skills:

   **a) `Skill Auto-Routing System` → contagem de active skills:**
   ```
   - **Active skills** (~N): in `./.agents/skills/` (ou `./.copilot-skills/` no VS Code)
   ```
   Substituir N pelo número real de skills ativas após a otimização.

   **b) `Intent → Skill Routing Map`:**
   - Remover todas as linhas de intent que apontam para skills que foram movidas para o vault.
   - Adicionar/ajustar entradas baseadas nas novas skills ativas e na stack detectada.
   - Exemplo: se `tailwind-patterns` foi para o vault, remover da linha `UI/component`.

   **c) `Project Type Routing` (TIER 1):**
   - Atualizar a tabela de agentes/skills para refletir o tipo real de projeto detectado.
   - Adicionar nota `> 🔴 Este projeto é [tipo detectado]. Não usar agentes de [tipos irrelevantes].`

   **d) `Final Checklist` (TIER 1):**
   - Remover linhas de scripts que dependem de skills agora no vault (ex: `ux_audit.py → frontend-design`).
   - Manter apenas scripts cujas skills dependentes ainda estejam ativas.

   **e) `QUICK REFERENCE`:**
   - Atualizar `Masters` e `Key Skills` para refletir os agentes/skills relevantes ao projeto.

### Critérios de Sucesso
- **Precisão**: Apenas skills de altíssimo valor agregado (diretamente conectadas com a stack) serão movidas. Não encha o contexto em vão. Você foi programado para manter seu Token footprint baixo.
- A Rule File deve estar 100% sincronizada com as skills ativas — zero referências a skills no vault.
- Encerre rodando uma mensagem informando o resultado "Cérebro Calibrado e Otimizado para este ecossistema."
