import { useEffect, useState } from 'react';

const WA = 'https://wa.me/5491122419299?text=Hola%20Debora%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20servicios';
const AGENDA = 'https://nerini.ar/agenda';

const problemas = [
  {
    icon: 'network',
    titulo: 'Diferentes proveedores. Diferentes estrategias.',
    detalle: 'Cada proveedor ejecuta su área sin una estrategia integral que los coordine.'
  },
  {
    icon: 'person',
    titulo: 'El marketing lo planificás vos.',
    detalle: 'La planificación y ejecución dependen de tu disponibilidad permanente.'
  },
  {
    icon: 'chart',
    titulo: 'Invertís sin medir el retorno.',
    detalle: 'Reportes aislados de cada proveedor, sin un tablero que muestre el resultado conjunto.'
  },
  {
    icon: 'target',
    titulo: 'Los leads no tienen seguimiento.',
    detalle: 'No hay registro de origen ni proceso definido para convertirlos en oportunidades de venta.'
  }
];

function Icon({ name, size = 24 }) {
  const base = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true
  };

  const shapes = {
    network: <><circle cx="5" cy="12" r="2.4"/><circle cx="18" cy="5" r="2.4"/><circle cx="18" cy="19" r="2.4"/><path d="M7.2 11l8.4-4.8M7.2 13l8.4 4.8"/></>,
    person: <><circle cx="12" cy="7" r="3.2"/><path d="M5.4 20.5c.8-3.5 3.4-5.5 6.6-5.5s5.8 2 6.6 5.5"/></>,
    chart: <><path d="M3 20h18"/><path d="M5 15l4.2-5 4.2 3 5.6-7"/></>,
    target: <><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.8"/><path d="M12 3.5v17M3.5 12h17"/></>,
    arrow: <><path d="M4 12h15"/><path d="M13 6l6 6-6 6"/></>,
    whatsapp: <><path d="M20 11.6c0 4.6-3.7 8.4-8.4 8.4-1.5 0-2.9-.4-4.1-1.1L3 20l1.2-4.3a8.2 8.2 0 0 1-1-4.1c0-4.6 3.7-8.4 8.4-8.4S20 7 20 11.6Z"/><path d="M9 8.8c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .5.3l.8 2c.1.2 0 .4-.1.5l-.4.5c-.1.1-.2.2-.1.4.2.4.7 1.1 1.6 1.7.9.7 1.6.9 2 .9.2 0 .3-.1.4-.2l.6-.7c.1-.1.3-.2.5-.1l1.8.8c.2.1.3.2.3.5v.4c0 .2-.1.5-.3.6-.4.4-1 .7-1.8.7-.7 0-1.4-.2-2.5-.7-1.2-.5-2.3-1.4-3.2-2.4-.8-1-1.4-2.1-1.6-2.7-.2-.8-.1-1.5.1-1.8Z"/></>
  };

  return <svg {...base}>{shapes[name] || shapes.arrow}</svg>;
}

function Brand() {
  return <img className="brand-img" src="/nerini-logo-oficial.png" alt="NERINI Marketing" />;
}

