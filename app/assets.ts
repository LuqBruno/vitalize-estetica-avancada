// Acervo visual centralizado da Vitalize.
// Cada arquivo tem uma função única. Imagens com resultado de pacientes
// (antes e depois) ficam registradas, mas marcadas como "nao-usar".

export type Approval =
  | 'marca' // elemento de identidade já presente no projeto
  | 'oficial-demo' // publicação oficial usada só na demonstração; uso comercial pende de autorização
  | 'tratada-pendente' // edição feita neste projeto; depende de revisão e autorização da Bruna
  | 'nao-usar'; // contém resultado de paciente, texto de postagem ou duplica outro arquivo

export type Asset = {
  src: string;
  role: string;
  alt: string;
  width: number;
  height: number;
  ratio: string;
  focal: { desktop: string; mobile: string };
  approval: Approval;
  usedIn: string; // seção onde aparece; vazio = reserva
  note?: string;
};

const ig = (n: string) => `/images/instagram/vitalize-instagram-${n}.jpg`;
const center = { desktop: '50% 50%', mobile: '50% 50%' };

export const assets = {
  logo: { src: '/images/brand/vitalize-logo.png', role: 'Assinatura oficial', alt: 'Vitalize Estética Avançada', width: 1774, height: 887, ratio: '2 / 1', focal: center, approval: 'marca', usedIn: 'cabeçalho, contato, rodapé' },
  heroPortrait: { src: '/images/brand/bruna-hero.png', role: 'Retrato recortado (pose A) — primeira dobra', alt: 'Bruna Vitali, de perfil, em casaco bege, olhando para o lado', width: 941, height: 1672, ratio: '941 / 1672', focal: { desktop: '50% 100%', mobile: '50% 100%' }, approval: 'tratada-pendente', usedIn: 'hero', note: 'Recorte derivado da publicação 11. Revisar fidelidade com a Bruna.' },
  bruna: { src: '/images/brand/bruna-about.png', role: 'Retrato recortado (pose B) — apresentação da profissional', alt: 'Bruna Vitali, de blazer claro, olhando para um notebook', width: 1122, height: 1402, ratio: '1122 / 1402', focal: { desktop: '50% 100%', mobile: '50% 100%' }, approval: 'tratada-pendente', usedIn: 'Bruna Vitali', note: 'Recorte derivado da publicação 15. Revisar fidelidade com a Bruna.' },
  scene: { src: '/images/edited/bruna-portrait-v1.webp', role: 'Retrato com ambiente (pose A, sem texto) — câmera da etapa de scroll', alt: 'Bruna Vitali em ambiente claro, de casaco bege, em perfil', width: 941, height: 1672, ratio: '941 / 1672', focal: { desktop: '60% 20%', mobile: '60% 20%' }, approval: 'tratada-pendente', usedIn: 'etapas (scroll)', note: 'Texto da publicação 11 removido por edição. Revisar fidelidade e autorização.' },
  professionalReserve: { src: '/images/edited/bruna-professional-v1.webp', role: 'Retrato com fundo cinza (pose B)', alt: 'Bruna Vitali de blazer claro com notebook', width: 1122, height: 1402, ratio: '1122 / 1402', focal: center, approval: 'nao-usar', usedIn: '', note: 'Reserva. Mesma pose do recorte de apresentação; evitar repetição visual.' },
  iconBody: { src: '/images/brand/body.png', role: 'Ícone de linha — corporal', alt: '', width: 1254, height: 1254, ratio: '1 / 1', focal: center, approval: 'marca', usedIn: 'cuidados (Glúteos)' },
  iconFacial: { src: '/images/brand/facial.png', role: 'Ícone de linha — facial', alt: '', width: 1254, height: 1254, ratio: '1 / 1', focal: center, approval: 'marca', usedIn: 'cuidados (Preenchimento, Botox)' },
  iconHair: { src: '/images/brand/hair.png', role: 'Ícone de linha — capilar', alt: '', width: 1254, height: 1254, ratio: '1 / 1', focal: center, approval: 'marca', usedIn: 'cuidados (Capilar)' },
  wingLegacy: { src: '/images/brand/wing.png', role: 'Textura escura de asa', alt: '', width: 1024, height: 1536, ratio: '2 / 3', focal: center, approval: 'nao-usar', usedIn: '', note: 'Substituída pelas pétalas em SVG; sem uso nesta versão.' },
  catLavieen: { src: ig('13'), role: 'Publicação oficial — combo Ultraformer MPT + Laser Lavieen', alt: 'Publicação oficial da Vitalize sobre Ultraformer MPT e Laser Lavieen, com retrato de modelo', width: 512, height: 640, ratio: '4 / 5', focal: { desktop: '50% 30%', mobile: '50% 30%' }, approval: 'oficial-demo', usedIn: 'cuidados (Lavieen)', note: 'Tem texto da postagem e baixa resolução; usar pequena.' },
  catUltraformer: { src: ig('07'), role: 'Publicação oficial — Ultraformer III', alt: 'Publicação oficial da Vitalize sobre o Ultraformer III', width: 150, height: 150, ratio: '1 / 1', focal: center, approval: 'oficial-demo', usedIn: 'cuidados (Ultraformer)', note: 'Resolução baixa (150 px); pedir arquivo original.' },
  catBio: { src: ig('09'), role: 'Publicação oficial — embalagens de produtos', alt: 'Publicação oficial da Vitalize com embalagens de produtos junto a uma janela', width: 150, height: 150, ratio: '1 / 1', focal: center, approval: 'oficial-demo', usedIn: 'cuidados (Bioestimulador)', note: 'Resolução baixa (150 px); confirmar se representa a categoria.' },
  ambient: { src: ig('08'), role: 'Publicação oficial — detalhe decorativo (bandeja e xícara)', alt: 'Bandeja dourada com xícara de café, detalhe de ambiente publicado pela Vitalize', width: 150, height: 150, ratio: '1 / 1', focal: center, approval: 'oficial-demo', usedIn: 'ambiente', note: 'Resolução baixa (150 px); fotos reais do espaço continuam pendentes.' },
  social: { src: '/images/vitalize-social-card.png', role: 'Cartão de compartilhamento (Open Graph)', alt: 'Vitalize — Beleza que ainda parece sua.', width: 1732, height: 909, ratio: '1732 / 909', focal: center, approval: 'marca', usedIn: 'metadados' },
} satisfies Record<string, Asset>;

