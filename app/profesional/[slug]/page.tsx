"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function PerfilProfesional({ params }: any) {
  const [perfil, setPerfil] = useState<any>(null);
  const [usuario, setUsuario] = useState<any>(null);
  const [fotos, setFotos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [slug, setSlug] = useState<string>("");
  const [fotoActiva, setFotoActiva] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clientePhone, setClientePhone] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [coverIdx, setCoverIdx] = useState(0);

  useEffect(() => {
    const getSlug = async () => {
      const p = await params;
      setSlug(p.slug);
    };
    getSlug();
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    const cargar = async () => {
      const { data: profileData } = await supabase
        .from("profiles").select("*").eq("id", slug).maybeSingle();
      if (!profileData) { setCargando(false); return; }
      setPerfil(profileData);

      const { data: userData } = await supabase
        .from("users").select("*").eq("id", profileData.user_id).maybeSingle();
      if (userData) setUsuario(userData);

      const { data: fotosData } = await supabase
        .from("portfolio_photos").select("*").eq("user_id", profileData.user_id).order("order_index");
      if (fotosData) setFotos(fotosData);

      await supabase.from("contact_events").insert({
        professional_id: profileData.user_id,
        event_type: "profile_view",
        source_zone: profileData.city,
      });

      setCargando(false);
    };
    cargar();
  }, [slug]);

  useEffect(() => {
    if (fotos.length <= 1) return;
    const interval = setInterval(() => {
      setCoverIdx((prev) => (prev + 1) % fotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [fotos]);

  const enviarConsulta = async () => {
    if (!clienteNombre || !mensaje) return;
    setEnviando(true);
    const { data: conv } = await supabase.from("conversations").insert({
      professional_id: perfil.user_id,
      client_name: clienteNombre,
      client_email: clienteEmail,
      client_phone: clientePhone,
      status: "active",
    }).select().single();

    if (conv) {
      await supabase.from("messages").insert({
        conversation_id: conv.id,
        sender: "client",
        sender_name: clienteNombre,
        content: mensaje,
        type: "text",
      });
    }
    setEnviando(false);
    setEnviado(true);
    setTimeout(() => { setShowModal(false); setEnviado(false); }, 3000);
  };

  if (cargando) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAF9" }}>
      <p style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Cargando perfil...</p>
    </div>
  );

  if (!perfil) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAF9" }}>
      <p style={{ color: "#9CA3AF", fontFamily: "'DM Sans', sans-serif" }}>Perfil no encontrado</p>
    </div>
  );

  const waLink = `https://wa.me/${usuario?.phone?.replace(/\D/g,"")}?text=Hola+te+contacto+desde+OficiosYa`;

  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAFAF9", minHeight: "100vh" }}>
      <style>{`
        .foto-thumb { transition: all 0.2s ease; cursor: pointer; }
        .foto-thumb:hover { transform: scale(1.03); opacity: 0.9; }
        .btn-wa { transition: all 0.2s ease; }
        .btn-wa:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(34,197,94,0.4); }
        .btn-pres { transition: all 0.2s ease; }
        .btn-pres:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.3); }
        .dot-btn { transition: all 0.3s ease; padding: 0; border: none; cursor: pointer; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #F0EDE8", position: "sticky", top: 0, zIndex: 50, padding: "0 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, background: "linear-gradient(135deg, #F97316, #EA580C)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🔧</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#0A0A0A" }}>OficiosYa</span>
          </a>
          <a href="/buscar" style={{ color: "#6B7280", fontSize: 13, textDecoration: "none", fontWeight: 500 }}>← Volver a resultados</a>
        </div>
      </nav>

      {/* COVER — carrusel si hay fotos, fondo dinámico si no */}
      <div style={{ height: 280, position: "relative", overflow: "hidden", background: "#0A0F1E" }}>
        {fotos.length > 0 ? (
          <>
            {fotos.map((foto, i) => (
              <div key={foto.id} style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${foto.url})`,
                backgroundSize: "cover", backgroundPosition: "center",
                opacity: coverIdx === i ? 1 : 0,
                transition: "opacity 0.8s ease",
              }} />
            ))}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)" }} />
            {fotos.length > 1 && (
              <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
                {fotos.map((_, i) => (
                  <button key={i} className="dot-btn" onClick={() => setCoverIdx(i)} style={{ width: coverIdx === i ? 20 : 6, height: 6, borderRadius: 3, background: coverIdx === i ? "#F97316" : "rgba(255,255,255,0.5)" }} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 80, opacity: 0.12 }}>🔧</div>
              <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {perfil.city || "Profesional"}
              </div>
            </div>
          </>
        )}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start", paddingBottom: 60 }}>

          {/* COLUMNA PRINCIPAL */}
          <div>
            {/* INFO CARD */}
            <div style={{ background: "#fff", borderRadius: 20, padding: "28px 28px 24px", border: "1px solid #F0EDE8", marginTop: -40, position: "relative", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 72, height: 72, background: "linear-gradient(135deg, #FFF7ED, #FED7AA)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: "#F97316", flexShrink: 0, border: "3px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
                    {usuario?.full_name?.[0] || "P"}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, color: "#0A0A0A", letterSpacing: "-0.5px", margin: 0 }}>
                        {usuario?.full_name || "Profesional"}
                      </h1>
                      <span style={{ background: usuario?.plan === "master" ? "linear-gradient(135deg, #F97316, #EA580C)" : usuario?.plan === "pro" ? "linear-gradient(135deg, #3B82F6, #2563EB)" : "#F3F4F6", color: usuario?.plan === "free" ? "#9CA3AF" : "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {(usuario?.plan || "free").toUpperCase()}
                      </span>
                    </div>
                    <p style={{ color: "#9CA3AF", fontSize: 14, margin: 0 }}>{perfil.city || "Argentina"}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                      <span style={{ color: "#F59E0B", fontSize: 14 }}>★★★★★</span>
                      <span style={{ fontSize: 13, color: "#9CA3AF" }}>Nuevo en la plataforma</span>
                    </div>
                  </div>
                </div>
              </div>
              {perfil.bio && (
                <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, marginTop: 20, paddingTop: 20, borderTop: "1px solid #F0EDE8" }}>{perfil.bio}</p>
              )}
              {perfil.years_experience && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 100, padding: "4px 12px", marginTop: 12 }}>
                  <span style={{ fontSize: 12 }}>✓</span>
                  <span style={{ fontSize: 12, color: "#16A34A", fontWeight: 600 }}>{perfil.years_experience} años de experiencia</span>
                </div>
              )}
            </div>

            {/* FOTOS */}
            <div style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", border: "1px solid #F0EDE8", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#0A0A0A", marginBottom: 16 }}>
                Fotos de trabajos {fotos.length > 0 && <span style={{ color: "#9CA3AF", fontSize: 14, fontWeight: 400 }}>({fotos.length})</span>}
              </h2>
              {fotos.length === 0 ? (
                <div style={{ background: "#F9FAFB", borderRadius: 12, padding: "40px 20px", textAlign: "center" }}>
                  <p style={{ color: "#D1D5DB", fontSize: 32, marginBottom: 8 }}>📷</p>
                  <p style={{ color: "#9CA3AF", fontSize: 13 }}>Este profesional aun no subio fotos de sus trabajos</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
                  {fotos.map((foto) => (
                    <div key={foto.id} className="foto-thumb" onClick={() => setFotoActiva(foto.url)} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1", border: "2px solid #F0EDE8" }}>
                      <img src={foto.url} alt="trabajo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA CONTACTO */}
          <div style={{ position: "sticky", top: 84 }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "24px", border: "1px solid #F0EDE8", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", marginTop: 20 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#0A0A0A", marginBottom: 16 }}>Contactar</h2>
              <a href={waLink} target="_blank" className="btn-wa" style={{ display: "block", background: "linear-gradient(135deg, #22C55E, #16A34A)", color: "#fff", textAlign: "center", padding: "14px", borderRadius: 14, fontWeight: 700, fontSize: 15, textDecoration: "none", marginBottom: 10, boxShadow: "0 4px 16px rgba(34,197,94,0.3)" }}>
                💬 Contactar por WhatsApp
              </a>
              <button onClick={() => setShowModal(true)} className="btn-pres" style={{ display: "block", width: "100%", background: "linear-gradient(135deg, #FFF7ED, #FFEDD5)", color: "#F97316", textAlign: "center", padding: "14px", borderRadius: 14, fontWeight: 700, fontSize: 15, border: "1px solid #FED7AA", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                📋 Pedir presupuesto
              </button>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #F0EDE8" }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Zona de cobertura</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F9FAFB", borderRadius: 10, padding: "10px 14px" }}>
                  <span style={{ fontSize: 16 }}>📍</span>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>{perfil.city || "No especificada"}</span>
                </div>
              </div>
              {usuario?.phone && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "#F0FDF4", borderRadius: 10, border: "1px solid #BBF7D0" }}>
                  <p style={{ fontSize: 11, color: "#16A34A", fontWeight: 600, margin: 0 }}>✓ Contacto verificado</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* LIGHTBOX */}
      {fotoActiva && (
        <div onClick={() => setFotoActiva(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "pointer" }}>
          <img src={fotoActiva} alt="foto" style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 12 }} />
          <button style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 40, height: 40, borderRadius: "50%", fontSize: 18, cursor: "pointer" }}>✕</button>
        </div>
      )}

      {/* MODAL CONTACTO */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: 28, width: "100%", maxWidth: 440, boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            {enviado ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: "#0A0A0A", marginBottom: 8 }}>Consulta enviada</h3>
                <p style={{ color: "#9CA3AF", fontSize: 14 }}>El profesional recibio tu mensaje y te respondera pronto.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#0A0A0A", margin: 0 }}>Contactar a {usuario?.full_name}</h3>
                  <button onClick={() => setShowModal(false)} style={{ background: "#F3F4F6", border: "none", color: "#6B7280", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 16 }}>✕</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Tu nombre *", val: clienteNombre, set: setClienteNombre, type: "text", ph: "Juan Garcia" },
                    { label: "Tu email", val: clienteEmail, set: setClienteEmail, type: "email", ph: "juan@email.com" },
                    { label: "Tu telefono", val: clientePhone, set: setClientePhone, type: "tel", ph: "011 1234-5678" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{field.label}</label>
                      <input value={field.val} onChange={(e) => field.set(e.target.value)} type={field.type} placeholder={field.ph} style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 10, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Que necesitas? *</label>
                    <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows={3} placeholder="Describí el trabajo..." style={{ width: "100%", border: "1px solid #E5E7EB", borderRadius: 10, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", resize: "none", boxSizing: "border-box" }} />
                  </div>
                  <button onClick={enviarConsulta} disabled={enviando || !clienteNombre || !mensaje} style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", opacity: (!clienteNombre || !mensaje) ? 0.5 : 1, boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}>
                    {enviando ? "Enviando..." : "Enviar consulta →"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}