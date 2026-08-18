import { useState, useEffect, useRef } from "react";
import fotoDebora from "./debora.png";

/**
 * NERINI — sitio web
 * Repo: nerini-mkt/nerini-web · Archivo: App.jsx (raiz) · Deploy automatico en Vercel.
 * La foto se importa desde debora.png, en la misma carpeta.
 *
 * Actualizado a la estrategia vigente: Departamento Externo de Marketing,
 * cuatro areas ejecutadas con equipo propio, sistema centralizado.
 *
 * PENDIENTE:
 * - Reemplazar debora.png por una foto sin logo de terceros.
 * - Title, meta description y Open Graph: van en index.html, no en este archivo.
 */

const FOTO_DEBORA = fotoDebora;

const WA =
  "https://wa.me/5491122419299?text=Hola%20Debora%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20servicios";

const C = {
  bordo: "#6B1F2A",
  bordoHover: "#571821",
  bordoMedio: "#9B5059",
  cuero: "#A0714A",
  cueroTexto: "#8B5F3D",
  cueroClaro: "#D4B896",
  beige: "#FAF5EE",
  negro: "#3A1A1F",
  grisBorde: "#E8E2D9",
  grisTexto: "#6B6660",
  grisClaro: "#A8A39E",
};

const SANS = "'Raleway','Open Sans',system-ui,-apple-system,sans-serif";
const LOGO_FONT = "'Arimo','Liberation Sans',Arial,Helvetica,sans-serif";

const PAD_X = "clamp(20px, 5vw, 48px)";
const PAD_Y = "clamp(52px, 6.5vw, 84px)";
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

/* ── patrón N (solo hero y cierre) ─────────────────── */
function Pattern({ cell = 96, opacity = 0.028, color = C.bordo }) {
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
  site: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="1.8" />
      <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
      <line x1="6.4" y1="7.2" x2="6.5" y2="7.2" />
      <line x1="9.2" y1="7.2" x2="9.3" y2="7.2" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.8" />
      <polyline points="4.5 7.5 12 13 19.5 7.5" />
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
const IcoPresencia = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="26" height="19" rx="2" />
    <line x1="3" y1="10.5" x2="29" y2="10.5" />
    <circle cx="14" cy="17" r="4" />
    <line x1="17" y1="20" x2="21" y2="24" />
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
    secondary: { background: h ? C.beige : "#fff", color: C.bordo, borderColor: C.bordo },
    inverse: { background: h ? C.cueroClaro : C.beige, color: C.bordo, borderColor: h ? C.cueroClaro : C.beige },
    cuero: { background: h ? C.cuero : C.cueroTexto, color: C.beige, borderColor: h ? C.cuero : C.cueroTexto },
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
      <span style={{ whiteSpace: "nowrap" }}>{children}</span>
    </a>
  );
}

