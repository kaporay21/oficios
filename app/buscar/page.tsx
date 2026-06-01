"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const provincias = ["Buenos Aires","CABA","Catamarca","Chaco","Chubut","Córdoba","Corrientes","Entre Rios","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones","Neuquén","Rio Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucumán"];

export default function Buscar() {
  const [oficio, setOficio] = useState("");
  const [provincia, setProvincia] = useState("");
  const [resultados, setResultados] = useState<any[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [buscado, setBuscado] = useState(false);

  const buscar = async () => {
    setBuscando(true);
    setBuscado(true);
    let query = supabase.from("profiles").select("*, users(*)").eq("is_public", true);
    if (provincia) query = query.ilike("city", `%${provincia}%`);
    const { data } = await query;
    setResultados(data || []);
    setBuscando(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-orange-500">OficiosYa</a>
          <div className="flex gap-3">
            <a href="/login" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50">Ingresar</a>
            <a href="/registro" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">Registrate gratis</a>
          </div>
        </div>
      </header>

      <section className="bg-orange-500 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Encontra el profesional que necesitas</h1>
          <p className="text-orange-100 mb-8">Verificados y cerca tuyo en toda Argentina</p>
          <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-3">
            <select value={oficio} onChange={(e) => setOficio(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700">
              <option value="">Tipo de oficio</option>
              {["Plomeria","Electricidad","Gas","Pintura","Construccion","Aire acondicionado","Herreria","Cerrajeria","Carpinteria","Jardineria"].map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <select value={provincia} onChange={(e) => setProvincia(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700">
              <option value="">Selecciona provincia</option>
              {provincias.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button onClick={buscar} className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600">
              {buscando ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>
      </section>

      {!buscado && (
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Categorias populares</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { nombre: "Plomeria", icono: "🔧" },
              { nombre: "Electricidad", icono: "⚡" },
              { nombre: "Gas", icono: "🔥" },
              { nombre: "Pintura", icono: "🖌️" },
              { nombre: "Construccion", icono: "🏗️" },
              { nombre: "Aire acondicionado", icono: "❄️" },
              { nombre: "Herreria", icono: "⚒️" },
              { nombre: "Cerrajeria", icono: "🔑" },
              { nombre: "Carpinteria", icono: "🪚" },
              { nombre: "Jardineria", icono: "🌿" },
            ].map((cat) => (
              <div key={cat.nombre} onClick={() => setOficio(cat.nombre)} className="bg-white rounded-xl p-4 text-center shadow-sm cursor-pointer border border-transparent hover:border-orange-400 hover:bg-orange-50 transition">
                <div className="text-3xl mb-2">{cat.icono}</div>
                <div className="text-sm font-medium text-gray-700">{cat.nombre}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 py-8">
        {buscando && (
          <div className="text-center py-16">
            <p className="text-gray-500">Buscando profesionales...</p>
          </div>
        )}

        {buscado && !buscando && resultados.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="text-5xl mb-4">😔</div>
            <h3 className="font-semibold text-gray-800 mb-2">No encontramos profesionales</h3>
            <p className="text-gray-500 text-sm">Proba con otra provincia u oficio</p>
          </div>
        )}

        {resultados.length > 0 && (
          <>
            <p className="text-gray-500 text-sm mb-6"><strong>{resultados.length}</strong> profesionales encontrados {provincia && `en ${provincia}`}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resultados.map((r) => (
                <div key={r.id} className={`bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition border-2 ${r.users?.plan === "master" ? "border-orange-400" : r.users?.plan === "pro" ? "border-blue-300" : "border-transparent"}`}>
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-40 flex items-center justify-center text-gray-400 text-sm">
                    Foto de portada
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800">{r.users?.full_name || "Profesional"}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.users?.plan === "master" ? "bg-orange-100 text-orange-600" : r.users?.plan === "pro" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                        {(r.users?.plan || "free").toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{r.city || "Argentina"}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-yellow-400 text-sm">★★★★★</span>
                      <span className="text-xs text-gray-400">Nuevo</span>
                    </div>
                    <a href={`/profesional/${r.slug || r.id}`} className="block w-full bg-orange-500 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
                      Ver perfil
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}