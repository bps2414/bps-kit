# 🚀 BPS Kit - The Ultimate Antigravity Brain

O **BPS Kit** é a evolução modular e em larga escala do ecossistema de inteligência artificial de desenvolvedor (Antigravity). Ele é projetado como um pacote `npx` que "injeta" as regras, habilidades (skills), personas (agents) e scripts de validação de código direto no seu repositório local (`.agents/`).

Seu principal diferencial é o **Skill Vault System**: o sistema resolve o limite de tokens das LLMs ao armazenar mais de +1.200 skills em um cofre (Vault) com um índice super comprimido, mantendo no seu "Core Ativo" apenas as Skills cruciais baseadas em qual perfil de desenvolvimento você precisa (Web/React ou Full/Python/Sec/Cloud).

## 📦 Instalação (Via NPX)

Você pode instanciar o "cérebro" da Inteligência Artificial em qualquer repositório executando o cli diretamente:

```bash
# Para a stack Web tradicional (39 Skills ultra eficientes)
npx bps-kit --normal

# Para a stack Completa Avançada (65 Skills: Python, Pentest, DevOps, Data)
npx bps-kit --extra
```

### O que acontece após a instalação?
- A pasta `.agents/` será criada na raiz do seu repositório.
- Nela residirá o seu `GEMINI.md` master, as pastas de `agents`, `scripts`, `workflows`, `skills` (Ativas) e `vault` (Inativas + Index).
- A IA que ler sua base de código (ex: Antigravity no editor Windsurf ou Cursor) passará instantaneamente a obedecer essas diretrizes, possuindo validação lint e audit out-of-the-box.

### 🪄 Autocalibragem de Base de Código (Workflow Analyzer)
O BPS Kit inclui uma workflow customizada! Após rodar o npx no projeto, apenas diga para a IA no seu chat:

> *"Rode a workflow setup-brain para otimizar minhas skills neste projeto"*

A inteligência fará um _scan_ do seu `package.json`, `requirements.txt` ou `composer.json` e autoativará skills específicas alojadas na Vault de acordo com a sua stack real!

### 🧠 Lidando com a Amnésia da IA (Attention Decay)

Devido às limitações arquiteturais das LLMs modernas (como a enorme janela de contexto e o modelo de *Attention Decay*), assim como conflitos com o *System Prompt* nativo da IDE, a IA pode ocasionalmente "esquecer" ou atropelar o protocolo estrito do nosso `GEMINI.md` (deixando de anunciar a Persona e pulando o checklist) em conversas que fiquem muito extensas.

**Como Reverter:**
O BPS Kit já embute `Anti-Amnesia Protocols` nas regras internas, mas a sua melhor defesa caso a máquina saia dos trilhos para lhe entregar o código "mais rápido" que a formatação é o **RLHF (Reinforcement Learning from Human Feedback)** direcional.

Caso não veja o anúncio obrigatório da IA (ex: `🤖 Applying knowledge...`), simplesmente dê o comando no chat:

> *"Você quebrou as regras do BPS Kit. Volte a ler e aplicar estritamente o GEMINI.md."*

Isso limpará as abstrações ruidosas e renovará os tensores de atenção instantaneamente, religando o protocolo militar exigido pelo pacote.

---

## 🏗️ Slash Commands Integrados 

Acesse workflows robustos empacotados digitando barras (slash) no chat da IA:

- `/brainstorm` - Explorar opções antes de implementar.
- `/create` - Iniciar novos aplicativos Full-Stack.
- `/plan` - Desdobramentos detalhados de planejamento técnico.
- `/debug` - Debugger sistemático pesado baseado nos scripts Python.
- `/deploy` - Validações hardcore antes de empurrar pra produção.
- `/setup-brain` - Roda o Analyzer de calibração do BPS Kit.

---

## 🙏 Agradecimentos e Créditos

O **BPS Kit** deve sua fundação brilhante e seu mar enciclopédico de regras a bibliotecas open-source excepcionais de onde os templates originais foram bifurcados/incorporados. Deixamos nossos enormes agradecimentos às fontes originais:

1. **[antigravity-awesome-skills (by sickn33)](https://github.com/sickn33/antigravity-awesome-skills)**
   Essa é a mãe das +1.000 (mais de mil!) skills que formam a nossa pasta de *Vault* no BPS Kit, conferindo uma capabiliade gigantesca em Virtualmente quase qualquer cenário de tecnologia (Marketing, Cloud, Languages, DBs, Mobile e Copywriting).

2. **[antigravity-kit (by vudovn)](https://github.com/vudovn/antigravity-kit)**
   A origem estrutural (A pasta base, Referências do fluxo Central - `rules`, `agents`, os 18 scripts validadores Python hardcore e as personas/slash commands mestras como `/brainstorm` e `/test`). 

O **BPS Kit** une esse conhecimento através de engenharias de "Auto Routing" contornando os limites de Tokens. Sem vudovn e sickn33, essa maravilha não funcionaria. 

---
## 📄 Licença

Este projeto é licenciado sob a **MIT License** — veja o arquivo [LICENSE](./LICENSE) para detalhes.
