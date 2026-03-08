# 🚀 BPS Kit — The Ultimate Antigravity Brain

O **BPS Kit** é a evolução modular e de larga escala do consagrado ecossistema de inteligência artificial de desenvolvedor (Antigravity). Ele é projetado como um pacote `npx` que "injeta" as regras milimétricas, habilidades (skills), personas (agents) e scripts de validação de código direto no seu repositório local.

Seu principal diferencial é o brilhante **Skill Vault System**: o sistema resolve o temido limite de tokens (Context Window) das LLMs ao armazenar mais de +1.200 skills valiosas em um cofre fechado (Vault) munido de um índice super comprimido. Ele mantém no seu "Core Ativo" apenas as Skills cruciais baseadas no perfil de desenvolvimento escolhido (ex: Web, Sec, Cloud).

## 📦 Instalação (Via NPX)

Você não precisa e não deve instalar isso via `npm install` fixo. Você invoca a maleta de ferramentas instantaneamente na raiz do projeto sempre que quiser injetar o "cérebro":

```bash
# 🟢 Modo Essencial (Antigravity Core - Web/React/Next - 39 Skills)
npx bps-kit@latest --normal

# 🔴 Modo Extra (Engenharia Pesada - Cloud/Sec/Python/QA - 65 Skills)
npx bps-kit@latest --extra

# 🟡 Modo Economia Extrema (Apenas Motor Analítico - 11 Skills Cognitivas)
npx bps-kit@latest --basic

# 💻 Integrar nativamente para VS Code (GitHub Copilot)
# Adicione a flag --vscode combinada a qualquer um dos perfis acima:
npx bps-kit@latest --basic --vscode
```

### 🧠 O que acontece após a instalação? (Motor Antigravity Padrão)
- A pasta oculta `.agents/` será criada na raiz do seu repositório.
- A IA que ler sua base de código passará instantaneamente a obedecer ao manifesto militar contido lá (o arquivo `GEMINI.md`), possuindo validação lint e audição de arquivos *out-of-the-box*.

### ⚡ O que acontece após a instalação? (VS Code / Copilot)
Se você adicionou a flag `--vscode`, a arquitetura compilada será organicamente moldada para as regras da nuvem do GitHub (`.github/`):
- O manifesto base e as Workflows irão habitar o `.github/copilot-instructions.md`.
- As Skills ativas receberão glob patterns específicos (`applyTo: "**/*"`) protegendo seu ciclo de vida.
- As famosas 20 Personas se fundirão em um único registro local `.github/AGENTS.md`.
- A gigantesca Vault contendo +1000 skills inativas será armazenada inteligentemente em isolamento (`.copilot-vault/`), salvando permanentemente seu limite de Chat no VS Code de travar.

### 🪄 Autocalibragem de Base de Código (Workflow Analyzer)
O BPS Kit inclui uma workflow customizada! Após rodar o npx no projeto, apenas diga para a IA no seu chat:

> *"Rode a workflow setup-brain para otimizar minhas skills neste projeto"*

A inteligência fará um _scan_ do seu `package.json`, `requirements.txt` ou `composer.json` e autoativará skills específicas alojadas na Vault de acordo com a sua stack real!

### 🛠️ Lidando com a Amnésia da IA (Attention Decay)

Bugs de esquecimento ocorrem devido às limitações físicas das LLMs (enorme janela de contexto vs degradação de atenção ao longo da conversa). Com o tempo, a IA pode ocasionalmente "esquecer" ou atropelar o protocolo estrito do nosso manifesto.

**A Cura imediata via RLHF:**  
O BPS Kit já embute dezenas de mecanismos passivos de _Anti-Amnesia Protocols_. Contudo, a sua melhor e definitiva defesa contínua é aplicar o **RLHF (Reinforcement Learning from Human Feedback)** direcional no chat quando o bot errar:

> *"Você quebrou as regras do seu System Prompt e do Antigravity Kit. Volte a ler e aplicar estritamente as regras de Skills abordadas de novo."*

Isso forçará a engine a jogar o lixo fora e focar nos blocos iniciais cruciais.

---

## 🏗️ Slash Commands Nativos (Modo Standard)

Se não estiver usando a flag `--vscode` (onde workflows são embutidas), você terá acesso à estrutura local com robustez. Digite no chat da sua IA:

- `/brainstorm` - O mais importante. Obrigue-a explorar opções antes de disparar o teclado para programar.
- `/plan` - Desdobramentos detalhados de planejamento arquitetural.
- `/debug` - Roda o framework forense completo contra erros de teste (Systematic Debugging).
- `/deploy` - Exige checagens manuais e de segurança pesadas antes de cometer um simples origin master push.

---

## 🙏 Agradecimentos e Créditos

O **BPS Kit** deve sua fundação brilhante e seu mar enciclopédico de regras a bibliotecas open-source excepcionais de onde os templates originais foram bifurcados/incorporados. Deixamos nossos enormes agradecimentos às fontes originais:

1. **[antigravity-awesome-skills (by sickn33)](https://github.com/sickn33/antigravity-awesome-skills)**  
   A mãe de virtualmente todas as nossas mais de 1.100+ skills abrigadas no Vault. Essa bibilioteca lendária confere a capacidade enciclopédica esmagadora de cobrir quase que a íntegra dos casos de uso para software development do planeta (Mobile, Machine Learning, Copywriting, FinOps, Design, Data Engineering e DevOps).

2. **[antigravity-kit (by vudovn)](https://github.com/vudovn/antigravity-kit)**  
   A forja estrutural primária. Responsável pela árvore original de Personas de Agentes, Workflows, Slash Commands, e os potentes 18 scripts de validação Python Hardcore na camada de código em si.

A engenharia inteira do **BPS Kit** serve massivamente para unificar essas duas titânicas inteligências em um fluxo só — através da magia do Auto-Routing isolacionista por Glob e do Vaulting Comprimido — ultrapassando enfim as limitações brutais da context-window. Sem a colaboração fundadora de vudovn e sickn33, essa maravilha não existiria.

---
## 📄 Licença

Este projeto é licenciado sob a **MIT License** — veja o arquivo [LICENSE](./LICENSE) para detalhes.
