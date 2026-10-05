'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import Image from 'next/image';
import { assets, url } from './assets';
import type { AssetKey } from './assets';

type Props = { whatsapp: string };
type Vars = CSSProperties & Record<`--${string}`, string | number>;

const address = 'Ed. Millenium Saúde Center, Rua Cel. Pedro Benedet, 505, sala 503, Centro, Criciúma, SC';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

/* ---------- Conteúdo ---------- */
// Somente cuidados citados nos destaques oficiais. Detalhes clínicos seguem pendentes.
const cares: { id: string; label: string; tone: [string, string]; rot: number; shape: string; icon?: AssetKey; photo?: AssetKey; flip?: boolean; text: string }[] = [
  { id: 'gluteos', label: 'Glúteos', tone: ['#e9c7b8', '#b98370'], rot: -14, shape: '46% 54% 50% 50% / 58% 42% 58% 42%', icon: 'iconBody', text: 'Cuidado corporal em destaque nos canais oficiais da Vitalize. O que faz sentido para o seu corpo é definido na avaliação.' },
  { id: 'lavieen', label: 'Lavieen', tone: ['#f0d6cc', '#c99484'], rot: 10, shape: '200px 200px 18px 18px', photo: 'catLavieen', text: 'Laser citado nas publicações oficiais. Indicação, intervalo e número de sessões ficam para a conversa com a Bruna.' },
  { id: 'ultraformer', label: 'Ultraformer', tone: ['#e3c9b4', '#a9786a'], rot: -28, shape: '28px', photo: 'catUltraformer', text: 'Tecnologia apresentada pela Vitalize (Ultraformer III e MPT). A decisão acontece depois da avaliação individual.' },
  { id: 'capilar', label: 'Capilar', tone: ['#efd9c8', '#b48a6a'], rot: 22, shape: '18px 120px 18px 120px', icon: 'iconHair', text: 'Cuidado capilar entre os destaques da clínica. Possibilidades são apresentadas na avaliação.' },
  { id: 'preenchimento', label: 'Preenchimento', tone: ['#f3dcd2', '#bf8a7c'], rot: -6, shape: '120px 120px 120px 18px', icon: 'iconFacial', text: 'Categoria facial destacada nos canais oficiais. A Vitalize avalia cada rosto antes de indicar qualquer coisa.' },
  { id: 'botox', label: 'Botox', tone: ['#ead3c4', '#9d7160'], rot: 34, shape: '18px 150px 18px 150px', icon: 'iconFacial', flip: true, text: 'Toxina botulínica, em destaque nos canais oficiais. Indicação e dose dependem de avaliação individual.' },
  { id: 'bioestimulador', label: 'Bioestimulador', tone: ['#e7cdbd', '#ae8470'], rot: -20, shape: '40% 60% 38% 62% / 54% 40% 60% 46%', photo: 'catBio', text: 'Bioestimulador, citado entre os destaques oficiais. Detalhes do protocolo continuam pendentes de confirmação.' },
];

const approach = [
  ['Escuta', 'Você conta o que deseja, o que incomoda e o que não quer mudar.'],
  ['Planejamento', 'As possibilidades são organizadas com clareza, antes de qualquer procedimento.'],
  ['Seu tempo', 'O caminho respeita sua história, seus objetivos e o ritmo que faz sentido para você.'],
];

const steps = [
  ['Conversa inicial', 'Você compartilha o que deseja, sua história e suas dúvidas.', 'Escuta'],
  ['Avaliação individual', 'Características e possibilidades são analisadas com atenção.', 'Olhar'],
  ['Plano de cuidado', 'As opções são explicadas com clareza antes de qualquer procedimento.', 'Plano'],
];
// Câmera da fotografia em cada etapa: ponto de origem e escala do enquadramento.
const framing: Vars[] = [
  { '--ox': '66%', '--oy': '24%', '--sc': 1.85, '--op': '12%' },
  { '--ox': '40%', '--oy': '40%', '--sc': 1.55, '--op': '55%' },
  { '--ox': '82%', '--oy': '88%', '--sc': 1.7, '--op': '100%' },
];

