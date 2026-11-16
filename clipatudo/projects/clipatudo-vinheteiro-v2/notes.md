# ClipaTudo — Vinheteiro · revisão 2

Correção da prévia anterior dentro do Agentcut. Fonte: primeiro bloco do projeto CapCut do usuário.
Formato solicitado: somente vertical 1080×1920, 30 fps; duração 8.7s.
Arte e banner de papel rasgado são assets originais; títulos seguem fontes, cores e posições do CapCut.
Seta vermelha curva é SVG recriado para substituir o glifo quebrado, em faixa editável.
Legenda de uma palavra amarela por vez em ZY Vigour, contorno preto, y original. Entrada pop curta é uma aproximação web.
Tirzepatida corrigido na transcrição; restante conserva as palavras e tempos extraídos.
Vídeo e voz separados por tomada. Música e SFX em faixas independentes, com fades.
Toguro: transição acompanha a emenda em 4,600s; riser alinhado pelo pico RMS, não pelo início do arquivo.
Filtros proprietários 4K/Brilho 2 não foram importados como plugins; flash curto recriado, sem afirmar equivalência exata.
Estado: aguardando capturas, medição do mix e teste de reprodução no Agentcut.

```json
{
  "project": "clipatudo-vinheteiro-v2",
  "duration": 8.7,
  "shots": [
    [
      0,
      47
    ],
    [
      47,
      31
    ],
    [
      78,
      183
    ]
  ],
  "captionWords": 28,
  "soundCues": [],
  "artbox": {
    "x": -0.047348904728287566,
    "y": -0.027045608363998802,
    "width": 1.0946978094565751,
    "height": 0.3461850877692369
  }
}
```

Fonte local estendida com acentos portugueses em glifos compostos: a ZY Vigour original não contém É/Ê/Ç/Ã e caía em fonte diferente. Contorno base e largura preservados; acentos desenhados para a cópia local.

Primeira crítica de áudio: música ficou a apenas 3,1 LU da voz em uma janela; leito inicial reduzido de 0,24 para 0,12 (−6 dB), segundo de 0,24 para 0,18. Rechecagem necessária.

## Validação final da revisão 2
- Renderização nativa Agentcut concluída, arquivo novo: renders/clipatudo-vinheteiro-v2-mobile-20261116-074425.mp4.
- MP4 completo decodificado pelo FFmpeg sem erro; H.264/AAC, 1080×1920 a 30 fps.
- Medição após codificação: {"integratedLufs": -14, "truePeakDb": -2, "samplePeakDb": -2}.
- Voz/música: {"medianLu": 12.5, "quietWindows": []}.
- Reprodução de toda amostra: 235 quadros reproduzidos, 25 pulados, 0 stalls, slowClips [].
- Capturas de entradas, emendas, palavras acentuadas e fim examinadas. Conferência visual amostrada, não escuta humana integral nem comparação frame a frame com um render completo do CapCut.
- SHA-256 do MP4: 50a5d88a241fc6858c5ef6c9b49a0b5238764232ceb46bb8a6c0a086c61be130.
- Avisos de áudio genéricos sobre graves/estéreo e cada palavra como corte não foram usados para descaracterizar a fala. Realness por modelo foi pulado após lentidão; métricas rápidas de mix concluídas.

## Correção do usuário — rastreio de movimento (16/11/2026)
- O detalhe que falta é RASTREIO DE MOVIMENTO ao longo do vídeo. Não considerar um recorte fixo, zoom isolado ou congelado como solução desse requisito.
- Preservar o movimento da pessoa/alvo e ajustar o enquadramento ao longo do tempo, com trajetórias/keyframes editáveis e sem saltos; revisar toda a trajetória, incluindo início, fim e movimentos rápidos. Se uma seta precisar ficar presa a um alvo móvel, seu acompanhamento também precisa ser verificado, sem confundir isso com a seta entre fotos estáticas.
- Estado real: o rastreador nativo recusou as tomadas testadas (subject_change/cannot_fit); a revisão 2 usa congelados em duas passagens do Toguro. O rastreio solicitado continua PENDENTE. Os MP4 da revisão 2 não foram alterados por este registro.
- Congelados podem ser apoio editorial quando escolhidos para isso; não usá-los para declarar que o rastreio foi resolvido. Não repetir automaticamente esse contorno na próxima revisão.
- O usuário considera o resultado próximo de aceitável, mas ainda não deu aprovação final. Preservar os acertos: banner original, seta gráfica, legendas amarelas por palavra com acentos, áudio em faixas separadas e pico do efeito sincronizado. Manter o Agentcut como base do ClipaTudo.
