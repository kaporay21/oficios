import Sidebar from "@/app/components/Sidebar";

export default function MiPlan() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activo="Mi plan" />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Mi Plan</h1>
          <p className="text-gray-500 text-sm mt-1">Gestioná tu suscripcion</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">Plan actual</span>
              <h2 className="text-2xl font-bold text-gray-800 mt-1">Free</h2>
              <p className="text-sm text-gray-500 mt-1">Actualizate para aparecer primero y conseguir mas clientes</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800">$0</div>
              <div className="text-sm text-gray-500">por mes</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Este mes con plan Free te perdiste</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Busquedas en tu zona", valor: "48", desc: "personas buscaron tu oficio" },
              { label: "Posiciones perdidas", valor: "Top 3", desc: "apareciste al final" },
              { label: "Clientes potenciales", valor: "12", desc: "fueron a un Pro antes que a vos" },
            ].map((m) => (
              <div key={m.label} className="text-center bg-red-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-500 mb-1">{m.valor}</div>
                <div className="text-xs font-medium text-gray-700">{m.label}</div>
                <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-semibold text-gray-800 mb-4">Elegí tu plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-orange-500">
            <div className="text-xs font-bold text-orange-500 uppercase mb-2">Actual</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Free</h3>
            <div className="text-3xl font-bold text-gray-800 mb-4">$0<span className="text-sm font-normal text-gray-500">/mes</span></div>
            <div className="space-y-2 mb-6">
              {["Perfil publico visible","10 fotos + 1 video","Boton WhatsApp","Apareces al final"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span>{f}
                </div>
              ))}
            </div>
            <button disabled className="w-full bg-gray-100 text-gray-400 py-3 rounded-xl font-semibold text-sm cursor-not-allowed">Plan actual</button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">MAS POPULAR</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Pro</h3>
            <div className="text-3xl font-bold text-gray-800 mb-4">$5.000<span className="text-sm font-normal text-gray-500">/mes</span></div>
            <div className="space-y-2 mb-6">
              {["Todo el Free","Fotos ilimitadas","Presupuestador","Analytics de perfil","Agenda y CRM","Posicion media en resultados"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500">✓</span>{f}
                </div>
              ))}
            </div>
            <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-600">Activar Pro</button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border-2 border-orange-400">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Master</h3>
            <div className="text-3xl font-bold text-gray-800 mb-4">$12.000<span className="text-sm font-normal text-gray-500">/mes</span></div>
            <div className="space-y-2 mb-6">
              {["Todo el Pro","Primero en tu zona","Badge Destacado","Analytics avanzado","Soporte prioritario","Solo 5 cupos por zona"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-orange-500">★</span>{f}
                </div>
              ))}
            </div>
            <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-orange-600">Activar Master</button>
          </div>

        </div>
      </main>
    </div>
  );
}