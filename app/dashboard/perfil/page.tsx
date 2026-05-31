"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const provincias = ["Buenos Aires","CABA","Catamarca","Chaco","Chubut","Córdoba","Corrientes","Entre Rios","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones","Neuquén","Rio Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucumán"];

export default function EditarPerfil() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [bio, setBio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (userData) {
        setNombre(userData.full_name || "");
        setTelefono(userData.phone || "");
      }
      if (profileData) {
        setBio(profileData.bio || "");
        setCiudad(profileData.city || "");
        setExperiencia(profileData.years_experience || "");
      }
    };
    cargarDatos();
  }, []);

  const guardar = async () => {
    setGuardando(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("users").update({
      full_name: nombre,
      phone: telefono,
    }).eq("id", user.id);

    await supabase.from("profiles").update({
      bio,
      city: ciudad,
      years_experience: parseInt(experiencia),
    }).eq("user_id", user.id);

    setMensaje("Perfil guardado correctamente");
    setGuardando(false);
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <aside className="w-64 bg-white shadow-sm min-h-screen p-6 hidden md:block">
        <a href="/" className="text-xl font-bold text-orange-500 block mb-8">OficiosYa</a>
        <nav className="space-y-1">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Mi perfil", href: "/dashboard/perfil", activo: true },
            { label: "Trabajos", href: "/dashboard/trabajos" },
            { label: "Presupuestos", href: "/dashboard/presupuestos" },
            { label: "Clientes", href: "/dashboard/clientes" },
            { label: "Agenda", href: "/dashboard/agenda" },
            { label: "Mi plan", href: "/dashboard/plan" },
          ].map((item) => (
            <a key={item.label} href={item.href} className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${item.activo ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Mi perfil</h1>
          <p className="text-gray-500 text-sm mt-1">Editá tu informacion publica</p>
        </div>

        {mensaje && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {mensaje}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Datos personales</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                <input value={telefono} onChange={(e) => setTelefono(e.target.value)} type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anos de experiencia</label>
                <input value={experiencia} onChange={(e) => setExperiencia(e.target.value)} type="number" placeholder="15" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Zona de trabajo</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                <select value={provincia} onChange={(e) => setProvincia(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm">
                  <option value="">Selecciona provincia</option>
                  {provincias.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad o barrio principal</label>
                <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} type="text" placeholder="Palermo, CABA" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:col-span-2">
            <h2 className="font-semibold text-gray-800 mb-4">Descripcion</h2>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} placeholder="Contales a los clientes quien sos, tu experiencia y como trabajas..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:col-span-2">
            <h2 className="font-semibold text-gray-800 mb-4">Fotos de trabajos</h2>
            <p className="text-sm text-gray-500 mb-4">Subi fotos de tus trabajos reales — el antes y el despues convence mas que cualquier descripcion</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs cursor-pointer hover:bg-gray-200 border-2 border-dashed border-gray-300">
                  + Foto
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400">Plan Free: hasta 10 fotos. Plan Pro: ilimitadas.</p>
          </div>

        </div>

        <div className="mt-6 flex gap-4">
          <button onClick={guardar} disabled={guardando} className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-orange-600 disabled:opacity-50">
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
          <a href={`/profesional/mi-perfil`} className="border border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50">
            Ver mi perfil publico
          </a>
        </div>

      </main>
    </div>
  );
}