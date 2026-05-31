export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-sm min-h-screen p-6 hidden md:block">
        <a href="/" className="text-xl font-bold text-orange-500 block mb-8">OficiosYa</a>
        <nav className="space-y-1">
          {[
            { label: "Dashboard", href: "/dashboard", activo: true },
            { label: "Mi perfil", href: "/dashboard/perfil" },
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

      {/* CONTENIDO */}
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Buen dia, profesional</h1>
          <p className="text-gray-500 text-sm mt-1">Resumen de tu actividad este mes</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Vistas a tu perfil", valor: "0", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Clicks en WhatsApp", valor: "0", color: "text-green-600", bg: "bg-green-50" },
            { label: "Presupuestos enviados", valor: "0", color: "text-orange-600", bg: "bg-orange-50" },
            { label: "Trabajos completados", valor: "0", color: "text-purple-600", bg: "bg-purple-50" },
          ].map((kpi) => (
            <div key={kpi.label} className={`${kpi.bg} rounded-2xl p-4`}>
              <div className={`text-3xl font-bold ${kpi.color} mb-1`}>{kpi.valor}</div>
              <div className="text-xs text-gray-500">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* BANNER FREE */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-orange-800 mb-1">Estas en el plan Free</h3>
              <p className="text-sm text-orange-600">Actualizate al plan Pro y aparece primero en los resultados de tu zona</p>
            </div>
            <a href="/dashboard/plan" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 whitespace-nowrap ml-4">
              Ver planes
            </a>
          </div>
        </div>

        {/* ACCESOS RAPIDOS */}
        <div className="mb-8">
          <h2 className="font-semibold text-gray-700 mb-4">Accesos rapidos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Nuevo trabajo", href: "/dashboard/trabajos", color: "bg-blue-500" },
              { label: "Nuevo presupuesto", href: "/dashboard/presupuestos", color: "bg-green-500" },
              { label: "Ver mi perfil", href: "/profesional/mi-perfil", color: "bg-orange-500" },
            ].map((acc) => (
              <a key={acc.label} href={acc.href} className={`${acc.color} text-white rounded-xl p-4 text-sm font-semibold hover:opacity-90 text-center`}>
                {acc.label}
              </a>
            ))}
          </div>
        </div>

        {/* ULTIMAS NOTIFICACIONES */}
        <div>
          <h2 className="font-semibold text-gray-700 mb-4">Notificaciones</h2>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-gray-400 text-sm text-center py-4">No tenes notificaciones nuevas</p>
          </div>
        </div>

      </main>
    </div>
  );
}