"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function Chat() {
  const [conversaciones, setConversaciones] = useState<any[]>([]);
  const [convActiva, setConvActiva] = useState<any>(null);
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/login"; return; }
      setUserId(user.id);
console.log("USER ID:", user.id);
const { data, error } = await supabase
  .from("conversations")
  .select("*")
  .eq("professional_id", user.id)
  .order("created_at", { ascending: false });
console.log("CONVERSACIONES:", data);
console.log("ERROR:", error);
      setConversaciones(data || []);
    };
    init();
  }, []);

  useEffect(() => {
    if (!convActiva) return;
    const cargarMensajes = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convActiva.id)
        .order("created_at", { ascending: true });
      setMensajes(data || []);
    };
    cargarMensajes();

    const channel = supabase
      .channel(`messages:${convActiva.id}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${convActiva.id}`,
      }, (payload) => {
        setMensajes((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [convActiva]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !convActiva) return;
    setEnviando(true);
    await supabase.from("messages").insert({
      conversation_id: convActiva.id,
      sender: "professional",
      sender_name: "Vos",
      content: nuevoMensaje,
      type: "text",
    });
    setNuevoMensaje("");
    setEnviando(false);
  };

  const enviarPresupuesto = async () => {
    if (!convActiva) return;
    await supabase.from("messages").insert({
      conversation_id: convActiva.id,
      sender: "professional",
      sender_name: "Vos",
      content: "Te envio un presupuesto",
      type: "quote",
    });
  };

  const proponeAcuerdo = async () => {
    if (!convActiva) return;
    await supabase.from("agreements").insert({
      conversation_id: convActiva.id,
      professional_id: userId,
      title: "Acuerdo de trabajo",
      status: "pending",
    });
    await supabase.from("messages").insert({
      conversation_id: convActiva.id,
      sender: "professional",
      sender_name: "Vos",
      content: "Propuse un acuerdo de trabajo. Esperando confirmacion del cliente.",
      type: "agreement",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white shadow-sm min-h-screen p-6 hidden md:block">
        <a href="/" className="text-xl font-bold text-orange-500 block mb-8">OficiosYa</a>
        <nav className="space-y-1">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Mi perfil", href: "/dashboard/perfil" },
            { label: "Trabajos", href: "/dashboard/trabajos" },
            { label: "Presupuestos", href: "/dashboard/presupuestos" },
            { label: "Clientes", href: "/dashboard/clientes" },
            { label: "Agenda", href: "/dashboard/agenda" },
            { label: "Chat", href: "/dashboard/chat", activo: true },
            { label: "Mi plan", href: "/dashboard/plan" },
          ].map((item) => (
            <a key={item.label} href={item.href} className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${item.activo ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex">

        {/* LISTA DE CONVERSACIONES */}
        <div className="w-72 bg-white border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Mensajes</h2>
            <p className="text-xs text-gray-400 mt-1">{conversaciones.length} conversaciones</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversaciones.length === 0 && (
              <div className="p-6 text-center text-gray-400 text-sm">
                <p className="text-3xl mb-2">💬</p>
                <p>Aun no tenes mensajes</p>
                <p className="mt-2 text-xs">Los clientes te contactaran desde tu perfil</p>
              </div>
            )}
            {conversaciones.map((conv) => (
              <div key={conv.id} onClick={() => setConvActiva(conv)} className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 ${convActiva?.id === conv.id ? "bg-orange-50 border-l-4 border-l-orange-500" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    {conv.client_name?.[0] || "C"}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{conv.client_name}</p>
                    <p className="text-xs text-gray-400">{new Date(conv.created_at).toLocaleDateString("es-AR")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AREA DE CHAT */}
        <div className="flex-1 flex flex-col">
          {!convActiva ? (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-5xl mb-4">💬</p>
                <p className="font-medium">Selecciona una conversacion</p>
                <p className="text-sm mt-1">o espera que un cliente te contacte</p>
              </div>
            </div>
          ) : (
            <>
              {/* HEADER CHAT */}
              <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    {convActiva.client_name?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{convActiva.client_name}</p>
                    <p className="text-xs text-green-500">Activo</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={enviarPresupuesto} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-blue-100">
                    Enviar presupuesto
                  </button>
                  <button onClick={proponeAcuerdo} className="bg-green-50 text-green-600 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-green-100">
                    Proponer acuerdo
                  </button>
                </div>
              </div>

              {/* MENSAJES */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {mensajes.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "professional" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs rounded-2xl px-4 py-2 ${
                      msg.type === "agreement" ? "bg-green-100 text-green-800 border border-green-300" :
                      msg.type === "quote" ? "bg-blue-100 text-blue-800 border border-blue-300" :
                      msg.sender === "professional" ? "bg-orange-500 text-white" : "bg-white text-gray-800 shadow-sm"
                    }`}>
                      {msg.type === "agreement" && <p className="text-xs font-bold mb-1">Acuerdo de trabajo</p>}
                      {msg.type === "quote" && <p className="text-xs font-bold mb-1">Presupuesto</p>}
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "professional" ? "text-orange-200" : "text-gray-400"}`}>
                        {new Date(msg.created_at).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* INPUT */}
              <div className="bg-white border-t border-gray-100 p-4 flex gap-3">
                <input
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
                  placeholder="Escribi un mensaje..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button onClick={enviarMensaje} disabled={enviando} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-orange-600 disabled:opacity-50">
                  Enviar
                </button>
              </div>
            </>
          )}
        </div>

      </main>
    </div>
  );
}