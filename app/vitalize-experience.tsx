'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation, m, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import Image from 'next/image';
import { assets, url } from './assets';
import type { AssetKey } from './assets';

type Props = { whatsapp: string };
type Vars = CSSProperties & Record<`--${string}`, string | number>;

const address = 'Ed. Millenium Saúde Center, Rua Cel. Pedro Benedet, 505, sala 503, Centro, Criciúma, SC';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const instagram = 'https://www.instagram.com/esteticavitalize/';

/* ---------- Conteúdo ---------- */
// "what" e "how" são textos gerais sobre cada técnica (base em estudos e divulgação de método).
// Sem promessa de resultado. Indicação, aplicação e recursos usados pela Vitalize são confirmados pela Bruna.
type Protocol = { id: string; label: string; what: string; how: string; icon: AssetKey; note?: string };

const protocols: Protocol[] = [
  { id: 'gluteos', label: 'Glúteos', icon: 'iconBodyLight', what: 'Cuidado corporal voltado ao contorno e à firmeza da região glútea. A técnica depende do objetivo de cada pessoa.', how: 'Na avaliação, a Bruna explica quais recursos fazem sentido para o seu caso e o que pode ser esperado de cada um.' },
  { id: 'celulite', label: 'Celulite', icon: 'iconBodyLight', what: 'A celulite é uma alteração do tecido logo abaixo da pele. Ela envolve fibras de sustentação mais rígidas, células de gordura maiores e circulação local mais lenta. Por ter causas combinadas, não há um único tratamento.', how: 'Entre os recursos estudados estão as ondas de choque, que estimulam o tecido e a circulação, e a radiofrequência, que aquece as camadas profundas para estimular o colágeno. Os estudos ainda são pequenos, e o plano é definido na avaliação.', note: 'Recursos usados pela Vitalize para celulite: a confirmar.' },
  { id: 'aumento', label: 'Aumento', icon: 'iconBodyLight', what: 'Aumento é o nome dado a procedimentos que buscam mais volume ou contorno em uma área do corpo. A técnica muda muito de uma região para outra.', how: 'Antes de qualquer indicação, a Bruna avalia a área, o objetivo e o que é seguro para cada pessoa.', note: 'Área atendida: a confirmar com a Bruna.' },
  { id: 'preenchimento', label: 'Preenchimento', icon: 'iconFacialLight', what: 'Gel de ácido hialurônico aplicado para repor volume e definir contornos no rosto. Ele é absorvido pelo organismo com o tempo, então o efeito é temporário.', how: 'A quantidade e os pontos de aplicação são definidos na avaliação, de acordo com a sua anatomia e com o que você quer melhorar.' },
  { id: 'botox', label: 'Botox', icon: 'iconFacialLight', what: 'Toxina botulínica aplicada em pontos específicos para reduzir a contração de músculos da face que marcam linhas de expressão. O efeito é temporário.', how: 'A indicação e a dose dependem da avaliação, e a aplicação é feita por profissional habilitado.' },
  { id: 'bioestimulador', label: 'Bioestimulador', icon: 'iconFacialLight', what: 'O bioestimulador é um material (ácido poli-L-láctico) que faz o próprio organismo produzir colágeno novo, em um processo gradual de meses. O material é absorvido com o tempo.', how: 'O efeito costuma aparecer após alguns meses. Entre os efeitos mais comuns estão nódulos e pequenos caroços, por isso o acompanhamento faz parte do cuidado.' },
  { id: 'lavieen', label: 'Lavieen', icon: 'iconFacialLight', what: 'Laser fracionado não ablativo, com recuperação curta. Segundo a divulgação do método, é usado para textura, manchas e uniformidade da pele.', how: 'A sensação lembra pequenas ardências em sequência. A indicação e o número de sessões são definidos na avaliação.' },
  { id: 'ultraformer', label: 'Ultraformer', icon: 'iconFacialLight', what: 'Ultrassom microfocado (HIFU) que aquece camadas profundas da pele e do tecido de sustentação, sem cortes. O calor estimula a produção de colágeno e a firmeza.', how: 'A Vitalize apresenta o Ultraformer III e o MPT. Os parâmetros e o número de sessões são definidos na avaliação.', note: 'Áreas tratadas com Ultraformer: a confirmar.' },
  { id: 'capilar', label: 'Capilar', icon: 'iconHairLight', what: 'Cuidado voltado à saúde dos fios e do couro cabeludo. As técnicas variam conforme a queixa de cada pessoa.', how: 'A Vitalize apresenta o capilar entre os destaques. Qual recurso é usado, e para qual situação, é confirmado pela Bruna.' },
];

