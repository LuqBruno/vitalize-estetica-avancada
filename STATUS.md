# Estado do projeto — Vitalize
Atualização: 16/09/2026. Nova direção visual da prévia local, com prioridade mobile.

- Conversa: Meeu.com — Produção de landing pages.
- Fonte de conteúdo/decisões: README.md. Verificar aprovação posterior antes de editar.
- Stack encontrado: Vinext, React/Next, TypeScript e Tailwind.
- Prévia: npm run dev -- --port 3003.
- Orientação vigente: Preservar a demonstração. Não preencher registros profissionais, horários ou resultados de procedimentos sem confirmação.
- Conteúdo/decisões pendentes: Contratação, procedimentos, dados profissionais e imagens a confirmar.
- Decisão vigente: usar a assinatura oficial da marca, tons quentes coordenados e composição editorial. Categorias de cuidado ficam todas visíveis, em vez de cards de Instagram ampliados.
- Próxima ação: colher revisão visual de Bruno e validar com Bruna os retratos tratados antes de qualquer apresentação ou publicação comercial.
- Publicação atual: a landing de largura total foi publicada em `https://luqbruno.github.io/vitalize-estetica-avancada/` em 15/10/2026 (commit `ed48e6a`, workflow 38748333630 concluído com sucesso), por autorização expressa de Bruno na conversa. Conferido no endereço público: página e imagens com HTTP 200, hero e protocolos renderizados em 1440 e 390 px, sem rolagem horizontal; o 404 de `icon.jpg` na raiz do domínio já existia. Prévia de demonstração com `noindex`; não equivale a aprovação comercial da cliente nem a autorização de uso das imagens.
- 17/09/2026: GitHub Pages configurado em `LuqBruno/vitalize-estetica-avancada`. Corrigidos os caminhos e a posição dos assets compilados para a rota `/vitalize-estetica-avancada/`. Workflow #6 concluído com sucesso; página, CSS e retrato principal retornaram HTTP 200; a primeira dobra foi conferida visualmente no domínio público com estilo e fotografia carregados.
- Comercial: [consultar pipeline](../../00_Leads_e_Propostas/PIPELINE.md).

## Verificações
`npm run lint` e `npm run build` executados em 16/09/2026 com sucesso.

Revisão complementar em 16/09/2026: o texto decorativo da primeira tela foi limitado à largura da seção. Na prévia local, a largura do corpo passou a coincidir com a janela em 390 px e 1440 px. Imagens carregaram, o console não mostrou erros e as categorias de tratamento alternaram corretamente. `npm run lint` e `npm run build` passaram após esse ajuste.

Nova versão em 16/09/2026: removida a tela de espera; primeira tela, filosofia, tratamentos, apresentação da Bruna, etapas e contato redesenhados com base na identidade da Vitalize. O menu mobile foi implementado. Dois retratos derivados das publicações oficiais 11 e 15 tiveram os textos de postagem removidos por edição de imagem e foram salvos em `public/images/edited/`; os originais permanecem em `public/images/instagram/`. Os retratos tratados precisam de revisão da Bruna para confirmar fidelidade à sua aparência e autorização de uso.

Verificado nesta versão: `npm run lint` e `npm run build` passaram; prévia em 320, 390, 430 e 1440 px sem imagens quebradas, erros de console ou rolagem horizontal; menu mobile abre, navega para Tratamentos e fecha. Não houve publicação.

## Revisão de direção de arte — 05/10/2026 (somente prévia local; sem publicação)
- Conceito: "Cuidar da beleza sem apagar a individualidade". Pétalas da asa do logo em camadas translúcidas (profundidade CSS 3D leve com ponteiro/scroll, sem WebGL nem nova dependência), arco rosado, tipografia Cormorant + Manrope, paleta quente derivada do logo.
- Estrutura: hero → proposta → abordagem → cuidados (7 destaques, abas com teclado) → Bruna → diferenciais → ambiente → etapas (scroll fixado, câmera percorre a foto e a asa se desenha) → dúvidas → contato. FAQ novo usa só fatos já confirmados.
- Acervo centralizado em `app/assets.ts` (função, alt, proporção, foco, aprovação, uso). Fotos de antes/depois e de pacientes ficam registradas como "não usar". Pose A (hero e etapas) e pose B (Bruna) aparecem em recortes distintos; `bruna-professional-v1.webp` ficou em reserva.
- Verificado agora (Chrome headless + Playwright em 390, 430, 768, 1280 e 1440 px): sem rolagem horizontal, sem imagem quebrada, sem erro de console; âncoras não ficam sob o cabeçalho; menu mobile abre, fecha com Esc e devolve o foco; abas respondem a setas/Home/End e a cliques rápidos; FAQ exclusivo; movimento reduzido remove animações, parallax e fixação. Sequência do hero ≈ 1,06 s; rolagem contínua com mediana de quadro ≈ 6 ms. `npm run lint` e `npm run build` passaram.
- Pendências: aprovação da Bruna para os retratos tratados e uso das imagens oficiais; fotos do espaço; registro profissional; descrições e indicações de cada procedimento; valores e horários; imagens de Glúteos, Preenchimento e Botox; arquivos originais de Ultraformer, Bioestimulador e ambiente (hoje 150 px); CEP do schema.org (88801-250) sem fonte registrada.
- Próxima ação: validar com Bruna/Bruno, substituir imagens pendentes e converter os PNG de retrato (≈1,9 MB e 1,4 MB) para formato mais leve após aprovação.

