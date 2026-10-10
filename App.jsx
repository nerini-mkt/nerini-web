import { useState, useEffect, useRef } from "react";

const FOTO_DEBORA = "/debora.png"; // Conservar la foto original en public/debora.png

const WA =
  "https://wa.me/5491122419299?text=Hola%20Debora%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20servicios";

/* ── Paleta 2026 (Manual de Marca) ───────────────────
   Fondo blanco como base. Malva solo en detalles.
   Evitar superficies oscuras dominantes.            */
const C = {
  bordo:       "#6B1F2A",   // identidad y acentos
  bordoHover:  "#571821",
  negro:       "#3A1A1F",   // títulos y lectura
  blanco:      "#FFFFFF",   // fondo principal
  grisTexto:   "#6B6660",   // párrafos
  grisBorde:   "#E8E2D9",   // bordes y separadores (cuero claro)
  grisClaro:   "#A8A39E",   // captions y terciarios
  malva:       "#DFD6E1",   // detalles discretos — nuevo 2026
  malvaOsc:    "#C8BCCC",   // malva más oscuro para bordes
  cueroClaro:  "#D4B896",   // versión clara para texto sobre bordó
  beige:       "#FAF5EE",   // texto sobre fondos oscuros
};

const SANS = "'Raleway','Open Sans',system-ui,-apple-system,sans-serif";


const PAD_X = "clamp(20px, 5vw, 48px)";
const PAD_Y = "clamp(44px, 5.5vw, 72px)";
const MAX = 1120;

/* ── fuentes ──────────────────────────────────────── */
function useBrandFonts() {
  useEffect(() => {
    const href =
      "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Arimo:wght@700&display=swap";
    if (document.querySelector(`link[href="${href}"]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }, []);
}

/* ── reveal on scroll ─────────────────────────────── */
function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setV(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(14px)",
        transition: `opacity .55s cubic-bezier(.2,0,0,1) ${delay}ms, transform .55s cubic-bezier(.2,0,0,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Diagonal decorativa (reemplaza N-pattern) ────── */
function DiagonalAccent({ side = "right", color = C.malva, opacity = 1 }) {
  const isRight = side === "right";
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        [isRight ? "right" : "left"]: 0,
        top: 0,
        bottom: 0,
        height: "100%",
        width: "clamp(120px, 18vw, 240px)",
        pointerEvents: "none",
        opacity,
      }}
      preserveAspectRatio="none"
      viewBox="0 0 240 600"
    >
      {/* 3 líneas diagonales paralelas, trazo fino */}
      <line x1={isRight ? 200 : 40} y1="0" x2={isRight ? 40 : 200} y2="600" stroke={color} strokeWidth="1" />
      <line x1={isRight ? 220 : 20} y1="0" x2={isRight ? 60 : 220} y2="600" stroke={color} strokeWidth="1" />
      <line x1={isRight ? 240 : 0}  y1="0" x2={isRight ? 80 : 240} y2="600" stroke={color} strokeWidth="1" />
    </svg>
  );
}

/* ── Logo (construcción tipográfica del manual) ───── */
function Logo({ dark = false, size = 21 }) {
  return <img src={dark ? "/nerini-logo-inverso.png" : "/nerini-logo-oficial.png"}
    alt="NERINI Marketing" style={{ display: "block", width: size * 4.25, height: "auto", objectFit: "contain" }} />;
}

/* ── Iconos de trazo (lineales, per manual §05) ───── */
function Icon({ name = "check", size = 16, color = C.bordo }) {
  const paths = {
    check:  <polyline points="4 12.5 9.5 18 20 6" />,
    arrow:  <><line x1="4" y1="12" x2="20" y2="12" /><polyline points="14 6 20 12 14 18" /></>,
    grid:   <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></>,
    chart:  <><polyline points="4 18 10 11 15 14 20 7" /><polyline points="16 7 20 7 20 11" /></>,
    email:  <><rect x="4" y="6" width="16" height="13" rx="1.5" /><polyline points="4 6 12 13 20 6" /></>,
    redes:  <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="5" r="2.5" /><circle cx="18" cy="19" r="2.5" /><line x1="8" y1="11" x2="16" y2="6" /><line x1="8" y1="13" x2="16" y2="18" /></>,
    pauta:  <><rect x="4" y="4" width="16" height="16" rx="1.5" /><line x1="4" y1="9" x2="20" y2="9" /><line x1="9" y1="4" x2="9" y2="9" /></>,
    sitio:  <><rect x="4" y="5" width="16" height="14" rx="1.5" /><line x1="4" y1="9" x2="20" y2="9" /><circle cx="7.5" cy="7" r=".8" fill="currentColor" /><circle cx="10.5" cy="7" r=".8" fill="currentColor" /></>,
    crm:    <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="4" x2="12" y2="9" /><line x1="12" y1="15" x2="12" y2="20" /><line x1="4" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="20" y2="12" /></>,
    person: <><circle cx="12" cy="8" r="3.5" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>,
    measure:<><polyline points="4 16 9 10 14 13 20 6" /><line x1="4" y1="20" x2="20" y2="20" opacity=".4" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={{ display: "inline-block", flexShrink: 0 }}>
      {paths[name] || paths.check}
    </svg>
  );
}

/* ── Botón WA ─────────────────────────────────────── */
function BtnWA({ variant = "primary", size = "lg", children = "Hablemos por WhatsApp" }) {
  const [h, setH] = useState(false);
  const sz = { sm: { padding: "7px 16px", fontSize: 13 }, lg: { padding: "13px 28px", fontSize: 15 } };
  const sk = {
    primary: { background: h ? C.bordoHover : C.bordo, color: C.beige, border: `1px solid ${C.bordo}` },
    secondary: { background: h ? "#f7f2ec" : C.blanco, color: C.bordo, border: `1px solid ${C.bordo}` },
    inverse: { background: h ? C.blanco : C.beige, color: C.bordo, border: `1px solid ${C.beige}` },
  };
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none",
        fontFamily: SANS, fontWeight: 600, letterSpacing: ".01em", lineHeight: 1.1, borderRadius: 4,
        transition: "background .18s ease, color .18s ease", ...sz[size], ...sk[variant] }}>
      {children}
    </a>
  );
}

