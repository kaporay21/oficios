export default function Buscar() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-orange-500">OficiosYa</a>
          <a href="/registro" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
            Registrate como profesional
          </a>
        </div>
      </header>

      {/* FILTROS */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
          <select className="border border-gray-200 rounded-lg px-4 py-2 text-gray-700 text-sm">
            <option value="">Tipo de oficio</option>
            <option value="plomeria">Plomería</option>
            <option value="electricidad">Electricidad</option>
            <option value="gas">Gas</option>
            <option value="pintura">Pintura</option>
            <option value="construccion">Construcción</option>
            <option value="aire-acondicionado">Aire acondicionado</option>
            <option value="herreria">Herrería</option>
            <option value="cerrajeria">Cerrajería</option>
            <option value="carpinteria">Carpintería</option>
            <option value="jardineria">Jardinería</option>
          </select>
          <input
            type="text"
            placeholder="Zona o barrio"
            className="border border-gray-200 rounded-lg px-4 py-2 text-gray-700 text-sm"
          />
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
            Buscar
          </button>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-gray-500 text-sm mb-6">Mostrando profesionales en tu zona</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* TARJETA MASTER */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-orange-400 overflow-hidden hover:shadow-md transition">
            <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400 text-sm">
              Foto de portada
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">Juan Pérez</h3>
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                  ★ MASTER
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">Plomería · Palermo, CABA</p>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-sm">★★★★★</span>
                <span className="text-xs text-gray-400">4.9 (23 reseñas)</span>
              </div>
              <div className="flex gap-2 text-xs text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">Destapaciones</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Termotanques</span>
              </div>
              <a href="/profesional/juan-perez" className="block w-full bg-orange-500 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
                Ver perfil
              </a>
            </div>
          </div>

          {/* TARJETA PRO */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
            <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400 text-sm">
              Foto de portada
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">María González</h3>
                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                  PRO
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">Electricidad · Belgrano, CABA</p>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-sm">★★★★☆</span>
                <span className="text-xs text-gray-400">4.6 (11 reseñas)</span>
              </div>
              <div className="flex gap-2 text-xs text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">Instalaciones</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Tableros</span>
              </div>
              <a href="/profesional/maria-gonzalez" className="block w-full bg-orange-500 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
                Ver perfil
              </a>
            </div>
          </div>

          {/* TARJETA FREE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition opacity-90">
            <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-400 text-sm">
              Foto de portada
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800">Carlos Ruiz</h3>
                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
                  FREE
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-1">Plomería · Villa Crespo, CABA</p>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-sm">★★★☆☆</span>
                <span className="text-xs text-gray-400">3.8 (4 reseñas)</span>
              </div>
              <div className="flex gap-2 text-xs text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">Plomería general</span>
              </div>
              <a href="/profesional/carlos-ruiz" className="block w-full bg-orange-500 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-orange-600">
                Ver perfil
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}