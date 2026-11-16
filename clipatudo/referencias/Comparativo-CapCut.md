# Predefinições de edição CapCut — Toguro e Vinheteiro

Leitura dos rascunhos reais do CapCut Desktop 9.7.1 com CapCut CLI 0.33.1 e inspeção do JSON dos clipes compostos. Ambos têm **1080 × 1920, 9:16, 30 fps**. Os arquivos `*-timeline.md` listam cortes, fontes e camadas, e `*-parametros.json` guarda as coordenadas, recortes de imagem, keyframes, efeitos, estilos e materiais ligados a cada segmento. Valores de escala e posição são os valores do CapCut, dependentes da mídia e da camada. As contagens incluem camadas dentro de compostos, inclusive segmentos sobrepostos. 

## Base compartilhada

- **Composição em três blocos.** Cada bloco tem suas próprias faixas internas. Na raiz, os três compostos ficam a 1×, centralizados. A ordem das camadas dentro de cada composto é parte do estilo.
- **Título em duas linhas sobre banner vermelho**, como mostra a capa. No primeiro bloco de cada projeto, linha superior amarela `#F0FF00`, inferior branca `#FFFFFF`, com contorno preto. As linhas são peças separadas. Há variações de texto, posição e cor no Vinheteiro.
- **Legenda animada por palavras:** template `7343204801355877637`, animação `7135040682032370178`, fonte `ZY Vigour.ttf`. Primeira amostra de ambos com tamanho interno 20, amarelo `#F0FF00`, contorno preto 0,060, espaçamento entre letras 0,05 e entre linhas 0,02. Escala do componente por volta de 0,56. O JSON conserva os timings das palavras, os estilos internos e os parâmetros de cada legenda.
- **Filtro 4K** `7426678351957332497`, valor **1,0**. É o nome do filtro. O canvas medido é 1080 × 1920.
- As ocorrências de vídeo-fonte verificadas usam velocidade **1×**. Para conseguir o mesmo ritmo, é preciso reproduzir os pontos de corte e as trocas de enquadramento. O tamanho dos cortes não revela sozinho se um trecho foi removido por silêncio, por fala repetida ou por decisão editorial. Conferir também palavras cortadas e erros da legenda original antes de usar uma transcrição nova.

## Toguro

| Bloco no projeto | Título registrado | Legendas |
|---|---|---:|
| 0,000–57,967 s | TOGURO MUDOU MUITO / DEPOIS DA TIRZEPATIDA | 29 |
| 57,967–100,200 s | TOGURO USA TIRZEPATIDA / E A EVOLUÇÃO ASSUSTA! | 22 |
| 100,200–119,400 s | TOGURO MOSTROU EVOLUÇÃO / NIGUEM ACREDITOU NISSO! | 12 |

- **Imagem principal:** 45 segmentos de fontes de 1280×720 e 1920×1080 nos compostos internos. Escala fixa **2,026055**, Y **−0,358455**, X varia de **−0,100 a +0,724**. Segmentos de **0,633 a 10,267 s**, mediana **1,767 s**. Use X como variável de enquadramento conforme o rosto ou detalhe no vídeo novo. A timeline tem keyframes pontuais, registrados no inventário.
- **Composição superior:** uma imagem de apoio por bloco (escala **1,178–1,406**, Y **+0,596 a +0,677**), camada congelada a **0,996695** e seta CapCut `7481299531213065533` aninhada em compostos. No bloco 3, imagem com máscara **Retângulo**: largura **0,720289**, altura **0,932239**, centro X **0,064205**, Y **0**, feather **0,06**. Os compostos girados de seta/apoio usam escala **0,421053** e giro **29,832°** nas ocorrências do primeiro bloco. Preservar o composto e as camadas da seta como unidade.
- **Títulos:** duas linhas centralizadas em X=0. Linha de cima Y **+0,275 a +0,277**, escala **0,478–0,632**; de baixo Y **+0,197**, escala **0,540–0,593**. Fonte de recurso `7461911939803892998` nas duas linhas, tamanho interno **15**. Os títulos cobrem cada bloco. Legendas em Y **−0,560**, 63 segmentos, mediana **1,233 s**.
- **Imagem e efeitos:** uma instância de 4K por bloco, cobrindo cada bloco. **Brilho 2** `6952697917563998722` dura **0,467 s** e aparece associado a um segmento-fonte por bloco (começos locais **3,033 / 2,567 / 1,133 s** dos segmentos associados). As camadas giradas de apoio têm brilho **−1**, saturação, temperatura e tom **+1** nos campos do CapCut, além de HSL. Os parâmetros exatos e os vínculos estão no JSON.
- **Áudio:** instrumental slowed *Everything in Its Right Place* em **0,147254×** (ganho de clipe ≈ **−16,6 dB**), entra em **0 / 1,767 / 0 s** locais. *Tension Riser #5* em **0,692367×** (≈ **−3,2 dB**), entra em **2,500 / 2,500 / 2,300 s** locais e dura **2,500 / 2,500 / 2,633 s**. Áudio nos segmentos-fonte **1,000–2,389×**. Esses valores descrevem ganho, não loudness do áudio exportado.

## Vinheteiro

