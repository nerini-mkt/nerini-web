import { useEffect, useState } from 'react';

const WA = 'https://wa.me/5491122419299?text=Hola%20Debora%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20servicios';
const AGENDA = 'https://nerini.ar/agenda';

const problemas = [
  { icon:'network', titulo:'Diferentes proveedores. Diferentes estrategias.', detalle:'Cada proveedor ejecuta su área sin una estrategia integral que los coordine.' },
  { icon:'person', titulo:'El marketing lo planificás vos.', detalle:'La planificación y ejecución dependen de tu disponibilidad permanente.' },
  { icon:'chart', titulo:'Invertís sin medir el retorno.', detalle:'Reportes aislados de cada proveedor, sin un tablero que muestre el resultado conjunto.' },
  { icon:'target', titulo:'Los leads no tienen seguimiento.', detalle:'No hay registro de origen ni proceso definido para convertirlos en oportunidades de venta.' },
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
  // Arcos SVG independientes: el texto sigue la curva y no se recorta con CSS.
  return <div className="wheel-wrap"><div className="wheel-ring" role="img" aria-label="Servicio integral: Presencia, Crecimiento y Nutrición; redes sociales, pauta digital, sitio web, email marketing y CRM centralizado">
    <svg className="wheel-arcs" viewBox="0 0 600 600" aria-hidden="true">
      <defs>
        <path id="arc-presencia" d="M 307 43 A 257 257 0 0 0 119 483" />
        <path id="arc-crecimiento" d="M 321 44 A 257 257 0 0 1 553 346" />
        <path id="arc-nutricion" d="M 547 367 A 257 257 0 0 1 146 506" />
      </defs>
      <path d="M 307 43 A 257 257 0 0 0 119 483" fill="none" stroke="#6B1F2A" strokeWidth="59" />
      <path d="M 321 44 A 257 257 0 0 1 553 346" fill="none" stroke="#A0714A" strokeWidth="59" />
      <path d="M 547 367 A 257 257 0 0 1 146 506" fill="none" stroke="#C9BFBA" strokeWidth="59" />
      <text><textPath href="#arc-presencia" startOffset="53%" textAnchor="middle">PRESENCIA</textPath></text>
      <text><textPath href="#arc-crecimiento" startOffset="48%" textAnchor="middle">CRECIMIENTO</textPath></text>
      <text><textPath href="#arc-nutricion" startOffset="50%" textAnchor="middle">NUTRICIÓN</textPath></text>
    </svg>
    <div className="wheel-interior">
      <div className="wheel-quadrant"><strong>Redes<br/>sociales</strong><small>Instagram · LinkedIn</small></div>
      <div className="wheel-quadrant"><strong>Pauta<br/>digital</strong><small>Meta Ads · Google Ads</small></div>
      <div className="wheel-quadrant"><strong>Sitio<br/>web</strong><small>Estructura · medición</small></div>
      <div className="wheel-quadrant"><strong>Email<br/>marketing</strong><small>Envíos · secuencias</small></div>
    </div>
    <div className="wheel-crm"><b>CRM</b><span>Sistema centralizado</span><small>Clientify</small></div>
  </div></div>;
}