/* ── datos ────────────────────────────────────────── */
const PROBLEMAS = [
  { icon: "redes",   title: "Diferentes proveedores. Diferentes estrategias.", desc: "Cada proveedor ejecuta su área sin una estrategia integral que los coordine." },
  { icon: "person",  title: "El marketing lo planificás vos.", desc: "La planificación y ejecución dependen de tu disponibilidad permanente." },
  { icon: "measure", title: "Invertís sin medir el retorno.", desc: "Reportes aislados de cada proveedor, sin un tablero que muestre el resultado conjunto." },
  { icon: "crm",     title: "Los leads no tienen seguimiento.", desc: "No hay registro de origen ni proceso definido para convertirlos en oportunidades de venta." },
];

const CANALES = [
  { ico: "redes", label: "Redes sociales", sub: "Instagram · LinkedIn" },
  { ico: "pauta", label: "Pauta digital",  sub: "Meta Ads · Google Ads" },
  { ico: "sitio", label: "Sitio web",      sub: "Estructura · medición" },
  { ico: "email", label: "Email marketing",sub: "Envíos · secuencias" },
];

const ETAPAS = [
  { num: "01", name: "Presencia",   desc: "La base digital de la empresa. Presencia y mensajes consistentes donde están los clientes.",     channels: "Sitio web · Instagram · LinkedIn" },
  { num: "02", name: "Crecimiento", desc: "Generación continua de demanda, sin depender exclusivamente de alcance orgánico.",               channels: "Meta Ads · Google Ads" },
  { num: "03", name: "Nutrición",   desc: "Seguimiento de cada contacto hasta la conversación de venta.",                                   channels: "Email Marketing" },
];

/* ── whatsapp flotante ────────────────────────────── */
function FloatingWA() {
  const [h, setH] = useState(false);
  return (
    <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Escribinos por WhatsApp"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "fixed", right: "clamp(16px, 3vw, 28px)", bottom: "clamp(16px, 3vw, 28px)", zIndex: 90,
        width: 52, height: 52, borderRadius: "50%",
        background: h ? C.bordoHover : C.bordo, color: C.beige,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(107,31,42,.30)",
        transform: h ? "translateY(-2px)" : "none",
        transition: "background .18s ease, transform .18s ease" }}>
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
      </svg>
    </a>
  );
}

/* ════════════════════════════════════════════════════
   PÁGINA
   ════════════════════════════════════════════════════ */
