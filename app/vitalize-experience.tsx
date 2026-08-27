'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Props = { whatsapp: string };

const treatments = [
  {
    id: 'facial', index: '01', title: 'Estética facial',
    note: 'Expressão, contorno e qualidade da pele, sem apagar o que faz você ser você.',
    items: ['Toxina botulínica', 'Preenchimento', 'Bioestimulador', 'Lavieen'],
    image: '/images/instagram/vitalize-instagram-13.jpg',
    alt: 'Referência editorial de cuidado facial divulgada pela Vitalize',
  },
  {
    id: 'corporal', index: '02', title: 'Estética corporal',
    note: 'Protocolos pensados para objetivos reais, biotipo e momento de cada paciente.',
    items: ['Glúteos', 'Ultraformer MPT', 'Protocolos personalizados'],
    image: '/images/instagram/vitalize-instagram-14.jpg',
    alt: 'Planejamento de protocolo corporal realizado pela Vitalize',
  },
  {
    id: 'capilar', index: '03', title: 'Cuidado capilar',
    note: 'Avaliação individual para compreender necessidades e possíveis caminhos de cuidado.',
    items: ['Avaliação capilar', 'Plano individualizado'],
    image: '/images/instagram/vitalize-instagram-09.jpg',
    alt: 'Ambiente de atendimento e produtos da Vitalize',
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14m-5-5 5 5-5 5'} /></svg>;
}

export default function VitalizeExperience({ whatsapp }: Props) {
  const [activeTreatment, setActiveTreatment] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const storyRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('intro-active');
    const timer = window.setTimeout(() => {
      setIntroVisible(false);
      document.body.classList.remove('intro-active');
    }, reducedMotion ? 80 : 2200);
    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove('intro-active');
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = storyRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(distance, 1)));
      root.style.setProperty('--story-progress', progress.toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const active = treatments[activeTreatment];

  return (
    <>
      {introVisible && (
        <div className="intro-screen" role="status" aria-label="Carregando Vitalize Estética Avançada">
          <div className="intro-symbol" aria-hidden="true"><i /><i /><b /></div>
          <div className="intro-word" aria-hidden="true">VITALIZE</div>
          <p>Naturalidade · Individualidade · Propósito</p>
          <span className="intro-progress" aria-hidden="true" />
        </div>
      )}
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Vitalize — início">
          <Image src="/images/instagram/vitalize-instagram-10.jpg" alt="Vitalize" width={150} height={150} />
          <span>Estética Avançada</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#filosofia">Filosofia</a><a href="#tratamentos">Tratamentos</a><a href="#bruna">Bruna Vitali</a>
        </nav>
        <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">Agendar avaliação <Arrow diagonal /></a>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Estética avançada · Criciúma</p>
            <h1 id="hero-title">Beleza que ainda parece <em>sua.</em></h1>
            <p className="hero-lead">Cuidado facial e corporal pensado a partir da sua individualidade — com escuta, intenção e naturalidade.</p>
            <div className="hero-actions">
              <a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">Agendar uma avaliação <Arrow /></a>
              <a className="text-link" href="#tratamentos">Conhecer os tratamentos</a>
            </div>
            <p className="hero-footnote">Atendimento personalizado com Bruna Vitali, Biomédica Esteta.</p>
          </div>

          <div className="hero-visual" aria-label="Bruna Vitali, profissional da Vitalize">
            <div className="portrait-shell">
              <Image src="/images/instagram/vitalize-instagram-11.jpg" alt="Bruna Vitali em retrato profissional" width={384} height={640} priority />
              <span className="portrait-line line-one" /><span className="portrait-line line-two" />
            </div>
            <p className="portrait-caption"><span>01</span> Naturalidade não é ausência de cuidado.</p>
            <div className="butterfly-mark" aria-hidden="true"><i /><i /></div>
          </div>
          <p className="hero-manifesto" aria-hidden="true">NATURALIDADE · INDIVIDUALIDADE · PROPÓSITO</p>
        </section>

        <section className="philosophy" id="filosofia">
          <p className="section-number">01 — Filosofia</p>
          <div className="philosophy-copy">
            <h2>Você não precisa caber em um padrão.</h2>
            <p>Na Vitalize, a estética começa antes do procedimento. Começa ao entender o que você percebe, o que deseja preservar e o que faz sentido para a sua rotina.</p>
          </div>
          <blockquote><span>“</span> Beleza com propósito.<cite>— Vitalize Estética Avançada</cite></blockquote>
        </section>

        <section className="story" ref={storyRef} aria-labelledby="story-title">
          <div className="story-sticky">
            <div className="story-copy">
              <p className="section-number">02 — Uma escolha individual</p>
              <h2 id="story-title">Primeiro, a pessoa.<br />Depois, o protocolo.</h2>
              <p>A avaliação conecta queixa, expectativa e possibilidades. É ela que orienta uma proposta coerente — nunca uma fórmula pronta.</p>
              <a className="text-link light" href={whatsapp} target="_blank" rel="noreferrer">Conversar sobre meu objetivo <Arrow diagonal /></a>
            </div>
            <div className="story-orbit" aria-hidden="true">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
              <div className="story-portrait"><Image src="/images/instagram/vitalize-instagram-12.jpg" alt="" width={384} height={640} /></div>
              <span className="orbit-label label-a">Escuta</span><span className="orbit-label label-b">Estratégia</span><span className="orbit-label label-c">Naturalidade</span>
            </div>
          </div>
        </section>

        <section className="treatments" id="tratamentos" aria-labelledby="treatments-title">
          <div className="treatments-heading">
            <p className="section-number">03 — Possibilidades de cuidado</p>
            <h2 id="treatments-title">Tratamentos que partem de uma boa avaliação.</h2>
            <p>Procedimentos divulgados pela Vitalize. A indicação depende das necessidades individuais.</p>
          </div>

          <div className="treatment-system">
            <div className="treatment-nav" role="tablist" aria-label="Categorias de tratamento">
              {treatments.map((item, index) => (
                <button key={item.id} id={`${item.id}-tab`} role="tab" aria-selected={activeTreatment === index} aria-controls="treatment-panel" onClick={() => setActiveTreatment(index)}>
                  <span>{item.index}</span><strong>{item.title}</strong><Arrow />
                </button>
              ))}
            </div>

            <div className="treatment-panel" id="treatment-panel" role="tabpanel" aria-labelledby={`${active.id}-tab`} key={active.id}>
              <div className="treatment-image"><Image src={active.image} alt={active.alt} width={640} height={640} /><span>{active.index}</span></div>
              <div className="treatment-details"><h3>{active.title}</h3><p>{active.note}</p><ul>{active.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </div>
        </section>

        <section className="about" id="bruna" aria-labelledby="about-title">
          <div className="about-image">
            <Image src="/images/instagram/vitalize-instagram-15.jpg" alt="Bruna Vitali durante planejamento profissional" width={640} height={640} />
            <p>Bruna Vitali<br /><span>Biomédica Esteta</span></p>
          </div>
          <div className="about-copy">
            <p className="section-number">04 — Por trás da Vitalize</p>
            <h2 id="about-title">Técnica para orientar. Sensibilidade para reconhecer limites.</h2>
            <p>A Vitalize apresenta Bruna Vitali como a profissional à frente dos atendimentos. Sua comunicação coloca a naturalidade, a individualidade e o planejamento como parte central da experiência.</p>
            <div className="about-principles"><span><i>01</i> Escuta individual</span><span><i>02</i> Planejamento responsável</span><span><i>03</i> Acompanhamento</span></div>
          </div>
        </section>

        <section className="process" aria-labelledby="process-title">
          <p className="section-number">05 — Sua experiência</p>
          <h2 id="process-title">Um caminho claro, sem decisões apressadas.</h2>
          <ol>
            <li><span>01</span><strong>Conversa inicial</strong><p>Você compartilha o que incomoda, o que deseja e suas dúvidas.</p></li>
            <li><span>02</span><strong>Avaliação</strong><p>Características e possibilidades são analisadas de forma individual.</p></li>
            <li><span>03</span><strong>Plano de cuidado</strong><p>A indicação é explicada com clareza antes de qualquer procedimento.</p></li>
          </ol>
        </section>

        <section className="visit" id="contato" aria-labelledby="visit-title">
          <div className="visit-heading"><p className="section-number">06 — Visite a Vitalize</p><h2 id="visit-title">Seu momento começa aqui.</h2></div>
          <div className="visit-details">
            <address>Ed. Millenium Saúde Center<br />Rua Cel. Pedro Benedet, 505 · sala 503<br />Centro · Criciúma, SC</address>
            <a href="https://www.google.com/maps/search/?api=1&query=Rua+Coronel+Pedro+Benedet+505+Sala+503+Criciuma+SC" target="_blank" rel="noreferrer">Abrir no mapa <Arrow diagonal /></a>
          </div>
          <a className="visit-action" href={whatsapp} target="_blank" rel="noreferrer"><span>Quero agendar minha avaliação</span><Arrow diagonal /></a>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#inicio"><Image src="/images/instagram/vitalize-instagram-10.jpg" alt="" width={150} height={150} /><span>Vitalize Estética Avançada</span></a>
        <p>Atendimento facial e corporal personalizado em Criciúma.</p>
        <a href="https://www.instagram.com/esteticavitalize/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <small>Procedimentos estéticos requerem avaliação individual. Resultados podem variar.</small>
      </footer>

      <a className="mobile-action" href={whatsapp} target="_blank" rel="noreferrer">Agendar avaliação <Arrow /></a>
    </>
  );
}