const differentials = [
  ['Naturalidade primeiro', 'A conversa parte de realçar o que já é seu, não de substituir sua aparência.'],
  ['Atendimento individual', 'Cada pessoa é ouvida, respeitada e cuidada em sua individualidade.'],
  ['Plano explicado', 'As opções são apresentadas com clareza antes de qualquer decisão.'],
  ['Facial, corporal e capilar', 'Cuidados apresentados pela Vitalize, sempre depois de uma avaliação.'],
];

const faqs = [
  ['Preciso passar por uma avaliação antes?', 'Sim. A Vitalize informa que procedimentos requerem avaliação individual. É ela que define o que faz sentido para você.'],
  ['Como agendo minha avaliação?', 'Pelo canal oficial de atendimento no WhatsApp. O botão desta página abre essa conversa; nada é agendado até a equipe responder e confirmar.'],
  ['O atendimento é só facial?', 'Não. A Vitalize apresenta atendimento personalizado facial e corporal, e o cuidado capilar aparece entre os destaques.'],
  ['Os resultados são iguais para todos?', 'Não. Resultados podem variar de pessoa para pessoa, e é por isso que o plano é individual.'],
  ['Quais são os valores e horários?', 'Ainda não foram confirmados para esta página. Consulte diretamente a Vitalize pelo canal de atendimento.'],
  ['Onde fica a Vitalize?', address + '.'],
];

/* ---------- Peças ---------- */
function Arrow() {
  return <span className="arrow" aria-hidden="true">→</span>;
}

// Pétalas inspiradas na asa do logo: camadas translúcidas, cada instância com sua rotação.
// Gradientes ficam em um único bloco de definições com ids fixos (sem ids gerados, que divergem entre servidor e cliente).
const gradients: Record<'rose' | 'light' | 'brown', [string, string]> = { rose: ['#e8b9b0', '#c78f80'], light: ['#f4d8cc', '#e2b3a3'], brown: ['#a67c69', '#7d5a49'] };
function WingDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {Object.entries(gradients).map(([name, [a, b]]) => (
          <linearGradient key={name} id={`wg-${name}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} stopOpacity=".95" />
            <stop offset="1" stopColor={b} stopOpacity=".35" />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}
function Wing({ className = '', tone = 'rose' }: { className?: string; tone?: 'rose' | 'light' | 'brown' | 'line' }) {
  const fill = tone === 'line' ? 'none' : `url(#wg-${tone})`;
  return (
    <svg className={`wing wing--${tone} ${className}`} viewBox="0 0 220 300" aria-hidden="true" focusable="false">
      <path className="wing-big" d="M108 6C176 58 206 128 178 186C160 222 124 238 96 232C60 190 52 116 108 6Z" fill={fill} />
      <path className="wing-small" d="M92 232C122 214 162 224 172 252C146 282 108 276 82 250Z" fill={fill} />
      <path className="wing-vein" d="M108 22C146 74 166 134 150 196" fill="none" />
      <circle cx="60" cy="268" r="3.2" /><circle cx="42" cy="276" r="2.4" /><circle cx="28" cy="280" r="1.8" />
    </svg>
  );
}

function Photo({ k, className = '', priority = false, sizes }: { k: AssetKey; className?: string; priority?: boolean; sizes?: string }) {
  const a = assets[k];
  const [failed, setFailed] = useState(false);
  const style = { '--pd': a.focal.desktop, '--pm': a.focal.mobile, aspectRatio: a.ratio } as Vars;
  if (failed) return <div className={`photo photo-fallback ${className}`} style={style} role="img" aria-label={a.alt || 'Imagem indisponível'}><span>Imagem indisponível</span></div>;
  return <Image className={`photo ${className}`} style={style} src={url(a.src)} alt={a.alt} width={a.width} height={a.height} priority={priority} sizes={sizes} onError={() => setFailed(true)} />;
}

function Reveal({ as: Tag = 'div', kind = 'rise', i = 0, className = '', children }: { as?: 'div' | 'p' | 'li' | 'h2' | 'span'; kind?: 'rise' | 'wipe' | 'draw'; i?: number; className?: string; children: ReactNode }) {
  return <Tag className={className} data-reveal={kind} style={{ '--i': i } as Vars}>{children}</Tag>;
}

/* ---------- Movimento (um observador, um listener de scroll) ---------- */
function useMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let io: IntersectionObserver | undefined;
    let raf = 0;
    let depthEls: HTMLElement[] = [];
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of depthEls) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        const d = Number(el.dataset.depth || 0);
        const off = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
        el.style.setProperty('--py', `${(off * d).toFixed(1)}px`);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const start = () => {
      root.classList.add('motion');
      io = new IntersectionObserver((entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io?.unobserve(e.target); }
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      document.querySelectorAll('[data-reveal]').forEach((el) => io?.observe(el));
      depthEls = Array.from(document.querySelectorAll<HTMLElement>('[data-depth]'));
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      onScroll();
    };
    const stop = () => {
      root.classList.remove('motion');
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      depthEls.forEach((el) => el.style.removeProperty('--py'));
      depthEls = [];
    };
    const sync = () => { stop(); if (!reduce.matches) start(); };
    sync();
    reduce.addEventListener('change', sync);
    return () => { reduce.removeEventListener('change', sync); stop(); };
  }, []);
}

// Cabeçalho: estado sticky e seção atual.
function useHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState('');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const ids = ['abordagem', 'cuidados', 'bruna', 'etapas', 'duvidas', 'contato'];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);
  return { scrolled, current };
}

