# ClipaTudo Toguro V3 Rastreio

## 2026-11-16 — V3: rastreio aplicado no Agentcut

- Escopo confirmado: somente modificar o Agentcut como ClipaTudo. Não continuar o editor/protótipo separado.
- Preservar o design do banner e das legendas; atualizar o título para o assunto real do próximo vídeo e transcrever sua própria fala. Não reutilizar texto antigo nem inventar afirmações.
- Motor nativo modificado: análise local MediaPipe a 10 Hz em planos curtos, região explícita de busca da pessoa, diagnóstico sem escrita e zoom com easing quíntico, máximo de 25% de alteração por tomada. Sem API paga de IA para este rastreio.
- V3 Toguro: 31 + 17 + 10 keyframes em três trechos com rosto visível. Cobertura 100%, 100%, 90%; uma amostra inicial de baixa confiança usa retenção breve do enquadramento. Zooms 1→1.04 e 1.04→1.06. De 5,50s até 8,90s a câmera vira para o espelho e o rosto sai ou já está cortado na fonte: vídeo continua em movimento, mas esse intervalo NÃO tem rastreio de rosto. Não alegar recuperação de detalhes ausentes.
- V3 Vinheteiro: 88 keyframes, 93,18% das amostras confiáveis, seis retenções breves; sujeito à direita isolado por região x=.70/y=0/w=.30/h=.45. Removidos saltos 3.44x/5x; plano contínuo, zoom 1.70→1.84 relativo ao recorte-base (8,24% de aproximação).
- Removida a trilha de imagens congeladas do Toguro. Legendas do Toguro movidas para y=.935 para reduzir sobreposição ao rosto quando a câmera aponta para baixo. Fonte, contorno e cor preservados. Banner original e títulos editáveis preservados. Música e SFX não foram reeditados nesta revisão.
- V2 e projeto welcome preservados. Novos projetos: clipatudo-toguro-v3-rastreio-6e139600 e clipatudo-vinheteiro-v3-rastreio-e583bfde.
- Código local do próprio Agentcut em work/Agentcut; interface http://127.0.0.1:3000/studio. O site oficial remoto não contém estas mudanças locais. Helper compilado do mesmo repositório, porta 32118, workspace work/agentcut-projects.
- Validação: dez testes de framing, typecheck e compilação do helper passaram. Suíte ampla: 313/320 passaram, três ignorados, quatro falharam inicialmente. Os 15 testes de exportação/seek passaram na repetição isolada; o teste de symlink continua limitado por EPERM do Windows (não foi alterado nem marcado aprovado). Conferência visual por capturas em oito momentos de cada clipe e decodificação completa dos dois MP4 sem erro. Não alegar revisão visual quadro a quadro ou nova conferência auditiva integral.
- Estado: melhoria pronta para avaliação do usuário, sem aprovação estética final. Não confundir zoom/recorte estático/torso com rosto rastreado, nem copiar caminhos para outras fontes sem nova análise.
