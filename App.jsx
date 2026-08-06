import { useState, useEffect, useRef } from "react";

const C = {
  bordo: "#6B1F2A", bordoMedio: "#9B5059",
  cuero: "#A0714A", cueroClaro: "#D4B896",
  beige: "#FAF5EE", negro: "#3A1A1F",
  grisBg: "#FAFAFA", grisBorde: "#E8E2D9",
  grisTexto: "#6B6660", grisClaro: "#A8A39E",
};
const WA = "https://wa.me/5491122419299?text=Hola%20Debora%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tus%20servicios";

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, style: s = {} }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`, ...s }}>{children}</div>;
}

function Logo({ dark = false, size = 20 }) {
  return (
    <div style={{ lineHeight: 1, userSelect: "none", display: "inline-block" }}>
      <div style={{ fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif", fontWeight: 700, letterSpacing: ".12em", fontSize: size, color: dark ? C.beige : C.bordo }}>NERINI</div>
      <div style={{ height: 2, background: dark ? C.cueroClaro : C.bordo, margin: "4px 0" }} />
      <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 400, fontSize: size * .36, letterSpacing: ".25em", color: dark ? C.cueroClaro : C.cuero }}>MARKETING</div>
    </div>
  );
}

// ── SVG Icons ──────────────────────────────────────────
const IcoProveedores = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="16" r="3.5"/>
    <circle cx="26" cy="7" r="3.5"/>
    <circle cx="26" cy="25" r="3.5"/>
    <line x1="9" y1="15" x2="22.5" y2="9" strokeDasharray="3 2.5"/>
    <line x1="9" y1="17" x2="22.5" y2="23" strokeDasharray="3 2.5"/>
    <line x1="15" y1="9" x2="15" y2="23" strokeDasharray="3 2.5" opacity=".35"/>
  </svg>
);
const IcoDuenio = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="6" r="3"/>
    <path d="M16 9v8"/>
    <path d="M10 28l6-11 6 11"/>
    <path d="M7 17h5M20 17h5"/>
    <path d="M7 17l3-4M25 17l-3-4"/>
  </svg>
);
const IcoMedicion = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,24 10,16 15,20 22,10 28,14"/>
    <circle cx="28" cy="8" r="3"/>
    <line x1="26" y1="10" x2="28" y2="13"/>
  </svg>
);

const IcoLeads = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="4"/>
    <path d="M4 26c0-4 3.6-8 8-8h4"/>
    <line x1="22" y1="18" x2="28" y2="18" strokeDasharray="2.5 2"/>
    <line x1="22" y1="22" x2="28" y2="22" strokeDasharray="2.5 2"/>
    <line x1="22" y1="26" x2="28" y2="26" strokeDasharray="2.5 2"/>
    <circle cx="21" cy="22" r="1" fill="currentColor" stroke="none" opacity=".4"/>
  </svg>
);

const IcoGlobo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="13"/>
    <ellipse cx="18" cy="18" rx="5.5" ry="13"/>
    <line x1="5" y1="18" x2="31" y2="18"/>
    <line x1="7.5" y1="11" x2="28.5" y2="11"/>
    <line x1="7.5" y1="25" x2="28.5" y2="25"/>
  </svg>
);
const IcoTrend = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,28 12,18 18,22 28,10"/>
    <polyline points="22,10 28,10 28,16"/>
    <line x1="4" y1="28" x2="32" y2="28" opacity=".3"/>
  </svg>
);
const IcoLoop = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 18a8 8 0 0 1 16 0"/>
    <polyline points="22,13 26,18 30,13"/>
    <path d="M26 18a8 8 0 0 1-16 0"/>
    <polyline points="14,23 10,18 6,23"/>
  </svg>
);

// ── App ────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);

  const BtnWA = ({ light = false }) => (
    <a href={WA} target="_blank" rel="noopener noreferrer" style={{
      display: "inline-block", textDecoration: "none",
      fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: ".05em",
      padding: "13px 32px", borderRadius: 3,
      background: light ? C.beige : C.bordo,
      color: light ? C.bordo : C.beige,
    }}>Hablemos por WhatsApp</a>
  );

  return (
    <div style={{ fontFamily: "'Raleway',sans-serif", color: C.negro, background: "#fff", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(255,255,255,.96)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${scrolled ? C.grisBorde : "transparent"}`, transition: "border-color .3s" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo size={19} />
          <BtnWA />
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "92vh", display: "flex", alignItems: "center", padding: "80px 48px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", width: "100%" }}>
          <Reveal>
            <h1 style={{ fontWeight: 300, fontSize: "clamp(44px, 6.5vw, 76px)", lineHeight: 1.06, color: C.negro, marginBottom: 24, letterSpacing: "-.02em" }}>
              El área de marketing<br />que tu empresa<br />necesita
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: "clamp(18px, 2vw, 22px)", color: C.grisTexto, marginBottom: 36, lineHeight: 1.5 }}>
              Para empresas de servicios sin departamento interno de marketing.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <BtnWA />
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section style={{ background: C.bordo, padding: "60px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(28px, 3.5vw, 44px)", color: C.beige, marginBottom: 40, lineHeight: 1.15 }}>
              ¿Te está pasando esto?
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
            {[
              { icon: <IcoProveedores />, title: "Diferentes proveedores. Diferentes estrategias.", desc: "Cada proveedor ejecuta su área sin una estrategia integral." },
              { icon: <IcoDuenio />, title: "El marketing lo planificás vos.", desc: "La planificación y ejecución dependen de tu disponibilidad permanente." },
              { icon: <IcoMedicion />, title: "Invertís dinero y tiempo sin medir retorno.", desc: "Reportes aislados de cada proveedor, sin un tablero que muestre el resultado conjunto." },
              { icon: <IcoLeads />, title: "Leads sin seguimiento.", desc: "No hay registro de origen ni proceso definido para convertirlos en oportunidades de venta." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ padding: "32px 28px", borderLeft: i % 2 !== 0 ? `1px solid rgba(212,184,150,.18)` : "none", borderTop: i >= 2 ? `1px solid rgba(212,184,150,.18)` : "none" }}>
                  <div style={{ color: C.cueroClaro, marginBottom: 16, opacity: .75 }}>{item.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: C.beige, marginBottom: 8, lineHeight: 1.35 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: C.beige, opacity: .6, lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SISTEMA CENTRALIZADO (diferenciador) ── */}
      <section style={{ background: C.grisBg, padding: "64px 48px", borderTop: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "3fr 2fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(28px, 3.5vw, 44px)", color: C.negro, marginBottom: 20, lineHeight: 1.15 }}>
              El Sistema
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
              {[
                "Todos los canales integrados en un CRM con flujos automatizados.",
                "Cada lead registrado con su origen y seguimiento activo.",
                "Cada inversión medida contra resultado.",
                "Todo centralizado en un solo tablero.",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: C.grisTexto, lineHeight: 1.6 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.grisClaro, flexShrink: 0, marginTop: 6 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              {/* Columna canales */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9, letterSpacing: ".18em", fontWeight: 600, color: C.bordoMedio, marginBottom: 8, textTransform: "uppercase" }}>Canales digitales</div>
                {[["✦", "Redes sociales"], ["→", "Pauta digital"], ["⊞", "Sitio web"]].map(([ico, label], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "#fff", border: `1px solid ${C.grisBorde}`, borderRadius: 6, marginBottom: 5, fontSize: 12, color: C.negro }}>
                    <span style={{ fontSize: 10, color: C.grisClaro, width: 14, flexShrink: 0 }}>{ico}</span>{label}
                  </div>
                ))}
                <div style={{ fontSize: 9, letterSpacing: ".18em", fontWeight: 600, color: C.bordoMedio, margin: "12px 0 8px", textTransform: "uppercase" }}>Canales offline</div>
                {[["◎", "Eventos y ferias"], ["⑂", "Referidos"], ["✓", "WhatsApp directo"]].map(([ico, label], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "#fff", border: `1px solid ${C.grisBorde}`, borderRadius: 6, marginBottom: 5, fontSize: 12, color: C.negro }}>
                    <span style={{ fontSize: 10, color: C.grisClaro, width: 14, flexShrink: 0 }}>{ico}</span>{label}
                  </div>
                ))}
              </div>
              {/* Flecha */}
              <div style={{ color: C.cuero, fontSize: 20, flexShrink: 0 }}>→</div>
              {/* Card sistema */}
              <div style={{ flex: 1, minWidth: 0, background: C.bordo, borderRadius: 12, padding: "24px 18px" }}>
                <div style={{ fontWeight: 300, fontSize: 26, color: C.beige, marginBottom: 4, lineHeight: 1 }}>Sistema Centralizado</div>
                <div style={{ fontSize: 8, letterSpacing: ".2em", fontWeight: 600, color: C.cueroClaro, marginBottom: 12, textTransform: "uppercase" }}>Todo en un CRM</div>
                <div style={{ width: 28, height: 1, background: C.cueroClaro, marginBottom: 14, opacity: .5 }} />
                {["Respuesta automatizada.", "Historial de puntos de contacto.", "Tratamiento de leads fríos."].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: C.beige, padding: "5px 0", opacity: .85, lineHeight: 1.45 }}>
                    <span style={{ color: C.cueroClaro, flexShrink: 0 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── QUIÉN + QUÉ HACE (unificado) ── */}
      <section style={{ background: "#fff", padding: "64px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          {/* Foto + credenciales */}
          <Reveal>
            <div>
              <img src="/debora.jpg" alt="Debora Nerini" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", objectPosition: "top", borderRadius: 4, display: "block" }} />
              <div style={{ marginTop: 20, fontSize: 12, color: C.grisClaro, lineHeight: 2 }}>
                Lic. en Comercialización<br />
                Especialización en Marketing Digital<br />
                15 años en grandes empresas
              </div>
            </div>
          </Reveal>
          {/* Texto */}
          <div>
            <Reveal>
              <h2 style={{ fontWeight: 300, fontSize: "clamp(28px, 3.5vw, 44px)", color: C.negro, marginBottom: 20, lineHeight: 1.15 }}>Quién dirige</h2>
              <h2 style={{ fontWeight: 300, fontSize: "clamp(26px, 3vw, 38px)", color: C.negro, marginBottom: 6 }}>Debora Nerini</h2>
              <div style={{ fontWeight: 600, fontSize: 15, color: C.cuero, marginBottom: 28 }}>Responsable Externa de Marketing</div>
            </Reveal>
            {/* Divisor */}
            <div style={{ borderTop: `1px solid ${C.grisBorde}`, marginBottom: 32 }} />
            <Reveal delay={80}>
              <h3 style={{ fontWeight: 300, fontSize: "clamp(20px, 2.2vw, 28px)", color: C.negro, lineHeight: 1.2, marginBottom: 20 }}>
                Una sola persona.<br />Todo el marketing<br />de tu empresa.
              </h3>
              <p style={{ fontSize: 15, color: C.grisTexto, lineHeight: 1.85, marginBottom: 20 }}>
                Dirijo el marketing de la empresa: defino el plan, coordino a los proveedores que ejecutan y respondo por el resultado. El marketing pasa a funcionar como un sistema, sin requerir tu seguimiento permanente.
              </p>
              <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: 14, color: C.grisClaro, lineHeight: 1.7, borderLeft: `2px solid ${C.grisBorde}`, paddingLeft: 16 }}>
                "Ayudo a empresas de servicios sin equipo de marketing a posicionarse y generar oportunidades de venta, a través de un sistema que centraliza, automatiza y mide todas sus acciones."
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EL SISTEMA ── */}
      <section style={{ background: C.grisBg, padding: "64px 48px", borderTop: `1px solid ${C.grisBorde}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(28px, 3.5vw, 44px)", color: C.negro, marginBottom: 16, lineHeight: 1.15 }}>El sistema</h2>
            <p style={{ fontSize: 15, fontStyle: "italic", fontWeight: 300, color: C.grisTexto, marginBottom: 36 }}>
              El recorrido es el mismo para todos. El punto de partida lo define el estado actual de la empresa.
            </p>
          </Reveal>

          {/* Las tres etapas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
            {[
              { icon: <IcoGlobo />, num: "01", name: "Presencia", desc: "La base digital de la empresa. Presencia y mensajes consistentes donde están los clientes.", channels: "Sitio web · Instagram · LinkedIn" },
              { icon: <IcoTrend />, num: "02", name: "Crecimiento", desc: "Generación continua de demanda, sin depender exclusivamente de alcance orgánico.", channels: "Meta Ads · Google Ads" },
              { icon: <IcoLoop />, num: "03", name: "Nutrición", desc: "Seguimiento de cada contacto hasta la conversación de venta.", channels: "Email Marketing" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ background: "#fff", border: `1px solid ${C.grisBorde}`, borderTop: `3px solid ${C.bordo}`, borderRadius: 4, padding: "32px 28px", height: "100%" }}>
                  <div style={{ color: C.bordo, marginBottom: 24, opacity: .85 }}>{s.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.grisClaro, letterSpacing: ".12em", marginBottom: 10 }}>{s.num}</div>
                  <div style={{ fontWeight: 600, fontSize: 20, color: C.negro, marginBottom: 12 }}>{s.name}</div>
                  <p style={{ fontSize: 13, color: C.grisTexto, lineHeight: 1.75, marginBottom: 20 }}>{s.desc}</p>
                  <div style={{ fontSize: 11, color: C.grisClaro, letterSpacing: ".04em" }}>{s.channels}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Base — Dirección de Marketing */}
          <Reveal delay={240}>
            <div style={{ background: C.bordo, borderRadius: 4, padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 3, height: 36, background: C.cueroClaro, borderRadius: 2, opacity: .6, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.beige }}>Dirección de Marketing</div>
                <div style={{ fontSize: 12, color: C.beige, opacity: .6, marginTop: 2 }}>La base transversal del sistema. Incluida en las tres etapas desde el primer día.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ background: C.bordo, padding: "72px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", userSelect: "none", overflow: "hidden",
          display: "grid", gridTemplateColumns: "repeat(auto-fill, 72px)",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 700, fontSize: 52, letterSpacing: "0.12em", lineHeight: "72px",
          color: C.beige, opacity: 0.07, textAlign: "center",
        }}>
          {Array(120).fill(null).map((_, i) => <span key={i}>N</span>)}
        </div>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontWeight: 300, fontSize: "clamp(30px, 5vw, 58px)", color: C.beige, lineHeight: 1.1, marginBottom: 24 }}>
              ¿Querés tener un equipo externo de marketing?
            </h2>
            <p style={{ fontStyle: "italic", fontWeight: 300, fontSize: 18, color: C.beige, opacity: .65, marginBottom: 48 }}>
              Agendemos una reunión y te cuento cómo podemos trabajar.
            </p>
            <BtnWA light />
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#3A1A1F", padding: "40px 48px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div>
            <Logo dark size={20} />
          </div>
          <div style={{ textAlign: "right", lineHeight: 2 }}>
            <div style={{ fontSize: 13, color: C.grisClaro }}>debora@nerini.com.ar</div>
            <div style={{ fontSize: 13, color: C.grisClaro, opacity: .45 }}>nerini.ar</div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(107,102,96,.18)`, paddingTop: 24, textAlign: "center", fontSize: 11, color: C.grisClaro, opacity: .32 }}>
          © 2026 NERINI. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
