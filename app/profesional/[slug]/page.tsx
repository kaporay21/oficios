"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function PerfilProfesional({ params }: { params: { slug: string } }) {
  const [perfil, setPerfil] = useState<any>(null);
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.slug)
        .single();

      if (profileError || !profileData) {
        setCargando(false);
        return;
      }

      setPerfil(profileData);

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", profileData.user_id)
        .single();

      if (userData) setUsuario(userData);
      setCargando(false);
    };
    cargar();
  }, [params.slug]);

  if (cargando) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">Cargando perfil...</p></div>;
  if (!perfil) return <div className="min-h-screen flex items-center justify-center"><p className="text-gray-400">Perfil no encontrado</p></div>;

  const waLink = `https://wa.me/${usuario?.phone?.replace(/\D/g,"")}?text=Hola+te+contacto+desde+OficiosYa`;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-orange-500">OficiosYa</a>
          <div className="flex gap-3">
            <a href="/login" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm font-medium">Ingresar</a>
            <a href="/registro" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium">Registrate gratis</a>
          </div>
        </div>
      </header>

      <div className="bg-gray-300 h-48 w-full" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-gray-800">{usuario?.full_name || "Profesional"}</h1>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${usuario?.plan === "master" ? "bg-orange-100 text-orange-600" : usuario?.plan === "pro" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"}`}>
                      {(usuario?.plan || "FREE").toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{perfil.city || "Argentina"}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-400 text-sm">★★★★★</span>
                    <span className="text-sm text-gray-500">Nuevo en la plataforma</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-2xl">
                  {usuario?.full_name?.[0] || "P"}
                </div>
              </div>
              {perfil.bio && <p className="text-gray-600 text-sm mt-4 leading-relaxed">{perfil.bio}</p>}
              {perfil.years_experience && <p className="text-gray-500 text-sm mt-2">{perfil.years_experience} anos de experiencia</p>}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-4">Fotos de trabajos</h2>
              <div className="grid grid-cols-3 gap-3">
                {[1,2,3].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-28 flex items-center justify-center text-gray-400 text-xs">
                    Sin fotos aun
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4">
              <h2 className="font-semibold text-gray-800 mb-4">Contactar</h2>
              <a href={waLink} target="_blank" className="block w-full bg-green-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-green-600 mb-3">
                Contactar por WhatsApp
              </a>
              <button className="w-full bg-orange-50 text-orange-600 py-3 rounded-xl font-semibold border border-orange-200">
                Pedir presupuesto
              </button>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Zona de trabajo</h3>
                <p className="text-sm text-gray-500">{perfil.city || "No especificada"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}