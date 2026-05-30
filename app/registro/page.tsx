"use client";
import { useState } from "react";

const provincias: Record<string, string[]> = {
  "Buenos Aires": ["La Plata","Mar del Plata","Bahia Blanca","Quilmes","Lanus","Lomas de Zamora","San Isidro","Vicente Lopez","Tigre","Morón","Merlo","Moreno","La Matanza","Tres de Febrero","San Martin","Avellaneda","Berazategui","Florencio Varela","Almirante Brown","Esteban Echeverria","Ezeiza","Hurlingham","Ituzaingo","José C. Paz","Malvinas Argentinas","San Miguel","Pilar","Escobar","Campana","Zarate","San Nicolás","Pergamino","Junin","Tandil","Necochea","Olavarria","Azul","Trenque Lauquen","Pehuajo","9 de Julio","Chivilcoy","Lujan","Mercedes","Pinamar","Villa Gesell","Miramar","San Clemente del Tuyú"],
  "CABA": ["Palermo","Belgrano","Recoleta","Caballito","Flores","Villa del Parque","Villa Urquiza","Almagro","Balvanera","San Telmo","La Boca","Barracas","Parque Patricios","Boedo","Villa Lugano","Mataderos","Liniers","Versalles","Monte Castro","Villa Real","Floresta","Velez Sarsfield","Villa Luro","Paternal","Villa Ortuzar","Coghlan","Saavedra","Colegiales","Nunez","Chacarita","Devoto","Agronomia","Villa Pueyrredon","Villa del Parque","Constitucion","Monserrat","Puerto Madero","Retiro","San Nicolas","Centro"],
  "Catamarca": ["San Fernando del Valle de Catamarca","San Isidro","Tinogasta","Belen","Santa Maria","Andalgala","Recreo","Valle Viejo","Capayan","El Alto"],
  "Chaco": ["Resistencia","Barranqueras","Fontana","Presidencia Roque Saenz Pena","Villa Angela","Charata","Gancedo","Juan Jose Castelli","Las Breñas","Quitilipi","Machagai","General Pinedo","Presidencia de la Plaza","Napenay"],
  "Chubut": ["Rawson","Comodoro Rivadavia","Trelew","Puerto Madryn","Esquel","Rada Tilly","Gaiman","Dolavon","Sarmiento","Rio Mayo","Puerto Piramides","Lago Puelo","El Maiten","Cholila","Camarones"],
  "Córdoba": ["Córdoba Capital","Villa Carlos Paz","Rio Cuarto","San Francisco","Villa Maria","Alta Gracia","Jesús Maria","Cosquin","La Falda","Cruz del Eje","Deán Funes","Bell Ville","Marcos Juarez","Rio Tercero","Arroyito","Monte Cristo","La Carlota","Villa Dolores","Mina Clavero","Cabrera","Oncativo","Pilar","San Marcos Sierras","Capilla del Monte"],
  "Corrientes": ["Corrientes Capital","Goya","Paso de los Libres","Curuzú Cuatiá","Mercedes","Santo Tomé","Bella Vista","Esquina","Empedrado","Ituzaingo","Mburucuyá","San Roque","Saladas","Alvear"],
  "Entre Rios": ["Paraná","Concordia","Gualeguaychu","Colon","Concepcion del Uruguay","La Paz","Victoria","Gualeguay","Villaguay","Federacion","San Jose","Crespo","Diamante","Nogoyá","Chajarí"],
  "Formosa": ["Formosa Capital","Clorinda","Pirané","El Colorado","Ingeniero Juarez","Laguna Blanca","General Mosconi","Gran Guardia","Ibarreta","Las Lomitas"],
  "Jujuy": ["San Salvador de Jujuy","San Pedro de Jujuy","Palpalá","Libertador General San Martin","Humahuaca","Tilcara","Purmamarca","La Quiaca","Abra Pampa","Calilegua","Fraile Pintado","Perico"],
  "La Pampa": ["Santa Rosa","General Pico","Toay","Macachín","Realicó","General Acha","Eduardo Castex","Victorica","Intendente Alvear","Catriló"],
  "La Rioja": ["La Rioja Capital","Chilecito","Chamical","Aimogasta","Chepes","Angel Vicente Penaloza","Vinchina","General Angel Vicente Penaloza","Patquia"],
  "Mendoza": ["Mendoza Capital","San Rafael","Godoy Cruz","Luján de Cuyo","Maipú","Las Heras","Guaymallén","Rivadavia","General Alvear","Malargüe","Tunuyán","Tupungato","San Carlos","Junín","La Paz"],
  "Misiones": ["Posadas","Oberá","Eldorado","Puerto Iguazú","Apóstoles","Leandro N. Alem","Montecarlo","Jardín América","Aristóbulo del Valle","Capiovi","Dos de Mayo","San Vicente","Bernardo de Irigoyen","Comandante Andresito"],
  "Neuquén": ["Neuquén Capital","San Martin de los Andes","Villa La Angostura","Junín de los Andes","Zapala","Cutral Co","Plaza Huincul","Centenario","Plottier","Rincón de los Sauces","Caviahue","Loncopué","Chos Malal"],
  "Rio Negro": ["Viedma","San Carlos de Bariloche","General Roca","Cipolletti","Allen","Roca","El Bolson","Choele Choel","Jacobacci","Pilcaniyeu","Dina Huapi","Villa Regina","Cinco Saltos"],
  "Salta": ["Salta Capital","San Ramon de la Nueva Oran","Tartagal","Cafayate","Rosario de la Frontera","Embarcacion","Joaquín V. González","General Güemes","Metan","Rivadavia","Cachi","Iruya","Molinos","La Poma"],
  "San Juan": ["San Juan Capital","Rawson","Chimbas","Rivadavia","Santa Lucia","Pocito","Caucete","San Martin","Albardón","Angaco","Calingasta","Jachal","Ullum","Zonda"],
  "San Luis": ["San Luis Capital","Villa Mercedes","Merlo","Justo Daract","Buena Esperanza","Concarán","Arizona","Quines","Naschel","Tilisarao"],
  "Santa Cruz": ["Río Gallegos","Caleta Olivia","Pico Truncado","Las Heras","Puerto Deseado","El Calafate","Gobernador Gregores","Puerto Santa Cruz","Perito Moreno","Los Antiguos","El Chaltén","Rio Turbio"],
  "Santa Fe": ["Rosario","Santa Fe Capital","Rafaela","Venado Tuerto","Reconquista","Santo Tome","Casilda","San Lorenzo","Esperanza","Cañada de Gomez","Villaguay","Firmat","Las Rosas","Coronda","Galvez","San Jorge","Vera","Tostado","Rufino"],
  "Santiago del Estero": ["Santiago del Estero Capital","La Banda","Termas de Rio Hondo","Añatuya","Frías","Loreto","Villa Atamisqui","Quimilí","Bandera","Suncho Corral","Clodomira","Monte Quemado"],
  "Tierra del Fuego": ["Ushuaia","Rio Grande","Tolhuin"],
  "Tucumán": ["San Miguel de Tucumán","Tafi Viejo","Yerba Buena","Banda del Rio Sali","Concepcion","Famailla","Monteros","Aguilares","Rio Chico","La Cocha","Tafi del Valle","Amaicha del Valle","Colalao del Valle"]
};

