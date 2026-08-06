import { useState, useEffect, useRef } from "react";

/**
 * NERINI — sitio web (versión corregida)
 * Pegar este archivo en Lovable como src/pages/Index.jsx (o src/App.jsx) y renderizar <NeriniWeb />.
 *
 * FOTO: reemplazar FOTO_DEBORA por la URL de la foto (subirla al proyecto e importarla,
 * o pegar un link). Si queda en null se muestra un recuadro gris con leyenda.
 */

const FOTO_DEBORA = "/debora.png";

const WA =
  "https://wa.me/5491122419299?text=Hola%20Debora%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20servicios";

const C = {
  bordo: "#6B1F2A",
  bordoHover: "#571821",
  bordoMedio: "#9B5059",
  cuero: "#A0714A",
  cueroClaro: "#D4B896",
  beige: "#FAF5EE",
  negro: "#3A1A1F",
  grisBg: "#FAFAFA",
  grisBorde: "#E8E2D9",
  grisTexto: "#6B6660",
  grisClaro: "#A8A39E",
};

const SANS = "'Raleway','Open Sans',system-ui,-apple-system,sans-serif";
const LOGO_FONT = "'Arimo','Liberation Sans',Arial,Helvetica,sans-serif";

const PAD_X = "clamp(20px, 5vw, 48px)";
const PAD_Y = "clamp(56px, 8vw, 96px)";
const MAX = 1120;

/* ── fuentes de marca ─────────────────────────────── */
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
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setV(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
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
        transform: v ? "none" : "translateY(16px)",
        transition: `opacity .6s cubic-bezier(.2,0,0,1) ${delay}ms, transform .6s cubic-bezier(.2,0,0,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── logo (construcción tipográfica del manual) ───── */
function Logo({ dark = false, size = 21 }) {
  return (
    <div style={{ lineHeight: 1, userSelect: "none", display: "inline-block" }}>
      <div
        style={{
          fontFamily: LOGO_FONT,
          fontWeight: 700,
          letterSpacing: ".02em",
          fontSize: size,
          color: dark ? C.beige : C.bordo,
        }}
      >
        NERINI
      </div>
      <div
        style={{
          height: Math.max(1, size * 0.045),
          background: dark ? C.cueroClaro : C.bordo,
          margin: `${size * 0.1}px 0`,
        }}
      />
      <div
        style={{
          fontFamily: SANS,
          fontWeight: 400,
          fontSize: size * 0.35,
          letterSpacing: ".34em",
          color: dark ? C.cueroClaro : C.cuero,
        }}
      >
        MARKETING
      </div>
    </div>
  );
}

/* ── patrón N (solo portadas / secciones de impacto) ─ */
function Pattern({ cell = 96, opacity = 0.06, color = C.bordo }) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, ${cell}px)`,
        gridAutoRows: `${cell}px`,
        placeItems: "center",
        opacity,
        color,
        fontFamily: LOGO_FONT,
        fontWeight: 700,
        fontSize: cell * 0.5,
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      {Array.from({ length: 240 }).map((_, i) => (
        <span key={i}>N</span>
      ))}
    </span>
  );
}

/* ── set de iconos de trazo (§07) ─────────────────── */
const PATHS = {
  check: <polyline points="4 12.5 9.5 18 20 6" />,
  action: (
    <>
      <line x1="4" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </>
  ),
  focus: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  modules: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.2" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" />
      <rect x="4" y="13" width="7" height="7" rx="1.2" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" />
    </>
  ),
  planning: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="1.6" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="8" y1="3.5" x2="8" y2="7" />
      <line x1="16" y1="3.5" x2="16" y2="7" />
    </>
  ),
  client: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  coordination: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <line x1="7.7" y1="7.7" x2="10.6" y2="16" />
      <line x1="16.3" y1="7.7" x2="13.4" y2="16" />
      <line x1="8.4" y1="6" x2="15.6" y2="6" />
    </>
  ),
};

function Icon({ name = "check", size = 16, color = C.bordo }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      {PATHS[name] || PATHS.check}
    </svg>
  );
}

