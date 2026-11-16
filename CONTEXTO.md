# Contexto atual — ClipaTudo sobre Agentcut

## Código e execução

Base: Agentcut 0.2.25. Editor Next/React em app/studio e components/studio; lógica em lib/studio. Auxiliar local em packages/agentcut. Timeline e assets nativos persistidos no workspace. A interface local usa porta 3000 e o auxiliar 32118.

O repositório contém o código do próprio Agentcut com alterações do ClipaTudo. A versão online oficial não recebe estas mudanças locais. O script Iniciar-ClipaTudo.cmd abre esta instalação.

## Alterações presentes

- Rastreador local MediaPipe: amostragem de planos curtos a 10 Hz, região explícita de busca, diagnóstico sem escrita e zoom com easing.
- composition-follow.ts segue deslocamento medido preservando a escala/composição inicial. Os caminhos de crop ficam no layers.json e são avaliados pelo mesmo runtime em preview/export.
- Dois trabalhos atuais em clipatudo/projects: toguro e vinheteiro. Legendas/títulos usam StyledText.tsx; o flash usa CutFlash.tsx. Texto fica em props editáveis; áudio e imagens ficam em clips separados.
- Fontes e assets completos no pacote. A fonte derivada da legenda acrescenta acentos portugueses preservando os glifos base.

## Próximo trabalho

Comparar com as referências do proprietário e aprimorar pontualmente. Não restilizar para acomodar o rastreador. Conferir o percurso do rosto, emendas, tamanho de cabeça, zoom, legenda e som. O apoio de torso do Toguro ainda precisa de solução editorial; não está aprovado como rastreio.

## Validação e limites

Doze testes específicos, typecheck com geração dos tipos Next e build do auxiliar passaram no GitHub. Os MP4 atuais foram decodificados sem erro e revistos por capturas amostradas; não há aprovação estética final nem revisão quadro a quadro registrada. A suíte geral anterior teve falhas não relacionadas e não foi declarada inteiramente aprovada.

Filtros e animações proprietários do CapCut não foram importados como plugins. As referências em clipatudo/referencias são medidas de estilo; não representam outro editor incluído no produto.

## Acesso por outro GPT

Links de download em `clipatudo/PARA-O-GPT.md`. O pacote completo mantém o editor e os dois trabalhos atuais. Os ZIPs individuais contêm apenas um projeto e a receita, com assets necessários; o MP4 bruto é uma amostra de 10 segundos da fonte Toguro já disponível. Todos ficam na mesma Release pública `agentcut-2026-11-16`. O GPT receptor precisa verificar download, dependências e renderização no próprio ambiente. O pacote completo não foi refeito por uma mudança só de documentação; priorizar a memória atual do repositório ao continuar.

## Banco de entrada para novas edições

clipatudo/materiais-brutos/catalogo.json contém somente os **126 MP4s efetivamente publicados**, com duração, resolução, SHA-256 e download individual. O proprietário encerrou o restante do envio por considerar suficiente. A Release de materiais brutos é separada da Release do editor e não altera os dois projetos de referência. Escolher um clipe e montar uma nova edição nativa no Agentcut, preservando a fonte. Não retomar os envios restantes sem pedido.
