# ClipaTudo — contexto de implementação

Base: Agentcut 0.2.25. O auxiliar local usa `../agentcut-runtime/node_modules/agentcut` e serve `../agentcut-projects` na porta 32118. O usuário está acessando o Studio original no navegador; alterações no código-fonte local não publicam esse site.

A prévia separada `public/clipatudo` foi usada inicialmente, mas seu atalho foi removido após correção do usuário. As novas montagens são `project.json`, `layers.json`, `scenes/*.tsx` e `assets/`, compatíveis com o runtime existente, sem mudar schema ou runtime gerenciado.

`StyledText.tsx`: títulos e legendas em props editáveis. `CutFlash.tsx`: flash de transição. Imagens, seta, vídeo e áudio são clips independentes. Fonte local derivada acrescenta acentos faltantes; não substitui o texto por raster. Congelados de apoio são quadros dos próprios vídeos.

Estilos reutilizáveis estão em `clipatudo/editing-styles`; copiar os pares PROMPT.md/style.json para `library/editing-styles` do workspace. A biblioteca nativa descobre esses arquivos em Styles → Saved editing styles.

Não prometer clonagem perfeita: filtros 4K/Brilho 2 e animação CapCut não são portáveis automaticamente. A análise completa de timeline está nos relatórios da sessão; as demonstrações cobrem somente os primeiros 8,9/8,7 segundos.

## Correção do usuário — rastreio de movimento (16/11/2026)
- O detalhe que falta é RASTREIO DE MOVIMENTO ao longo do vídeo. Não considerar um recorte fixo, zoom isolado ou congelado como solução desse requisito.
- Preservar o movimento da pessoa/alvo e ajustar o enquadramento ao longo do tempo, com trajetórias/keyframes editáveis e sem saltos; revisar toda a trajetória, incluindo início, fim e movimentos rápidos. Se uma seta precisar ficar presa a um alvo móvel, seu acompanhamento também precisa ser verificado, sem confundir isso com a seta entre fotos estáticas.
- Estado real: o rastreador nativo recusou as tomadas testadas (subject_change/cannot_fit); a revisão 2 usa congelados em duas passagens do Toguro. O rastreio solicitado continua PENDENTE. Os MP4 da revisão 2 não foram alterados por este registro.
- Congelados podem ser apoio editorial quando escolhidos para isso; não usá-los para declarar que o rastreio foi resolvido. Não repetir automaticamente esse contorno na próxima revisão.
- O usuário considera o resultado próximo de aceitável, mas ainda não deu aprovação final. Preservar os acertos: banner original, seta gráfica, legendas amarelas por palavra com acentos, áudio em faixas separadas e pico do efeito sincronizado. Manter o Agentcut como base do ClipaTudo.

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

## Correção prioritária do proprietário — 16/11/2026

**A V3 foi REJEITADA pelo proprietário.** O usuário disse que perdeu a essência e reintroduziu erros. Resultados técnicos de detecção/exportação não equivalem a aprovação visual.

- A V2 estava próxima de aceitável. Partir dela e dos originais CapCut; aprimorar pontualmente. A V3 não deve ser o modelo visual.
- Não baixar legendas do Toguro de y=.78 para .935, não deslocar a imagem para baixo nem eliminar as aproximações de ênfase do Vinheteiro para obter um plano genérico.
- Preservar banner original, arte superior, seta, fonte/cor/contorno/posição/timing das legendas, cortes e áudio que já funcionavam. Em um vídeo NOVO, mudar texto do título e legenda fielmente ao conteúdo; isso não autoriza restilização.
- Continuidade somente no Agentcut. Protótipo separado não é o editor adotado.
- Correções pontuais foram preparadas em cópias da V2: ajuste-pontual-do-estilo-v2-toguro-1afff125 e ajuste-pontual-do-estilo-v2-vinheteiro-a0d40a97. Trilhas protegidas comparadas em JSON e mantidas iguais à V2. Pan usa detecção medida e mantém escala/composição inicial. Vinheteiro mantém a ênfase de zoom com aproximação/retorno suavizados. Avaliação estética do usuário ainda pendente.
- Toguro: o congelado de fala inicial foi removido onde há rastreio medido. O apoio de torso da V2 continua preservado como decisão editorial ainda pendente; NÃO declarar rastreio completo nem esconder essa limitação. O rosto está ausente/cortado na virada ao espelho. Não repetir a virada crua e mal enquadrada da V3 como solução pronta.
- Pedido atual: disponibilizar TUDO em novo repositório PÚBLICO para trabalhar com outras IAs. Código no Git; pacote de código + projetos + mídias + fontes + sons + presets + exports em Release. Não publicar chaves, sessões ou credenciais.