/* ── iconos de sección (mismo estilo de trazo) ────── */
const IcoProveedores = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="16" r="3.5" />
    <circle cx="26" cy="7" r="3.5" />
    <circle cx="26" cy="25" r="3.5" />
    <line x1="9" y1="15" x2="22.5" y2="9" strokeDasharray="3 2.5" />
    <line x1="9" y1="17" x2="22.5" y2="23" strokeDasharray="3 2.5" />
    <line x1="15" y1="9" x2="15" y2="23" strokeDasharray="3 2.5" opacity=".35" />
  </svg>
);
const IcoDuenio = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="6" r="3" />
    <path d="M16 9v8" />
    <path d="M10 28l6-11 6 11" />
    <path d="M7 17h5M20 17h5" />
    <path d="M7 17l3-4M25 17l-3-4" />
  </svg>
);
const IcoMedicion = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,24 10,16 15,20 22,10 28,14" />
    <circle cx="28" cy="8" r="3" />
    <line x1="26" y1="10" x2="28" y2="13" />
  </svg>
);
const IcoLeads = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="4" />
    <path d="M4 26c0-4 3.6-8 8-8h4" />
    <line x1="22" y1="18" x2="28" y2="18" strokeDasharray="2.5 2" />
    <line x1="22" y1="22" x2="28" y2="22" strokeDasharray="2.5 2" />
    <line x1="22" y1="26" x2="28" y2="26" strokeDasharray="2.5 2" />
  </svg>
);
const IcoGlobo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="13" />
    <ellipse cx="18" cy="18" rx="5.5" ry="13" />
    <line x1="5" y1="18" x2="31" y2="18" />
    <line x1="7.5" y1="11" x2="28.5" y2="11" />
    <line x1="7.5" y1="25" x2="28.5" y2="25" />
  </svg>
);
const IcoTrend = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,28 12,18 18,22 28,10" />
    <polyline points="22,10 28,10 28,16" />
    <line x1="4" y1="28" x2="32" y2="28" opacity=".3" />
  </svg>
);
const IcoLoop = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 18a8 8 0 0 1 16 0" />
    <polyline points="22,13 26,18 30,13" />
    <path d="M26 18a8 8 0 0 1-16 0" />
    <polyline points="14,23 10,18 6,23" />
  </svg>
);

/* ── botón ────────────────────────────────────────── */
function BtnWA({ variant = "primary", size = "lg", children = "Hablemos por WhatsApp" }) {
  const [h, setH] = useState(false);
  const sizes = {
    sm: { padding: "7px 14px", fontSize: 13 },
    lg: { padding: "13px 28px", fontSize: 15 },
  };
  const skins = {
    primary: { background: h ? C.bordoHover : C.bordo, color: C.beige, borderColor: C.bordo },
    secondary: { background: h ? C.grisBg : "#fff", color: C.bordo, borderColor: C.bordo },
  };
  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        fontFamily: SANS,
        fontWeight: 600,
        letterSpacing: ".01em",
        lineHeight: 1.1,
        borderRadius: 6,
        border: "1px solid",
        transition: "background .18s ease, color .18s ease",
        ...sizes[size],
        ...skins[variant],
      }}
    >
      {children}
    </a>
  );
}

