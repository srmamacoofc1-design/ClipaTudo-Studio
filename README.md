# ClipaTudo

Este é o **Agentcut modificado como o novo ClipaTudo**. O editor, a timeline, o chat e a exportação são os do Agentcut. Base técnica: Agentcut 0.2.25, com autoria e licença preservadas em [LICENSE](LICENSE) e [clipatudo/UPSTREAM.json](clipatudo/UPSTREAM.json).

## Usar o projeto

Baixe [o pacote completo atual](https://github.com/srmamacoofc1-design/ClipaTudo-Studio/releases/latest), extraia e execute **Instalar-ClipaTudo.cmd**, depois **Iniciar-ClipaTudo.cmd**. Requer Node.js 22+. O pacote contém este código e os dois trabalhos atuais, **Toguro** e **Vinheteiro**, com suas mídias, fontes, sons e estilos nativos.

A interface local é http://127.0.0.1:3000/studio. O auxiliar usa 127.0.0.1:32118. Os projetos ficam em workspace/projects e as exportações em renders dentro de cada projeto. Fechar o editor preserva os arquivos no disco.

Para enviar os materiais a outro GPT, use [os links diretos e o pedido de teste](clipatudo/PARA-O-GPT.md). Há também ZIPs individuais de Toguro/Vinheteiro e um MP4 bruto de 10 segundos do material atual para ensaio.

Os [materiais brutos recortados](clipatudo/materiais-brutos/README.md) contêm 126 clipes publicados do banco importado no CapCut, com download individual para uma nova edição no Agentcut. Eles são fontes de entrada, não vídeos finalizados.

```powershell
npm ci
npm run sync:skill
npm run prepare:vision
npm run helper:build
node packages/agentcut/dist/studio/cli.js --dir workspace --agent codex
# Em outro terminal:
npm run dev -- --hostname 127.0.0.1 --port 3000
```

## Continuar com outra IA

Leia [AGENTS.md](AGENTS.md), [MEMORY.md](MEMORY.md), [CONTEXTO.md](CONTEXTO.md) e [CONTINUIDADE.md](CONTINUIDADE.md). O código completo está neste repositório; as timelines/cenas legíveis estão em [clipatudo/projects](clipatudo/projects). As mídias completas estão no pacote da Release.

O trabalho atual é aprimorar o estilo do proprietário no Agentcut: rastreio de rosto e zooms naturais, preservando composição, banner, legendas e áudio. A avaliação estética continua pendente. O apoio de torso do Toguro permanece uma limitação documentada.

## Verificar alterações

```powershell
node --import tsx --test tests/framing.test.mjs tests/composition-follow.test.mjs
npm run typecheck
npm run helper:build
```

O procedimento passou localmente e no GitHub. As verificações de código não representam aprovação editorial. As funcionalidades originais do Agentcut estão descritas em [README-AGENTCUT.md](README-AGENTCUT.md). Chaves e sessões são configuradas por cada usuário e ficam fora do pacote público.
