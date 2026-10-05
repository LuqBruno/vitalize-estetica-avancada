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
- Publicação atual: prévia publicada em `https://luqbruno.github.io/vitalize-estetica-avancada/` em 17/09/2026; não equivale a aprovação comercial da cliente.
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

## Regra de atualização
Manter esta ficha curta. Registrar decisões detalhadas nas fontes existentes, com data.
Não substituir dados pendentes por informação presumida nem repetir valores comerciais nesta ficha.