/* ── card ─────────────────────────────────────────── */
function Card({ variant = "default", accentTop = false, children, style = {} }) {
  const fills = {
    default: { background: C.grisBg, border: `1px solid ${C.grisBorde}` },
    plain: { background: "#fff", border: `1px solid ${C.grisBorde}` },
    brand: { background: C.bordo, border: `1px solid ${C.bordo}` },
  };
  return (
    <div
      style={{
        borderRadius: 12,
        padding: 28,
        height: "100%",
        boxShadow: variant === "brand" ? "none" : "0 1px 2px rgba(58,26,31,.04)",
        ...fills[variant],
        ...(accentTop ? { borderTop: `3px solid ${C.bordo}` } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const eyebrow = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: C.bordoMedio,
};
const h2 = {
  fontWeight: 300,
  fontSize: "clamp(30px, 4vw, 46px)",
  color: C.negro,
  lineHeight: 1.15,
};
const chip = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  background: "#fff",
  border: `1px solid ${C.grisBorde}`,
  borderRadius: 6,
  fontSize: 14,
  color: C.negro,
};

/* ── datos ────────────────────────────────────────── */
const PROBLEMAS = [
  { icon: <IcoProveedores />, title: "Diferentes proveedores. Diferentes estrategias.", desc: "Cada proveedor ejecuta su área sin una estrategia integral." },
  { icon: <IcoDuenio />, title: "El marketing lo planificás vos.", desc: "La planificación y ejecución dependen de tu disponibilidad permanente." },
  { icon: <IcoMedicion />, title: "Invertís dinero y tiempo sin medir retorno.", desc: "Reportes aislados de cada proveedor, sin un tablero que muestre el resultado conjunto." },
  { icon: <IcoLeads />, title: "Leads sin seguimiento.", desc: "No hay registro de origen ni proceso definido para convertirlos en oportunidades de venta." },
];

const CENTRALIZADO = [
  "Todos los canales integrados en un CRM con flujos automatizados.",
  "Cada lead registrado con su origen y seguimiento activo.",
  "Cada inversión medida contra resultado.",
  "Todo centralizado en un solo tablero.",
];

const DIGITALES = [
  ["coordination", "Redes sociales"],
  ["focus", "Pauta digital"],
  ["modules", "Sitio web"],
];
const OFFLINE = [
  ["planning", "Eventos y ferias"],
  ["client", "Referidos"],
  ["action", "WhatsApp directo"],
];
const CRM = ["Respuesta automatizada.", "Historial de puntos de contacto.", "Tratamiento de leads fríos."];

const ETAPAS = [
  { icon: <IcoGlobo />, num: "01", name: "Presencia", desc: "La base digital de la empresa. Presencia y mensajes consistentes donde están los clientes.", channels: "Sitio web · Instagram · LinkedIn" },
  { icon: <IcoTrend />, num: "02", name: "Crecimiento", desc: "Generación continua de demanda, sin depender exclusivamente de alcance orgánico.", channels: "Meta Ads · Google Ads" },
  { icon: <IcoLoop />, num: "03", name: "Nutrición", desc: "Seguimiento de cada contacto hasta la conversación de venta.", channels: "Email Marketing" },
];

/* ── página ───────────────────────────────────────── */
export default function NeriniWeb() {
  useBrandFonts();

  return (
    <div style={{ fontFamily: SANS, color: C.negro, background: "#fff", overflowX: "hidden", textWrap: "pretty" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#fff", borderBottom: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD_X}`, minHeight: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#top" style={{ display: "inline-flex" }}>
            <Logo size={21} />
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 3vw, 32px)" }}>
            <a href="#sistema" style={{ fontSize: 14, fontWeight: 500, color: C.grisTexto, textDecoration: "none" }}>El sistema</a>
            <a href="#quien" style={{ fontSize: 14, fontWeight: 500, color: C.grisTexto, textDecoration: "none" }}>Quién dirige</a>
            <BtnWA variant="secondary" size="sm">WhatsApp</BtnWA>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" style={{ position: "relative", minHeight: "min(88vh, 900px)", display: "flex", alignItems: "center", padding: `clamp(120px, 16vh, 180px) ${PAD_X} clamp(64px, 10vh, 110px)`, overflow: "hidden" }}>
        <Pattern />
        <div style={{ position: "relative", maxWidth: MAX, margin: "0 auto", width: "100%" }}>
          <Reveal>
            <h1 style={{ fontWeight: 300, fontSize: "clamp(40px, 6.6vw, 76px)", lineHeight: 1.06, letterSpacing: "-.02em", color: C.negro, margin: "0 0 28px" }}>
              El área de marketing<br />que tu empresa<br />necesita
            </h1>
          </Reveal>
          <Reveal delay={90}>
            <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px, 1.9vw, 22px)", color: C.grisTexto, lineHeight: 1.55, margin: "0 0 44px", maxWidth: "32em" }}>
              Ayudo a empresas de servicios sin equipo de marketing a posicionarse y generar oportunidades de venta, a través de un sistema que centraliza, automatiza y mide todas sus acciones.
            </p>
          </Reveal>
          <Reveal delay={170}>
            <BtnWA />
          </Reveal>
        </div>
      </section>

      {/* PROBLEMA */}
      <section style={{ background: "#fff", padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ ...h2, margin: "0 0 clamp(36px, 5vw, 56px)" }}>¿Te está pasando esto?</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PROBLEMAS.map((item, i) => (
              <Reveal key={i} delay={i * 70}>
                <Card>
                  <div style={{ color: C.bordo, marginBottom: 20 }}>{item.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: C.negro, lineHeight: 1.35, marginBottom: 10 }}>{item.title}</div>
                  <div style={{ fontSize: 15, color: C.grisTexto, lineHeight: 1.7 }}>{item.desc}</div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETING CENTRALIZADO */}
      <section style={{ background: C.grisBg, padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
          <Reveal style={{ flex: "1 1 380px", minWidth: 300 }}>
            <h2 style={{ ...h2, margin: "0 0 28px" }}>Marketing centralizado</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {CENTRALIZADO.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 16, color: C.grisTexto, lineHeight: 1.65 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.cuero, flexShrink: 0, marginTop: 9 }} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={90} style={{ flex: "1 1 420px", minWidth: 300 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
              <div style={{ flex: "1 1 200px", minWidth: 190 }}>
                <div style={{ ...eyebrow, marginBottom: 10 }}>Canales digitales</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {DIGITALES.map(([ico, label]) => (
                    <div key={label} style={chip}>
                      <Icon name={ico} color={C.cuero} />
                      {label}
                    </div>
                  ))}
                </div>
                <div style={{ ...eyebrow, margin: "18px 0 10px" }}>Canales offline</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {OFFLINE.map(([ico, label]) => (
                    <div key={label} style={chip}>
                      <Icon name={ico} color={C.cuero} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}>
                <Icon name="action" size={22} color={C.cuero} />
              </div>

              <div style={{ flex: "1 1 220px", minWidth: 210 }}>
                <Card variant="brand">
                  <div style={{ fontWeight: 300, fontSize: 26, color: C.beige, lineHeight: 1.1, marginBottom: 8 }}>Sistema Centralizado</div>
                  <div style={{ fontSize: 10, letterSpacing: ".14em", fontWeight: 600, color: C.cueroClaro, textTransform: "uppercase", marginBottom: 16 }}>Todo en un CRM</div>
                  <div style={{ width: 28, height: 1, background: C.cueroClaro, opacity: 0.5, marginBottom: 18 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {CRM.map((t) => (
                      <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: C.beige, lineHeight: 1.5 }}>
                        <Icon name="check" size={15} color={C.cueroClaro} />
                        {t}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUIÉN DIRIGE */}
      <section id="quien" style={{ background: "#fff", padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}`, scrollMarginTop: 68 }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "clamp(40px, 6vw, 80px)", alignItems: "flex-start" }}>
          <Reveal style={{ flex: "1 1 280px", maxWidth: 340, minWidth: 240 }}>
            <div style={{ width: "100%", aspectRatio: "3 / 4", border: `1px solid ${C.grisBorde}`, borderRadius: 8, overflow: "hidden", background: C.grisBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {FOTO_DEBORA ? (
                <img src={FOTO_DEBORA} alt="Debora Nerini" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <span style={{ fontSize: 12, color: C.grisClaro }}>Foto de Debora</span>
              )}
            </div>
            <div style={{ marginTop: 24, fontSize: 14, color: C.grisTexto, lineHeight: 1.9 }}>
              Lic. en Comercialización<br />
              Especialización en Marketing Digital<br />
              15 años en grandes empresas
            </div>
          </Reveal>

          <div style={{ flex: "1 1 420px", minWidth: 300 }}>
            <Reveal>
              <div style={{ ...eyebrow, fontSize: 12, marginBottom: 20 }}>Quién dirige</div>
              <h2 style={{ ...h2, margin: "0 0 8px" }}>Debora Nerini</h2>
              <div style={{ fontWeight: 600, fontSize: 16, color: C.cuero, marginBottom: 32 }}>Responsable Externa de Marketing</div>
            </Reveal>
            <div style={{ borderTop: `1px solid ${C.grisBorde}`, marginBottom: 32 }} />
            <Reveal delay={80}>
              <h3 style={{ fontWeight: 300, fontSize: "clamp(22px, 2.6vw, 30px)", color: C.negro, lineHeight: 1.25, margin: "0 0 24px" }}>
                Una sola persona.<br />Todo el marketing<br />de tu empresa.
              </h3>
              <p style={{ fontSize: 17, color: C.grisTexto, lineHeight: 1.8, margin: 0, maxWidth: "40em" }}>
                Dirijo el marketing de la empresa: defino el plan, coordino a los proveedores que ejecutan y respondo por el resultado. El marketing pasa a funcionar como un sistema, sin requerir tu seguimiento permanente.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EL SISTEMA */}
      <section id="sistema" style={{ background: C.grisBg, padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}`, scrollMarginTop: 68 }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: "clamp(36px, 5vw, 56px)" }}>
            <h2 style={{ ...h2, margin: "0 0 20px" }}>El sistema</h2>
            <p style={{ fontSize: 17, fontStyle: "italic", fontWeight: 300, color: C.grisTexto, lineHeight: 1.6, margin: 0, maxWidth: "42em" }}>
              El recorrido es el mismo para todos. El punto de partida lo define el estado actual de la empresa.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 16 }}>
            {ETAPAS.map((s, i) => (
              <Reveal key={s.num} delay={i * 70}>
                <Card variant="plain" accentTop>
                  <div style={{ color: C.bordo, marginBottom: 28 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.grisClaro, letterSpacing: ".14em", marginBottom: 12 }}>{s.num}</div>
                  <div style={{ fontWeight: 600, fontSize: 21, color: C.negro, marginBottom: 14 }}>{s.name}</div>
                  <p style={{ fontSize: 15, color: C.grisTexto, lineHeight: 1.75, margin: "0 0 24px" }}>{s.desc}</p>
                  <div style={{ fontSize: 13, color: C.grisClaro, letterSpacing: ".04em" }}>{s.channels}</div>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220}>
            <div style={{ background: "#fff", border: `1px solid ${C.grisBorde}`, borderLeft: `3px solid ${C.bordo}`, borderRadius: 12, padding: "22px 28px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <Icon name="planning" size={22} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: C.negro }}>Dirección de Marketing</div>
                <div style={{ fontSize: 15, color: C.grisTexto, marginTop: 4, lineHeight: 1.6 }}>La base transversal del sistema. Incluida en las tres etapas desde el primer día.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ position: "relative", background: C.bordo, padding: `clamp(64px, 9vw, 110px) ${PAD_X}`, overflow: "hidden" }}>
        <Pattern opacity={0.1} color={C.cueroClaro} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(32px, 5vw, 58px)", color: C.beige, lineHeight: 1.1, margin: "0 0 28px" }}>
              ¿Querés tener un equipo externo de marketing?
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px, 2vw, 21px)", color: C.cueroClaro, lineHeight: 1.5, margin: "0 0 48px" }}>
              Agendemos una reunión y te cuento cómo podemos trabajar.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <BtnWA variant="secondary" />
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.negro, padding: `clamp(40px, 6vw, 56px) ${PAD_X} 28px` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <Logo dark size={24} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <a href="mailto:debora@nerini.ar" style={{ fontSize: 15, color: C.beige, textDecoration: "none" }}>debora@nerini.ar</a>
            <a href="https://nerini.ar" style={{ fontSize: 15, color: C.grisClaro, textDecoration: "none" }}>nerini.ar</a>
          </div>
        </div>
        <div style={{ maxWidth: MAX, margin: "0 auto", borderTop: "1px solid rgba(232,226,217,.14)", paddingTop: 24, textAlign: "center", fontSize: 12, color: C.grisClaro, opacity: 0.6 }}>
          © 2026 NERINI. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