export default function NeriniWeb(){
  const [open,setOpen] = useState(false);
  useEffect(()=>{ document.title='NERINI | Departamento Externo de Marketing'; },[]);
  return <div className="nerini-site" id="inicio">
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');
      :root{--bordo:#6B1F2A;--tinta:#3A1A1F;--cuero:#A0714A;--gris:#6B6660;--linea:#E8E2D9;--malva:#DFD6E1;--blanco:#fff}
      *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0}button,a{font:inherit}
      .nerini-site{font-family:'Raleway',Arial,sans-serif;color:var(--tinta);background:#fff;line-height:1.55;overflow:hidden}
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
      .lead{font-family:'Raleway',sans-serif;font-size:clamp(17px,1.7vw,21px);line-height:1.7;color:var(--gris);max-width:900px}
      .hero{padding:76px 0 84px;position:relative}.hero .container{position:relative}.hero .lead{max-width:890px}
      .hero-top{display:flex;justify-content:space-between;align-items:center;gap:20px}.hero-rule{width:54px;height:1px;background:var(--malva);transform:rotate(-52deg)}
      .hero-actions{display:flex;align-items:center;gap:23px;flex-wrap:wrap;margin-top:32px}.quiet{font-size:13px;color:var(--gris)}
      .section-top{max-width:860px;margin-bottom:42px}.section-top h2{margin-top:12px}
      .problem-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--linea);border-bottom:1px solid var(--linea)}
      .problem{padding:32px 24px 36px;border-right:1px solid var(--linea);min-width:0}.problem:first-child{padding-left:0}.problem:last-child{border-right:0}
      .problem svg{color:var(--cuero);margin-bottom:21px}.problem h3{font-size:18px;line-height:1.4;font-weight:600;margin:0 0 14px}.problem p{font-size:14px;line-height:1.75;color:var(--gris);margin:0}
      .service-section{text-align:center}.service-section .section-top{margin-left:auto;margin-right:auto}.service-section .lead{margin:0 auto}
      .wheel-wrap{display:flex;justify-content:center;width:100%;margin:34px auto 14px}
      .wheel-ring{width:min(570px,92vw);aspect-ratio:1;position:relative;border-radius:50%;background:conic-gradient(from -90deg,var(--bordo) 0deg 125deg,#fff 125deg 126deg,var(--cuero) 126deg 247deg,#fff 247deg 248deg,#C9BFBA 248deg 359deg,#fff 359deg 360deg);isolation:isolate}
      .wheel-ring:before{content:"";position:absolute;inset:8%;background:white;border-radius:50%;z-index:0}
      .wheel-arc-label{position:absolute;z-index:3;color:white;font-size:clamp(10px,1.3vw,14px);letter-spacing:.22em;font-weight:600;white-space:nowrap;line-height:1}
      .label-presencia{top:47%;left:0;transform:translate(-17%,-50%) rotate(-90deg)}
      .label-crecimiento{top:16%;right:4%;transform:rotate(47deg)}
      .label-nutricion{bottom:3.4%;left:50%;transform:translateX(-50%)}
      .wheel-interior{position:absolute;inset:12%;border:1px solid var(--linea);border-radius:50%;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;background:#fff;z-index:1}
      .wheel-quadrant{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:15px 5px;gap:8px;min-width:0}.wheel-quadrant:nth-child(odd){border-right:1px solid var(--linea)}.wheel-quadrant:nth-child(-n+2){border-bottom:1px solid var(--linea)}
      .wheel-quadrant strong{font-family:'Playfair Display',Georgia,serif;font-size:clamp(15px,2.25vw,27px);line-height:1.1;font-weight:500;color:var(--bordo)}.wheel-quadrant:nth-child(2) strong,.wheel-quadrant:nth-child(3) strong{color:var(--cuero)}
      .wheel-quadrant small{font-size:clamp(8px,1.1vw,11px);color:var(--gris);max-width:90%}
      .wheel-crm{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);width:27%;aspect-ratio:1;border-radius:50%;background:#fff;border:1px solid var(--malva);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:2px}
      .wheel-crm b{font-family:'Playfair Display',Georgia,serif;font-size:clamp(20px,3vw,35px);font-weight:500}.wheel-crm span{font-size:clamp(7px,1vw,11px);line-height:1.25;color:var(--gris)}.wheel-crm small{font-weight:700;color:var(--bordo);font-size:clamp(11px,1.55vw,17px)}
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
      /* Ajustes editoriales aprobados: blanco, bordó y malva solo en detalles */
      .nav-inner{min-height:82px}.brand-img{width:165px}.nav-links>a:not(.button){font-size:14px}
      .button{border-radius:22px;padding:13px 23px}
      .hero{min-height:520px;display:flex;align-items:center;padding:75px 0 100px;background:linear-gradient(125deg,transparent 65%,rgba(223,214,225,.16) 65.1%,rgba(223,214,225,.16) 86%,transparent 86.1%)}
      .hero .container{z-index:1}.hero h1{max-width:730px;font-size:clamp(46px,5.8vw,76px);line-height:1.08;margin:20px 0 22px}.hero .lead{max-width:690px;font-size:18px;line-height:1.7}
      .hero-rule{width:110px;opacity:.32;transform:rotate(-48deg)}
      .section{padding:82px 0}.section-top{max-width:900px}.section-top h2{margin-top:18px}
      .problem-grid{border-top:0;border-bottom:0}.problem{padding:26px 27px 18px}.problem h3{font-size:17px}.problem p{font-size:14px}
      .problems-heading{display:grid;grid-template-columns:1.5fr .7fr;gap:50px;align-items:end;margin-bottom:35px}.problems-heading h2{max-width:710px}.problems-aside{color:var(--gris);font-size:15px;line-height:1.7;padding-bottom:8px}
      .service-section .section-top{margin-bottom:12px}.service-section .section-top .lead{max-width:760px}
      .tracking-card{background:#fff}.tracking-bar{border-left:2px solid var(--bordo)}
      .final-cta{padding:70px 0;text-align:center;border-top:1px solid var(--linea);background:#fff}
      .final-cta h2{font-size:clamp(35px,4vw,56px);max-width:940px;margin:16px auto 0}
      .footer{padding:0;background:#fff}.footer-main{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center;padding:66px 0 55px}
      .footer-cta h2{font-family:'Playfair Display',Georgia,serif;color:var(--bordo);font-size:clamp(29px,3.5vw,45px);line-height:1.17;font-weight:500;margin:0 0 14px}
      .footer-cta p{color:var(--gris);margin:0 0 22px;font-size:16px;line-height:1.7}
      .footer-contact{display:flex;flex-direction:column;gap:13px}.footer-contact a{font-size:15px;color:var(--tinta)}
      .footer-bottom{border-top:1px solid var(--linea);padding:25px 0}.footer-inner{gap:20px}.copyright{margin-top:0}
      .bio-contact{display:none}.bio-layout{grid-template-columns:240px minmax(0,1fr);gap:65px;max-width:960px}
      .bio-heading{font-size:clamp(42px,4.4vw,62px)}.bio-role{color:var(--cuero)}
      @media(max-width:850px){.problems-heading{grid-template-columns:1fr;gap:0}.problems-aside{display:none}.footer-main{gap:38px}}
      @media(max-width:850px){.container{width:min(100% - 40px,1160px)}.nav-inner{min-height:74px}.brand-img{width:145px}.menu-toggle{display:block}.nav-links{display:none;position:absolute;top:73px;left:0;right:0;background:#fff;padding:22px 20px;border-bottom:1px solid var(--linea);flex-direction:column;align-items:flex-start}.nav-links.open{display:flex}.hero{padding:70px 0}.problem-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.problem:nth-child(2){border-right:0}.problem:nth-child(-n+2){border-bottom:1px solid var(--linea)}.problem:nth-child(3){padding-left:0}.bio-layout{gap:30px;grid-template-columns:190px minmax(0,1fr)}.bio-role{font-size:22px}}
      @media(max-width:570px){.container{width:calc(100% - 36px)}.section{padding:58px 0}.hero{padding:57px 0 63px}.hero-top{align-items:flex-start}.hero .eyebrow{font-size:10px}h1{font-size:43px}.lead{font-size:16px}.problem-grid{grid-template-columns:1fr}.problem{padding:25px 0!important;border-right:0;border-bottom:1px solid var(--linea)}.problem:last-child{border-bottom:0}.wheel-wrap{margin:32px auto 0}.wheel-quadrant{padding:18px 3px;gap:3px}.wheel-quadrant strong{font-size:clamp(13px,4.1vw,21px)}.wheel-quadrant small{font-size:clamp(7px,2vw,10px);max-width:95%}.arc-type{font-size:20px;letter-spacing:3px}.stages{grid-template-columns:1fr;margin-top:32px}.stage{border-right:0;border-bottom:1px solid var(--linea);padding:17px 0}.bio-layout{grid-template-columns:1fr}.portrait-wrap{width:min(100%,240px)}.footer-main{grid-template-columns:1fr;gap:25px}.wheel-arc-label{font-size:9px;letter-spacing:.08em}.label-presencia{left:1%}.label-crecimiento{right:1%;top:17%}.label-nutricion{bottom:3%}.bio-role{font-size:23px}.tracking-layout{grid-template-columns:1fr;gap:14px}.tracking-bar{flex-direction:column;align-items:flex-start}.footer-contact{flex-direction:column;gap:8px}.hero-actions{align-items:flex-start}}

      /* Identidad editorial aprobada: más aire, composición real y sin etapas */
      .section{padding:clamp(82px,9vw,126px) 0}
      .hero{min-height:550px;display:flex;align-items:center;padding:90px 0;background:#fff;position:relative}
      .hero .container{z-index:2}.hero h1{max-width:650px;font-size:clamp(46px,5.1vw,70px)}
      .hero .lead{max-width:600px;font-size:17px}.hero-top{max-width:590px}
      .hero-photo{position:absolute;top:0;right:0;bottom:0;width:43%;background-image:url('/equipo-referencia.jpg');background-position:center;background-size:cover;clip-path:polygon(17% 0,100% 0,100% 100%,0 100%);filter:saturate(.72)}
      .hero-photo:after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.08)}
      .problem-grid{margin-top:44px}.problems-heading{margin-bottom:38px}.problem{padding:28px 30px 26px}
      .service-section{padding-top:106px;padding-bottom:116px}.service-section .wheel-wrap{margin-top:58px}
      .wheel-ring{width:min(550px,90vw)}
      .wheel-label-svg{position:absolute;inset:0;width:100%;height:100%;z-index:4;overflow:visible;pointer-events:none}
      .wheel-label-svg text{fill:#fff;font-family:'Raleway',Arial,sans-serif;font-size:16px;font-weight:700;letter-spacing:3px}
      .label-presencia,.label-crecimiento,.label-nutricion{display:none}
      .tracking-layout{margin-top:48px}.tracking-card{padding:35px}.tracking-bar{padding:30px 34px}
      #quien{padding:104px 0 120px}.bio-layout{max-width:1000px;grid-template-columns:215px minmax(0,1fr);gap:74px}
      .footer{border-top:0}.footer-feature{background:linear-gradient(116deg,#E9E0E9 0%,#F4F0F4 47%,#fff 47.2%,#fff 100%);padding:90px 0 86px}
      .footer-feature-grid{display:grid;grid-template-columns:1.18fr .82fr;gap:clamp(38px,7vw,110px);align-items:center}
      .footer-message h2{font-size:clamp(38px,4.1vw,58px);line-height:1.17;margin:18px 0 21px;max-width:620px}
      .footer-message p{color:var(--gris);font-size:17px;margin-bottom:24px}
      .footer-message .eyebrow{color:#8B5F3D}.footer-cta{border-left:1px solid #C8BCCC;padding-left:clamp(25px,4vw,65px)}
      .footer-cta h2{font-size:clamp(30px,3vw,43px)}.footer-cta p{font-size:14px}
      .footer-contact{gap:16px}.footer-contact a{font-size:15px;overflow-wrap:anywhere}
      .footer-bottom{padding:24px 0;background:#fff}.footer-bottom .brand-img{width:125px}
      .footer-bottom a{font-size:13px;color:var(--gris)}
      @media(max-width:900px){.hero-photo{width:38%;opacity:.32}.hero{min-height:500px}.hero .lead{max-width:570px}.footer-feature-grid{gap:35px}}
      @media(max-width:700px){.hero-photo{position:relative;order:2;width:100%;height:235px;clip-path:none;opacity:1;background-position:center 40%}.hero{display:flex;flex-direction:column;align-items:stretch;padding:0}.hero .container{padding-top:70px;padding-bottom:65px;order:1}.hero h1{font-size:clamp(41px,9vw,58px)}.hero .lead{font-size:16px}.section{padding:70px 0}.service-section{padding:78px 0}.wheel-label-svg text{font-size:16px;letter-spacing:2px}.bio-layout{grid-template-columns:1fr;gap:22px}.portrait-wrap{width:190px}.footer-feature{background:#F1ECF2;padding:65px 0}.footer-feature-grid{grid-template-columns:1fr;gap:40px}.footer-cta{border-left:0;border-top:1px solid #C8BCCC;padding:35px 0 0}.footer-bottom .footer-inner{align-items:flex-start}.footer-message h2{font-size:clamp(36px,8vw,46px)}}
      @media(max-width:440px){.wheel-label-svg text{font-size:15px;letter-spacing:1px}.hero-actions{gap:15px}.problem{padding:26px 0!important}}
      /* Entrega revisada, composición responsive */
      .nerini-site{overflow-x:clip}.container{width:min(1180px,calc(100% - 76px))}
      .section{padding:104px 0}.section-top{margin-bottom:38px}.nav-inner{min-height:80px}.brand-img{width:145px}
      .hero{position:relative;min-height:610px;padding:110px 0 105px;background:white}
      .hero .container{position:relative;z-index:2}.hero h1{font-size:clamp(47px,5.05vw,72px);max-width:610px;margin:24px 0}
      .hero .lead{max-width:550px;font-size:17px;line-height:1.72}
      .hero-photo{position:absolute;right:0;top:0;bottom:0;width:45%;background:url('/equipo-referencia.jpg') center/cover no-repeat;clip-path:polygon(12% 0,100% 0,100% 100%,0 100%);filter:saturate(.78)}
      .hero-rule{display:none}.hero-top{max-width:550px}.hero-actions{margin-top:28px}
      .problems-heading{grid-template-columns:1.3fr .7fr;gap:65px;align-items:end;margin-bottom:48px}
      .problems-heading h2{font-size:clamp(37px,3.9vw,52px)}.problem-grid{border-top:1px solid var(--linea);border-bottom:1px solid var(--linea)}
      .problem{padding:34px 30px 34px}.problem h3{font-size:17px}.problem p{font-size:14px;line-height:1.7}.problem svg{margin-bottom:22px}
      .service-section{padding:110px 0}.service-section .section-top{margin-bottom:46px}
      .wheel-wrap{margin:0 auto}.wheel-ring{width:min(560px,calc(100vw - 44px));background:none;border-radius:0;isolation:auto}
      .wheel-ring:before{display:none}.wheel-arcs{position:absolute;inset:0;width:100%;height:100%;display:block;z-index:0;overflow:visible}
      .wheel-arcs text{font:700 15px 'Raleway',Arial,sans-serif;letter-spacing:3px;fill:white}
      .wheel-interior{inset:13%;border:1px solid var(--linea);z-index:1}
      .wheel-quadrant strong{font-size:clamp(15px,2vw,24px)}.wheel-quadrant small{font-size:clamp(8px,.9vw,11px)}
      .wheel-crm{z-index:2;width:25%}.wheel-crm span{font-size:clamp(7px,.75vw,10px)}
      #seguimiento .section-top{max-width:850px}.tracking-layout{margin-top:42px}.tracking-card{padding:32px}.tracking-card h3{font-size:17px}
      .tracking-bar{margin-top:22px;padding:26px 30px}.tracking-bar strong{font-size:17px}
      #quien{padding:108px 0 118px}.bio-layout{max-width:1000px;grid-template-columns:220px minmax(0,1fr);gap:64px}
      .portrait-wrap{width:220px}.bio-heading{font-size:clamp(42px,4vw,55px)}.bio-credentials{font-size:15px}.bio-text{font-size:16px}
      .footer{border-top:0}.footer-feature{background:#F0EAF1;padding:96px 0 92px}
      .footer-feature-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:85px;align-items:center}
      .footer-message h2{font-size:clamp(40px,4.25vw,60px);line-height:1.13;margin:19px 0 20px;max-width:610px}
      .footer-message p{font-size:17px;color:var(--gris);margin:0 0 26px}
      .footer-message .eyebrow{color:#8B5F3D}.footer-cta{border-left:1px solid #C8BCCC;padding-left:65px}
      .footer-cta h2{font-size:clamp(30px,2.9vw,41px);line-height:1.2;margin:0 0 14px}
      .footer-cta p{font-size:15px;color:var(--gris);margin:0 0 25px}
      .footer-contact{display:flex;flex-direction:column;gap:14px;align-items:flex-start}
      .footer-contact a{font-size:15px;color:var(--tinta);overflow-wrap:anywhere}
      .footer-bottom{background:#fff;padding:28px 0}.footer-bottom .brand-img{width:125px}.footer-bottom .copyright{margin:0}
      @media(max-width:980px){.hero-photo{width:39%;opacity:.6}.hero h1{max-width:570px}.hero .lead{max-width:510px}.footer-feature-grid{gap:45px}.footer-cta{padding-left:35px}}
      @media(max-width:700px){.container{width:min(100% - 40px,580px)}.section{padding:76px 0}
      .hero{display:flex;flex-direction:column;min-height:0;padding:0}.hero .container{order:1;padding-top:78px;padding-bottom:63px}
      .hero-photo{position:relative;order:2;width:100%;height:275px;opacity:1;clip-path:none;background-position:center 40%}
      .hero h1{font-size:clamp(42px,10vw,58px);max-width:100%}.hero .lead{font-size:16px;max-width:100%}
      .problems-heading{grid-template-columns:1fr;gap:14px;margin-bottom:22px}.problems-heading h2{font-size:clamp(34px,8vw,44px)}.problems-aside{font-size:15px}
      .problem-grid{grid-template-columns:1fr 1fr}.problem{padding:25px 15px!important;border-right:1px solid var(--linea);border-bottom:1px solid var(--linea)}
      .problem:nth-child(2n){border-right:0}.problem:nth-last-child(-n+2){border-bottom:0}.problem h3{font-size:15px}.problem p{font-size:13px}
      .service-section{padding:78px 0}.wheel-ring{width:min(100%,480px)}.wheel-arcs text{font-size:14px;letter-spacing:2.2px}
      .wheel-quadrant{padding:5px 0;gap:4px}.wheel-quadrant strong{font-size:clamp(13px,4vw,20px)}.wheel-quadrant small{font-size:clamp(7px,1.8vw,9px)}
      .wheel-crm b{font-size:clamp(20px,5vw,28px)}.wheel-crm small{font-size:clamp(9px,2.6vw,13px)}.wheel-crm span{font-size:clamp(6px,1.6vw,8px)}
      .tracking-layout{grid-template-columns:1fr;gap:16px}.tracking-bar{flex-direction:column;align-items:flex-start;gap:10px}
      #quien{padding:78px 0 90px}.bio-layout{grid-template-columns:1fr;gap:26px}.portrait-wrap{width:190px}
      .footer-feature{padding:72px 0;background:#F0EAF1}.footer-feature-grid{grid-template-columns:1fr;gap:40px}
      .footer-cta{border-left:0;border-top:1px solid #C8BCCC;padding:38px 0 0}.footer-message h2{font-size:clamp(38px,9vw,52px)}
      .footer-inner{align-items:flex-start;gap:18px}.footer-bottom{padding:25px 0}}
      @media(max-width:430px){.wheel-arcs text{font-size:15px;letter-spacing:1.1px}.problem-grid{grid-template-columns:1fr}.problem{padding:20px 0!important;border-right:0!important}.problem:nth-child(3){border-bottom:1px solid var(--linea)}.wheel-quadrant strong{font-size:14px}.wheel-quadrant small{font-size:7px}.hero-actions{gap:12px}}
      @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
    `}</style>
    <header className="nav"><div className="container nav-inner"><a href="#inicio" aria-label="NERINI inicio"><Brand/></a><button className="menu-toggle" aria-expanded={open} aria-label="Abrir menú" onClick={()=>setOpen(!open)}>☰</button><nav className={'nav-links'+(open?' open':'')}><a href="#servicio" onClick={()=>setOpen(false)}>Servicio integral</a><a href="#seguimiento" onClick={()=>setOpen(false)}>Seguimiento</a><a href="#quien" onClick={()=>setOpen(false)}>Quién dirige</a><a className="button button-outline" href={AGENDA} target="_blank" rel="noreferrer">Agendemos una llamada</a></nav></div></header>
    <main>
      <section className="hero"><div className="hero-photo" role="img" aria-label="Equipo de trabajo reunido en una mesa"/><div className="container"><div className="hero-top"><span className="eyebrow">ESTRATEGIA · EJECUCIÓN · MEDICIÓN</span><span className="hero-rule" aria-hidden="true"/></div><h1>Departamento Externo de Marketing</h1><p className="lead">Somos el Departamento Externo de Marketing de empresas de servicios sin equipo interno. Dirigimos la estrategia y ejecutamos redes, pauta, sitio y email marketing con nuestro equipo, bajo un mismo sistema de seguimiento y medición.</p><div className="hero-actions"><a className="button" href={AGENDA} target="_blank" rel="noreferrer">Coordinemos una llamada <Icon name="arrow" size={17}/></a><span className="quiet">Un equipo. Una dirección. Un sistema.</span></div></div></section>
      <section className="section" id="problemas"><div className="container"><div className="problems-heading"><div><span className="eyebrow">¿TE ESTÁ PASANDO ESTO?</span><h2>Cuatro problemas, un mismo resultado: oportunidades que se pierden.</h2></div><p className="problems-aside">Sin una dirección integral, el marketing se vuelve fragmentado y difícil de medir.</p></div><div className="problem-grid">{problemas.map(p=><article className="problem" key={p.titulo}><Icon name={p.icon}/><h3>{p.titulo}</h3><p>{p.detalle}</p></article>)}</div></div></section>
      <section className="section service-section" id="servicio"><div className="container"><div className="section-top"><span className="eyebrow">UN SOLO DEPARTAMENTO</span><h2>Servicio integral</h2><p className="lead">Redes, pauta, sitio y email marketing bajo una misma dirección. Un sistema centralizado conecta los canales, registra cada contacto y permite hacer seguimiento y medir.</p></div><ServiceWheel/></div></section>
      <section className="section" id="seguimiento"><div className="container"><div className="section-top"><span className="eyebrow">SISTEMA CENTRALIZADO</span><h2>Seguimiento y medición</h2><p className="lead">Integramos los canales de comunicación para que cada contacto tenga registro de origen, historial y seguimiento comercial.</p></div><div className="tracking-layout"><div className="tracking-card"><h3>Canales digitales</h3><ul>{['Redes sociales','Pauta digital','Sitio web','WhatsApp'].map(t=><li key={t}>{t}</li>)}</ul></div><div className="tracking-card"><h3>Canales offline</h3><ul>{['Eventos y ferias','Referidos'].map(t=><li key={t}>{t}</li>)}</ul></div></div><div className="tracking-bar"><strong>CRM · Sistema centralizado</strong><span>Registro de origen · automatizaciones · seguimiento · tablero de medición</span></div></div></section>
      <section className="section" id="quien"><div className="container bio-layout"><div className="portrait-wrap"><img className="portrait" src="/debora.png" alt="Fotografía original de Debora Nerini" loading="lazy" decoding="async"/></div><div><span className="eyebrow">QUIÉN DIRIGE</span><h2 className="bio-heading">Debora Nerini</h2><p className="bio-role">Directora de Marketing</p><p className="bio-credentials">Lic. en Comercialización (UADE) · Especialización en Marketing Digital (UBA) · 15 años en marketing y negocios en grandes empresas.</p><p className="bio-text">Dirijo el marketing de cada empresa: defino el plan, coordino las áreas con nuestro equipo de especialistas y respondo por el resultado.</p></div></div></section>

    </main>
    <footer className="footer" id="contacto">
      <div className="footer-feature"><div className="container footer-feature-grid">
        <div className="footer-message"><span className="eyebrow">MARKETING CON DIRECCIÓN · EJECUCIÓN · MEDICIÓN</span><h2>Hagamos que el marketing impulse tu negocio.</h2><p>Conversemos sobre el marketing de tu empresa.</p><a className="button" href={AGENDA} target="_blank" rel="noreferrer">Agendemos una llamada <Icon name="arrow" size={17}/></a></div>
        <div className="footer-cta"><h2>Coordinemos una llamada</h2><p>Un equipo. Una dirección. Un sistema.</p><div className="footer-contact"><a href={AGENDA} target="_blank" rel="noreferrer">nerini.ar/agenda ↗</a><a href="mailto:debora@nerini.ar">debora@nerini.ar</a><a href={WA} target="_blank" rel="noreferrer">+54 9 11 2241 9299</a></div></div>
      </div></div>
      <div className="footer-bottom"><div className="container footer-inner"><Brand/><span className="copyright">© 2026 NERINI · Departamento Externo de Marketing</span><a href="https://nerini.ar" rel="noreferrer">nerini.ar</a></div></div>
    </footer>
    <a className="wa-float" href={WA} target="_blank" rel="noreferrer" aria-label="Contacto por WhatsApp">✆</a>
  </div>;
}
