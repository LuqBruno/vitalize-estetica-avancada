'use client';
import { useState } from 'react';
import Image from 'next/image';
const assetBase = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true' ? '/vitalize-estetica-avancada' : '';
const asset = (path: string) => `${assetBase}${path}`;
type Props = { whatsapp: string };
const treatments = [
  {title:'Estética facial',image:'facial',description:'Cuidado para expressão, contorno e qualidade da pele, com indicação individual.',procedures:['Toxina botulínica','Preenchimento','Bioestimulador','Lavieen']},
  {title:'Estética corporal',image:'body',description:'Possibilidades de cuidado corporal pensadas para seus objetivos.',procedures:['Glúteos','Ultraformer']},
  {title:'Cuidado capilar',image:'hair',description:'Uma avaliação para entender as possibilidades de cuidado capilar.',procedures:['Capilar']},
];
function Arrow(){return <span className="arrow" aria-hidden="true">→</span>}
function Wing({className=''}:{className?:string}){return <Image className={className} src={asset('/images/brand/wing.png')} alt="" width={500} height={750}/>}
export default function VitalizeExperience({whatsapp}:Props){
 const [menuOpen,setMenuOpen]=useState(false);
 const closeMenu=()=>setMenuOpen(false);
 return <>
 <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
 <header className="site-header">
  <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Vitalize Estética Avançada — início"><Image src={asset('/images/brand/vitalize-logo.png')} alt="Vitalize Estética Avançada" width={240} height={120} priority/></a>
  <nav className={menuOpen?'is-open':''} id="site-nav" aria-label="Navegação principal"><a href="#filosofia" onClick={closeMenu}>Filosofia</a><a href="#tratamentos" onClick={closeMenu}>Tratamentos</a><a href="#bruna" onClick={closeMenu}>Bruna Vitali</a><a href="#contato" onClick={closeMenu}>Contato</a></nav>
  <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">Agendar avaliação</a>
  <button className="menu-toggle" type="button" aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} aria-controls="site-nav" onClick={()=>setMenuOpen(!menuOpen)}><span/><span/><span/></button>
 </header>
 <main id="conteudo">
  <section className="hero" id="inicio" aria-labelledby="hero-title">
   <div className="hero-copy"><p className="eyebrow">Criciúma · SC</p><h1 id="hero-title">Beleza que<br/>ainda parece<br/><em>sua.</em></h1><p className="hero-lead">Estética avançada para realçar o que faz você única, com naturalidade, ciência e um olhar humano.</p><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">Agendar uma avaliação <Arrow/></a><p className="hero-signature">Beleza real<br/>vive bem aqui</p></div>
   <Image className="hero-person" src={asset('/images/brand/bruna-hero.png')} alt="Retrato de Bruna Vitali" width={941} height={1672} priority sizes="(max-width: 700px) 100vw, 55vw"/><Wing className="hero-wing"/><p className="hero-caption">Bruna Vitali <span>Estética Avançada · Criciúma</span></p>
  </section>
  <section className="philosophy" id="filosofia" aria-labelledby="philosophy-title"><Wing className="philosophy-wing"/><div className="philosophy-copy"><h2 id="philosophy-title">Você não precisa<br/>caber em um padrão.<br/><em>“Beleza com propósito.”</em></h2><p>Aqui, cada pessoa é ouvida, respeitada e cuidada em sua individualidade. A beleza começa ao reconhecer, com naturalidade, o que faz sentido para você.</p><span className="fine-line"/><p className="eyebrow">Cuidar também<br/>é se reconhecer</p></div></section>
  <section className="story" aria-labelledby="story-title"><div className="story-copy"><h2 id="story-title">Primeiro, a pessoa.<br/>Depois, o protocolo.</h2><p>Mais do que técnicas, acreditamos em escuta, planejamento e caminhos que respeitam seu tempo, sua história e seus objetivos.</p><span className="fine-line"/><p className="eyebrow">Estética avançada<br/>com alma humana</p></div><Wing className="story-wing"/></section>
  <section className="treatments" id="tratamentos" aria-labelledby="treatments-title"><div className="treatments-intro"><p className="eyebrow">Tratamentos</p><h2 id="treatments-title">Tratamentos que<br/>partem de uma<br/><em>boa avaliação.</em></h2><p>Protocolos personalizados que respeitam sua individualidade e seus objetivos, sempre com um olhar humano.</p></div><p className="treatments-motto">Ciência<br/>Naturalidade<br/>Resultados reais</p><Wing className="treatments-wing"/><div className="treatment-list">{treatments.map(item=><a className="treatment-row" href={whatsapp} target="_blank" rel="noreferrer" key={item.title}><span className="treatment-icon"><Image src={asset(`/images/brand/${item.image}.png`)} alt="" width={92} height={92}/></span><span className="treatment-info"><strong>{item.title}</strong><span className="treatment-description">{item.description}</span><span className="procedure-list">{item.procedures.map((p,i)=><span key={p}>{i>0&&<i>·</i>}{p}</span>)}</span></span><Arrow/></a>)}</div></section>
  <section className="about" id="bruna" aria-labelledby="about-title"><Image className="about-person" src={asset('/images/brand/bruna-about.png')} alt="Bruna Vitali" width={1122} height={1402} sizes="(max-width: 700px) 100vw, 55vw"/><div className="about-copy"><p className="about-name">Bruna Vitali <span>Estética avançada · em Criciúma</span></p><h2 id="about-title">Técnica para orientar.<br/>Sensibilidade para reconhecer limites.</h2><p>A Vitalize apresenta Bruna Vitali como a profissional à frente dos atendimentos. Sua comunicação coloca a naturalidade, a individualidade e o planejamento no centro da experiência.</p><a className="outline-button" href={whatsapp} target="_blank" rel="noreferrer">Agendar avaliação <Arrow/></a></div><Wing className="about-wing"/></section>
  <section className="process" aria-labelledby="process-title"><div className="process-content"><h2 id="process-title">Um caminho claro,<br/>sem decisões apressadas.</h2><ol><li><span>1</span><div><strong>Conversa inicial</strong><p>Você compartilha o que deseja, sua história e suas dúvidas.</p></div></li><li><span>2</span><div><strong>Avaliação individual</strong><p>Características e possibilidades são analisadas com atenção.</p></div></li><li><span>3</span><div><strong>Plano de cuidado</strong><p>As opções são explicadas com clareza antes de qualquer procedimento.</p></div></li></ol></div><p className="process-motto">Planejamento<br/>Confiança<br/>Beleza real</p><Wing className="process-wing"/></section>
  <section className="visit" id="contato" aria-labelledby="visit-title"><div className="visit-copy"><p className="eyebrow">Visite nosso espaço</p><h2 id="visit-title">Estética avançada<br/>em Criciúma.</h2><address>Ed. Millenium Saúde Center<br/>Rua Cel. Pedro Benedet, 505 · sala 503<br/>Centro · Criciúma, SC</address><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">Agendar avaliação <Arrow/></a><p className="eyebrow visit-tag">Beleza real<br/>vive bem aqui</p></div><div className="visit-brand"><Image src={asset('/images/brand/vitalize-logo.png')} alt="Vitalize Estética Avançada" width={380} height={190}/><p>Cuidado que começa pela escuta.</p></div></section>
 </main>
 <footer><a href="#inicio" aria-label="Voltar ao início"><Image src={asset('/images/brand/vitalize-logo.png')} alt="Vitalize Estética Avançada" width={145} height={75}/></a><p>© {new Date().getFullYear()} Vitalize Estética Avançada</p><a href="https://www.instagram.com/esteticavitalize/" target="_blank" rel="noreferrer">Instagram ↗</a><small>Procedimentos requerem avaliação individual. Resultados podem variar.</small></footer>
 </>;
}
