export default function Clientes() {
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
            { label: "Clientes", href: "/dashboard/clientes", activo: true },
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
            <p className="text-gray-500 text-sm mt-1">Tu cartera de clientes</p>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
            + Nuevo cliente
          </button>
        </div>

        {/* BUSCADOR */}
        <div className="mb-6">
          <input type="text" placeholder="Buscar por nombre o telefono..." className="w-full max-w-md border border-gray-200 rounded-lg px-4 py-3 text-sm" />
        </div>

        {/* LISTA */}
        <div className="space-y-3 mb-8">
          {[
            { nombre: "Laura Martinez", telefono: "011 1234-5678", direccion: "Palermo, CABA", trabajos: 3, origen: "Plataforma", monto: "$25.500" },
            { nombre: "Roberto Kahn", telefono: "011 9876-5432", direccion: "Belgrano, CABA", trabajos: 1, origen: "Referido", monto: "$15.000" },
            { nombre: "Ana Suarez", telefono: "011 5555-4444", direccion: "Villa Crespo, CABA", trabajos: 2, origen: "Plataforma", monto: "$12.000" },
          ].map((c) => (
            <div key={c.nombre} className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">
                  {c.nombre[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{c.nombre}</h3>
                  <p className="text-sm text-gray-500">{c.telefono} — {c.direccion}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{c.trabajos} trabajos</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{c.origen}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-800 mb-2">{c.monto}</div>
                <div className="flex gap-2">
                  <button className="text-green-500 text-xs font-medium hover:underline">WhatsApp</button>
                  <button className="text-orange-500 text-xs font-medium hover:underline">Ver ficha</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FORMULARIO NUEVO CLIENTE */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Agregar nuevo cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input type="text" placeholder="Juan Perez" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
              <input type="tel" placeholder="011 1234-5678" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="juan@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Direccion</label>
              <input type="text" placeholder="Calle y numero, barrio" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Como llego</label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm">
                <option value="platform">Plataforma OficiosYa</option>
                <option value="referral">Referido</option>
                <option value="social">Redes sociales</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <input type="text" placeholder="Perro en la entrada, timbre roto..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
          </div>
          <button className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-orange-600">
            Guardar cliente
          </button>
        </div>

      </main>
    </div>
  );
}