# ClipaTudo Studio

Editor de vídeo baseado no **Agentcut 0.2.25**, mantido como uma adaptação do mesmo editor. Timelines editáveis, chat, vídeo/áudio/imagens em camadas, exportação pelo navegador e rastreio local de rosto. Código original: [deifos/Agentcut](https://github.com/deifos/Agentcut). Licença MIT preservada em LICENSE.

## Pacote completo

Baixe **ClipaTudo-Studio-Pacote-Completo.zip** em [Releases](https://github.com/srmamacoofc1-design/ClipaTudo-Studio/releases/latest). Inclui código, projetos, mídias, fontes, imagens, músicas, efeitos, estilos e exports desta sessão. Os projetos não são recriados do zero ao fechar: project.json, layers.json, scenes e assets ficam no disco.

O Git contém o código completo e as timelines/documentação legíveis por outras IAs. Vídeos e demais arquivos grandes vão no ZIP da Release. Nenhuma chave, conta ou sessão é necessária para ler ou modificar o código público. Serviços de IA opcionais usam as credenciais de cada usuário.

## Instalar e abrir

Instale Node.js 22 ou mais recente e Git. Extraia o pacote completo e execute **Instalar-ClipaTudo.cmd**, depois **Iniciar-ClipaTudo.cmd**. A instalação baixa dependências com npm, sincroniza os recursos do Agentcut e compila o helper. A interface local fica em http://127.0.0.1:3000/studio; o helper usa 127.0.0.1:32118. O script não encerra outro processo que já esteja usando essas portas.

Pelo terminal, na pasta do código:

```powershell
npm ci
npm run sync:skill
npm run prepare:vision
npm run helper:build
node packages/agentcut/dist/studio/cli.js --dir workspace --agent codex
# Em outro terminal:
npm run dev -- --hostname 127.0.0.1 --port 3000
```

O caminho de --dir é o workspace extraído. Em um clone sem pacote, use qualquer pasta vazia própria. O helper prepara os arquivos gerenciados automaticamente. Codex/Claude CLI são opcionais para a edição manual, necessários para o chat correspondente. FFmpeg é usado para verificações/processamento de mídia conforme a operação.

## Antes de outra IA editar

Leia [MEMORY.md](MEMORY.md), [CONTEXTO.md](CONTEXTO.md), [CONTINUIDADE.md](CONTINUIDADE.md) e [o estado dos projetos](clipatudo/ESTADO-DOS-PROJETOS.md).

**A V3 foi rejeitada pelo proprietário.** A V2 é a referência de trabalho próxima de aceitável, com limitações documentadas. As cópias “ajuste pontual do estilo V2” são propostas de correção e ainda dependem de avaliação estética do usuário. Não promover métricas técnicas a aprovação do estilo.

As alterações locais não atualizam o site oficial do Agentcut. Não há implantação pública nem atualização automática configurada neste repositório.

## Verificação

```powershell
node --import tsx --test tests/framing.test.mjs tests/composition-follow.test.mjs
npm run typecheck
npm run helper:build
```

Doze testes específicos de enquadramento passaram. A suíte geral anterior teve falhas, descritas no contexto; um teste de symlink teve EPERM no Windows. Conferência visual amostrada e decodificação dos MP4 não são aprovação estética ou revisão quadro a quadro. O histórico do produto original está em [README-AGENTCUT.md](README-AGENTCUT.md).

