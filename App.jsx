import { useEffect, useState } from 'react';

const WA = 'https://wa.me/5491122419299?text=Hola%20Debora%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20servicios';
const AGENDA = 'https://nerini.ar/agenda';

const problemas = [
  { icon:'network', titulo:'Diferentes proveedores. Diferentes estrategias.', detalle:'Cada proveedor ejecuta su área sin una estrategia integral que los coordine.' },
  { icon:'person', titulo:'El marketing lo planificás vos.', detalle:'La planificación y ejecución dependen de tu disponibilidad permanente.' },
  { icon:'chart', titulo:'Invertís sin medir el retorno.', detalle:'Reportes aislados de cada proveedor, sin un tablero que muestre el resultado conjunto.' },
  { icon:'target', titulo:'Los leads no tienen seguimiento.', detalle:'No hay registro de origen ni proceso definido para convertirlos en oportunidades de venta.' },
];
const etapas = [
  { n:'01', title:'Presencia', content:'Sitio web · Instagram · LinkedIn' },
  { n:'02', title:'Crecimiento', content:'Meta Ads · Google Ads' },
  { n:'03', title:'Nutrición', content:'Email marketing · flujos de seguimiento' },
];
function Icon({name, size=26}) {
  const base = {width:size,height:size,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true};
  const shapes = {
    network:<><circle cx="5" cy="12" r="2.5"/><circle cx="18" cy="5" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M7.3 10.9L15.7 6.2M7.3 13.1l8.4 4.7"/></>,
    person:<><circle cx="12" cy="7" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></>,
    chart:<><path d="M3 20h18M4 16l5-6 5 3 6-8"/></>,
    target:<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v18M3 12h18"/></>,
    arrow:<><path d="M4 12h16m-6-6 6 6-6 6"/></>,
  };
  return <svg {...base}>{shapes[name] || shapes.arrow}</svg>;
}
function Brand({inverse=false}) { return <img className="brand-img" src={inverse?'/nerini-logo-inverso.png':'/nerini-logo-oficial.png'} alt="NERINI Marketing" />; }

function ServiceWheel(){
  return <div className="wheel-wrap" aria-label="Servicio integral: presencia, crecimiento y nutrición, con redes, pauta, sitio, email y CRM transversal">
    <div className="wheel-ring">
      <svg className="wheel-arcs" viewBox="0 0 600 600" aria-hidden="true">
        <path d="M93 492 A258 258 0 0 1 300 42" stroke="#6B1F2A" strokeWidth="42" fill="none" />
        <path d="M302 42 A258 258 0 0 1 544 388" stroke="#A0714A" strokeWidth="42" fill="none" />
        <path d="M544 390 A258 258 0 0 1 95 495" stroke="#C9BFBA" strokeWidth="42" fill="none" />
        <path id="presencia-path" d="M105 478 A244 244 0 0 1 288 57" fill="none" />
        <path id="crecimiento-path" d="M320 58 A244 244 0 0 1 536 370" fill="none" />
        <path id="nutricion-path" d="M505 443 A244 244 0 0 1 118 474" fill="none" />
        <text className="arc-type"><textPath href="#presencia-path" startOffset="27%">PRESENCIA</textPath></text>
        <text className="arc-type"><textPath href="#crecimiento-path" startOffset="18%">CRECIMIENTO</textPath></text>
        <text className="arc-type"><textPath href="#nutricion-path" startOffset="27%">NUTRICIÓN</textPath></text>
      </svg>
      <div className="wheel-interior">
        <div className="wheel-quadrant"><strong>Redes<br/>sociales</strong><small>Instagram + LinkedIn</small></div>
        <div className="wheel-quadrant"><strong>Pauta<br/>digital</strong><small>Meta Ads + Google Ads</small></div>
        <div className="wheel-quadrant"><strong>Sitio<br/>web</strong><small>Estructura + medición</small></div>
        <div className="wheel-quadrant"><strong>Email<br/>marketing</strong><small>Envíos + secuencias</small></div>
      </div>
      <div className="wheel-crm"><b>CRM</b><span>Sistema centralizado</span><small>Clientify</small></div>
    </div>
  </div>;
}

