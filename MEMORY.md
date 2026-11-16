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

## Protocolo de revisão iterativa com prévias (16/11/2026)

Objetivo definido pelo proprietário: evoluir o estilo de edição do próprio Agentcut até um padrão consistente, documentando cada erro, correção e julgamento visual, sem quebrar funções existentes.

- **Base preservada:** usar somente os projetos atuais Toguro e Vinheteiro. Não sobrescrever originais nem MP4 exportados. Testar mudanças numa branch/cópia isolada; manter timeline, cenas, texto, assets e áudio editáveis.
- **Aprovação é visual:** teste de compilação, rastreamento detectado e MP4 decodificável não significam estilo aprovado. Só marcar como aprovado quando o proprietário confirmar após assistir à prévia real com som.
- **Uma hipótese por revisão:** identificar trecho/frames, problema observado e expectativa. Alterar o mínimo possível; manter banner, seta, arte superior, fonte, contorno, cores, posição e timing das legendas, cortes, música e SFX, salvo pedido específico.
- **Ciclo:** registrar problema → preservar baseline → reproduzir/testar → criar variante → renderizar MP4 real → comparar trechos e áudio → solicitar avaliação → registrar resultado e regressões. Se rejeitado, não promover a variante como novo estilo-base.
- **Registro por erro:** para cada ocorrência usar `ID | vídeo/projeto | versão/commit | tempo/frame | esperado | observado | causa confirmada ou hipótese | arquivos modificados | testes/preview | avaliação do proprietário | status | próxima ação`. Não preencher campos com suposições apresentadas como fatos.
- **Regras existentes obrigatórias:** Toguro mantém legenda em y=.78 e não considera imagem congelada rastreio; revisar apoio de torso. Vinheteiro mantém zoom de ênfase, suavizando entrada/retorno sem apagar o ritmo. V3 rejeitada não vira referência por padrão.
- **Dependência de mídia:** os `layers.json` do Git não substituem os vídeos/áudios/assets completos do pacote da Release. Sem os arquivos binários, inspeção de timeline não equivale a uma prévia final renderizada.

**Rodada 001 — preparação:** projetos e regras de estilo identificados no repositório. Nenhum ajuste audiovisual foi feito nesta etapa. Aguardando mídia acessível ao ambiente de renderização e a primeira avaliação da prévia. Status: `PREPARAÇÃO / NÃO AVALIADO`.