export type AssetKey = keyof typeof assets;

// Demais publicações coletadas do perfil oficial: registradas, sem uso.
export const instagramReserve: { src: string; note: string }[] = [
  { src: ig('01'), note: 'Antes e depois (resultado de paciente).' },
  { src: ig('02'), note: 'Capa de vídeo com texto; 150 px.' },
  { src: ig('03'), note: 'Antes e depois (resultado de paciente).' },
  { src: ig('04'), note: 'Antes e depois (resultado de paciente).' },
  { src: ig('05'), note: 'Ícone Capilar com texto; duplica o ícone de linha.' },
  { src: ig('06'), note: 'Resultado de paciente.' },
  { src: ig('10'), note: 'Logo em quadrado; duplica a assinatura oficial.' },
  { src: ig('11'), note: 'Original da pose A, com texto; preservado.' },
  { src: ig('12'), note: 'Retrato com texto de postagem.' },
  { src: ig('14'), note: 'Resultado de paciente (corpo).' },
  { src: ig('15'), note: 'Original da pose B, com texto; preservado.' },
  { src: ig('16'), note: 'Antes e depois (resultado de paciente).' },
  { src: ig('17'), note: 'Antes e depois (resultado de paciente).' },
  { src: ig('18'), note: 'Resultado de paciente.' },
  { src: ig('19'), note: 'Antes e depois (resultado de paciente).' },
  { src: ig('20'), note: 'Retrato com texto sobre a imagem.' },
  { src: ig('21'), note: 'Retrato com texto sobre a imagem.' },
  { src: ig('22'), note: 'Antes e depois (resultado de paciente).' },
];

export const basePath = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true' ? '/vitalize-estetica-avancada' : '';
export const url = (path: string) => `${basePath}${path}`;