const statement = 'Aqui, cada pessoa é ouvida, respeitada e cuidada em sua individualidade. A beleza começa ao reconhecer, com naturalidade, o que faz sentido para você.';

const approach = [
  ['Escuta', 'Você conta o que deseja, o que incomoda e o que não quer mudar.'],
  ['Planejamento', 'As possibilidades são organizadas com clareza, antes de qualquer procedimento.'],
  ['Seu tempo', 'O caminho respeita sua história, seus objetivos e o ritmo que faz sentido para você.'],
];

const steps = [
  ['Conversa inicial', 'Você compartilha o que deseja, sua história e suas dúvidas.'],
  ['Avaliação individual', 'Características e possibilidades são analisadas com atenção.'],
  ['Plano de cuidado', 'As opções são explicadas com clareza antes de qualquer procedimento.'],
];

const faqs = [
  ['Preciso passar por uma avaliação antes?', 'Sim. A Vitalize informa que procedimentos requerem avaliação individual. É ela que define o que faz sentido para você.'],
  ['Como agendo minha avaliação?', 'Pelo canal oficial de atendimento no WhatsApp. O botão desta página abre essa conversa; nada é agendado até a equipe responder e confirmar.'],
  ['O atendimento é só facial?', 'Não. A Vitalize apresenta atendimento personalizado facial e corporal, e o cuidado capilar aparece entre os destaques.'],
  ['Os resultados são iguais para todos?', 'Não. Resultados podem variar de pessoa para pessoa, e é por isso que o plano é individual.'],
  ['Quais são os valores e horários?', 'Não há valor pronto para a maior parte dos procedimentos: ele é definido depois da avaliação. Horários: consulte pelo WhatsApp.'],
  ['Onde fica a Vitalize?', address + '.'],
];

const pad2 = (n: number) => String(n).padStart(2, '0');

/* ---------- Peças ---------- */
function Arrow() {
  return <svg className="arrow" viewBox="0 0 22 12" aria-hidden="true" focusable="false"><path d="M1 6h19M15 1l5 5-5 5" /></svg>;
}
function ArrowOut() {
  return <svg className="arrow-out" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2 10 10 2M4 2h6v6" /></svg>;
}

function Photo({ k, className = '', priority = false, sizes }: { k: AssetKey; className?: string; priority?: boolean; sizes?: string }) {
  const a = assets[k];
  const [failed, setFailed] = useState(false);
  const style = { '--pd': a.focal.desktop, '--pm': a.focal.mobile, aspectRatio: a.ratio } as Vars;
  if (failed) return <div className={`photo photo-fallback ${className}`} style={style} role="img" aria-label={a.alt || 'Imagem indisponível'}><span>Imagem indisponível</span></div>;
  return <Image className={`photo ${className}`} style={style} src={url(a.src)} alt={a.alt} width={a.width} height={a.height} priority={priority} sizes={sizes} onError={() => setFailed(true)} />;
}

function Reveal({ as: Tag = 'div', kind = 'rise', i = 0, className = '', children }: { as?: 'div' | 'p' | 'li' | 'h2' | 'span' | 'article'; kind?: 'rise' | 'wipe' | 'draw'; i?: number; className?: string; children?: ReactNode }) {
  return <Tag className={className} data-reveal={kind} style={{ '--i': i } as Vars}>{children}</Tag>;
}

/* ---------- Movimento: revelação ao rolar (um observador) ---------- */
function useMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let io: IntersectionObserver | undefined;
    const start = () => {
      root.classList.add('motion');
      io = new IntersectionObserver((entries) => {
        // também revela o que ficou acima da tela numa rolagem rápida
        for (const e of entries) if (e.isIntersecting || e.boundingClientRect.bottom < 0) { e.target.classList.add('in'); io?.unobserve(e.target); }
      }, { rootMargin: '0px 0px -8% 0px', threshold: [0, 0.12] });
      document.querySelectorAll('[data-reveal]').forEach((el) => io?.observe(el));
    };
    const stop = () => { root.classList.remove('motion'); io?.disconnect(); };
    const sync = () => { stop(); if (!reduce.matches) start(); };
    sync();
    reduce.addEventListener('change', sync);
    return () => { reduce.removeEventListener('change', sync); stop(); };
  }, []);
}

