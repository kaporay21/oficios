import Sidebar from "@/app/components/Sidebar";

export default function Trabajos() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activo="Trabajos" />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Trabajos</h1>
            <p className="text-gray-500 text-sm mt-1">Gestioná tus trabajos activos y completados</p>
          </div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
            + Nuevo trabajo
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {["Todos", "Pendientes", "En curso", "Completados", "Cancelados"].map((tab, i) => (
            <button key={tab} className={`px-4 py-2 rounded-lg text-sm font-medium ${i === 0 ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          {[
            { titulo: "Destapacion cocina", cliente: "Laura Martinez", direccion: "Palermo, CABA", fecha: "Hoy 10:00", estado: "En curso", monto: "$8.500", color: "bg-orange-100 text-orange-700" },
            { titulo: "Instalacion termotanque", cliente: "Roberto Kahn", direccion: "Belgrano, CABA", fecha: "Manana 14:00", estado: "Pendiente", monto: "$15.000", color: "bg-yellow-100 text-yellow-700" },
            { titulo: "Reparacion perdida bano", cliente: "Ana Suarez", direccion: "Villa Crespo, CABA", fecha: "23 May", estado: "Completado", monto: "$6.000", color: "bg-green-100 text-green-700" },
          ].map((trabajo) => (
            <div key={trabajo.titulo} className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-gray-800">{trabajo.titulo}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${trabajo.color}`}>{trabajo.estado}</span>
                </div>
                <p className="text-sm text-gray-500">{trabajo.cliente} — {trabajo.direccion}</p>
                <p className="text-xs text-gray-400 mt-1">{trabajo.fecha}</p>
              </div>
              <div className="text-right ml-4">
                <div className="font-bold text-gray-800 mb-2">{trabajo.monto}</div>
                <button className="text-orange-500 text-xs font-medium hover:underline">Ver detalle</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Crear nuevo trabajo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titulo del trabajo</label>
              <input type="text" placeholder="Destapacion, instalacion..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <input type="text" placeholder="Nombre del cliente" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Direccion del trabajo</label>
              <input type="text" placeholder="Calle y numero, barrio" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y hora</label>
              <input type="datetime-local" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monto acordado</label>
              <input type="number" placeholder="15000" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm">
                <option value="pending">Pendiente</option>
                <option value="scheduled">Programado</option>
                <option value="in_progress">En curso</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea rows={2} placeholder="Detalles adicionales del trabajo..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>
          </div>
          <button className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-orange-600">
            Guardar trabajo
          </button>
        </div>
      </main>
    </div>
  );
}