export default function NeriniWeb(){
  const [open,setOpen] = useState(false);
  useEffect(()=>{ document.title='NERINI | Departamento Externo de Marketing'; },[]);
  return <div className="nerini-site" id="inicio">
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');
      :root{--bordo:#6B1F2A;--tinta:#3A1A1F;--cuero:#A0714A;--gris:#6B6660;--linea:#E8E2D9;--malva:#DFD6E1;--blanco:#fff}
      *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0}button,a{font:inherit}
      .nerini-site{font-family:'DM Sans',Arial,sans-serif;color:var(--tinta);background:#fff;line-height:1.55;overflow:hidden}
      .nerini-site a{text-decoration:none}.container{width:min(1160px,calc(100% - 64px));margin:auto}
      .nav{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.97);border-bottom:1px solid var(--linea)}
      .nav-inner{display:flex;align-items:center;justify-content:space-between;gap:28px;min-height:92px}
      .brand-img{width:180px;max-width:100%;height:auto;display:block}
      .nav-links{display:flex;align-items:center;gap:30px}.nav-links>a:not(.button){font-size:13px;color:var(--tinta)}
      .button{display:inline-flex;align-items:center;justify-content:center;gap:12px;background:var(--bordo);color:white;padding:13px 24px;border:1px solid var(--bordo);font-size:13px;font-weight:600;transition:background .2s}
      .button:hover{background:#541821}.button-outline{background:white;color:var(--bordo)}.button-outline:hover{background:#faf5f2}
      .menu-toggle{display:none;background:none;border:0;color:var(--bordo);font-size:25px;cursor:pointer}
      .section{padding:86px 0;border-bottom:1px solid var(--linea);scroll-margin-top:92px}.eyebrow{color:var(--cuero);font-size:11px;font-weight:700;letter-spacing:.19em;text-transform:uppercase}
      h1,h2,h3,p{margin-top:0}h1,h2,.serif{font-family:'Playfair Display',Georgia,serif;font-weight:500;letter-spacing:-.035em}
      h1{font-size:clamp(43px,5.7vw,78px);line-height:1.15;color:var(--bordo);max-width:1000px;margin:28px 0}
      h2{font-size:clamp(36px,4vw,54px);line-height:1.18;color:var(--bordo);margin:0 0 22px}
      .lead{font-family:'DM Sans',sans-serif;font-size:clamp(17px,1.7vw,21px);line-height:1.7;color:var(--gris);max-width:900px}
      .hero{padding:76px 0 84px;position:relative}.hero .container{position:relative}.hero .lead{max-width:890px}
      .hero-top{display:flex;justify-content:space-between;align-items:center;gap:20px}.hero-rule{width:54px;height:1px;background:var(--malva);transform:rotate(-52deg)}
      .hero-actions{display:flex;align-items:center;gap:23px;flex-wrap:wrap;margin-top:32px}.quiet{font-size:13px;color:var(--gris)}
      .section-top{max-width:860px;margin-bottom:42px}.section-top h2{margin-top:12px}
      .problem-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--linea);border-bottom:1px solid var(--linea)}
      .problem{padding:32px 24px 36px;border-right:1px solid var(--linea);min-width:0}.problem:first-child{padding-left:0}.problem:last-child{border-right:0}
      .problem svg{color:var(--cuero);margin-bottom:21px}.problem h3{font-size:18px;line-height:1.4;font-weight:600;margin:0 0 14px}.problem p{font-size:14px;line-height:1.75;color:var(--gris);margin:0}
      .service-section{text-align:center}.service-section .section-top{margin-left:auto;margin-right:auto}.service-section .lead{margin:0 auto}
      .wheel-wrap{display:flex;justify-content:center;max-width:680px;margin:40px auto 10px}.wheel-ring{width:min(610px,100%);aspect-ratio:1;position:relative}
      .wheel-arcs{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.arc-type{fill:#fff;letter-spacing:4px;font-size:17px;font-family:'DM Sans',sans-serif}
      .wheel-interior{position:absolute;inset:13%;border:1px solid var(--linea);border-radius:50%;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;background:white}
      .wheel-quadrant{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:26px 9px;gap:9px}.wheel-quadrant:nth-child(odd){border-right:1px solid var(--linea)}.wheel-quadrant:nth-child(-n+2){border-bottom:1px solid var(--linea)}
      .wheel-quadrant strong{font-family:'Playfair Display',Georgia,serif;font-size:clamp(16px,2.8vw,28px);line-height:1.08;font-weight:500;color:var(--bordo)}.wheel-quadrant:nth-child(2) strong,.wheel-quadrant:nth-child(3) strong{color:var(--cuero)}
      .wheel-quadrant small{font-size:clamp(8px,1.3vw,12px);color:var(--gris)}
      .wheel-crm{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:27%;aspect-ratio:1;border-radius:50%;background:white;border:1px solid var(--malva);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1px}
      .wheel-crm b{font-family:'Playfair Display',Georgia,serif;font-size:clamp(18px,3.2vw,35px);font-weight:500}.wheel-crm span{font-size:clamp(7px,1vw,11px);line-height:1.25;color:var(--gris)}.wheel-crm small{font-weight:700;color:var(--bordo);font-size:clamp(10px,1.6vw,18px)}
      .stages{border-top:1px solid var(--linea);display:grid;grid-template-columns:repeat(3,1fr);margin-top:50px;text-align:left}.stage{padding:25px 28px;border-right:1px solid var(--linea)}.stage:last-child{border-right:0}.stage:first-child{padding-left:0}.stage-number{font-size:12px;letter-spacing:.1em;color:var(--cuero)}.stage h3{font-size:19px;font-weight:600;margin:12px 0 4px}.stage p{font-size:13px;color:var(--gris);margin:0}
      .bio-layout{display:grid;grid-template-columns:220px minmax(0,1.2fr) minmax(235px,.8fr);gap:44px;align-items:center}.portrait-wrap{position:relative;overflow:hidden;border-radius:50%;aspect-ratio:1;background:#fff}
      .portrait{width:100%;height:100%;object-fit:cover;object-position:center 29%;display:block}
      .bio-heading{font-family:'Playfair Display',Georgia,serif;color:var(--bordo);font-size:clamp(38px,4vw,58px);margin:0 0 2px;font-weight:500}.bio-role{font-family:'Playfair Display',Georgia,serif;font-size:27px;color:var(--cuero);margin:0 0 24px}
      .bio-credentials{font-size:15px;color:var(--gris);padding-top:18px;border-top:1px solid var(--linea);margin-bottom:22px}.bio-text{max-width:600px;color:var(--gris);font-size:16px;line-height:1.8}
      .bio-contact{border-left:1px solid var(--malva);padding-left:32px;align-self:stretch;display:flex;flex-direction:column;justify-content:center}.bio-contact h3{font-family:'Playfair Display',Georgia,serif;color:var(--bordo);font-size:clamp(26px,2.5vw,36px);font-weight:500;line-height:1.18;margin:0 0 15px}.bio-contact p{color:var(--gris);font-size:14px;margin:0 0 18px}.bio-contact a{color:var(--tinta);font-size:14px;display:block;overflow-wrap:anywhere;margin-bottom:12px}.bio-contact a:hover{color:var(--bordo)}.tracking-layout{display:grid;grid-template-columns:1fr 1fr;gap:28px}.tracking-card{border:1px solid var(--linea);padding:28px}.tracking-card h3{font-size:16px;margin:0 0 18px}.tracking-card ul{margin:0;padding:0;list-style:none}.tracking-card li{padding:10px 0;border-top:1px solid var(--linea);color:var(--gris);font-size:14px}
      .tracking-bar{margin-top:20px;padding:28px 30px;background:#fff;border:1px solid var(--linea);border-left:4px solid var(--bordo);display:flex;justify-content:space-between;gap:25px;align-items:center}.tracking-bar strong{font-size:19px;font-weight:600}.tracking-bar span{font-size:14px;color:var(--gris)}
      .contact{padding:80px 0;background:#fff;color:var(--tinta);border-bottom:1px solid var(--linea);text-align:center}.contact h2{color:var(--bordo);max-width:980px;margin:16px auto 26px}.contact p{color:var(--gris);font-size:17px;margin-bottom:25px}.contact .button{background:var(--bordo);color:white;border-color:var(--bordo)}.contact .button:hover{background:#541821}
      .footer{background:#fff;padding:32px 0;border-top:1px solid var(--linea)}.footer-inner{display:flex;align-items:center;justify-content:space-between;gap:30px;flex-wrap:wrap}.footer-contact{display:flex;gap:25px;flex-wrap:wrap}.footer-contact a{color:var(--gris);font-size:13px}.copyright{font-size:11px;color:var(--gris);margin-top:22px}
      .wa-float{position:fixed;right:22px;bottom:22px;z-index:30;background:var(--bordo);color:white;width:52px;height:52px;display:flex;align-items:center;justify-content:center;border-radius:50%;box-shadow:0 4px 20px #6b1f2a30;font-size:20px;font-weight:700}
      @media(max-width:850px){.container{width:min(100% - 40px,1160px)}.nav-inner{min-height:74px}.brand-img{width:145px}.menu-toggle{display:block}.nav-links{display:none;position:absolute;top:73px;left:0;right:0;background:#fff;padding:22px 20px;border-bottom:1px solid var(--linea);flex-direction:column;align-items:flex-start}.nav-links.open{display:flex}.hero{padding:70px 0}.problem-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.problem:nth-child(2){border-right:0}.problem:nth-child(-n+2){border-bottom:1px solid var(--linea)}.problem:nth-child(3){padding-left:0}.bio-layout{gap:30px;grid-template-columns:190px minmax(0,1fr)}.bio-contact{grid-column:2}.bio-role{font-size:22px}}
      @media(max-width:570px){.container{width:calc(100% - 36px)}.section{padding:58px 0}.hero{padding:57px 0 63px}.hero-top{align-items:flex-start}.hero .eyebrow{font-size:10px}h1{font-size:43px}.lead{font-size:16px}.problem-grid{grid-template-columns:1fr}.problem{padding:25px 0!important;border-right:0;border-bottom:1px solid var(--linea)}.problem:last-child{border-bottom:0}.wheel-wrap{margin:32px auto 0}.wheel-quadrant{padding:18px 3px;gap:3px}.wheel-quadrant strong{font-size:clamp(13px,4.1vw,21px)}.wheel-quadrant small{font-size:clamp(7px,2vw,10px);max-width:95%}.arc-type{font-size:20px;letter-spacing:3px}.stages{grid-template-columns:1fr;margin-top:32px}.stage{border-right:0;border-bottom:1px solid var(--linea);padding:17px 0}.bio-layout{grid-template-columns:1fr}.portrait-wrap{width:min(100%,240px)}.bio-contact{grid-column:1;padding:24px 0 0;border-left:0;border-top:1px solid var(--malva)}.bio-role{font-size:23px}.tracking-layout{grid-template-columns:1fr;gap:14px}.tracking-bar{flex-direction:column;align-items:flex-start}.footer-contact{flex-direction:column;gap:8px}.hero-actions{align-items:flex-start}}
      @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
    `}</style>
    <header className="nav"><div className="container nav-inner"><a href="#inicio" aria-label="NERINI inicio"><Brand/></a><button className="menu-toggle" aria-expanded={open} aria-label="Abrir menú" onClick={()=>setOpen(!open)}>☰</button><nav className={'nav-links'+(open?' open':'')}><a href="#servicio" onClick={()=>setOpen(false)}>Servicio integral</a><a href="#quien" onClick={()=>setOpen(false)}>Quién dirige</a><a href="#seguimiento" onClick={()=>setOpen(false)}>Seguimiento</a><a className="button button-outline" href={AGENDA} target="_blank" rel="noreferrer">Agendemos una llamada</a></nav></div></header>
    <main>
      <section className="hero"><div className="container"><div className="hero-top"><span className="eyebrow">ESTRATEGIA · EJECUCIÓN · MEDICIÓN</span><span className="hero-rule" aria-hidden="true"/></div><h1>Departamento Externo de Marketing</h1><p className="lead">Somos el Departamento Externo de Marketing de empresas de servicios sin equipo interno. Dirigimos la estrategia y ejecutamos redes, pauta, sitio y email marketing con nuestro equipo, bajo un mismo sistema de seguimiento y medición.</p><div className="hero-actions"><a className="button" href={AGENDA} target="_blank" rel="noreferrer">Coordinemos una llamada <Icon name="arrow" size={17}/></a><span className="quiet">Un equipo. Una dirección. Un sistema.</span></div></div></section>
      <section className="section" id="problemas"><div className="container"><div className="section-top"><div className="eyebrow">PUNTO DE PARTIDA</div><h2>Situaciones frecuentes</h2></div><div className="problem-grid">{problemas.map(p=><article className="problem" key={p.titulo}><Icon name={p.icon}/><h3>{p.titulo}</h3><p>{p.detalle}</p></article>)}</div></div></section>
      <section className="section service-section" id="servicio"><div className="container"><div className="section-top"><span className="eyebrow">UN SOLO DEPARTAMENTO</span><h2>Servicio integral</h2><p className="lead">Redes, pauta, sitio y email marketing bajo una misma dirección. Un sistema centralizado conecta los canales, registra cada contacto y permite hacer seguimiento y medir.</p></div><ServiceWheel/><div className="stages" aria-label="Etapas de puesta en marcha">{etapas.map(e=><div className="stage" key={e.n}><span className="stage-number">{e.n}</span><h3>{e.title}</h3><p>{e.content}</p></div>)}</div></div></section>
      <section className="section" id="quien"><div className="container bio-layout"><div className="portrait-wrap"><img className="portrait" src="/debora.png" alt="Fotografía original de Debora Nerini" loading="lazy" decoding="async"/></div><div><span className="eyebrow">QUIÉN DIRIGE</span><h2 className="bio-heading">Debora Nerini</h2><p className="bio-role">Directora de Marketing</p><p className="bio-credentials">Lic. en Comercialización (UADE) · Especialización en Marketing Digital (UBA) · 15 años en marketing y negocios en grandes empresas.</p><p className="bio-text">Dirijo el marketing de cada empresa: defino el plan, coordino las áreas con nuestro equipo de especialistas y respondo por el resultado.</p></div><aside className="bio-contact"><h3>Coordinemos una llamada</h3><p>Conversemos sobre tus objetivos y cómo podemos trabajar.</p><a href={AGENDA} target="_blank" rel="noreferrer">nerini.ar/agenda ↗</a><a href="mailto:debora@nerini.ar">debora@nerini.ar</a><a href={WA} target="_blank" rel="noreferrer">+54 9 11 2241 9299</a></aside></div></section>
      <section className="section" id="seguimiento"><div className="container"><div className="section-top"><span className="eyebrow">SISTEMA CENTRALIZADO</span><h2>Seguimiento y medición</h2><p className="lead">Integramos los canales de comunicación para que cada contacto tenga registro de origen, historial y seguimiento comercial.</p></div><div className="tracking-layout"><div className="tracking-card"><h3>Canales digitales</h3><ul>{['Redes sociales','Pauta digital','Sitio web','WhatsApp'].map(t=><li key={t}>{t}</li>)}</ul></div><div className="tracking-card"><h3>Canales offline</h3><ul>{['Eventos y ferias','Referidos'].map(t=><li key={t}>{t}</li>)}</ul></div></div><div className="tracking-bar"><strong>CRM · Sistema centralizado</strong><span>Registro de origen · automatizaciones · seguimiento · tablero de medición</span></div></div></section>
      <section className="contact" id="contacto"><div className="container"><span className="eyebrow">SIGUIENTE PASO</span><h2>Hagamos que el marketing impulse tu negocio.</h2><p>Conversemos sobre el marketing de tu empresa.</p><a href={AGENDA} className="button" target="_blank" rel="noreferrer">Ir a la agenda <Icon name="arrow" size={17}/></a></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-inner"><Brand/><div className="footer-contact"><a href="mailto:debora@nerini.ar">debora@nerini.ar</a><a href="https://nerini.ar">nerini.ar</a><a href={WA} target="_blank" rel="noreferrer">WhatsApp +54 9 11 2241 9299</a></div></div><div className="copyright">© 2026 NERINI · Departamento Externo de Marketing</div></div></footer>
    <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="Contacto por WhatsApp">✆</a>
  </div>;
}
