"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/app/components/Sidebar";

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
  const [fotos, setFotos] = useState<any[]>([]);
  const [subiendo, setSubiendo] = useState(false);
  const [userId, setUserId] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      setUserId(user.id);

      const { data: userData } = await supabase
        .from("users").select("*").eq("id", user.id).single();
      const { data: profileData } = await supabase
        .from("profiles").select("*").eq("user_id", user.id).single();
      const { data: fotosData } = await supabase
        .from("portfolio_photos").select("*").eq("user_id", user.id).order("order_index");

      if (userData) { setNombre(userData.full_name || ""); setTelefono(userData.phone || ""); }
      if (profileData) { setBio(profileData.bio || ""); setCiudad(profileData.city || ""); setExperiencia(profileData.years_experience || ""); }
      if (fotosData) setFotos(fotosData);
    };
    cargarDatos();
  }, []);

  const subirFoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    setSubiendo(true);

    const ext = file.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("portfolio")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) { alert("Error al subir: " + error.message); setSubiendo(false); return; }

    const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl(fileName);

    const { data: foto } = await supabase.from("portfolio_photos").insert({
      user_id: userId,
      url: urlData.publicUrl,
      order_index: fotos.length,
    }).select().single();

    if (foto) setFotos([...fotos, foto]);
    setSubiendo(false);
  };

  const eliminarFoto = async (fotoId: string, url: string) => {
    const path = url.split("/portfolio/")[1];
    await supabase.storage.from("portfolio").remove([path]);
    await supabase.from("portfolio_photos").delete().eq("id", fotoId);
    setFotos(fotos.filter(f => f.id !== fotoId));
  };

  const guardar = async () => {
    setGuardando(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("users").update({ full_name: nombre, phone: telefono }).eq("id", user.id);
    await supabase.from("profiles").update({ bio, city: ciudad, years_experience: parseInt(experiencia) }).eq("user_id", user.id);

    setMensaje("Perfil guardado correctamente");
    setGuardando(false);
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activo="Mi perfil" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Mi perfil</h1>
          <p className="text-gray-500 text-sm mt-1">Editá tu informacion publica</p>
        </div>

        {mensaje && (
          <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">{mensaje}</div>
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
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-semibold text-gray-800">Fotos de trabajos</h2>
                <p className="text-xs text-gray-400 mt-1">{fotos.length} fotos subidas</p>
              </div>
              <button onClick={() => fileRef.current?.click()} disabled={subiendo} className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50">
                {subiendo ? "Subiendo..." : "+ Agregar foto"}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={subirFoto} className="hidden" />
            </div>

            {fotos.length === 0 ? (
              <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl h-32 flex items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Clickea para subir tu primera foto</p>
                  <p className="text-gray-300 text-xs mt-1">JPG, PNG hasta 5MB</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {fotos.map((foto) => (
                  <div key={foto.id} className="relative group">
                    <img src={foto.url} alt="trabajo" className="w-full h-24 object-cover rounded-xl" />
                    <button onClick={() => eliminarFoto(foto.id, foto.url)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs items-center justify-center hidden group-hover:flex">
                      x
                    </button>
                  </div>
                ))}
                <div onClick={() => fileRef.current?.click()} className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs cursor-pointer hover:bg-gray-200 border-2 border-dashed border-gray-300">
                  + Foto
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button onClick={guardar} disabled={guardando} className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-orange-600 disabled:opacity-50">
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
          <a href="/profesional/mi-perfil" className="border border-gray-200 text-gray-600 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50">
            Ver mi perfil publico
          </a>
        </div>
      </main>
    </div>
  );
}