# Memória do ClipaTudo

## Decisão do proprietário

**ClipaTudo é o Agentcut modificado. Este é o único editor deste projeto.** Todo desenvolvimento deve acontecer sobre o editor, os componentes, o auxiliar e as timelines do Agentcut.

O proprietário corrigiu a publicação em 16/11/2026: incluir projetos antigos, protótipos separados e várias tentativas na entrega confundiu a continuidade. A entrega atual contém somente o Agentcut e os dois trabalhos atuais, Toguro e Vinheteiro. Não reintroduzir material de outras aplicações na documentação, no pacote ou no fluxo do editor.

## Estilo e trabalho atual

- Preservar o banner original de papel rasgado vermelho, títulos Integral CF Heavy, legenda amarela por palavra com contorno preto e acentos, seta gráfica e arte superior.
- O texto de títulos e legendas muda conforme o vídeo e sua fala. Preservar o visual não significa reutilizar frases antigas.
- Aprimorar rastreio de rosto e zooms naturais sem mudar posição/timing das legendas, altura da imagem, composição, ritmo de ênfase ou áudio fora do pedido.
- Manter a legenda do Toguro em y=.78; não baixar para .935. Manter a ênfase do zoom do Vinheteiro.
- Os trabalhos atuais ainda aguardam avaliação estética. Um detector encontrar o rosto não significa que o estilo foi copiado corretamente.
- O apoio de torso do Toguro continua como pendência editorial; não declarar rastreio completo. Uma imagem congelada não é rastreio.

## Continuidade

Manter MEMORY.md e CONTEXTO.md atualizados com decisões, validação e pendências. Antes de editar, conferir os arquivos reais. Preservar originais e exports no computador; o pacote publicado deve apresentar apenas o estado atual, com seus arquivos necessários.

Código público: https://github.com/srmamacoofc1-design/ClipaTudo-Studio. Projetos: clipatudo/projects/toguro e clipatudo/projects/vinheteiro; no pacote, workspace/projects/toguro e workspace/projects/vinheteiro. Estilos correspondentes em clipatudo/editing-styles.

## Materiais para outro GPT — 16/11/2026

O proprietário pediu acesso público ao pacote, a um bruto de teste e aos estilos. A página `clipatudo/PARA-O-GPT.md` reúne os links diretos. A Release contém o pacote completo e alternativas individuais dos dois projetos com seus assets/scenes/layers/project. `Toguro-Bruto-Teste-10s.mp4` é uma amostra do material-fonte já disponível, sem as camadas da edição, não um novo vídeo escolhido pelo usuário. Toguro é a sugestão inicial para esse ensaio; não é aprovação final do estilo. Não garantir renderização no ambiente de outro GPT sem execução verificada.

## Rodada 001 — teste reproduzível do Toguro no Agentcut (16/11/2026)

**Status: RENDERIZADO, AVALIAÇÃO ESTÉTICA DO PROPRIETÁRIO PENDENTE.** Esta rodada usa a timeline existente do Toguro com assets do ZIP público; NÃO é um vídeo novo nem uma edição criativa aprovada. O projeto de teste foi duplicado para \`toguro-teste-001\`, sem modificar o original. Este registro deve acompanhar a próxima revisão antes de se alterar uma cena.

- Fonte: Release \`agentcut-2026-11-16\`, \`ClipaTudo-Projeto-Toguro.zip\` (SHA-256 \`4df4ec96705b716273f4297dd5b01159fe6ae280a1fa157586fd91ba8351bfe4\`). Bruto \`Toguro-Bruto-Teste-10s.mp4\` foi conferido por SHA-256 e FFprobe, mas a renderização usa a timeline do projeto e seus assets já montados.
- Processo verificável: \`.github/workflows/preview-toguro.yml\` e \`scripts/render-preview-toguro.mjs\`. Execução bem-sucedida em https://github.com/srmamacoofc1-design/ClipaTudo-Studio/actions/runs/43871820233 ; artefato \`Toguro-rodada-001\` contém o MP4, FFprobe e logs. Artefatos GitHub Actions são temporários (retenção configurada em 14 dias).
- Validação técnica observada: 267 quadros a 30 fps, MP4 H.264/AAC, 720×1280, duração de 8,917 s, vídeo e áudio decodificados sem erro pelo FFmpeg. Amostragem visual em 0,2/1,2/2,8/4,3/5,7/7,2/8,5 segundos; isto **não** constitui revisão quadro a quadro nem aprovação do som pelo proprietário.
- **QA-001 — ambiente de CI, CORRIGIDO NO TESTE:** primeira execução parou porque \`ffprobe\` não estava instalado no runner. Foi acrescentada instalação explícita de FFmpeg/FFprobe ao workflow de teste; segunda execução concluiu. Não alterar o código do editor por causa disso sem evidência de impacto no aplicativo.
- **QA-002 — acompanhamento de rosto, PENDENTE DE REVISÃO EDITORIAL:** nas amostras de 5,7 a 8,5 s predomina torso/celular, sem rosto claramente visível. O projeto já documenta indisponibilidade do rosto na virada ao espelho. Não chamar congelamento, crop fixo, zoom genérico ou detecção parcial de "rastreio corrigido". Examinar fonte/timeline, decidir intenção editorial e somente então fazer uma correção delimitada.
- 
- **QA-003 — congelamento editorial CONFIRMADO:** `clipatudo/projects/toguro/layers.json` tem a faixa de imagem `apoios-estaveis`, clip `apoio-torso`, `src=assets/images/torso-estavel.png`, `from=171`, `duration=96` em 30 fps (5,7–8,9 s). A imagem foi usada para cobrir o giro de câmera, mas fica parada enquanto o áudio continua. O proprietário questionou explicitamente o congelamento e quer movimento real. A presença da imagem no projeto está comprovada; não confundir isso com defeito do codec ou do player.
- **Experimento QA-003:** no workflow `preview-toguro.yml`, a cópia `toguro-teste-001` elimina somente `apoio-torso` antes da renderização, sem editar a timeline original nem demais camadas. A remoção é apenas um diagnóstico de como fica o vídeo real por baixo; não prova que o enquadramento ficou adequado. Examinar o resultado e desenvolver correção visual mantendo estilo, legenda em y=.78, áudio, banner e ênfase.

**Próximo gate:** proprietário assiste à prévia real e descreve o que manter/corrigir no banner, enquadramento, movimentos, legenda, transições e som. Nenhuma preferência presumida vira regra definitiva antes da aprovação. Preservar sempre a versão anterior para comparação.
