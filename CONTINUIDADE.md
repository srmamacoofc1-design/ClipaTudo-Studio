# Continuidade para outras IAs

1. Leia MEMORY.md e CONTEXTO.md; a última correção do proprietário prevalece sobre notas históricas.
2. Use o próprio Agentcut. Não desenvolver outro editor ou uma renderização FFmpeg paralela para substituir a timeline.
3. Abra o workspace do pacote completo. Duplicar o projeto antes de mudanças de risco, preservar originais e exports. Revisão 2 é a referência; V3 foi rejeitada.
4. Compare a composição com a V2 e o CapCut. Manter banner, tipografia, arte, seta, legendas, cortes e áudio; rastreio e zoom devem aprimorar esse estilo.
5. lib/studio/framing.ts e face-detection.ts implementam o rastreio local. composition-follow.ts oferece seguimento do deslocamento mantendo a composição inicial, com os mesmos guardas de continuidade. Crop paths ficam no layers.json e usam o mesmo runtime em preview e export.
6. Atualize schema, tipos do editor e runtime juntos se adicionar campos. Leia AGENTS.md. Registre alterações no CHANGELOG. Não editar .agentcut gerenciado.
7. Antes de entregar: comparar visualmente início/movimentos/emendas/fim, rever percurso inteiro e áudio quando alterado. Registrar falhas e limitações, sem afirmar “sem erros” com base apenas em testes.
8. Manter MEMORY.md e CONTEXTO.md com decisões, estado e pendências. Não commitar chaves, .env real, sessão, logs de chat ou dados de conta. Não publicar reestilização como aprovada.