| Bloco no projeto | Fonte de fala principal | Legendas |
|---|---|---:|
| 0,000–20,500 s | Vinheteiro critica o sonho americano | 9 |
| 20,500–37,933 s | Você fala demais no meu podcast | 12 |
| 37,933–71,467 s | Vinheteiro perde a paciência com o Redcast | 19 |

- **Imagem principal:** 37 ocorrências de vídeo-fonte **1920×1080** nos compostos inspecionados. Escalas de **3,437 a 5,100**; cortes de **0,233 a 6,100 s**, mediana **1,667 s**. O bloco 1 alterna **3,437 / 4,082 / 4,397 / 5,000** nos recortes da câmera principal e usa compostos para inserções. O bloco 2 parte de **4,285** e usa **5,000** na maioria dos cortes diretos. No terceiro, o enquadramento a **5,100** domina, com variações a **3,721 / 4,012 / 4,539**. Há reposicionamento lateral entre falantes e keyframes de X, Y, escala e rotação. Os X/Y de cada tomada estão no inventário para evitar copiar coordenadas de um rosto para outro.
- **Topo e sobreposições:** banner/títulos separados. Linha principal do primeiro bloco em **Integral CF Heavy**, tamanho **15**, escala **0,614**, X **0**, Y **+0,377**; linha branca com tamanho **10,693**, escala **1**, Y **+0,285**. Nos dois blocos seguintes, a linha principal que está cadastrada como texto usa branco e Y **+0,327 / +0,234**. Há textos adicionais dentro de compostos. Apoio superior feito com PNG no primeiro e terceiro blocos (**1,095 / 1,157** de escala), e duas capturas no segundo (X **−0,551 / +0,581**, escalas **0,630 / 0,557**). O vídeo auxiliar **1080×238** aparece nos três blocos a **0,488**, X **−0,512**, Y **−0,940** na amostra do primeiro.
- **Legendas:** 40 segmentos, escala **0,560**, Y **−0,641** no bloco 1 e **−0,560** nos outros dois. Mediana **1,100 s**.
- **Filtros e efeitos:** 4K em **uma, duas e duas instâncias** nos blocos. No segundo, durações locais **17,200 e 17,100 s**; no terceiro, **33,433 s** cada. Preserve a configuração de cada faixa para a comparação, pois contar duas instâncias não prova que o efeito visual dobre. No bloco 2 há ajustes HSL e um composto curto com **Pôr do sol dourado** `7665565758671392008`, contraste bruto **0,227**, saturação **1** e temperatura **0,479**. No terceiro, **Eco** `7021052523762946561` aparece ligado a dois segmentos.
- **Áudio:** `Short - KWsktvSLGJ0.mp3` é o leito recorrente a **0,344997×** (≈ **−9,2 dB**). `Short - 6-nPoPM8LWI.mp3` entra em **6,200 / 5,500 s** nos primeiros dois blocos e usa **1,000 / 1,253×**; tem fade de saída de **3,333 s** no primeiro. `Audio - aQkPcPqTq4M.mp3` entra no final dos primeiros dois blocos em **15,967 / 15,700 s**, a **2,046×**, com fade de entrada de **3,133 / 1,733 s**. No terceiro, duas ocorrências do leito se sobrepõem por **0,267 s** (20,500–20,767 s locais). Áudio nos segmentos-fonte 1920×1080 chega a **10×**; os ganhos variam por corte, então confira a fala antes de copiá-los para mídia nova.

## O que está salvo e como chegar à reprodução

1. **Presets de texto CapCut CLI.** Quatro arquivos de título, dois por estilo, extraídos do primeiro bloco com `make-preset`. São estilos de texto com posição X/Y. A escala de cada caixa está no inventário e precisa ser aplicada à camada no layout. Use os presets na faixa de título correspondente.
2. **Templates de legenda e parâmetros completos.** O `save-template` exportou as duas amostras animadas. Testei `apply-template` nas cópias de trabalho. O CLI inseriu o segmento, mas manteve a frase original do texto interno em vez da frase de teste. Use esses dois arquivos como referência até implementar a reconstrução do texto interno, dos IDs e dos tempos por palavra. A cópia precisa preservar também o recurso de animação e a fonte.
3. **A montagem nova precisa dos brutos selecionados e dos assets locais:** músicas/SFX, arte do banner e apoios, overlay de vídeo do Vinheteiro, congelado/máscara/seta do Toguro e recursos CapCut de texto, efeitos e fontes. Os arquivos absolutos e marcadores de projeto verificados na extração resolveram no disco desta máquina. Os JSON registram suas referências. O pacote não incorpora os binários.
4. **Gerar em rascunho separado e comparar no CapCut Desktop**, usando o mesmo material de um trecho curto. Conferir enquadramento, bordas do banner, timings da legenda, volta do zoom, transição e som. O diagnóstico mostrou que as timelines raiz e interna coincidiam nos dois originais. A passagem CLI → reabertura → render ainda precisa ser validada para qualquer nova montagem, principalmente nas combinações, na legenda animada e nos efeitos do catálogo.

A leitura e as extrações foram feitas sem gravar nos originais. Não houve revisão integral por reprodução no CapCut nem comparação de renders nesta etapa.