### Refino de imagens e acabamento — 05/10/2026
- Auditoria: retratos recortados limpos em 2×, sem franja; imagens oficiais de 150 px (Ultraformer, Bioestimulador, ambiente) ficam limitadas ao tamanho nativo; Lavieen (512 px) tem texto de postagem. Nenhuma imagem de antes/depois é usada.
- Cópias WebP em `public/images/optimized/` (≈3,9 MB → ≈320 KB); originais intactos em `public/images/brand/`.
- axe-core (WCAG A/AA + boas práticas): 0 violações em 1440 e 390 px. Lint e build passaram; sem overflow nem erro de console em 390, 430, 768, 1280 e 1440 px.

### Novo hero e refino de movimento — 13/10/2026 (local, não publicado)
- Motivo: Bruno avaliou que o hero "tinha cara de template". Saíram eyebrow, recorte sobre arco, pétalas e rótulos verticais.
- Hero: foto real com ambiente (`bruna-portrait-v1.webp`) em sangria; trilha de pontos do logo subindo do "*sua.*" até a borboleta (recortada da assinatura oficial em `public/images/optimized/vitalize-borboleta.webp`); faixa factual na base.
- Etapas: a foto repetida saiu; agora a borboleta percorre a trilha e as estações acendem quando ela passa. Assim a pose A aparece uma vez só.
- Limpeza da página: sem eyebrows nem numeração decorativa; pétalas mantidas só nos cuidados e no ambiente.
- Movimento e acabamento: biblioteca `motion` (LazyMotion + `domAnimation`), mola na foto do hero e pouso da borboleta, `useScroll` nas etapas, `MotionConfig reducedMotion="user"`; easing forte, pressão de botão 0,97, hover só com mouse, troca de cuidado com desfoque curto, FAQ com altura animada, cabeçalho translúcido com sombra de borda, seleção/cursor/barra de rolagem na paleta, setas em SVG no lugar de caracteres Unicode.
- `noindex` adicionado aos metadados (prévia de demonstração).
- Verificado agora: `npm run lint`, `npm run build` e `tsc --noEmit` passaram; detector Impeccable sem achados; axe-core 0 violações em 1440 e 390 px; Playwright em 390/430/768/1280/1440 px sem overflow, imagem quebrada ou erro de console; menu, âncoras, abas (teclado e cliques rápidos), FAQ, etapas e movimento reduzido conferidos. `op revisar` execução `2026-10-13_221342-revisar`: 0 bloqueadores, 0 prioritários. O aviso de texto invisível em 390 px não se reproduziu numa rolagem completa (todos revelados); o de WhatsApp é falta de `whatsappEsperado` no `producao.json`.
- Próxima ação: Bruno revisar a prévia local; decidir se publica a nova versão.

### Estrutura enxuta — 14/10/2026 (local, não publicado)
- Pedido da cliente, lido da transcrição (não assisti ao vídeo nem vi a referência): protocolos em abas (Glúteos, Celulite, Aumento, facial), valores explicados sem tabela fixa, agendamento embaixo.
- Nova ordem: hero, proposta com três linhas de abordagem, protocolos, valores, Bruna, etapas, dúvidas, contato. Saíram as seções de diferenciais e ambiente, e a etapa fixada no scroll.
- Celulite e Aumento aparecem como pendentes: não estão nos materiais confirmados.
- Visual: fundo claro, uma cor de marca, linhas finas, sem pétalas nem blocos escuros. Protocolos sem fotos, porque as imagens disponíveis eram ícones ou tinham 150 px.
- Referência visual de outra profissional (captura enviada na conversa) usada só para composição: título com linha fina e lista. Nada de texto, foto ou identidade dela.
- Verificado agora: lint, tsc e build passaram; sem erro de console; sem rolagem horizontal em 390 e 1440 px; axe 0 violações em 390 e 1440; âncoras com folga abaixo do cabeçalho; menu fecha ao navegar; teclado nas abas; FAQ exclusivo; movimento reduzido sem conteúdo oculto.
- Pendências: protocolos de celulite e aumento; descrição de cada protocolo; resultados (só com autorização por escrito); registro profissional da Bruna; referência da marketing para ajustes finos.