export default function NeriniWeb() {
  useBrandFonts();

  return (
    <div style={{ fontFamily: SANS, color: C.negro, background: C.blanco, overflowX: "hidden", textWrap: "pretty" }}>

      {/* ── NAV ─────────────────────────────────────── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: C.blanco, borderBottom: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD_X}`, minHeight: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#top" style={{ display: "inline-flex", color: "inherit", textDecoration: "none" }}>
            <Logo size={20} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 32px)" }}>
            <a href="#quien" style={{ fontSize: 13, fontWeight: 500, color: C.grisTexto, textDecoration: "none", letterSpacing: ".01em" }}>Quién dirige</a>
            <a href="#sistema" style={{ fontSize: 13, fontWeight: 500, color: C.grisTexto, textDecoration: "none", letterSpacing: ".01em" }}>El sistema</a>
            <BtnWA variant="secondary" size="sm">WhatsApp</BtnWA>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────── */}
      <section id="top" style={{ position: "relative", background: C.blanco, minHeight: "min(64vh, 640px)", display: "flex", alignItems: "center", padding: `clamp(100px, 11vh, 136px) ${PAD_X} clamp(48px, 6vh, 80px)`, overflow: "hidden" }}>
        {/* Diagonal decorativa en malva */}
        <DiagonalAccent side="right" color={C.malva} opacity={1} />

        <div style={{ position: "relative", maxWidth: MAX, margin: "0 auto", width: "100%" }}>
          {/* Eyebrow */}
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: C.bordo, marginBottom: 24 }}>
              ESTRATEGIA · EJECUCIÓN · MEDICIÓN
            </div>
          </Reveal>

          {/* Título principal */}
          <Reveal delay={60}>
            <h1 style={{ fontWeight: 300, fontSize: "clamp(36px, min(5.2vw, 8vh), 62px)", lineHeight: 1.08, letterSpacing: "-.02em", color: C.negro, margin: "0 0 28px", maxWidth: "14em" }}>
              Departamento Externo<br />de Marketing
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p style={{ fontSize: "clamp(16px, 1.6vw, 19px)", color: C.grisTexto, lineHeight: 1.7, margin: "0 0 36px", maxWidth: "34em", fontWeight: 300 }}>
              Somos el Departamento Externo de Marketing de empresas de servicios sin equipo interno. Dirigimos la estrategia y ejecutamos redes, pauta, sitio y email marketing con nuestro equipo, bajo un mismo sistema de seguimiento y medición.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <BtnWA />
              <span style={{ fontSize: 13, color: C.grisClaro }}>Para empresas de servicios sin equipo interno.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ¿TE ESTÁ PASANDO ESTO? ───────────────────── */}
      <section style={{ background: C.blanco, padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(30px, 4vw, 48px)", color: C.negro, lineHeight: 1.12, letterSpacing: "-.01em", margin: `0 0 clamp(28px, 3.5vw, 44px)` }}>
              ¿Te está pasando esto?
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 1, background: C.grisBorde }}>
            {PROBLEMAS.map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ background: C.blanco, padding: "clamp(24px, 3vw, 36px)" }}>
                  <div style={{ marginBottom: 18, color: C.bordo }}>
                    <Icon name={item.icon} size={28} color={C.bordo} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: C.negro, lineHeight: 1.4, marginBottom: 10 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: C.grisTexto, lineHeight: 1.75 }}>{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIÉN DIRIGE ────────────────────────────── */}
      <section id="quien" style={{ background: C.blanco, padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}`, scrollMarginTop: 64 }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: C.grisTexto, marginBottom: 16 }}>
              QUIÉN DIRIGE
            </div>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(30px, 4vw, 48px)", color: C.negro, lineHeight: 1.12, letterSpacing: "-.01em", margin: `0 0 clamp(32px, 4vw, 52px)` }}>
              Directora de Marketing
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
            {/* Foto */}
            <Reveal style={{ flex: "0 0 auto" }}>
              <div style={{ width: "clamp(200px, 22vw, 280px)", aspectRatio: "1 / 1", border: `1px solid ${C.grisBorde}`, overflow: "hidden", background: C.blanco }}>
                {FOTO_DEBORA
                  ? <img src={FOTO_DEBORA} alt="Debora Nerini" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  : <span style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: C.grisClaro }}>Foto de Debora</span>
                }
              </div>
            </Reveal>

            {/* Texto */}
            <div style={{ flex: "1 1 360px", minWidth: 280 }}>
              <Reveal>
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontWeight: 300, fontSize: "clamp(22px, 2.6vw, 30px)", color: C.negro }}>Debora Nerini</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: C.bordo, marginBottom: 20 }}>
                  Directora de Marketing
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", fontSize: 13, color: C.grisTexto, marginBottom: 24, lineHeight: 1.6 }}>
                  <span>Lic. en Comercialización</span>
                  <span style={{ color: C.grisBorde }}>·</span>
                  <span>Especialización en Marketing Digital</span>
                  <span style={{ color: C.grisBorde }}>·</span>
                  <span>15 años en grandes empresas</span>
                </div>
                <div style={{ height: 1, background: C.grisBorde, marginBottom: 24 }} />
              </Reveal>

              <Reveal delay={80}>
                <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: C.grisTexto, lineHeight: 1.8, margin: "0 0 18px", maxWidth: "38em" }}>
                  Dirijo el marketing de cada empresa: defino el plan, coordino las áreas con nuestro equipo de especialistas y respondo por el resultado.
                </p>
                <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: C.grisTexto, lineHeight: 1.8, margin: 0, maxWidth: "38em" }}>
                  El marketing pasa a funcionar como un sistema ordenado y constante, sin depender de la disponibilidad del dueño.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── EL SISTEMA ──────────────────────────────── */}
      <section id="sistema" style={{ background: C.blanco, padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}`, scrollMarginTop: 64 }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>

          <Reveal style={{ marginBottom: "clamp(32px, 4vw, 52px)" }}>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(30px, 4vw, 48px)", color: C.negro, lineHeight: 1.12, letterSpacing: "-.01em", margin: "0 0 16px" }}>
              El sistema
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: C.grisTexto, lineHeight: 1.75, margin: 0, maxWidth: "40em", fontWeight: 300 }}>
              Estructuramos el servicio en etapas para asegurar que funcione. Analizamos la situación de cada empresa y corregimos lo necesario antes de arrancar.
            </p>
          </Reveal>

          {/* Diagrama: Dirección de Marketing → canales → CRM */}
          <Reveal>
            {/* Bloque superior: Dirección de Marketing */}
            <div style={{ background: C.blanco, border: `1px solid ${C.grisBorde}`, borderLeft: `4px solid ${C.bordo}`, padding: "18px 28px", marginBottom: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: C.bordo, marginBottom: 4 }}>
                LA BASE TRANSVERSAL
              </div>
              <div style={{ fontWeight: 600, fontSize: 18, color: C.negro, letterSpacing: ".01em" }}>
                Dirección de Marketing
              </div>
            </div>

            {/* Línea vertical */}
            <div style={{ display: "flex", justifyContent: "center", padding: "0" }}>
              <div style={{ width: 1, height: 20, background: C.grisBorde }} />
            </div>

            {/* 4 canales */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, background: C.grisBorde, marginBottom: 1 }}>
              {CANALES.map((c, i) => (
                <div key={i} style={{ background: C.blanco, padding: "20px 22px" }}>
                  <div style={{ marginBottom: 12, color: C.bordo }}>
                    <Icon name={c.ico} size={22} color={C.bordo} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.negro, marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: C.grisTexto }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Línea vertical */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: 1, height: 20, background: C.grisBorde }} />
            </div>

            {/* Sistema Centralizado */}
            <div style={{ background: C.blanco, border: `1px solid ${C.grisBorde}`, padding: "20px 28px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: C.grisTexto, marginBottom: 4 }}>
                SISTEMA CENTRALIZADO
              </div>
              <div style={{ fontSize: 14, color: C.negro, lineHeight: 1.6 }}>
                Contactos · automatizaciones · seguimiento · medición
              </div>
            </div>
          </Reveal>

          {/* Separador */}
          <div style={{ height: 1, background: C.grisBorde, margin: "clamp(40px, 5vw, 64px) 0" }} />

          {/* Etapas: Presencia / Crecimiento / Nutrición */}
          <Reveal style={{ marginBottom: "clamp(24px, 3vw, 36px)" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: C.grisTexto, marginBottom: 12 }}>
              PUESTA EN MARCHA
            </div>
            <div style={{ fontSize: 13, color: C.bordo, fontWeight: 600, letterSpacing: ".06em" }}>
              01 Presencia &nbsp;/&nbsp; 02 Crecimiento &nbsp;/&nbsp; 03 Nutrición
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: C.grisBorde }}>
            {ETAPAS.map((s, i) => (
              <Reveal key={s.num} delay={i * 60}>
                <div style={{ background: C.blanco, padding: "clamp(24px, 3vw, 36px)" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", color: C.bordo, marginBottom: 12 }}>{s.num}</div>
                  <div style={{ fontWeight: 600, fontSize: 20, color: C.negro, marginBottom: 12, lineHeight: 1.2 }}>{s.name}</div>
                  <p style={{ fontSize: 14, color: C.grisTexto, lineHeight: 1.75, margin: "0 0 20px" }}>{s.desc}</p>
                  <div style={{ fontSize: 12, color: C.grisTexto, letterSpacing: ".04em", borderTop: `1px solid ${C.grisBorde}`, paddingTop: 14 }}>{s.channels}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GESTIÓN DE LEADS ────────────────────────── */}
      <section style={{ background: C.blanco, padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(30px, 4vw, 48px)", color: C.negro, lineHeight: 1.12, letterSpacing: "-.01em", margin: `0 0 clamp(16px, 2vw, 24px)` }}>
              Gestión de leads
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: C.grisTexto, lineHeight: 1.8, margin: `0 0 clamp(28px, 3.5vw, 44px)`, maxWidth: "46em", fontWeight: 300 }}>
              Integramos todos los canales de comunicación de tu empresa en un CRM, para que cada contacto cuente con registro de origen y seguimiento activo hasta convertirse en cliente.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 1, background: C.grisBorde, marginBottom: 1 }}>
              {/* Canales digitales */}
              <div style={{ background: C.blanco, padding: "clamp(24px, 3vw, 36px)" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: C.grisTexto, marginBottom: 16 }}>
                  Canales digitales
                </div>
                {["Redes sociales", "Pauta digital", "Sitio web", "WhatsApp"].map(l => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.grisBorde}`, fontSize: 14, color: C.negro }}>
                    <Icon name="check" size={14} color={C.bordo} />
                    {l}
                  </div>
                ))}
              </div>
              {/* Canales offline */}
              <div style={{ background: C.blanco, padding: "clamp(24px, 3vw, 36px)" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: C.grisTexto, marginBottom: 16 }}>
                  Canales offline
                </div>
                {["Eventos y ferias", "Referidos"].map(l => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: `1px solid ${C.grisBorde}`, fontSize: 14, color: C.negro }}>
                    <Icon name="check" size={14} color={C.bordo} />
                    {l}
                  </div>
                ))}
              </div>
            </div>

            {/* Flecha */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 0" }}>
              <div style={{ width: 1, height: 24, background: C.grisBorde }} />
            </div>

            {/* CRM */}
            <div style={{ background: C.blanco, border: `1px solid ${C.grisBorde}`, padding: "clamp(24px, 3vw, 36px)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px 48px", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 300, fontSize: "clamp(22px, 2.4vw, 28px)", color: C.negro, lineHeight: 1.2, marginBottom: 6 }}>
                    Sistema Centralizado
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", color: C.bordo, textTransform: "uppercase" }}>
                    Todo en un CRM
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Registro de origen de cada contacto.", "Historial de puntos de contacto.", "Seguimiento activo de leads fríos."].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: C.grisTexto, lineHeight: 1.5 }}>
                      <Icon name="check" size={14} color={C.bordo} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tablero */}
            <div style={{ background: C.blanco, border: `1px solid ${C.grisBorde}`, padding: "clamp(20px, 2.5vw, 28px)", marginTop: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <Icon name="chart" size={20} color={C.bordo} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: C.negro }}>Tablero de medición</div>
                  <div style={{ fontSize: 14, color: C.grisTexto, marginTop: 3, lineHeight: 1.6 }}>
                    Seguimiento de redes sociales, sitio web, pauta digital, email marketing y medición comercial.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────── */}
      <section style={{ position: "relative", background: C.bordo, padding: `clamp(52px, 6.5vw, 88px) ${PAD_X}`, overflow: "hidden" }}>
        <DiagonalAccent side="right" color="rgba(223,214,225,0.18)" opacity={1} />
        <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(30px, 4.2vw, 50px)", color: C.beige, lineHeight: 1.12, letterSpacing: "-.01em", margin: "0 0 20px" }}>
              ¿Querés tener un equipo externo de marketing?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(16px, 1.6vw, 19px)", color: C.cueroClaro, lineHeight: 1.5, margin: "0 0 36px" }}>
              Agendemos una reunión y te cuento cómo podemos trabajar.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <BtnWA variant="inverse" />
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer style={{ background: C.negro, padding: `clamp(40px, 5vw, 56px) ${PAD_X} 28px`, borderTop: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 36 }}>
          <Logo dark size={22} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <a href="mailto:debora@nerini.ar" style={{ fontSize: 14, color: C.beige, textDecoration: "none" }}>debora@nerini.ar</a>
            <a href="https://nerini.ar" style={{ fontSize: 14, color: C.cueroClaro, textDecoration: "none" }}>nerini.ar</a>
          </div>
        </div>
        <div style={{ maxWidth: MAX, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,.12)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 11, color: C.cueroClaro, opacity: 0.7 }}>© 2026 NERINI. Todos los derechos reservados.</span>
          <span style={{ fontSize: 11, color: C.cueroClaro, opacity: 0.6, letterSpacing: ".08em" }}>DEPARTAMENTO EXTERNO DE MARKETING</span>
        </div>
      </footer>

      <FloatingWA />
    </div>
  );
}
