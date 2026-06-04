"use client";
import { useState } from "react";

const provincias = ["Buenos Aires","CABA","Catamarca","Chaco","Chubut","Córdoba","Corrientes","Entre Rios","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones","Neuquén","Rio Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucumán"];

const categorias = [
  { nombre: "Plomeria", icono: "🔧", desc: "Destapaciones, cañerías" },
  { nombre: "Electricidad", icono: "⚡", desc: "Instalaciones, tableros" },
  { nombre: "Gas", icono: "🔥", desc: "Termotanques, estufas" },
  { nombre: "Pintura", icono: "🖌️", desc: "Interior y exterior" },
  { nombre: "Construccion", icono: "🏗️", desc: "Reformas, ampliaciones" },
  { nombre: "Aire acondicionado", icono: "❄️", desc: "Instalación y service" },
  { nombre: "Herreria", icono: "⚒️", desc: "Rejas, portones" },
  { nombre: "Cerrajeria", icono: "🔑", desc: "Urgencias 24hs" },
  { nombre: "Carpinteria", icono: "🪚", desc: "Muebles, aberturas" },
  { nombre: "Jardineria", icono: "🌿", desc: "Diseño y mantenimiento" },
];

export default function Home() {
  const [oficio, setOficio] = useState("");
  const [provincia, setProvincia] = useState("");
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const buscar = () => {
    window.location.href = `/buscar?oficio=${oficio}&provincia=${provincia}`;
  };

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAFAF9", minHeight: "100vh" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.6s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.6s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.6s 0.3s ease both; }
        .cat-card { transition: all 0.2s ease; cursor: pointer; }
        .cat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .search-input:focus { outline: none; border-color: #F97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.15); }
        .btn-primary { transition: all 0.2s ease; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(249,115,22,0.4); }
        .nav-link { transition: color 0.2s ease; }
        .nav-link:hover { color: #F97316; }
        .stat-card { transition: transform 0.2s ease; }
        .stat-card:hover { transform: translateY(-2px); }
        select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 40px; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #F0EDE8", position: "sticky", top: 0, zIndex: 50, padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #F97316, #EA580C)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🔧</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#0A0A0A", letterSpacing: "-0.5px" }}>OficiosYa</span>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a href="/login" className="nav-link" style={{ color: "#555", fontSize: 14, fontWeight: 500, padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>
              Ingresar
            </a>
            <a href="/registro" className="btn-primary" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", color: "#fff", fontSize: 14, fontWeight: 600, padding: "10px 20px", borderRadius: 10, textDecoration: "none", boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
              Registrate gratis
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0A0F1E 0%, #111827 50%, #0A0F1E 100%)", position: "relative", overflow: "hidden", padding: "80px 24px 100px" }}>
        {/* Background decoration */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, background: "#F97316", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ color: "#F97316", fontSize: 13, fontWeight: 500 }}>+2.000 profesionales en toda Argentina</span>
          </div>

          <h1 className="fade-up-1" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 20 }}>
            Encontrá el profesional<br />
            <span style={{ background: "linear-gradient(90deg, #F97316, #FB923C, #F97316)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              que necesitás hoy
            </span>
          </h1>

          <p className="fade-up-2" style={{ color: "#9CA3AF", fontSize: "clamp(16px, 2vw, 18px)", lineHeight: 1.6, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
            Plomeros, electricistas, gasistas y más — verificados y cerca tuyo en toda Argentina
          </p>

          {/* SEARCH BAR */}
          <div className="fade-up-3" style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 8, display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 700, margin: "0 auto" }}>
            <select value={oficio} onChange={(e) => setOficio(e.target.value)} className="search-input" style={{ flex: 1, minWidth: 160, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 40px 14px 16px", color: oficio ? "#fff" : "#9CA3AF", fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
              <option value="" style={{ background: "#111" }}>Tipo de oficio</option>
              {categorias.map(c => <option key={c.nombre} value={c.nombre} style={{ background: "#111" }}>{c.nombre}</option>)}
            </select>
            <select value={provincia} onChange={(e) => setProvincia(e.target.value)} className="search-input" style={{ flex: 1, minWidth: 160, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 40px 14px 16px", color: provincia ? "#fff" : "#9CA3AF", fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
              <option value="" style={{ background: "#111" }}>Selecciona provincia</option>
              {provincias.map(p => <option key={p} value={p} style={{ background: "#111" }}>{p}</option>)}
            </select>
            <button onClick={buscar} className="btn-primary" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(249,115,22,0.4)" }}>
              Buscar →
            </button>
          </div>

          {/* Quick tags */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
            {["Plomeria", "Electricidad", "Gas", "Pintura"].map(tag => (
              <button key={tag} onClick={() => { setOficio(tag); buscar(); }} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#D1D5DB", fontSize: 13, padding: "6px 14px", borderRadius: 100, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#fff", borderBottom: "1px solid #F0EDE8", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {[
            { num: "2.000+", label: "Profesionales registrados", icon: "👷" },
            { num: "24hs", label: "Tiempo promedio de respuesta", icon: "⚡" },
            { num: "98%", label: "Clientes satisfechos", icon: "⭐" },
            { num: "100%", label: "Gratis para clientes", icon: "🎁" },
          ].map((stat) => (
            <div key={stat.label} className="stat-card" style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 12, background: "#FAFAF9", border: "1px solid #F0EDE8" }}>
              <span style={{ fontSize: 28 }}>{stat.icon}</span>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#0A0A0A", lineHeight: 1 }}>{stat.num}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3, lineHeight: 1.3 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIAS */}
      <section style={{ padding: "72px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#F97316", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Categorias</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-1px", lineHeight: 1.1 }}>
              ¿Qué necesitás arreglar?
            </h2>
          </div>
          <a href="/buscar" style={{ color: "#F97316", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            Ver todos los oficios →
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
          {categorias.map((cat) => (
            <a key={cat.nombre} href={`/buscar?oficio=${cat.nombre}`} className="cat-card" style={{ background: hoveredCat === cat.nombre ? "#0A0F1E" : "#fff", border: `1px solid ${hoveredCat === cat.nombre ? "#0A0F1E" : "#F0EDE8"}`, borderRadius: 16, padding: "24px 20px", textDecoration: "none", display: "block" }} onMouseEnter={() => setHoveredCat(cat.nombre)} onMouseLeave={() => setHoveredCat(null)}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{cat.icono}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: hoveredCat === cat.nombre ? "#fff" : "#0A0A0A", marginBottom: 4 }}>{cat.nombre}</div>
              <div style={{ fontSize: 12, color: hoveredCat === cat.nombre ? "#9CA3AF" : "#9CA3AF" }}>{cat.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ background: "#F8F7F4", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#F97316", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Simple y rapido</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, color: "#0A0A0A", letterSpacing: "-1px" }}>
              ¿Como funciona?
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { n: "01", titulo: "Busca tu oficio", desc: "Elegí el tipo de trabajo y tu provincia. Te mostramos todos los profesionales verificados de tu zona.", color: "#FFF7ED", border: "#FED7AA" },
              { n: "02", titulo: "Mirá los perfiles", desc: "Fotos de trabajos reales, reseñas verificadas, zona de cobertura y precios orientativos.", color: "#F0FDF4", border: "#BBF7D0" },
              { n: "03", titulo: "Contactalo directo", desc: "Escribile por WhatsApp o pedí un presupuesto online. Sin intermediarios, sin costos ocultos.", color: "#EFF6FF", border: "#BFDBFE" },
            ].map((paso) => (
              <div key={paso.n} style={{ background: paso.color, border: `1px solid ${paso.border}`, borderRadius: 20, padding: "32px 28px" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 48, fontWeight: 800, color: paso.border, lineHeight: 1, marginBottom: 16 }}>{paso.n}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#0A0A0A", marginBottom: 10 }}>{paso.titulo}</h3>
                <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.65 }}>{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA PROFESIONAL */}
      <section style={{ background: "linear-gradient(135deg, #0A0F1E 0%, #111827 100%)", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <p style={{ color: "#F97316", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Para profesionales</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 20 }}>
            Sos plomero, electricista<br />o gasista?
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 16, lineHeight: 1.65, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
            Creá tu perfil gratis, subí fotos de tus trabajos y empezá a recibir clientes en tu zona sin pagar por cada contacto.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 700, margin: "0 auto 48px" }}>
            {[
              { ico: "📸", t: "Mostrá tus trabajos", d: "Galería de fotos reales" },
              { ico: "📍", t: "Aparecé en tu zona", d: "Filtros por provincia y ciudad" },
              { ico: "💬", t: "Clientes directo", d: "Sin intermediarios" },
            ].map((item) => (
              <div key={item.t} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.ico}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{item.t}</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>{item.d}</div>
              </div>
            ))}
          </div>
          <a href="/registro" className="btn-primary" style={{ display: "inline-block", background: "linear-gradient(135deg, #F97316, #EA580C)", color: "#fff", fontSize: 16, fontWeight: 700, padding: "16px 36px", borderRadius: 14, textDecoration: "none", boxShadow: "0 8px 32px rgba(249,115,22,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            Registrate gratis como profesional →
          </a>
          <p style={{ color: "#6B7280", fontSize: 12, marginTop: 16 }}>Sin tarjeta de crédito · Plan gratuito disponible</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0A0A0A", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #F97316, #EA580C)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🔧</div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>OficiosYa</span>
        </div>
        <p style={{ color: "#6B7280", fontSize: 13 }}>© 2026 OficiosYa · Conectando oficios con clientes en toda Argentina</p>
      </footer>
    </main>
  );
}