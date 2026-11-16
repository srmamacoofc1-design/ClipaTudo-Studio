# Tirzepatida — polêmica em 30 segundos

Pedido: escolher o trecho mais forte da polêmica sobre tirzepatida no vídeo enviado.
Destino: `welcome`. Fonte original de 931,77 s, 1920x1080, mantida intacta.

## Cue sheet — 30 fps / 900 frames

| Timeline | Fonte original | Função |
| --- | --- | --- |
| 0–350 (0:00–0:11,70) | 6:15,50–6:27,20 (frames 11265–11615) | Gancho: ele diz que não foi a tirzepatida que deu músculo e comenta o "shape mounjarado". |
| 351–713 (0:11,70–0:23,80) | 4:06,00–4:18,10 (frames 7380–7742) | Contexto: cita um comentário, fala de apetite, hábitos e dedicação diária. |
| 714–899 (0:23,80–0:30,00) | 4:45,90–4:52,10 (frames 8577–8762) | Fecho: pergunta se manterá o foco depois de tirar o uso. |

As três passagens preservam frases completas. A montagem muda a ordem das passagens; não altera a velocidade nem cria fala.
Não incluir relações, marcas, treino, pesagem ou outros assuntos.
As alegações são as falas do participante; títulos descrevem a polêmica sem validar afirmações médicas.

## Imagem e texto

- Wide conserva o enquadramento original.
- Mobile usa contain para conservar o quadro e evitar cortar a face no vídeo de câmera na mão.
- Legendas em três clips independentes, com tempos obtidos do áudio da seleção.
- Título discreto na abertura wide; título mantido no espaço superior do mobile.
- Uma camada separada de gradiente melhora a leitura no wide.

## Transcrição e conferência

- Transcrição completa: Local Whisper small, pt, cache 15c4ef543881e25ea11a9a7afeb14ffe619b80cfef8f1e42f11c23693310aa2e.
- Seleção de 30 s transcrita novamente com small e base para comparar as palavras.
- Ambas as leituras curtas identificam a pergunta retórica "o que que a tirzepatida não faz".
- Normalização de reconhecimento nas legendas: tirzepatida (ASR separou o nome), shape, mounjarado, diária; "Pera/Pere" interpretado como "pele" pelo contexto da descrição, "ser comer" como "cê comer", "assim" como "sim" no trecho de afirmação.
- Reconhecimento automático não equivale a revisão auditiva humana.
- Áudio de conferência: assets/review/tirzepatida-30s-audio.wav; a imagem da timeline toca o vídeo original; a faixa Fala toca WAVs derivados da fala original e normalizados, com a mesma duração e as mesmas emendas.
- Mix e imagens wide/mobile: conferidos conforme os resultados abaixo.

## Preservação e aprendizados

- Backups do starter: .studio/scratch/starter-project-20261116.json e starter-layers-20261116.json.
- Fonte e renders preservados; nenhuma exportação solicitada.
- Correção específica: conservar o "o que que" da pergunta retórica; omiti-lo mudaria o sentido do comentário citado.
- Para reutilização: transcrever o contexto antes de ranquear, e conferir novamente apenas a seleção para sincronizar as legendas.

## Verificações finais

- Duração confirmada: 900 frames / 30 fps = 30,00 s. Emendas em 351 (11,70 s) e 714 (23,80 s).
- Build e manifests sem erros ou avisos.
- Capturas wide em 0, 48 e 346; mobile em 48, 540 e 840. Sem texto cortado ou sobreposição que esconda o assunto.
- Contact sheet wide: 15 amostras de 0 a 899, incluindo as duas emendas.
- Contact sheet mobile: 12 amostras de 0 a 899; cabeçalho e legendas legíveis. Contain preserva a imagem completa.
- Preview wide completo: 899 frames reproduzidos, 0 dropped frames, 0 stalls, todos os clips smooth.
- Scrub wide: mediana 84 ms, p95 165 ms, pior 217 ms; há pequena demora em alguns seeks da fonte VP9 longa, sem queda na reprodução contínua.
- Preview mobile: interrompido quando a prévia foi pausada ou movida; não registrar como reprodução completa aprovada.
- Os dois formatos usam a mesma seleção e o mesmo áudio. Critique final nos dois: mix -15,3 LUFS, ganho de referência +0,1 dB, nível estimado -15,24 LUFS, true peak -2,0 dBTP, LRA 4,23 LU.
- Primeiro som 0,01 s; silêncio final 0,04 s; maior buraco silencioso 0 s; nenhuma emenda classificada como silenciosa.
- O avaliador deu 88/100 e "close"; as sugestões restantes são música e subgrave, oriundas de referências de filmes de lançamento. Não aplicadas a este corte de depoimento, que prioriza a fala.
- Sem arquivo MP4 novo: entrega na timeline editável, pois não houve pedido de exportação.

## Ajuste de áudio e correções de montagem

- Fonte inicialmente baixa: -22,4 LUFS. Substituir apenas os três clips de áudio por WAVs de fala normalizada; vídeo original mantido.
- Fontes finais: assets/voice/tirzepatida-polemica.wav, tirzepatida-argumento.wav, tirzepatida-pergunta.wav, 48 kHz estéreo.
- Processamento loudnorm em conjunto, preservando a relação entre os trechos; sem mudar palavras, velocidade ou ordem dentro de cada passagem.
- Primeiro passe: -16,11 LUFS, -1,50 dBTP, LRA 4,00 LU. Ajuste final: -15,33 LUFS, -2,10 dBTP, LRA 3,90 LU, antes dos fades e da medição no Agentcut.
- O FFmpeg empacotado não tem acompressor; loudnorm está disponível e foi usado. Nenhum compressor ausente foi considerado executado.
- Texto simultâneo precisa de tracks separados. Tema e headline estão em faixas independentes, eliminando o aviso de sobreposição.
- Para manter o título mobile depois do frame 120, criar clips de continuação com opacidade 0 no wide e 1 no mobile; uma alteração de duration só dentro de variants não estendeu a Sequence nas capturas.
