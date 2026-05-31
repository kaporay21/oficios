export default function Presupuestos() {
  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-sm min-h-screen p-6 hidden md:block">
        <a href="/" className="text-xl font-bold text-orange-500 block mb-8">OficiosYa</a>
        <nav className="space-y-1">
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Mi perfil", href: "/dashboard/perfil" },
            { label: "Trabajos", href: "/dashboard/trabajos" },
            { label: "Presupuestos", href: "/dashboard/presupuestos", activo: true },
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Presupuestos</h1>
            <p className="text-gray-500 text-sm mt-1">Crea y gestioná tus presupuestos</p>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
            + Nuevo presupuesto
          </button>
        </div>

        {/* LISTA */}
        <div className="bg-white rounded-2xl shadow-sm mb-8 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Numero</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Cliente</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Total</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Estado</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Fecha</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                { numero: "PRES-001", cliente: "Laura Martinez", total: "$8.500", estado: "Aceptado", fecha: "20 May", color: "bg-green-100 text-green-700" },
                { numero: "PRES-002", cliente: "Roberto Kahn", total: "$15.000", estado: "Enviado", fecha: "22 May", color: "bg-blue-100 text-blue-700" },
                { numero: "PRES-003", cliente: "Ana Suarez", total: "$6.000", estado: "Borrador", fecha: "23 May", color: "bg-gray-100 text-gray-700" },
              ].map((p) => (
                <tr key={p.numero} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{p.numero}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.cliente}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-800">{p.total}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.color}`}>{p.estado}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.fecha}</td>
                  <td className="px-6 py-4">
                    <button className="text-orange-500 text-xs font-medium hover:underline mr-3">Ver</button>
                    <button className="text-gray-400 text-xs font-medium hover:underline">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CREAR PRESUPUESTO */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-6">Crear presupuesto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <input type="text" placeholder="Nombre del cliente" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valido hasta</label>
              <input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numero</label>
              <input type="text" placeholder="PRES-004" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
          </div>

          {/* ITEMS */}
          <div className="mb-4">
            <div className="grid grid-cols-12 gap-2 mb-2">
              <div className="col-span-5 text-xs font-bold text-gray-500 uppercase">Descripcion</div>
              <div className="col-span-2 text-xs font-bold text-gray-500 uppercase">Cantidad</div>
              <div className="col-span-3 text-xs font-bold text-gray-500 uppercase">Precio unit.</div>
              <div className="col-span-2 text-xs font-bold text-gray-500 uppercase">Total</div>
            </div>
            {[1, 2].map((i) => (
              <div key={i} className="grid grid-cols-12 gap-2 mb-2">
                <input type="text" placeholder="Servicio o material" className="col-span-5 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input type="number" placeholder="1" className="col-span-2 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <input type="number" placeholder="0" className="col-span-3 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                <div className="col-span-2 border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500">$0</div>
              </div>
            ))}
            <button className="text-orange-500 text-sm font-medium hover:underline mt-2">+ Agregar item</button>
          </div>

          {/* TOTALES */}
          <div className="border-t border-gray-100 pt-4 mb-6">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span><span>$0</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Descuento %</span>
                  <input type="number" placeholder="0" className="w-16 border border-gray-200 rounded px-2 py-1 text-sm text-right" />
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-base border-t pt-2">
                  <span>Total</span><span>$0</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notas y condiciones</label>
            <textarea rows={2} placeholder="Incluye materiales, garantia 30 dias..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
          </div>

          <div className="flex gap-3">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-orange-600">
              Guardar borrador
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-600">
              Enviar por WhatsApp
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}