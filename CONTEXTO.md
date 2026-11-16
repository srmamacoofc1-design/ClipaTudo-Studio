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