/* ── card ─────────────────────────────────────────── */
function Card({ variant = "plain", children, style = {} }) {
  const fills = {
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
  color: C.cueroTexto,
};
const h2 = {
  fontWeight: 300,
  fontSize: "clamp(34px, 4.6vw, 52px)",
  color: C.negro,
  lineHeight: 1.12,
  letterSpacing: "-.01em",
};
const SECTION_GAP = "clamp(32px, 4vw, 48px)";
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
const nota = { fontSize: 13, color: C.grisTexto, lineHeight: 1.6, margin: 0 };

/* ── datos ────────────────────────────────────────── */
const PROBLEMAS = [
  { icon: <IcoProveedores />, title: "Canales sin objetivo común", desc: "Redes, pauta y sitio operando cada uno con su propio criterio." },
  { icon: <IcoMedicion />, title: "Medición por canal, sin visión del conjunto", desc: "Cada plataforma informa sus métricas y ninguna se cruza con la otra." },
  { icon: <IcoPresencia />, title: "Presencia por debajo de la trayectoria", desc: "Lo que el cliente encuentra al buscar a la empresa no refleja su capacidad real." },
  { icon: <IcoLeads />, title: "Contactos sin registro ni seguimiento", desc: "Sin canal de origen, historial ni próximo paso definido." },
  { icon: <IcoDuenio />, title: "Un proveedor distinto por área", desc: "Cada uno con su formato de reporte y su interlocutor, y el dueño coordinando entre todos." },
];

const DIRECCION = {
  icon: "focus",
  title: "Dirección",
  desc: "Diagnóstico, plan mensual y reunión de resultados. Un solo interlocutor responsable.",
};

const AREAS = [
  { icon: "coordination", title: "Redes sociales", desc: "Instagram y LinkedIn: calendario, contenidos, diseño y publicación." },
  { icon: "action", title: "Pauta digital", desc: "Meta Ads y Google Ads: campañas, audiencias, piezas y optimización mensual." },
  { icon: "site", title: "Sitio web", desc: "Estructura y textos orientados a convertir, con el formulario conectado al sistema." },
  { icon: "mail", title: "Email marketing", desc: "Secuencias automáticas, segmentación de la base y envíos periódicos." },
];

const SISTEMA = {
  icon: "modules",
  title: "Sistema centralizado",
  desc: "Todos los canales en un solo lugar, con seguimiento automatizado y un único tablero.",
};

const TRABAJAMOS_CON = [
  "Empresas de servicios sin equipo interno de marketing",
  "Empresas que ya destinan un presupuesto mensual a marketing",
  "Empresas que necesitan generar oportunidades de venta de forma sostenida",
  "Dueños o socios dispuestos a delegar el área completa",
];
const NO_TRABAJAMOS_CON = [
  "Emprendimientos sin presupuesto para marketing",
  "Comercios minoristas",
  "Empresas que buscan contratar un área suelta y conservar el resto de sus proveedores",
];

const DIGITALES = [
  ["coordination", "Redes sociales"],
  ["action", "Pauta digital"],
  ["site", "Sitio web"],
  ["client", "WhatsApp"],
];
const OFFLINE = [
  ["planning", "Eventos y ferias"],
  ["check", "Referidos"],
];

const ETAPAS = [
  { icon: <IcoGlobo />, num: "01", name: "Presencia", desc: "La base digital de la empresa: sitio, Instagram y LinkedIn." },
  { icon: <IcoTrend />, num: "02", name: "Crecimiento", desc: "Generación continua de demanda con Meta Ads y Google Ads." },
  { icon: <IcoLoop />, num: "03", name: "Nutrición", desc: "Seguimiento de cada contacto hasta la conversación de venta, con email marketing y flujos automatizados." },
];

const PASOS = [
  { num: "01", title: "Reunión inicial", desc: "Media hora de conversación para revisar el estado actual de tu empresa y definir el punto de partida." },
  { num: "02", title: "Diagnóstico", desc: "Revisión del estado actual: canales, proveedores, medición y contactos." },
  { num: "03", title: "Puesta en marcha", desc: "Plan de marketing, roadmap y arranque de las primeras áreas." },
];

const PREGUNTAS = [
  {
    q: "¿Qué pasa con los proveedores que ya tengo?",
    a: "Redes, pauta y email marketing los ejecuta nuestro equipo, así que esas áreas dejan de estar en manos de tus proveedores actuales. Si hay un compromiso vigente, coordinamos una reunión de traspaso para tomar lo que ya funciona: audiencias, campañas y calendario. El sitio es la excepción: si ya tiene un proveedor a cargo, los cambios se coordinan con él.",
  },
  {
    q: "¿En cuánto tiempo se ven resultados?",
    a: "No trabajamos con promesas de resultado en un plazo. Cada área se pone en marcha según el estado en el que está hoy tu marketing, y la pauta se activa cuando el sitio y las redes ya están funcionando. Lo que sí está desde el primer mes es la medición: vas a ver qué entra, por qué canal y a qué costo.",
  },
  {
    q: "¿Por qué esto y no contratar a alguien interno?",
    a: "Un perfil interno cubre una parte del área, no el área completa. Redes, pauta, sitio, email marketing y medición son especialidades distintas, y en la práctica esa persona necesita proveedores adicionales para sostenerlas. El departamento incluye la dirección, la ejecución de las cuatro áreas y el sistema que las conecta, con un solo interlocutor responsable por el resultado.",
  },
  {
    q: "¿Cuál es el costo del servicio?",
    a: "Un fee mensual único, con todo el alcance incluido desde el primer mes. No hay planes ni módulos que se sumen y no hay costo de arranque aparte. La inversión publicitaria va aparte del fee: la define y la paga tu empresa. El monto está en la propuesta, que se envía después de la reunión inicial.",
  },
  {
    q: "¿Por qué pago el mes completo si la pauta todavía no arrancó?",
    a: "Los dos primeros meses concentran el trabajo más pesado: diagnóstico, ajuste del sitio, configuración del sistema y armado de los flujos de seguimiento. Ese trabajo no se factura aparte, va absorbido en el fee. La pauta se activa cuando el sitio y las redes están funcionando, porque amplifica lo que ya existe.",
  },
];

/* ── preguntas desplegables ───────────────────────── */
function Preguntas() {
  const [abierta, setAbierta] = useState(null);
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.grisBorde}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px rgba(58,26,31,.04)" }}>
      {PREGUNTAS.map((f, i) => {
        const abierto = abierta === i;
        return (
          <div key={f.q} style={{ borderTop: i === 0 ? "none" : `1px solid ${C.grisBorde}` }}>
            <button
              type="button"
              onClick={() => setAbierta(abierto ? null : i)}
              aria-expanded={abierto}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                padding: "clamp(20px, 2.4vw, 26px)",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontFamily: SANS,
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 17, color: abierto ? C.bordo : C.negro, lineHeight: 1.4, transition: "color .18s ease" }}>{f.q}</span>
              <span
                aria-hidden="true"
                style={{ display: "inline-flex", flexShrink: 0, transform: abierto ? "rotate(180deg)" : "none", transition: "transform .2s ease" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.bordo} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9.5 12 15.5 18 9.5" />
                </svg>
              </span>
            </button>
            {abierto && (
              <div style={{ padding: "0 clamp(20px, 2.4vw, 26px) clamp(22px, 2.6vw, 28px)" }}>
                <p style={{ fontSize: 16, color: C.grisTexto, lineHeight: 1.7, margin: 0, maxWidth: "64em" }}>{f.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── whatsapp flotante ────────────────────────────── */
function FloatingWA() {
  const [h, setH] = useState(false);
  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      title="Escribinos por WhatsApp"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: "fixed",
        right: "clamp(16px, 3vw, 28px)",
        bottom: "clamp(16px, 3vw, 28px)",
        zIndex: 90,
        width: 54,
        height: 54,
        borderRadius: "50%",
        background: h ? C.cueroTexto : C.cuero,
        color: C.beige,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 20px rgba(58,26,31,.24)",
        transform: h ? "translateY(-2px)" : "none",
        transition: "background .18s ease, transform .18s ease",
      }}
    >
      <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.8 11.8 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
      </svg>
    </a>
  );
}

/* ── página ───────────────────────────────────────── */
export default function NeriniWeb() {
  useBrandFonts();

  return (
    <div style={{ fontFamily: SANS, color: C.negro, background: "#fff", overflowX: "hidden", textWrap: "pretty" }}>
      {/* NAV */}
      <style>{`
        @media (max-width: 760px){ .nerini-nav-links > a { display: none; } }
        .nerini-areas { display: grid; grid-template-columns: repeat(4, 1fr); }
        .nerini-areas > div { border-right: 1px solid ${C.grisBorde}; }
        .nerini-areas > div:last-child { border-right: none; }
        @media (max-width: 900px){
          .nerini-areas { grid-template-columns: repeat(2, 1fr); }
          .nerini-areas > div:nth-child(2n) { border-right: none; }
          .nerini-areas > div:nth-child(-n+2) { border-bottom: 1px solid ${C.grisBorde}; }
        }
        @media (max-width: 560px){
          .nerini-areas { grid-template-columns: 1fr; }
          .nerini-areas > div { border-right: none; border-bottom: 1px solid ${C.grisBorde}; }
          .nerini-areas > div:last-child { border-bottom: none; }
        }
      `}</style>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#fff", borderBottom: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD_X}`, minHeight: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#top" style={{ display: "inline-flex", textDecoration: "none", color: "inherit" }}>
            <Logo size={21} />
          </a>
          <div className="nerini-nav-links" style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 2.6vw, 28px)" }}>
            <a href="#departamento" style={{ fontSize: 14, fontWeight: 500, color: C.cueroTexto, textDecoration: "none", whiteSpace: "nowrap" }}>El departamento</a>
            <a href="#sistema" style={{ fontSize: 14, fontWeight: 500, color: C.cueroTexto, textDecoration: "none", whiteSpace: "nowrap" }}>El sistema</a>
            <a href="#empezamos" style={{ fontSize: 14, fontWeight: 500, color: C.cueroTexto, textDecoration: "none", whiteSpace: "nowrap" }}>Primeros pasos</a>
            <BtnWA variant="primary" size="sm">WhatsApp</BtnWA>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" style={{ position: "relative", background: "#fff", minHeight: "min(62vh, 620px)", display: "flex", alignItems: "center", padding: `clamp(100px, 11vh, 132px) ${PAD_X} clamp(48px, 6vh, 72px)`, overflow: "hidden" }}>
        <Pattern opacity={0.11} color={C.cueroClaro} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, #fff 0%, #fff 46%, rgba(255,255,255,0) 78%)" }} />
        <div style={{ position: "relative", maxWidth: MAX, margin: "0 auto", width: "100%" }}>
          <Reveal>
            <h1 style={{ fontWeight: 300, fontSize: "clamp(38px, min(5.2vw, 8.4vh), 64px)", lineHeight: 1.08, letterSpacing: "-.02em", color: C.negro, margin: "0 0 26px" }}>
              El departamento<br />de marketing que<br />tu empresa no tiene
            </h1>
          </Reveal>
          <Reveal delay={90}>
            <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(17px, 1.7vw, 20px)", color: C.grisTexto, lineHeight: 1.55, margin: "0 0 32px", maxWidth: "32em" }}>
              Ayudamos a empresas de servicios sin equipo interno a tener todas las áreas del marketing ejecutadas por un solo equipo, con un sistema que centraliza, automatiza y mide todos los canales.
            </p>
          </Reveal>
          <Reveal delay={170}>
            <BtnWA variant="cuero">Pedí tu diagnóstico</BtnWA>
          </Reveal>
        </div>
      </section>

      {/* PROBLEMA */}
      <section style={{ background: "#fff", padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ ...h2, margin: `0 0 ${SECTION_GAP}` }}>Marketing sin dirección</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {PROBLEMAS.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <Card variant="plain">
                  <div style={{ color: C.cuero, marginBottom: 20 }}>{item.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: C.negro, lineHeight: 1.35, marginBottom: 10 }}>{item.title}</div>
                  <div style={{ fontSize: 16, color: C.grisTexto, lineHeight: 1.7 }}>{item.desc}</div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EL DEPARTAMENTO */}
      <section id="departamento" style={{ background: "#fff", padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}`, scrollMarginTop: 68 }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: SECTION_GAP }}>
            <h2 style={{ ...h2, margin: "0 0 20px" }}>Departamento Externo de Marketing</h2>
            <p style={{ fontSize: 17, fontStyle: "italic", fontWeight: 300, color: C.grisTexto, lineHeight: 1.6, margin: 0, maxWidth: "40em" }}>
              Todas las áreas del marketing de tu empresa, ejecutadas por un solo equipo y conectadas a un solo sistema.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ background: "#fff", border: `1px solid ${C.grisBorde}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px rgba(58,26,31,.04)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "clamp(20px, 2.4vw, 26px)", borderBottom: `1px solid ${C.grisBorde}` }}>
                <span style={{ marginTop: 3 }}>
                  <Icon name={DIRECCION.icon} size={22} />
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: C.negro, marginBottom: 8 }}>{DIRECCION.title}</div>
                  <div style={{ fontSize: 16, color: C.grisTexto, lineHeight: 1.7 }}>{DIRECCION.desc}</div>
                </div>
              </div>

              <div className="nerini-areas">
                {AREAS.map((a) => (
                  <div key={a.title} style={{ padding: "clamp(20px, 2.4vw, 26px)" }}>
                    <div style={{ marginBottom: 14 }}>
                      <Icon name={a.icon} size={22} />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 17, color: C.negro, marginBottom: 8 }}>{a.title}</div>
                    <div style={{ fontSize: 15, color: C.grisTexto, lineHeight: 1.65 }}>{a.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "clamp(20px, 2.4vw, 26px)", borderTop: `1px solid ${C.grisBorde}` }}>
                <span style={{ marginTop: 3 }}>
                  <Icon name={SISTEMA.icon} size={22} />
                </span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 17, color: C.negro, marginBottom: 8 }}>{SISTEMA.title}</div>
                  <div style={{ fontSize: 16, color: C.grisTexto, lineHeight: 1.7 }}>{SISTEMA.desc}</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p style={{ ...nota, marginTop: 16 }}>
              La inversión en pauta no está contemplada en el fee. La gestión comercial y el cierre quedan a cargo de la empresa.
            </p>
          </Reveal>

          {/* EJECUCIÓN PROPIA */}
          <Reveal>
            <div style={{ background: "#fff", border: `1px solid ${C.grisBorde}`, borderLeft: `3px solid ${C.bordo}`, borderRadius: 12, padding: "clamp(24px, 3vw, 32px)", marginTop: "clamp(28px, 3.5vw, 40px)" }}>
              <div style={{ fontWeight: 600, fontSize: 19, color: C.negro, marginBottom: 12 }}>Ejecución propia</div>
              <p style={{ fontSize: 16, color: C.grisTexto, lineHeight: 1.7, margin: 0, maxWidth: "46em" }}>
                Redes, pauta y email marketing los ejecuta nuestro equipo. No dirigimos proveedores externos en esas áreas: el sistema requiere que quien ejecuta trabaje adentro de la misma plataforma y con la misma medición. Si tu sitio ya tiene proveedor, los cambios se coordinan con él.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ borderTop: `1px solid ${C.grisBorde}`, margin: "clamp(40px, 5vw, 56px) 0" }} />
          </Reveal>

          {/* DIRECCIÓN */}
          <Reveal>
            <h3 id="quien" style={{ fontWeight: 300, fontSize: "clamp(22px, 2.6vw, 30px)", color: C.bordo, lineHeight: 1.2, margin: "0 0 22px", scrollMarginTop: 68 }}>Directora de Marketing</h3>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 4.5vw, 64px)", alignItems: "flex-start" }}>
            <Reveal style={{ flex: "1 1 240px", maxWidth: 300, minWidth: 220 }}>
              <div style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 8, overflow: "hidden", background: C.beige, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {FOTO_DEBORA ? (
                  <img src={FOTO_DEBORA} alt="Debora Nerini" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <span style={{ fontSize: 12, color: C.grisClaro }}>Foto de Debora</span>
                )}
              </div>
            </Reveal>

            <div style={{ flex: "1 1 420px", minWidth: 300 }}>
              <Reveal>
                <div style={{ fontWeight: 600, fontSize: 20, color: C.cuero, marginBottom: 18 }}>Debora Nerini</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", fontSize: 13, color: C.grisTexto, marginBottom: 26 }}>
                  <span>Lic. en Comercialización (UADE)</span>
                  <span style={{ color: C.grisBorde }}>·</span>
                  <span>Especialización en Marketing Digital (UBA)</span>
                  <span style={{ color: C.grisBorde }}>·</span>
                  <span>15 años en marketing y negocios en grandes empresas</span>
                </div>
                <div style={{ borderTop: `1px solid ${C.grisBorde}`, marginBottom: 26 }} />
              </Reveal>
              <Reveal delay={80}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: "40em" }}>
                  <p style={{ fontSize: 17, color: C.grisTexto, lineHeight: 1.8, margin: 0 }}>
                    Defino la estrategia, dirijo al equipo que ejecuta y respondo por el resultado.
                  </p>
                  <p style={{ fontSize: 17, color: C.grisTexto, lineHeight: 1.8, margin: 0 }}>
                    El marketing pasa a funcionar como un sistema ordenado y constante, sin depender de tu seguimiento.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CON QUÉ EMPRESAS TRABAJAMOS */}
      <section style={{ background: "#fff", padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ ...h2, margin: `0 0 ${SECTION_GAP}` }}>Con qué empresas trabajamos</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(32px, 4.5vw, 56px)" }}>
            <Reveal>
              <div style={{ fontSize: 11, letterSpacing: ".14em", fontWeight: 600, color: C.cueroTexto, textTransform: "uppercase", marginBottom: 16 }}>Trabajamos con</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {TRABAJAMOS_CON.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 16, color: C.grisTexto, lineHeight: 1.55 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.bordo, flexShrink: 0, marginTop: 9 }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div style={{ fontSize: 11, letterSpacing: ".14em", fontWeight: 600, color: C.cueroTexto, textTransform: "uppercase", marginBottom: 16 }}>No trabajamos con</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {NO_TRABAJAMOS_CON.map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 16, color: C.grisTexto, lineHeight: 1.55 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.grisClaro, flexShrink: 0, marginTop: 9 }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EL SISTEMA */}
      <section id="sistema" style={{ background: "#fff", padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}`, scrollMarginTop: 68 }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: SECTION_GAP }}>
            <h2 style={{ ...h2, margin: "0 0 20px" }}>El sistema</h2>
            <p style={{ fontSize: 17, fontStyle: "italic", fontWeight: 300, color: C.grisTexto, lineHeight: 1.6, margin: 0, maxWidth: "58em", textWrap: "balance" }}>
              Todos los canales conectados a un solo lugar. Cada contacto entra con su origen, recibe respuesta y avanza por flujos de seguimiento.
            </p>
          </Reveal>

          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 22 }}>
              {ETAPAS.map((s, i) => (
                <div key={s.num} style={{ gridColumn: `${i + 1} / 4`, gridRow: i + 1, borderRadius: 8, background: C.bordo, padding: "16px 20px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.cueroClaro, letterSpacing: ".14em", marginBottom: 6 }}>{s.num}</div>
                  <div style={{ fontWeight: 600, fontSize: 18, color: C.beige, marginBottom: 6 }}>{s.name}</div>
                  <p style={{ fontSize: 14, color: C.cueroClaro, lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "right", fontSize: 12, color: C.cueroTexto, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 22 }}>Conversión de venta →</div>
          </Reveal>

          <Reveal>
            <div style={{ borderTop: `1px solid ${C.grisBorde}`, margin: "clamp(40px, 5vw, 56px) 0" }} />
          </Reveal>

          <Reveal>
            <h3 style={{ fontWeight: 300, fontSize: "clamp(22px, 2.6vw, 30px)", color: C.bordo, lineHeight: 1.2, margin: "0 0 10px" }}>Gestión de Leads</h3>
            <p style={{ fontSize: 16, fontStyle: "italic", fontWeight: 300, color: C.grisTexto, lineHeight: 1.6, margin: `0 0 ${SECTION_GAP}` }}>Un solo sistema, del primer clic al cierre.</p>
          </Reveal>
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px 40px" }}>
              <div>
                <div style={{ ...eyebrow, marginBottom: 10 }}>Canales digitales</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {DIGITALES.map(([ico, label]) => (
                    <div key={label} style={chip}>
                      <Icon name={ico} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ ...eyebrow, marginBottom: 10 }}>Canales offline</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {OFFLINE.map(([ico, label]) => (
                    <div key={label} style={chip}>
                      <Icon name={ico} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "18px 0" }}>
              <span style={{ width: 1, height: 20, background: C.grisBorde }} />
              <span style={{ display: "inline-flex", transform: "rotate(90deg)" }}>
                <Icon name="action" size={22} />
              </span>
            </div>

            <Card variant="brand">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "28px 48px", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ flex: "0 1 260px" }}>
                  <div style={{ fontWeight: 300, fontSize: 26, color: C.beige, lineHeight: 1.15, marginBottom: 8 }}>Marketing Centralizado</div>
                  <div style={{ fontSize: 11, letterSpacing: ".14em", fontWeight: 600, color: C.cueroClaro, textTransform: "uppercase" }}>Todo en un CRM</div>
                </div>
                <div style={{ flex: "1 1 420px" }}>
                  <p style={{ fontSize: 15, color: C.beige, lineHeight: 1.6, margin: 0 }}>Todos los canales quedan conectados en un mismo sistema, con respuesta automatizada, historial de contacto por lead y tratamiento automatizado de cada oportunidad.</p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* PRIMEROS PASOS */}
      <section id="empezamos" style={{ background: "#fff", padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}`, scrollMarginTop: 68 }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ ...h2, margin: "0 0 clamp(28px, 3.5vw, 40px)" }}>Primeros pasos</h2>
          </Reveal>
          <Reveal>
            <div style={{ background: "#fff", border: `1px solid ${C.grisBorde}`, borderLeft: `3px solid ${C.bordo}`, borderRadius: 12, padding: "clamp(24px, 3vw, 32px)", marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.cueroTexto, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 20 }}>Punto de partida</div>
              <div style={{ position: "relative", marginBottom: 20 }}>
                <div style={{ position: "absolute", top: 6, left: 6, right: 6, height: 1, background: C.grisBorde }} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, position: "relative" }}>
                  {PASOS.map((p) => (
                    <div key={p.num} style={{ paddingTop: 26, position: "relative" }}>
                      <span style={{ position: "absolute", top: 0, left: 0, width: 12, height: 12, borderRadius: "50%", background: C.bordo }} />
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.cueroTexto, letterSpacing: ".14em", marginBottom: 10 }}>{p.num}</div>
                      <div style={{ fontWeight: 600, fontSize: 19, color: C.negro, marginBottom: 10 }}>{p.title}</div>
                      <div style={{ fontSize: 16, color: C.grisTexto, lineHeight: 1.7 }}>{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ ...nota, margin: 0 }}>El diagnóstico y la puesta en marcha están incluidos en el servicio. No hay costo de arranque aparte.</p>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ background: "#fff", border: `1px solid ${C.grisBorde}`, borderLeft: `3px solid ${C.bordo}`, borderRadius: 12, padding: "clamp(24px, 3vw, 32px)" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.cueroTexto, letterSpacing: ".14em", textTransform: "uppercase", marginBottom: 20 }}>Gestión mensual</div>
              <div style={{ fontWeight: 600, fontSize: 19, color: C.negro, marginBottom: 10 }}>El mes de trabajo</div>
              <div style={{ fontSize: 16, color: C.grisTexto, lineHeight: 1.7 }}>Ejecución de las cuatro áreas, medición en un único tablero y reunión mensual de resultados.</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section id="preguntas" style={{ background: "#fff", padding: `${PAD_Y} ${PAD_X}`, borderTop: `1px solid ${C.grisBorde}`, scrollMarginTop: 68 }}>
        <div style={{ maxWidth: MAX, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ ...h2, margin: `0 0 ${SECTION_GAP}` }}>Preguntas frecuentes</h2>
          </Reveal>
          <Reveal>
            <Preguntas />
          </Reveal>
        </div>
      </section>

      {/* CIERRE */}
      <section style={{ position: "relative", background: C.bordo, padding: `clamp(52px, 6.5vw, 84px) ${PAD_X}`, overflow: "hidden" }}>
        <Pattern opacity={0.045} color={C.cueroClaro} />
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(34px, 4.6vw, 52px)", color: C.beige, lineHeight: 1.12, letterSpacing: "-.01em", margin: "0 0 22px" }}>
              Reunión inicial
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(17px, 1.7vw, 20px)", color: C.cueroClaro, lineHeight: 1.5, margin: "0 0 36px" }}>
              Media hora de conversación para revisar el estado actual de tu empresa y definir el punto de partida.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <BtnWA variant="inverse">Escribinos por WhatsApp</BtnWA>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
              <a href="https://instagram.com/nerini.marketing" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: C.cueroClaro, textDecoration: "none" }}>@nerini.marketing</a>
              <a href="https://linkedin.com/company/nerini" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: C.cueroClaro, textDecoration: "none" }}>linkedin.com/company/nerini</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: MAX, margin: "0 auto", borderTop: "1px solid rgba(232,226,217,.14)", paddingTop: 24, textAlign: "center", fontSize: 12, color: C.grisClaro, opacity: 0.6 }}>
          © 2026 NERINI. Todos los derechos reservados.
        </div>
      </footer>

      <FloatingWA />
    </div>
  );
}
