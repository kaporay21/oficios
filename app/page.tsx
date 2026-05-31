"use client";

const provincias = ["Buenos Aires","CABA","Catamarca","Chaco","Chubut","Córdoba","Corrientes","Entre Rios","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones","Neuquén","Rio Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tierra del Fuego","Tucumán"];

export default function Home() {
  const buscar = () => {
    const oficio = (document.getElementById("oficio") as HTMLSelectElement).value;
    const provincia = (document.getElementById("provincia") as HTMLSelectElement).value;
    window.location.href = `/buscar?oficio=${oficio}&provincia=${provincia}`;
  };

  return (
    <main className="min-h-screen bg-gray-50">

      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500">OficiosYa</h1>
          <div className="flex gap-3">
            <a href="/login" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-50">Ingresar</a>
            <a href="/registro" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">Registrate gratis</a>
          </div>
        </div>
      </header>

      <section className="bg-orange-500 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Encontra el profesional que necesitas en tu zona
          </h2>
          <p className="text-orange-100 text-lg mb-10">
            Plomeros, electricistas, gasistas y mas — verificados y cerca tuyo
          </p>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-4">
            <select id="oficio" className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 text-sm">
              <option value="">Tipo de oficio</option>
              {["Plomeria","Electricidad","Gas","Pintura","Construccion","Aire acondicionado","Herreria","Cerrajeria","Carpinteria","Jardineria"].map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <select id="provincia" className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 text-sm">
              <option value="">Selecciona provincia</option>
              {provincias.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button onClick={buscar} className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600">
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
            <div key={cat.nombre} className="bg-white rounded-xl p-4 text-center shadow-sm cursor-pointer border border-transparent hover:border-orange-400 hover:bg-orange-50 transition">
              <div className="text-3xl mb-2">{cat.icono}</div>
              <div className="text-sm font-medium text-gray-700">{cat.nombre}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-10">Como funciona para clientes?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { paso: "1", titulo: "Busca", desc: "Elegi el tipo de oficio y tu provincia" },
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

      <section className="bg-orange-500 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Sos un profesional de oficios?</h3>
          <p className="text-orange-100 mb-10">Unite a OficiosYa y consegui clientes en tu zona sin pagar por cada contacto</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { paso: "1", titulo: "Crea tu perfil", desc: "Subi fotos de tus trabajos, tu zona y tus servicios en minutos" },
              { paso: "2", titulo: "Los clientes te encuentran", desc: "Apareces en las busquedas de tu zona y oficio" },
              { paso: "3", titulo: "Te contactan directo", desc: "Sin intermediarios, sin pagar por cada consulta" },
            ].map((item) => (
              <div key={item.paso} className="bg-white bg-opacity-20 rounded-2xl p-6">
                <div className="w-10 h-10 bg-white text-orange-500 rounded-full flex items-center justify-center text-lg font-bold mb-4 mx-auto">
                  {item.paso}
                </div>
              <h4 className="font-semibold text-orange-600 mb-2">{item.titulo}</h4>
<p className="text-orange-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <a href="/registro" className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50">
            Registrate gratis como profesional
          </a>
        </div>
      </section>

    </main>
  );
}