### Protocolos com explicação e resultados — 14/10/2026 (local, não publicado)
- Pedido da Bruna: a seção ficou simples demais. Cada protocolo ganhou "O que é", "Como funciona" e um bloco de resultados com duas molduras "Foto a confirmar" (Antes e Depois).
- Textos gerais, com base em pesquisa (ondas de choque e radiofrequência para celulite; PLLA para bioestimulador; laser Lavieen; HIFU para Ultraformer). Preenchimento, Botox, Aumento e Capilar foram escritos com conhecimento geral e precisam de revisão da Bruna.
- Nada de promessa de resultado. Recursos usados pela Vitalize para celulite e área do aumento seguem pendentes.
- Nenhuma foto de paciente foi usada; as molduras ficam vazias até haver autorização por escrito.
- Verificado: lint e tsc passaram; sem overflow em 390 px; sem erro de console; axe sem violações no painel de celulite.
- Próxima ação: Bruna revisar os textos de cada protocolo e confirmar os recursos usados.

### Página reformulada do zero — 15/10/2026 (local, não publicado)
- Motivo: a Bruna pediu uma página mais enxuta e diferente; a revisão anterior só trocava peças. Estrutura e visual foram refeitos.
- Conceito: coluna estreita sobre fundo quente; no computador, capa fixa com a fotografia à esquerda e a coluna à direita; no celular, capa em tela cheia e botão "Agendar avaliação" fixo embaixo. Cartões em cacau com rótulo em serifa e seta, como na composição de referência, usando os ícones de linha da marca em branco.
- Protocolos: três cartões (Corpo, Rosto, Cabelo) que abrem a lista; cada protocolo abre "O que é", "Como funciona" e molduras de resultado "Foto a confirmar". Agrupamento assumido: Lavieen e Ultraformer em Rosto (Ultraformer com nota "áreas a confirmar").
- Etapas: a borboleta do logo acompanha a rolagem sobre a trilha de pontos.
- Acervo: ícones claros derivados em `public/images/optimized/icon-*-light.webp`; originais intactos. A foto da capa é `bruna-portrait-v1.webp` (pendente de aprovação da Bruna).
- Verificado agora: lint, tsc e build passaram; sem erro de console; sem overflow em 390, 430, 768, 1280 e 1440 px; axe 0 violações (desktop e celular); âncoras, cartões e linhas exclusivos, teclado, botão fixo (some no contato), menu, FAQ e movimento reduzido conferidos. `op revisar` execução `2026-10-15_102437-revisar`: 0 bloqueadores e 0 prioritários; o aviso é o `whatsappEsperado` não configurado.
- Pendências: aprovação da Bruna para o retrato da capa e a imagem do bloco "Bruna"; revisão dos textos de cada protocolo; recursos usados em celulite e área do aumento; fotos de resultados com autorização por escrito.

### Landing de largura total com movimento — 15/10/2026 (local, não publicado)
- Substitui a versão de coluna estreita com foto fixa: Bruno e a cliente queriam uma landing convencional, dinâmica e profissional (hero, seções, rodapé), com a seção de protocolos bem trabalhada.
- Estrutura: hero largo com foto e selo giratório; faixa em movimento com os procedimentos; texto de posicionamento que se acende com a rolagem; protocolos; valores; Bruna; etapas; dúvidas; contato; rodapé.
- Protocolos (simplificado a pedido de Bruno): título em escala grande e três retângulos (Corpo, Rosto, Cabelo) que abrem ao clique, um por vez. Dentro, a lista de protocolos e o detalhe com "O que é", "Como funciona" e molduras "Foto a confirmar". Sem índice lateral, numeração nem painéis. Textos gerais, a revisar pela Bruna.
- Movimento (biblioteca `motion`): parallax no hero, selo que gira com a rolagem, palavras que acendem, borboleta percorrendo a trilha das etapas, título do contato que se encaixa, botão fixo no celular depois do hero. Movimento reduzido mostra tudo parado.
- Verificado agora: lint, tsc e build passaram; sem erro de console; sem overflow em 390 e 1440 px; axe 0 violações (desktop e celular, página rolada); movimento medido por script (marquee, parallax, selo, palavras, índice, borboleta, título); âncoras com folga; imagens carregam. `op revisar` 2026-10-15_104239-revisar: 0 bloqueadores e 0 prioritários; avisos: hierarquia de títulos (corrigida depois) e `whatsappEsperado` não configurado.
- Pendências: aprovação da Bruna para o retrato do hero e o recorte da seção Bruna; revisão dos textos de cada protocolo; recursos usados em celulite e área do aumento; fotos de resultados com autorização por escrito.

## Regra de atualização
Manter esta ficha curta. Registrar decisões detalhadas nas fontes existentes, com data.
Não substituir dados pendentes por informação presumida nem repetir valores comerciais nesta ficha.