// Seção atual (menu), estado da barra e se o contato está à vista (esconde o botão fixo do celular).
function useSections() {
  const [current, setCurrent] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const [atHero, setAtHero] = useState(true);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const ids = ['protocolos', 'valores', 'bruna', 'etapas', 'duvidas', 'contato'];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    const contact = document.getElementById('contato');
    const io2 = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { rootMargin: '0px 0px -10% 0px' });
    if (contact) io2.observe(contact);
    // o botão fixo do celular só aparece depois dos botões do hero saírem da tela
    const actions = document.querySelector('.hero-actions');
    const io3 = new IntersectionObserver(([e]) => setAtHero(e.isIntersecting || e.boundingClientRect.top > 0), { rootMargin: '0px 0px -4% 0px' });
    if (actions) io3.observe(actions);
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); io2.disconnect(); io3.disconnect(); };
  }, []);
  return { current, scrolled, atContact, atHero };
}

/* ---------- Barra ---------- */
function Bar({ whatsapp, current, scrolled }: { whatsapp: string; current: string; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
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
    const onResize = () => { if (window.innerWidth > 1023) setOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open, close]);
  const links: [string, string][] = [['protocolos', 'Protocolos'], ['valores', 'Valores'], ['bruna', 'Bruna Vitali'], ['etapas', 'Etapas'], ['duvidas', 'Dúvidas']];
  return (
    <header className={`bar${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <a className="brand" href="#inicio" onClick={() => close()} aria-label="Vitalize Estética Avançada — início">
        <Image src={url(assets.logo.src)} alt="Vitalize Estética Avançada" width={240} height={120} priority />
      </a>
      <nav ref={navRef} id="site-nav" aria-label="Navegação principal">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-current={current === id ? 'location' : undefined} onClick={() => close()}>{label}</a>
        ))}
        <a className="nav-cta" href={whatsapp} target="_blank" rel="noreferrer" onClick={() => close()}>Agendar avaliação</a>
      </nav>
      <a className="bar-cta" href={whatsapp} target="_blank" rel="noreferrer">Agendar avaliação</a>
      <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
        <span /><span /><span />
      </button>
    </header>
  );
}

/* ---------- Hero ---------- */
// O gesto do logo: a trilha de pontos que sobe das letras até a borboleta.
const flightDots = Array.from({ length: 12 }, (_, i) => {
  const t = i / 11;
  const x = (1 - t) ** 2 * 4 + 2 * (1 - t) * t * 120 + t * t * 196;
  const y = (1 - t) ** 2 * 206 + 2 * (1 - t) * t * 214 + t * t * 150;
  return { x: +x.toFixed(1), y: +y.toFixed(1), r: +(1.3 + t * 1.2).toFixed(2) };
});

function Flight() {
  return (
    <svg className="flight" viewBox="0 0 300 230" aria-hidden="true" focusable="false">
      <m.g initial="off" animate="on" variants={{ on: { transition: { delayChildren: 0.5, staggerChildren: 0.035 } } }}>
        {flightDots.map((d, i) => (
          <m.circle key={i} cx={d.x} cy={d.y} r={d.r} variants={{ off: { opacity: 0 }, on: { opacity: 1, transition: { duration: 0.2 } } }} />
        ))}
      </m.g>
      <m.image
        href={url(assets.butterfly.src)} x="179" y="64" width="92" height="90"
        style={{ transformOrigin: '225px 109px' }}
        initial={{ opacity: 0, y: 10, rotate: -12 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.92, type: 'spring', duration: 0.7, bounce: 0.25 }}
      />
    </svg>
  );
}

function Hero({ whatsapp }: { whatsapp: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 64]);
  const frameY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -36]);
  const badgeRot = useTransform(scrollY, [0, 1600], [0, reduce ? 0 : 140]);
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="line"><span style={{ '--d': '40ms' } as Vars}>Beleza que</span></span>
            <span className="line"><span style={{ '--d': '110ms' } as Vars}>ainda parece</span></span>
            <span className="hero-sua">
              <span className="line"><span style={{ '--d': '180ms' } as Vars}><em>sua.</em></span></span>
              <Flight />
            </span>
          </h1>
          <p className="hero-lead h-in" style={{ '--d': '300ms' } as Vars}>Cuidar da beleza sem apagar a individualidade. Atendimento facial e corporal personalizado, com naturalidade e um olhar humano.</p>
          <div className="hero-actions h-in" style={{ '--d': '380ms' } as Vars}>
            <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer"><span>Agendar avaliação</span><Arrow /></a>
            <a className="btn btn-ghost" href="#protocolos"><span>Ver protocolos</span></a>
          </div>
          <p className="hero-note h-in" style={{ '--d': '430ms' } as Vars}>Abre o WhatsApp oficial em nova aba. Nada é agendado até a equipe confirmar.</p>
        </div>
        <m.div className="hero-visual" style={{ y: frameY }}>
          <figure className="hero-frame h-in" style={{ '--d': '120ms' } as Vars}>
            <m.div className="hero-img" style={{ y: imgY }}>
              <Photo k="scene" priority sizes="(max-width: 1023px) 92vw, 44vw" />
            </m.div>
            <span className="hero-pill">Facial · Corporal · Capilar</span>
            <figcaption className="hero-chip">Bruna Vitali <span>Biomédica Esteta</span></figcaption>
          </figure>
          <m.div className="badge" style={{ rotate: badgeRot }} aria-hidden="true">
            <svg viewBox="0 0 200 200" focusable="false">
              <defs><path id="badge-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
              <text><textPath href="#badge-circle" textLength="494" lengthAdjust="spacing">Beleza com propósito · Naturalidade · Individualidade · </textPath></text>
            </svg>
            <Image className="badge-fly" src={url(assets.butterfly.src)} alt="" width={260} height={254} />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

// Faixa em movimento com os procedimentos (somente os citados nos materiais)
function Marquee() {
  const names = protocols.map((p) => p.label);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((g) => (
          <div className="marquee-group" key={g}>
            {names.map((n) => <span key={n + g}>{n}<i /></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Posicionamento: texto que se acende com a rolagem ---------- */
function Word({ w, i, n, progress, still }: { w: string; i: number; n: number; progress: MotionValue<number>; still: boolean }) {
  const start = (i / n) * 0.86;
  // piso de 0,56: texto grande ainda legível (contraste mínimo 3:1) antes de acender
  const o = useTransform(progress, [start, start + 0.14], [0.56, 1]);
  return <m.span style={{ opacity: still ? 1 : o }}>{w} </m.span>;
}

function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.5'] });
  const words = statement.split(' ');
  return (
    <section className="statement" aria-labelledby="statement-title">
      <div className="wrap">
        <h2 id="statement-title" className="sr-only">Nossa abordagem</h2>
        <p className="statement-text" ref={ref}>
          <span className="sr-only">{statement}</span>
          <span aria-hidden="true">{words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} progress={scrollYProgress} still={!!reduce} />)}</span>
        </p>
        <ol className="approach">
          {approach.map(([title, text], n) => (
            <li key={title}>
              <Reveal kind="draw" className="hairline" i={n} />
              <Reveal i={n} className="approach-item"><h3>{title}</h3><p>{text}</p></Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Protocolos: três retângulos que abrem ao clique ---------- */
type Group = { id: string; label: string; icon: AssetKey; ids: string[] };
const groups: Group[] = [
  { id: 'corpo', label: 'Corpo', icon: 'iconBodyLight', ids: ['gluteos', 'celulite', 'aumento'] },
  { id: 'rosto', label: 'Rosto', icon: 'iconFacialLight', ids: ['preenchimento', 'botox', 'bioestimulador', 'lavieen', 'ultraformer'] },
  { id: 'cabelo', label: 'Cabelo', icon: 'iconHairLight', ids: ['capilar'] },
];

function Protocols({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const [pick, setPick] = useState<Record<string, string>>({ corpo: 'gluteos', rosto: 'preenchimento', cabelo: 'capilar' });
  return (
    <section className="protocols" id="protocolos" aria-labelledby="protocols-title">
      <div className="wrap">
        <div className="protocols-head">
          <h2 id="protocols-title"><Reveal as="span" className="block">Protocolos</Reveal></h2>
          <Reveal as="p" i={1} className="lede">Toque em uma área para abrir os protocolos. A indicação é sempre definida na avaliação.</Reveal>
        </div>
        <div className="svc-list">
          {groups.map((g, n) => {
            const isOpen = open === g.id;
            const items = protocols.filter((p) => g.ids.includes(p.id));
            const cur = items.find((p) => p.id === pick[g.id]) ?? items[0];
            return (
              <div key={g.id} className="svc" data-open={isOpen} data-reveal="rise" style={{ '--i': n } as Vars}>
                <Image className="svc-art" src={url(assets[g.icon].src)} alt="" width={640} height={640} />
                <h3 className="svc-title">
                  <button type="button" className="svc-head" aria-expanded={isOpen} aria-controls={`svc-${g.id}`} onClick={() => setOpen(isOpen ? null : g.id)}>
                    <span className="svc-name">{g.label}</span>
                    <span className="svc-sub">{items.map((p) => p.label).join(' · ')}</span>
                    <span className="svc-go" aria-hidden="true"><Arrow /></span>
                  </button>
                </h3>
                <div className="collapse" id={`svc-${g.id}`} data-open={isOpen} inert={!isOpen}>
                  <div className="collapse-in">
                    <div className="svc-body">
                      <div className="svc-items" role="group" aria-label={`Protocolos de ${g.label}`}>
                        {items.map((p) => (
                          <button key={p.id} type="button" className="svc-item" aria-pressed={cur.id === p.id} onClick={() => setPick((s) => ({ ...s, [g.id]: p.id }))}>{p.label}</button>
                        ))}
                      </div>
                      <div className="svc-detail" key={cur.id}>
                        <div className="svc-text">
                          <p className="what">{cur.what}</p>
                          <p><span className="k">Como funciona</span>{cur.how}</p>
                          {cur.note && <p className="svc-note">{cur.note}</p>}
                        </div>
                        <div className="frames">
                          <figure className="frame"><span>Antes</span><small>Foto a confirmar</small></figure>
                          <figure className="frame"><span>Depois</span><small>Foto a confirmar</small></figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="svc-foot">
          <a className="btn btn-light" href={whatsapp} target="_blank" rel="noreferrer"><span>Agendar avaliação</span><Arrow /></a>
          <p>Resultados variam de pessoa para pessoa. Textos gerais sobre cada técnica; a forma de aplicação da Vitalize é confirmada pela Bruna. Fotos de resultados só entram com autorização por escrito.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Valores ---------- */
function Values({ whatsapp }: { whatsapp: string }) {
  return (
    <section className="values" id="valores" aria-labelledby="values-title">
      <div className="wrap values-grid">
        <h2 id="values-title"><Reveal as="span" className="block">Valores</Reveal><Reveal as="span" i={1} className="block"><em>sob avaliação.</em></Reveal></h2>
        <div className="values-copy">
          <Reveal as="p" i={2} className="values-lead">Não temos valor pronto para a maior parte dos procedimentos. Cada indicação é definida depois da avaliação, de acordo com o plano de cuidado de cada pessoa.</Reveal>
          <Reveal as="p" i={3} className="muted">Isso vale também para os procedimentos faciais.</Reveal>
          <Reveal i={4}><a className="btn btn-primary" href={whatsapp} target="_blank" rel="noreferrer"><span>Tirar dúvidas pelo WhatsApp</span><Arrow /></a></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bruna ---------- */
function About({ whatsapp }: { whatsapp: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0.1, 0.55], [reduce ? 0 : 56, 0]);
  return (
    <section className="about" id="bruna" ref={ref} aria-labelledby="about-title">
      <div className="wrap about-grid">
        <div className="about-media">
          <div className="about-panel" data-reveal="wipe" />
          <m.div className="about-cutout" style={{ y }}>
            <Photo k="bruna" sizes="(max-width: 1023px) 80vw, 480px" />
          </m.div>
        </div>
        <div className="about-copy">
          <Reveal as="p" className="about-name">Bruna Vitali<span>Biomédica Esteta</span></Reveal>
          <h2 id="about-title"><Reveal as="span" i={1} className="block">Técnica para orientar.</Reveal><Reveal as="span" i={2} className="block"><em>Sensibilidade para reconhecer limites.</em></Reveal></h2>
          <Reveal as="p" i={3} className="about-text">A Vitalize apresenta Bruna Vitali como a profissional à frente dos atendimentos. Sua comunicação coloca a naturalidade, a individualidade e o planejamento no centro da experiência.</Reveal>
          <Reveal as="p" i={4} className="pending">Registro profissional e formação: a confirmar</Reveal>
          <Reveal i={5}><a className="btn btn-outline" href={whatsapp} target="_blank" rel="noreferrer"><span>Agendar avaliação</span><Arrow /></a></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Etapas: a borboleta percorre a trilha com a rolagem ---------- */
function Steps() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] });
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStep(v < 0.34 ? 0 : v < 0.67 ? 1 : 2));
  return (
    <section className="steps" id="etapas" ref={ref} aria-labelledby="steps-title">
      <div className="wrap">
        <div className="steps-head">
          <h2 id="steps-title"><Reveal as="span" className="block">Um caminho claro,</Reveal><Reveal as="span" i={1} className="block"><em>sem decisões apressadas.</em></Reveal></h2>
        </div>
        <div className="steps-track">
          <div className="trail-h" aria-hidden="true">
            <m.span className="fly-h" style={{ left: reduce ? '100%' : left }}>
              <Image src={url(assets.butterfly.src)} alt="" width={260} height={254} />
            </m.span>
          </div>
          <div className="trail-v" aria-hidden="true">
            <Image className="fly-v" src={url(assets.butterfly.src)} alt="" width={260} height={254} />
          </div>
          <ol className="steps-list">
            {steps.map(([t, d], n) => (
              <Reveal as="li" key={t} i={n} className="step">
                <span className="step-dot" data-on={reduce || n <= step} aria-hidden="true" />
                <span className="step-n" aria-hidden="true">{pad2(n + 1)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dúvidas ---------- */
function Faq() {
  return (
    <section className="faq" id="duvidas" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <h2 id="faq-title"><Reveal as="span" className="block">Dúvidas</Reveal><Reveal as="span" i={1} className="block"><em>frequentes.</em></Reveal></h2>
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

/* ---------- Contato ---------- */
function Contact({ whatsapp }: { whatsapp: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const x1 = useTransform(scrollYProgress, [0, 1], [reduce ? '0%' : '-8%', '0%']);
  const x2 = useTransform(scrollYProgress, [0, 1], [reduce ? '0%' : '8%', '0%']);
  return (
    <section className="contact" id="contato" ref={ref} aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title" className="contact-title">
          <m.span className="block" style={{ x: x1 }}>Agende sua</m.span>
          <m.span className="block" style={{ x: x2 }}><em>avaliação.</em></m.span>
        </h2>
        <div className="contact-grid">
          <Reveal className="contact-cta">
            <p>Conte o que deseja. A indicação depende da análise individual.</p>
            <a className="btn btn-light btn-lg" href={whatsapp} target="_blank" rel="noreferrer"><span>Agendar avaliação</span><Arrow /></a>
            <p className="note">O botão abre o WhatsApp oficial da Vitalize. A página não envia formulário nem confirma horário.</p>
          </Reveal>
          <Reveal i={1} className="contact-info">
            <div>
              <span className="k">Endereço</span>
              <address>Ed. Millenium Saúde Center<br />Rua Cel. Pedro Benedet, 505 · sala 503<br />Centro · Criciúma, SC</address>
              <a className="textlink" href={mapUrl} target="_blank" rel="noreferrer">Ver no mapa <Arrow /></a>
            </div>
            <div>
              <span className="k">Redes</span>
              <a className="textlink" href={instagram} target="_blank" rel="noreferrer">@esteticavitalize <ArrowOut /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <a className="footer-logo" href="#inicio" aria-label="Voltar ao início"><Image src={url(assets.logo.src)} alt="Vitalize Estética Avançada" width={180} height={90} /></a>
        <nav className="footer-nav" aria-label="Rodapé">
          <a href="#protocolos">Protocolos</a><a href="#valores">Valores</a><a href="#bruna">Bruna Vitali</a><a href="#etapas">Etapas</a><a href="#duvidas">Dúvidas</a>
        </nav>
        <p className="footer-addr">Ed. Millenium Saúde Center · Rua Cel. Pedro Benedet, 505, sala 503 · Centro · Criciúma, SC</p>
        <p className="footer-small">© {new Date().getFullYear()} Vitalize Estética Avançada. Procedimentos requerem avaliação individual. Resultados podem variar. Prévia de demonstração: imagens e conteúdos sujeitos à aprovação da cliente.</p>
      </div>
    </footer>
  );
}

export default function VitalizeExperience({ whatsapp }: Props) {
  useMotion();
  const { current, scrolled, atContact, atHero } = useSections();
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <Bar whatsapp={whatsapp} current={current} scrolled={scrolled} />
        <main id="conteudo">
          <Hero whatsapp={whatsapp} />
          <Marquee />
          <Statement />
          <Protocols whatsapp={whatsapp} />
          <Values whatsapp={whatsapp} />
          <About whatsapp={whatsapp} />
          <Steps />
          <Faq />
          <Contact whatsapp={whatsapp} />
        </main>
        <Footer />
        <a className={`dock${atContact || atHero ? ' is-hidden' : ''}`} href={whatsapp} target="_blank" rel="noreferrer" tabIndex={atContact || atHero ? -1 : 0}><span>Agendar avaliação</span><Arrow /></a>
      </LazyMotion>
    </MotionConfig>
  );
}
