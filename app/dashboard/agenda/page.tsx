export default function Agenda() {
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
            { label: "Agenda", href: "/dashboard/agenda", activo: true },
            { label: "Mi plan", href: "/dashboard/plan" },
          ].map((item) => (
            <a key={item.label} href={item.href} className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${item.activo ? "bg-orange-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Agenda</h1>
            <p className="text-gray-500 text-sm mt-1">Tus trabajos programados</p>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
            + Programar trabajo
          </button>
        </div>

        {/* SEMANA ACTUAL */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-800">Semana actual</h2>
            <div className="flex gap-2">
              <button className="border border-gray-200 px-3 py-1 rounded-lg text-sm hover:bg-gray-50">Anterior</button>
              <button className="border border-gray-200 px-3 py-1 rounded-lg text-sm hover:bg-gray-50">Siguiente</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((dia, i) => (
              <div key={dia} className="text-center">
                <div className="text-xs font-bold text-gray-500 mb-2">{dia}</div>
                <div className={`rounded-xl p-2 min-h-24 ${i === 0 ? "bg-orange-50 border border-orange-200" : "bg-gray-50"}`}>
                  <div className="text-xs text-gray-400 mb-1">{26 + i} May</div>
                  {i === 0 && (
                    <div className="bg-orange-500 text-white text-xs rounded-lg p-1 mb-1">
                      10:00 Destapacion
                    </div>
                  )}
                  {i === 1 && (
                    <div className="bg-yellow-400 text-white text-xs rounded-lg p-1">
                      14:00 Termotanque
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROXIMOS TRABAJOS */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Proximos trabajos</h2>
          <div className="space-y-3">
            {[
              { titulo: "Destapacion cocina", cliente: "Laura Martinez", fecha: "Hoy 10:00", direccion: "Palermo, CABA", color: "border-orange-400 bg-orange-50" },
              { titulo: "Instalacion termotanque", cliente: "Roberto Kahn", fecha: "Manana 14:00", direccion: "Belgrano, CABA", color: "border-yellow-400 bg-yellow-50" },
              { titulo: "Reparacion caneria", cliente: "Carlos Lopez", fecha: "Vie 9:00", direccion: "Caballito, CABA", color: "border-blue-400 bg-blue-50" },
            ].map((t) => (
              <div key={t.titulo} className={`border-l-4 ${t.color} rounded-r-xl p-4 flex justify-between items-center`}>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{t.titulo}</h3>
                  <p className="text-xs text-gray-500 mt-1">{t.cliente} — {t.direccion}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">{t.fecha}</div>
                  <button className="text-orange-500 text-xs hover:underline mt-1">Ver detalle</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}