export default function Registro() {
  const [provinciasSeleccionadas, setProvinciasSeleccionadas] = useState<string[]>([]);
  const [ciudadesSeleccionadas, setCiudadesSeleccionadas] = useState<string[]>([]);
  const [provinciaAbierta, setProvinciaAbierta] = useState(false);
  const [ciudadAbierta, setCiudadAbierta] = useState(false);

  const toggleProvincia = (p: string) => {
    setProvinciasSeleccionadas(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
    setCiudadesSeleccionadas(prev =>
      prev.filter(c => {
        const nuevas = provinciasSeleccionadas.includes(p)
          ? provinciasSeleccionadas.filter(x => x !== p)
          : [...provinciasSeleccionadas, p];
        return nuevas.some(prov => provincias[prov]?.includes(c));
      })
    );
  };

  const toggleCiudad = (c: string) => {
    setCiudadesSeleccionadas(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const ciudadesDisponibles = provinciasSeleccionadas.flatMap(p => provincias[p] || []);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <a href="/" className="text-2xl font-bold text-orange-500">OficiosYa</a>
        </div>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Registrate como profesional</h1>
          <p className="text-gray-500 text-sm mb-8">Mostra tus trabajos y consegui clientes en tu zona</p>
          <div className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input type="text" placeholder="Juan Perez" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="juan@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
              <input type="tel" placeholder="011 1234-5678" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contrasena</label>
              <input type="password" placeholder="Minimo 8 caracteres" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tus oficios (podes elegir varios)</label>
              <div className="grid grid-cols-2 gap-2">
                {["Plomeria","Electricidad","Gas","Pintura","Construccion","Aire acondicionado","Herreria","Cerrajeria","Carpinteria","Jardineria"].map((oficio) => (
                  <label key={oficio} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-orange-400 hover:bg-orange-50">
                    <input type="checkbox" value={oficio} className="accent-orange-500" />
                    <span className="text-sm text-gray-700">{oficio}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provincias donde trabajas</label>
              <div className="relative">
                <button type="button" onClick={() => setProvinciaAbierta(!provinciaAbierta)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-left flex justify-between items-center bg-white">
                  <span className={provinciasSeleccionadas.length === 0 ? "text-gray-400" : "text-gray-700"}>
                    {provinciasSeleccionadas.length === 0 ? "Selecciona provincias" : `${provinciasSeleccionadas.length} provincia(s) seleccionada(s)`}
                  </span>
                  <span>{provinciaAbierta ? "▲" : "▼"}</span>
                </button>
                {provinciaAbierta && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {Object.keys(provincias).sort().map((p) => (
                      <label key={p} className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 cursor-pointer">
                        <input type="checkbox" checked={provinciasSeleccionadas.includes(p)} onChange={() => toggleProvincia(p)} className="accent-orange-500" />
                        <span className="text-sm text-gray-700">{p}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {provinciasSeleccionadas.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {provinciasSeleccionadas.map(p => (
                    <span key={p} className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {p}
                      <button onClick={() => toggleProvincia(p)} className="font-bold">x</button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {provinciasSeleccionadas.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciudades donde trabajas</label>
                <div className="relative">
                  <button type="button" onClick={() => setCiudadAbierta(!ciudadAbierta)} className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-left flex justify-between items-center bg-white">
                    <span className={ciudadesSeleccionadas.length === 0 ? "text-gray-400" : "text-gray-700"}>
                      {ciudadesSeleccionadas.length === 0 ? "Selecciona ciudades" : `${ciudadesSeleccionadas.length} ciudad(es) seleccionada(s)`}
                    </span>
                    <span>{ciudadAbierta ? "▲" : "▼"}</span>
                  </button>
                  {ciudadAbierta && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                      {provinciasSeleccionadas.map(prov => (
                        <div key={prov}>
                          <div className="px-4 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase">{prov}</div>
                          {provincias[prov].map(ciudad => (
                            <label key={ciudad} className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 cursor-pointer">
                              <input type="checkbox" checked={ciudadesSeleccionadas.includes(ciudad)} onChange={() => toggleCiudad(ciudad)} className="accent-orange-500" />
                              <span className="text-sm text-gray-700">{ciudad}</span>
                            </label>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {ciudadesSeleccionadas.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ciudadesSeleccionadas.map(c => (
                      <span key={c} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {c}
                        <button onClick={() => toggleCiudad(c)} className="font-bold">x</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contanos sobre vos</label>
              <textarea rows={3} placeholder="Anos de experiencia, especialidades..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm" />
            </div>

            <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-sm hover:bg-orange-600">
              Crear mi perfil gratis
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}