/* ---------- Seções ---------- */
function Header({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const { scrolled, current } = useHeader();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback((refocus = false) => { setOpen(false); if (refocus) toggleRef.current?.focus(); }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') close(true);
      if (e.key === 'Tab' && navRef.current) {
        const f = [toggleRef.current, ...Array.from(navRef.current.querySelectorAll<HTMLElement>('a'))].filter(Boolean) as HTMLElement[];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth > 900) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open, close]);
  const links: [string, string][] = [['abordagem', 'Abordagem'], ['cuidados', 'Cuidados'], ['bruna', 'Bruna Vitali'], ['etapas', 'Etapas'], ['duvidas', 'Dúvidas']];
  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <a className="brand" href="#inicio" onClick={() => close()} aria-label="Vitalize Estética Avançada — início">
        <Image src={url(assets.logo.src)} alt="Vitalize Estética Avançada" width={240} height={120} priority />
      </a>
      <nav ref={navRef} id="site-nav" aria-label="Navegação principal">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={current === id ? 'location' : undefined} onClick={() => close()}>{label}</a>
        ))}
        <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer" onClick={() => close()}>Agendar avaliação</a>
      </nav>
      <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">Agendar avaliação</a>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
        <span /><span /><span />
      </button>
    </header>
  );
}

function Hero({ whatsapp }: { whatsapp: string }) {
  const ref = useRef<HTMLElement>(null);
  // Inclinação sutil das camadas conforme o ponteiro (somente ponteiro fino, sem movimento reduzido).
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, x = 0, y = 0;
    const apply = () => { raf = 0; el.style.setProperty('--mx', x.toFixed(3)); el.style.setProperty('--my', y.toFixed(3)); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const leave = () => { x = 0; y = 0; if (!raf) raf = requestAnimationFrame(apply); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title" ref={ref}>
      <div className="hero-copy">
        <p className="eyebrow h-in" style={{ '--d': '0ms' } as Vars}>Vitalize Estética Avançada · Criciúma, SC</p>
        <h1 id="hero-title">
          <span className="line"><span style={{ '--d': '80ms' } as Vars}>Beleza que</span></span>
          <span className="line"><span style={{ '--d': '150ms' } as Vars}>ainda parece</span></span>
          <span className="line"><span style={{ '--d': '220ms' } as Vars}><em>sua.</em></span></span>
        </h1>
        <p className="hero-lead h-in" style={{ '--d': '330ms' } as Vars}>Cuidar da beleza sem apagar a individualidade. Atendimento facial e corporal personalizado, com naturalidade e um olhar humano.</p>
        <div className="hero-actions h-in" style={{ '--d': '420ms' } as Vars}>
          <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer"><span>Agendar uma avaliação</span><Arrow /></a>
          <a className="btn btn-quiet" href="#abordagem">Conhecer a abordagem</a>
        </div>
        <p className="hero-note h-in" style={{ '--d': '440ms' } as Vars}>Abre o WhatsApp oficial em nova aba. Nada é agendado até a equipe confirmar.</p>
        <p className="hero-sign h-in" style={{ '--d': '500ms' } as Vars}>Bruna Vitali <span>Biomédica Esteta</span></p>
      </div>
      <div className="stage" aria-hidden={false}>
        <div className="stage-3d">
          <div className="layer layer-back" data-depth="26"><Wing className="w-a" tone="rose" /></div>
          <div className="layer layer-mid" data-depth="14"><Wing className="w-b" tone="light" /></div>
          <div className="arch" />
          <div className="layer layer-person"><Photo k="heroPortrait" priority sizes="(max-width: 700px) 90vw, 46vw" className="hero-person" /></div>
          <div className="layer layer-front" data-depth="-18"><Wing className="w-c" tone="line" /></div>
        </div>
        <p className="stage-tag h-in" style={{ '--d': '460ms' } as Vars} aria-hidden="true">Facial<i /> Corporal<i /> Capilar</p>
      </div>
    </section>
  );
}

function Proposal() {
  return (
    <section className="proposal" aria-labelledby="proposal-title">
      <div className="wrap proposal-grid">
        <div className="proposal-art" aria-hidden="true" data-depth="36"><Wing tone="line" className="w-p" /></div>
        <Reveal as="p" className="eyebrow">Beleza com propósito</Reveal>
        <h2 id="proposal-title">
          <Reveal as="span" i={0} className="block">Você não precisa</Reveal>
          <Reveal as="span" i={1} className="block">caber em um padrão.</Reveal>
        </h2>
        <div className="proposal-side">
          <Reveal as="p" i={2}>Aqui, cada pessoa é ouvida, respeitada e cuidada em sua individualidade. A beleza começa ao reconhecer, com naturalidade, o que faz sentido para você.</Reveal>
          <Reveal kind="draw" className="hairline" />
          <Reveal as="p" i={3} className="eyebrow">Cuidar também é se reconhecer</Reveal>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="approach" id="abordagem" aria-labelledby="approach-title">
      <div className="wrap approach-grid">
        <div className="approach-head">
          <Reveal as="p" className="eyebrow">Abordagem individualizada</Reveal>
          <h2 id="approach-title">
            <Reveal as="span" i={0} className="block">Primeiro, a pessoa.</Reveal>
            <Reveal as="span" i={1} className="block"><em>Depois, o protocolo.</em></Reveal>
          </h2>
          <Reveal as="p" i={2} className="lede">Mais do que técnicas, acreditamos em escuta, planejamento e caminhos que respeitam seu tempo, sua história e seus objetivos.</Reveal>
        </div>
        <ol className="approach-list">
          {approach.map(([title, text], n) => (
            <li key={title}>
              <Reveal kind="draw" className="hairline" i={n} />
              <Reveal i={n} className="approach-item">
                <span className="num" aria-hidden="true">0{n + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="approach-art" aria-hidden="true" data-depth="30"><Wing tone="rose" className="w-d" /><Wing tone="light" className="w-e" /></div>
      </div>
    </section>
  );
}

function Cares({ whatsapp }: { whatsapp: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const rail = useRef<HTMLDivElement>(null);
  const select = (n: number, focus = false) => {
    const i = (n + cares.length) % cares.length;
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };
  useEffect(() => {
    const r = rail.current, t = tabs.current[active];
    if (r && t && r.scrollWidth > r.clientWidth) r.scrollTo({ left: t.offsetLeft - (r.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: cares.length - 1 };
    if (e.key in map) { e.preventDefault(); select(map[e.key], true); }
  };
  return (
    <section className="cares" id="cuidados" aria-labelledby="cares-title">
      <div className="wrap">
        <div className="cares-head">
          <Reveal as="p" className="eyebrow">Cuidados</Reveal>
          <h2 id="cares-title"><Reveal as="span" className="block">Tratamentos que partem de</Reveal><Reveal as="span" i={1} className="block"><em>uma boa avaliação.</em></Reveal></h2>
          <Reveal as="p" i={2} className="lede">Escolha um destaque para ver como a Vitalize o apresenta. Indicações clínicas, resultados e valores continuam pendentes de confirmação.</Reveal>
        </div>
        <div className="cares-body">
          <div className="care-rail" ref={rail} role="tablist" aria-label="Cuidados em destaque" aria-orientation="vertical" onKeyDown={onKey}>
            {cares.map((c, n) => (
              <button key={c.id} ref={(el) => { tabs.current[n] = el; }} role="tab" type="button" id={`tab-${c.id}`} aria-selected={active === n} aria-controls={`panel-${c.id}`} tabIndex={active === n ? 0 : -1} onClick={() => select(n)}>
                <span className="care-n" aria-hidden="true">0{n + 1}</span><span className="care-l">{c.label}</span>
              </button>
            ))}
          </div>
          <div className="care-stage">
            {cares.map((c, n) => {
              const on = active === n;
              const style = { '--c1': c.tone[0], '--c2': c.tone[1], '--rot': `${c.rot}deg`, '--shape': c.shape } as Vars;
              return (
                <div key={c.id} className="care-panel" role="tabpanel" id={`panel-${c.id}`} aria-labelledby={`tab-${c.id}`} data-on={on} inert={!on} style={style}>
                  <div className="care-visual">
                    <span className="care-ghost" aria-hidden="true">{c.label}</span>
                    <Wing tone="light" className="care-wing" />
                    {c.photo
                      ? <figure className="care-photo" style={{ "--nw": `${Math.round(assets[c.photo].width * 1.15)}px` } as Vars}><Photo k={c.photo} sizes="260px" /><figcaption>Publicação oficial</figcaption></figure>
                      : <figure className={`care-photo care-pending${c.flip ? ' is-flip' : ''}`}><Photo k={c.icon as AssetKey} sizes="240px" /><figcaption>Imagem a confirmar</figcaption></figure>}
                  </div>
                  <div className="care-copy">
                    <p className="eyebrow">Destaque 0{n + 1} de 0{cares.length}</p>
                    <h3>{c.label}</h3>
                    <p>{c.text}</p>
                    <p className="pending">Conteúdo a confirmar com a Bruna</p>
                    <a className="btn btn-light" href={whatsapp} target="_blank" rel="noreferrer"><span>Agendar avaliação</span><Arrow /></a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Professional({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="pro" id="bruna" aria-labelledby="pro-title">
      <div className="wrap pro-grid">
        <div className="pro-photo" data-reveal="wipe">
          <div className="pro-arch" />
          <Wing tone="rose" className="w-f" />
          <Photo k="bruna" sizes="(max-width: 700px) 90vw, 44vw" className="pro-person" />
        </div>
        <div className="pro-copy">
          <Reveal as="p" className="eyebrow">Quem cuida de você</Reveal>
          <Reveal as="p" i={1} className="pro-name">Bruna Vitali<span>Biomédica Esteta</span></Reveal>
          <h2 id="pro-title"><Reveal as="span" i={2} className="block">Técnica para orientar.</Reveal><Reveal as="span" i={3} className="block"><em>Sensibilidade para reconhecer limites.</em></Reveal></h2>
          <Reveal as="p" i={4} className="lede">A Vitalize apresenta Bruna Vitali como a profissional à frente dos atendimentos. Sua comunicação coloca a naturalidade, a individualidade e o planejamento no centro da experiência.</Reveal>
          <Reveal as="p" i={5} className="pending">Registro profissional e formação: a confirmar</Reveal>
          <Reveal i={6}><a className="btn btn-outline" href={whatsapp} target="_blank" rel="noreferrer"><span>Agendar avaliação</span><Arrow /></a></Reveal>
        </div>
      </div>
    </section>
  );
}

function Differentials() {
  return (
    <section className="diff" aria-labelledby="diff-title">
      <div className="wrap diff-grid">
        <div className="diff-head">
          <Reveal as="p" className="eyebrow">A experiência</Reveal>
          <h2 id="diff-title"><Reveal as="span" className="block">Cuidado que</Reveal><Reveal as="span" i={1} className="block"><em>começa pela escuta.</em></Reveal></h2>
        </div>
        <ul className="diff-list">
          {differentials.map(([t, d], n) => (
            <li key={t}>
              <Reveal kind="draw" className="hairline" i={n} />
              <Reveal i={n} className="diff-row"><span className="num" aria-hidden="true">0{n + 1}</span><h3>{t}</h3><p>{d}</p></Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Atmosphere() {
  return (
    <section className="atmos" aria-labelledby="atmos-title">
      <div className="wrap atmos-grid">
        <div className="atmos-art" aria-hidden="false">
          <div className="atmos-field" data-depth="22"><Wing tone="light" className="w-g" /><Wing tone="rose" className="w-h" /></div>
          <figure className="atmos-plate" data-reveal="wipe" style={{ "--nw": `${Math.round(assets.ambient.width * 1.15)}px` } as Vars}><Photo k="ambient" sizes="200px" /><figcaption>Publicação oficial</figcaption></figure>
        </div>
        <div className="atmos-copy">
          <Reveal as="p" className="eyebrow">Ambiente</Reveal>
          <h2 id="atmos-title"><Reveal as="span" className="block">Um espaço para</Reveal><Reveal as="span" i={1} className="block"><em>se sentir à vontade.</em></Reveal></h2>
          <Reveal as="p" i={2} className="lede">A atmosfera da Vitalize é acolhedora, em tons quentes e naturais, no coração de Criciúma.</Reveal>
          <Reveal as="p" i={3} className="pending">Fotos do espaço: a receber</Reveal>
          <Reveal i={4}><address>Ed. Millenium Saúde Center<br />Rua Cel. Pedro Benedet, 505 · sala 503<br />Centro · Criciúma, SC</address></Reveal>
          <Reveal i={5}><a className="textlink" href={mapUrl} target="_blank" rel="noreferrer">Ver no mapa <Arrow /></a></Reveal>
        </div>
      </div>
    </section>
  );
}

// Experiência de assinatura: a câmera percorre a fotografia enquanto a asa se desenha.
function Journey() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 901px)');
    let raf = 0, visible = false;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      if (reduce.matches) return;
      let p: number, s: number;
      if (wide.matches) {
        p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)));
        s = Math.min(steps.length - 1, Math.floor(p * steps.length));
      } else {
        p = Math.max(0, Math.min(1, (vh * 0.6 - r.top) / Math.max(1, r.height)));
        const items = Array.from(el.querySelectorAll<HTMLElement>('.journey-steps li'));
        s = 0;
        items.forEach((li, n) => { if (li.getBoundingClientRect().top < vh * 0.55) s = n; });
      }
      el.style.setProperty('--p', p.toFixed(3));
      setStep(s);
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll(); }, { rootMargin: '10% 0px' });
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="journey" id="etapas" ref={ref} aria-labelledby="journey-title" style={{ '--p': 0 } as Vars}>
      <div className="journey-pin">
        <div className="wrap journey-grid">
          <div className="journey-frame" style={framing[step]}>
            <div className="journey-photo"><Photo k="scene" sizes="(max-width: 900px) 90vw, 40vw" /></div>
            <div className="journey-tint" />
            <svg className="journey-trace" viewBox="0 0 220 300" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
              <path pathLength={1} d="M108 6C176 58 206 128 178 186C160 222 124 238 96 232C60 190 52 116 108 6Z" />
              <path pathLength={1} d="M92 232C122 214 162 224 172 252C146 282 108 276 82 250Z" />
            </svg>
            <p className="journey-tag" aria-hidden="true">{steps[step][2]}</p>
          </div>
          <div className="journey-text">
            <p className="eyebrow">Etapas do atendimento</p>
            <h2 id="journey-title">Um caminho claro,<br /><em>sem decisões apressadas.</em></h2>
            <div className="journey-steps">
              <span className="journey-rail" aria-hidden="true"><i /></span>
              <ol>
                {steps.map(([t, d], n) => (
                  <li key={t} data-state={n === step ? 'now' : n < step ? 'done' : 'next'}>
                    <span className="dot" aria-hidden="true">{n + 1}</span>
                    <div><h3>{t}</h3><p>{d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq" id="duvidas" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-head">
          <Reveal as="p" className="eyebrow">Dúvidas frequentes</Reveal>
          <h2 id="faq-title"><Reveal as="span" className="block">O que costuma</Reveal><Reveal as="span" i={1} className="block"><em>aparecer primeiro.</em></Reveal></h2>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], n) => (
            <Reveal key={q} i={n % 3} className="faq-item">
              <details name="faq">
                <summary><span>{q}</span><i aria-hidden="true" /></summary>
                <p>{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="closing" id="contato" aria-labelledby="closing-title">
      <div className="wrap closing-grid">
        <div className="closing-copy">
          <Reveal as="p" className="eyebrow">Próximo passo</Reveal>
          <h2 id="closing-title"><Reveal as="span" className="block">Vamos conversar</Reveal><Reveal as="span" i={1} className="block"><em>sobre você?</em></Reveal></h2>
          <Reveal as="p" i={2} className="lede">Agende uma avaliação e conte o que deseja. A indicação depende da análise individual.</Reveal>
          <Reveal i={3} className="closing-actions">
            <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer"><span>Agendar avaliação</span><Arrow /></a>
            <a className="btn btn-quiet" href="https://www.instagram.com/esteticavitalize/" target="_blank" rel="noreferrer">Instagram ↗</a>
          </Reveal>
          <Reveal as="p" i={4} className="hero-note">O botão abre o WhatsApp oficial da Vitalize. A página não envia formulário nem confirma horário.</Reveal>
        </div>
        <Reveal kind="wipe" className="closing-card">
          <Image src={url(assets.logo.src)} alt="Vitalize Estética Avançada" width={380} height={190} />
          <address>Ed. Millenium Saúde Center<br />Rua Cel. Pedro Benedet, 505 · sala 503<br />Centro · Criciúma, SC</address>
          <a className="textlink" href={mapUrl} target="_blank" rel="noreferrer">Ver no mapa <Arrow /></a>
        </Reveal>
      </div>
    </section>
  );
}

export default function VitalizeExperience({ whatsapp }: Props) {
  useMotion();
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <WingDefs />
      <Header whatsapp={whatsapp} />
      <main id="conteudo">
        <Hero whatsapp={whatsapp} />
        <Proposal />
        <Approach />
        <Cares whatsapp={whatsapp} />
        <Professional whatsapp={whatsapp} />
        <Differentials />
        <Atmosphere />
        <Journey />
        <Faq />
        <Closing whatsapp={whatsapp} />
      </main>
      <footer>
        <a href="#inicio" aria-label="Voltar ao início"><Image src={url(assets.logo.src)} alt="Vitalize Estética Avançada" width={145} height={75} /></a>
        <p>© {new Date().getFullYear()} Vitalize Estética Avançada</p>
        <a href="https://www.instagram.com/esteticavitalize/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <small>Procedimentos requerem avaliação individual. Resultados podem variar. Prévia de demonstração: imagens e conteúdos sujeitos à aprovação da cliente.</small>
      </footer>
    </>
  );
}
