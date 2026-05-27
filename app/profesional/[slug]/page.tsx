export default function PerfilProfesional() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-orange-500">OficiosYa</a>
          <a href="/registro" className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">Registrate</a>
        </div>
      </header>
      <div className="bg-gray-300 h-48 w-full" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800">Juan Perez</h1>
              <p className="text-gray-500 text-sm mt-1">Plomeria - Palermo, CABA</p>
              <p className="text-gray-600 text-sm mt-4">Plomero con 15 anos de experiencia en CABA y GBA.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-4">Fotos de trabajos</h2>
              <div className="grid grid-cols-3 gap-3">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="bg-gray-200 rounded-xl h-28 flex items-center justify-center text-gray-400 text-xs">Foto {i}</div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-4">Contactar</h2>
              <a href="https://wa.me/5491100000000?text=Hola+OficiosYa" target="_blank" className="block w-full bg-green-500 text-white text-center py-3 rounded-xl font-semibold mb-3">WhatsApp</a>
              <button className="w-full bg-orange-50 text-orange-600 py-3 rounded-xl font-semibold border border-orange-200">Pedir presupuesto</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