function ServiceWheel() {
  return (
    <div className="wheel-wrap" role="img" aria-label="Servicio integral con Presencia, Crecimiento y Nutrición; redes sociales, pauta digital, sitio web y email marketing bajo un CRM centralizado.">
      <div className="wheel-shell">
        <svg className="wheel-svg" viewBox="0 0 640 640" aria-hidden="true">
          <defs>
            <path id="arc-presencia" d="M 178 503 A 245 245 0 0 1 300 85" />
            <path id="arc-crecimiento" d="M 340 85 A 245 245 0 0 1 556 330" />
            <path id="arc-nutricion" d="M 540 364 A 245 245 0 0 1 200 535" />
          </defs>

          <path d="M 178 503 A 245 245 0 0 1 300 85" fill="none" stroke="#6B1F2A" strokeWidth="64" />
          <path d="M 340 85 A 245 245 0 0 1 556 330" fill="none" stroke="#A0714A" strokeWidth="64" />
          <path d="M 540 364 A 245 245 0 0 1 200 535" fill="none" stroke="#C9BFBA" strokeWidth="64" />

          <text className="wheel-arc-text"><textPath href="#arc-presencia" startOffset="54%" textAnchor="middle">PRESENCIA</textPath></text>
          <text className="wheel-arc-text"><textPath href="#arc-crecimiento" startOffset="58%" textAnchor="middle">CRECIMIENTO</textPath></text>
          <text className="wheel-arc-text"><textPath href="#arc-nutricion" startOffset="52%" textAnchor="middle">NUTRICIÓN</textPath></text>
        </svg>

        <div className="wheel-core">
          <div className="wheel-grid">
            <div className="quad q-presencia">
              <strong>Redes<br/>sociales</strong>
              <small>Instagram · LinkedIn</small>
            </div>
            <div className="quad q-crecimiento">
              <strong>Pauta<br/>digital</strong>
              <small>Meta Ads · Google Ads</small>
            </div>
            <div className="quad q-presencia">
              <strong>Sitio<br/>web</strong>
              <small>Estructura · medición</small>
            </div>
            <div className="quad q-nutricion">
              <strong>Email<br/>marketing</strong>
              <small>Envíos · secuencias</small>
            </div>
          </div>
          <div className="crm-center">
            <b>CRM</b>
            <span>Sistema centralizado</span>
            <img className="clientify-logo" src="/clientify.png" alt="Clientify" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NeriniWeb() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.title = 'NERINI | Departamento Externo de Marketing';
  }, []);

  return (
    <div className="nerini-site" id="inicio">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');

        :root{
          --bordo:#6B1F2A;
          --tinta:#3A1A1F;
          --cuero:#A0714A;
          --gris:#6B6660;
          --linea:#E8E2D9;
          --malva:#DFD6E1;
          --malva-fondo:#F2ECF2;
          --gris-arena:#C9BFBA;
        }

        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;background:#fff}
        a{text-decoration:none;color:inherit}
        button{font:inherit}

        .nerini-site{font-family:'Raleway',Arial,sans-serif;color:var(--tinta);background:#fff;line-height:1.55;overflow-x:hidden}
        .container{width:min(1180px,calc(100% - 80px));margin:0 auto}
        h1,h2,h3,p{margin-top:0}
        h1,h2{font-family:'Playfair Display',Georgia,serif;font-weight:500;letter-spacing:-.035em}
        .eyebrow{display:block;color:#8B5F3D;font-size:11px;font-weight:700;letter-spacing:.19em;text-transform:uppercase}

        .nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);border-bottom:1px solid var(--linea);backdrop-filter:saturate(140%) blur(6px)}
        .nav-inner{min-height:82px;display:flex;align-items:center;justify-content:space-between;gap:26px}
        .brand-img{width:145px;height:auto;display:block}
        .nav-links{display:flex;align-items:center;gap:28px}.nav-links>a:not(.button){font-size:13px;color:var(--tinta)}
        .menu-toggle{display:none;border:0;background:none;color:var(--bordo);font-size:24px;cursor:pointer}

        .button{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--bordo);color:#fff;border:1px solid var(--bordo);border-radius:22px;padding:13px 23px;font-size:13px;font-weight:600;transition:.2s ease}
        .button:hover{background:#541821}.button-outline{background:#fff;color:var(--bordo)}.button-outline:hover{background:#faf6f6}

        .section{padding:108px 0;border-bottom:1px solid var(--linea);scroll-margin-top:92px}
        .section-top{max-width:900px;margin-bottom:42px}.section-top h2{margin:10px 0 18px;color:var(--bordo);font-size:clamp(38px,4vw,56px)}
        .lead{font-size:17px;line-height:1.75;color:var(--gris);max-width:760px}

        .hero{position:relative;min-height:610px;padding:110px 0 108px;background:#fff;border-bottom:1px solid var(--linea);overflow:hidden}
        .hero .container{position:relative;z-index:2}.hero-top{display:flex;align-items:center;justify-content:space-between;gap:20px;max-width:560px}.hero-rule{width:110px;height:1px;background:var(--malva);transform:rotate(-48deg);opacity:.65}
        .hero h1{font-size:clamp(48px,5.1vw,72px);line-height:1.06;color:var(--bordo);max-width:610px;margin:24px 0 20px}
        .hero .lead{max-width:560px}.hero-actions{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:30px}
        .hero-photo{position:absolute;right:0;top:0;bottom:0;width:44%;background:linear-gradient(rgba(255,255,255,.18),rgba(255,255,255,.18)),linear-gradient(140deg,rgba(223,214,225,.18),rgba(255,255,255,.1)),url('/equipo-referencia.jpg') center/cover no-repeat;clip-path:polygon(13% 0,100% 0,100% 100%,0 100%)}

        .problems-heading{max-width:760px;margin-bottom:38px}
        .problems-heading h2{font-size:clamp(38px,4.1vw,54px);line-height:1.12;color:var(--bordo);margin:0}
        .problem-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--linea);border-bottom:1px solid var(--linea)}
        .problem{padding:34px 28px 34px;border-right:1px solid var(--linea);min-width:0}.problem:first-child{padding-left:0}.problem:last-child{border-right:0}
        .problem svg{color:var(--cuero);margin-bottom:22px}.problem h3{font-size:17px;line-height:1.45;font-weight:600;margin:0 0 14px}.problem p{font-size:14px;line-height:1.7;color:var(--gris);margin:0}

        .service-section{text-align:center}.service-section .section-top{margin-left:auto;margin-right:auto;margin-bottom:44px}.service-section .lead{margin:0 auto}
        .wheel-wrap{display:flex;justify-content:center;margin-top:8px}
        .wheel-shell{position:relative;width:min(590px,calc(100vw - 44px));aspect-ratio:1}
        .wheel-svg{position:absolute;inset:0;width:100%;height:100%;z-index:0;overflow:visible}
        .wheel-arc-text{fill:#fff;font-family:'Raleway',Arial,sans-serif;font-size:15px;font-weight:700;letter-spacing:2.2px}
        .wheel-core{position:absolute;inset:14%;border:1px solid var(--linea);border-radius:50%;overflow:hidden;background:#fff;z-index:1}
        .wheel-grid{width:100%;height:100%;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}
        .quad{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:14px 8px}
        .quad:nth-child(odd){border-right:1px solid var(--linea)}.quad:nth-child(-n+2){border-bottom:1px solid var(--linea)}
        .quad strong{font-family:'Playfair Display',Georgia,serif;font-size:clamp(18px,2vw,29px);line-height:1.04;font-weight:500}
        .q-presencia strong{color:var(--bordo)}
        .q-crecimiento strong{color:var(--cuero)}
        .q-nutricion strong{color:#8E7F79}
        .quad small{font-size:clamp(9px,.95vw,12px);color:var(--gris)}
        .crm-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:26%;aspect-ratio:1;border-radius:50%;background:#fff;border:1px solid var(--malva);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;z-index:2;padding:8px}
        .crm-center b{font-family:'Playfair Display',Georgia,serif;font-size:clamp(24px,3vw,38px);font-weight:500;color:var(--bordo)}
        .crm-center span{font-size:clamp(7px,.8vw,11px);color:var(--gris);text-align:center;line-height:1.2}
        .clientify-logo{width:82%;max-height:26%;object-fit:contain;display:block;border-radius:0}

        #quien .bio-layout{max-width:1000px;display:grid;grid-template-columns:220px minmax(0,1fr);gap:64px;align-items:center}
        .portrait-wrap{width:220px;aspect-ratio:1;border-radius:50%;overflow:hidden;background:#fff}.portrait{width:100%;height:100%;object-fit:cover;object-position:center 29%;display:block}
        .bio-heading{font-size:clamp(42px,4.1vw,56px);color:var(--bordo);margin:8px 0 2px}.bio-role{font-family:'Playfair Display',Georgia,serif;font-size:28px;color:var(--cuero);margin:0 0 22px}
        .bio-credentials{font-size:15px;color:var(--gris);padding-top:18px;border-top:1px solid var(--linea);margin-bottom:18px}.bio-text{font-size:16px;color:var(--gris);line-height:1.75;max-width:640px}

        .footer{border-top:0}.footer-feature{background:linear-gradient(116deg,#F1ECF2 0%,#F1ECF2 50%,#FFFFFF 50.2%,#FFFFFF 100%);padding:88px 0 86px}
        .footer-feature-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:84px;align-items:center}
        .footer-message h2{font-size:clamp(40px,4.25vw,60px);line-height:1.12;color:var(--bordo);margin:0 0 20px;max-width:620px}.footer-message p{font-size:17px;color:var(--gris);margin:0 0 24px}
        .footer-cta{border-left:1px solid #C8BCCC;padding-left:60px}.footer-cta h2{font-size:clamp(31px,3vw,42px);line-height:1.2;color:var(--bordo);margin:0 0 14px}.footer-cta p{font-size:14px;color:var(--gris);margin:0 0 24px}
        .footer-contact{display:flex;flex-direction:column;align-items:flex-start;gap:14px}.footer-contact a{font-size:15px;color:var(--tinta);overflow-wrap:anywhere}
        .footer-bottom{background:#fff;border-top:1px solid var(--linea);padding:26px 0}.footer-inner{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}.footer-bottom .brand-img{width:125px}.copyright,.footer-bottom a{font-size:12px;color:var(--gris)}

        .wa-float{position:fixed;right:24px;bottom:24px;z-index:40;width:68px;height:68px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#25D366;color:#fff;box-shadow:0 12px 34px rgba(37,211,102,.28);font-size:0}
        .wa-float svg{width:32px;height:32px}

        @media(max-width:980px){.container{width:min(100% - 56px,1180px)}.hero-photo{width:39%;opacity:.75}.footer-feature-grid{gap:45px}.footer-cta{padding-left:34px}}
        @media(max-width:760px){.menu-toggle{display:block}.nav-links{display:none;position:absolute;top:81px;left:0;right:0;background:#fff;border-bottom:1px solid var(--linea);padding:20px 28px 24px;flex-direction:column;align-items:flex-start;gap:16px}.nav-links.open{display:flex}.container{width:min(100% - 40px,600px)}.section{padding:76px 0}.hero{padding:0;min-height:0;display:flex;flex-direction:column}.hero .container{order:1;padding-top:78px;padding-bottom:62px}.hero-photo{position:relative;order:2;width:100%;height:250px;clip-path:none;opacity:1}.hero h1{font-size:clamp(42px,10vw,58px);max-width:100%}.hero .lead{max-width:100%;font-size:16px}.hero-top{max-width:100%}.problems-heading{margin-bottom:24px}.problems-heading h2{font-size:clamp(34px,8vw,44px)}.problem-grid{grid-template-columns:1fr 1fr}.problem{padding:24px 16px!important;border-right:1px solid var(--linea);border-bottom:1px solid var(--linea)}.problem:nth-child(2n){border-right:0}.problem:nth-last-child(-n+2){border-bottom:0}.problem:first-child{padding-left:16px!important}.wheel-shell{width:min(100%,490px)}.wheel-arc-text{font-size:14px;letter-spacing:1.8px}.quad{padding:8px 4px;gap:4px}.quad strong{font-size:clamp(14px,4vw,22px)}.quad small{font-size:clamp(7px,1.7vw,10px)}#quien .bio-layout{grid-template-columns:1fr;gap:26px}.portrait-wrap{width:190px}.footer-feature{padding:72px 0;background:#F1ECF2}.footer-feature-grid{grid-template-columns:1fr;gap:38px}.footer-cta{border-left:0;border-top:1px solid #C8BCCC;padding:36px 0 0}.footer-message h2{font-size:clamp(38px,8vw,50px)}}
        @media(max-width:430px){.container{width:calc(100% - 34px)}.problem-grid{grid-template-columns:1fr}.problem{padding:22px 0!important;border-right:0!important}.problem:nth-last-child(-n+2){border-bottom:1px solid var(--linea)}.problem:last-child{border-bottom:0}.problem:first-child{padding-left:0!important}.hero-actions{gap:12px}.wheel-shell{width:min(100%,420px)}.wheel-arc-text{font-size:12px;letter-spacing:.9px}.crm-center{width:29%}.footer-inner{align-items:flex-start}.wa-float{width:62px;height:62px;right:18px;bottom:18px}.wa-float svg{width:28px;height:28px}}
      `}</style>

      <header className="nav">
        <div className="container nav-inner">
          <a href="#inicio" aria-label="NERINI inicio"><Brand /></a>
          <button className="menu-toggle" aria-expanded={open} aria-label="Abrir menú" onClick={() => setOpen(!open)}>☰</button>
          <nav className={'nav-links' + (open ? ' open' : '')}>
            <a href="#servicio" onClick={() => setOpen(false)}>Servicio integral</a>
            <a href="#quien" onClick={() => setOpen(false)}>Quién dirige</a>
            <a className="button button-outline" href={AGENDA} target="_blank" rel="noreferrer">Agendemos una llamada</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-photo" role="img" aria-label="Equipo de trabajo reunido en una mesa" />
          <div className="container">
            <div className="hero-top">
              <span className="eyebrow">ESTRATEGIA · EJECUCIÓN · MEDICIÓN</span>
              <span className="hero-rule" aria-hidden="true" />
            </div>
            <h1>Departamento Externo de Marketing</h1>
            <p className="lead">Somos el Departamento Externo de Marketing de empresas de servicios sin equipo interno. Dirigimos la estrategia y ejecutamos redes, pauta, sitio y email marketing con nuestro equipo, bajo un mismo sistema de seguimiento y medición.</p>
            <div className="hero-actions">
              <a className="button" href={AGENDA} target="_blank" rel="noreferrer">Coordinemos una llamada <Icon name="arrow" size={17} /></a>
            </div>
          </div>
        </section>

        <section className="section" id="problemas">
          <div className="container">
            <div className="problems-heading">
              <h2>Cuando el marketing no está integrado.</h2>
            </div>
            <div className="problem-grid">
              {problemas.map((p) => (
                <article className="problem" key={p.titulo}>
                  <Icon name={p.icon} />
                  <h3>{p.titulo}</h3>
                  <p>{p.detalle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section service-section" id="servicio">
          <div className="container">
            <div className="section-top">
              <h2>Servicio integral</h2>
              <p className="lead">Redes, pauta, sitio y email marketing bajo una misma dirección. Un sistema centralizado conecta los canales, registra cada contacto y permite hacer seguimiento y medir.</p>
            </div>
            <ServiceWheel />
          </div>
        </section>

        <section className="section" id="quien">
          <div className="container bio-layout">
            <div className="portrait-wrap">
              <img className="portrait" src="/debora.png" alt="Fotografía original de Debora Nerini" loading="lazy" decoding="async" />
            </div>
            <div>
              <h2 className="bio-heading">Debora Nerini</h2>
              <p className="bio-role">Directora de Marketing</p>
              <p className="bio-credentials">Lic. en Comercialización (UADE) · Especialización en Marketing Digital (UBA) · 15 años en marketing y negocios en grandes empresas.</p>
              <p className="bio-text">Dirijo el marketing de cada empresa: defino el plan, coordino las áreas con nuestro equipo de especialistas y respondo por el resultado.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contacto">
        <div className="footer-feature">
          <div className="container footer-feature-grid">
            <div className="footer-message">
              <h2>Hagamos que el marketing impulse tu negocio.</h2>
              <p>Conversemos sobre el marketing de tu empresa.</p>
              <a className="button" href={AGENDA} target="_blank" rel="noreferrer">Agendemos una llamada <Icon name="arrow" size={17} /></a>
            </div>
            <div className="footer-cta">
              <h2>Coordinemos una llamada</h2>
              <div className="footer-contact">
                <a href={AGENDA} target="_blank" rel="noreferrer">nerini.ar/agenda ↗</a>
                <a href="mailto:debora@nerini.ar">debora@nerini.ar</a>
                <a href={WA} target="_blank" rel="noreferrer">+54 9 11 2241 9299</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-inner">
            <Brand />
            <span className="copyright">© 2026 NERINI · Departamento Externo de Marketing</span>
            <a href="https://nerini.ar" rel="noreferrer">nerini.ar</a>
          </div>
        </div>
      </footer>

      <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="Contacto por WhatsApp"><Icon name="whatsapp" size={30} /></a>
    </div>
  );
}
