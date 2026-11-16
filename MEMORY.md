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

## Banco de materiais brutos solicitado pelo proprietário

O proprietário pediu publicar os clipes cortados para ele que estão importados no CapCut, como fontes para o GPT editar. A biblioteca foi conferida: havia 201 Toguro + 12 Vinheteiro disponíveis. Durante o envio, o proprietário disse “isso já é o suficiente”; os próximos envios foram interrompidos e apenas os já iniciados terminaram.

Resultado publicado: **126 MP4s**, 126 Toguro e 0 Vinheteiro, total de 5467620185 bytes. O catálogo lista somente envios concluídos, todos com tamanho e SHA-256 conferidos no servidor. Não afirmar que todos os 213 foram publicados e não retomar os restantes sem novo pedido.

São **brutos recortados**, já selecionados/extraídos, ainda para edição no Agentcut. Preservar imagem/áudio e eventuais marcas/textos da fonte. Catálogo em clipatudo/materiais-brutos, com links individuais. Release: materiais-brutos-capcut-2026-11-16. O aplicativo continua somente Agentcut como ClipaTudo.


## Rodada 002 — cinco edições novas de 35 s, estilo Toguro (16/11/2026)

**Resultado técnico:** cinco fontes independentes do catálogo público (IDs `toguro-055`, `toguro-034`, `toguro-044`, `toguro-024`, `toguro-066`) renderizadas no Agentcut/Remotion, 35,008 s cada, 720×1280, H.264/AAC. A faixa de vídeo usa a fala/áudio real da fonte, sem substituir movimento por imagem congelada. Banner, arte, seta, títulos, música/SFX e legendas por palavra são camadas nativas editáveis. Cada job gera `project.json`, `layers.json`, plano e MP4; o arquivo fonte e os assets têm origem nos ZIPs/releases verificados por SHA-256. Os originais não foram modificados.

- Projeto de teste: branch `experimentos/toguro-35s-prova-2026-11-16`; reproduzível por `scripts/render-five-toguro.mjs` e `.github/workflows/toguro-5-render.yml`. Execução de quatro clipes em https://github.com/srmamacoofc1-design/ClipaTudo-Studio/actions/runs/43880654238 (um job inicial falhou); o clipe `toguro-055` foi concluído pela execução de retry https://github.com/srmamacoofc1-design/ClipaTudo-Studio/actions/runs/43881581434.
- **QA-004 — rastreador no runner:** OpenCV instalado no ambiente não disponibilizou `cv2.CascadeClassifier`. O teste registrou `FACE_DETECTOR_UNAVAILABLE` e usou crop central estável, com vídeo original em movimento e alternância de enquadramento/zoom por tomadas. **NÃO declarar rastreio facial concluído**; requer corrigir a dependência/operação e revisar os quadros com múltiplos rostos e movimento. Não confundir crop seguro com tracking.
- **QA-005 — disponibilidade do navegador de render:** primeiro job `toguro-055` falhou com timeout do Chrome ao iniciar; uma execução isolada foi bem-sucedida sem mudar a composição. Guardar diagnósticos e investigar robustez/retry antes de incorporar alteração ao produto. Não corrigir indiscriminadamente bibliotecas que estão funcionando nos outros quatro trabalhos.
- **QA-006 — precisão da fala:** legendas por palavra foram geradas com Whisper small e mantidas editáveis em `y=.78`. Trechos de fala coloquial e sobreposição de vozes geraram palavras potencialmente incorretas. O proprietário **não aprovou** essas legendas; revisão humana da fala é obrigatória antes de publicação. Não inventar uma correção sem conferir o áudio.
- **QA-007 — estilo e ritmo:** os cinco MP4s foram decodificados, com áudio presente; amostras visuais mostraram banner/arte/título e vídeo real. Isso **não é** validação quadro a quadro nem avaliação estética. A continuidade de 35 s foi construída em cinco tomadas consecutivas com mudanças suaves de crop, legendas e flashes pontuais; ainda pode exigir cortes narrativos mais fortes a partir do feedback.
- **Próxima etapa:** usuário assiste aos cinco vídeos e marca quais elementos estão bons/ruins e segundos exatos. Somente após aprovação os ajustes viram regras permanentes do estilo; conservar os originais e o procedimento de recriação.

**Status da rodada 002: CINCO PRÉVIAS TÉCNICAS GERADAS, APROVAÇÃO ESTÉTICA PENDENTE.**
