export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500">OficiosYa</h1>
          <div className="flex gap-3">
            <a href="/login" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50">
              Ingresar
            </a>
            <a href="/registro" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
              Registrate gratis
            </a>
          </div>
        </div>
      </header>

      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Encontra el profesional que necesitas en tu zona
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Plomeros, electricistas, gasistas y mas — verificados y cerca tuyo
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4">
            <select className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700">
              <option value="">Tipo de oficio</option>
              <option value="plomeria">Plomeria</option>
              <option value="electricidad">Electricidad</option>
              <option value="gas">Gas</option>
              <option value="pintura">Pintura</option>
              <option value="construccion">Construccion</option>
              <option value="aire-acondicionado">Aire acondicionado</option>
              <option value="herreria">Herreria</option>
              <option value="cerrajeria">Cerrajeria</option>
              <option value="carpinteria">Carpinteria</option>
              <option value="jardineria">Jardineria</option>
            </select>
            <input
              type="text"
              placeholder="Zona o barrio (ej: Palermo)"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700"
            />
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600">
              Buscar
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Categorias populares</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { nombre: "Plomeria", icono: "🔧" },
            { nombre: "Electricidad", icono: "⚡" },
            { nombre: "Gas", icono: "🔥" },
            { nombre: "Pintura", icono: "🖌️" },
            { nombre: "Construccion", icono: "🏗️" },
            { nombre: "Aire acondicionado", icono: "❄️" },
            { nombre: "Herreria", icono: "⚒️" },
            { nombre: "Cerrajeria", icono: "🔑" },
            { nombre: "Carpinteria", icono: "🪚" },
            { nombre: "Jardineria", icono: "🌿" },
          ].map((cat) => (
            <div key={cat.nombre} className="bg-white rounded-xl p-4 text-center shadow-sm cursor-pointer border border-transparent hover:border-orange-400">
              <div className="text-3xl mb-2">{cat.icono}</div>
              <div className="text-sm font-medium text-gray-700">{cat.nombre}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-10">Como funciona?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { paso: "1", titulo: "Busca", desc: "Elegi el tipo de oficio y tu zona" },
              { paso: "2", titulo: "Contacta", desc: "Mira el perfil, las fotos y escribile por WhatsApp" },
              { paso: "3", titulo: "Listo", desc: "El profesional te atiende directo, sin intermediarios" },
            ].map((item) => (
              <div key={item.paso} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {item.paso}
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{item.titulo}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}