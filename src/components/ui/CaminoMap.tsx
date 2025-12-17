import { useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { IconMapPin, IconWalk, IconChevronDown } from "@tabler/icons-react";
import { BRAND_THEME } from "../../config/designSystem";

// --- ARREGLO DE ICONOS LEAFLET EN REACT ---
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// --- DATOS DE LAS RUTAS ---
const CAMINO_ROUTES = {
  frances: {
    id: "frances",
    name: "Camino Francés",
    desc: "La ruta clásica por excelencia",
    color: "#D90429", // Rojo intenso para destacar en mapa satélite/topo
    coords: [
      [43.163, -1.236], // Saint-Jean-Pied-de-Port
      [42.993, -1.309], // Roncesvalles
      [42.812, -1.645], // Pamplona
      [42.466, -2.445], // Logroño
      [42.342, -3.697], // Burgos
      [42.600, -5.570], // León
      [42.546, -6.596], // Ponferrada
      [42.707, -7.047], // O Cebreiro
      [42.880, -8.544], // Santiago
    ] as [number, number][],
  },
  norte: {
    id: "norte",
    name: "Camino del Norte",
    desc: "Bordeando la costa cantábrica",
    color: "#0077B6", // Azul Costa
    coords: [
      [43.338, -1.789], // Irún
      [43.321, -1.986], // San Sebastián
      [43.263, -2.935], // Bilbao
      [43.462, -3.805], // Santander
      [43.554, -7.041], // Ribadeo
      [43.009, -7.556], // Lugo
      [42.880, -8.544], // Santiago
    ] as [number, number][],
  },
  primitivo: {
    id: "primitivo",
    name: "Camino Primitivo",
    desc: "El origen de la peregrinación",
    color: "#F48C06", // Naranja
    coords: [
      [43.361, -5.849], // Oviedo
      [43.177, -6.549], // Pola de Allande
      [43.009, -7.556], // Lugo
      [42.915, -8.012], // Melide
      [42.880, -8.544], // Santiago
    ] as [number, number][],
  },
  portugues: {
    id: "portugues",
    name: "Camino Portugués",
    desc: "Desde el sur, cruzando fronteras",
    color: "#38B000", // Verde Vivo
    coords: [
      [41.157, -8.629], // Oporto
      [42.046, -8.643], // Tui
      [42.431, -8.644], // Pontevedra
      [42.880, -8.544], // Santiago
    ] as [number, number][],
  }
};

type RouteKey = keyof typeof CAMINO_ROUTES;

// Componente para mover la cámara suavemente al cambiar de ruta
const MapUpdater = ({ coords }: { coords: [number, number][] }) => {
  const map = useMap();
  if (!coords || coords.length === 0) return null;
  
  // Calculamos el centro para enfocar bien la ruta seleccionada
  const centerLat = coords.reduce((sum, p) => sum + p[0], 0) / coords.length;
  const centerLng = coords.reduce((sum, p) => sum + p[1], 0) / coords.length;
  
  map.flyTo([centerLat, centerLng], 7, { duration: 1.5 }); // Animación de vuelo suave
  return null;
};

export const CaminoMap = () => {
  const [activeRoute, setActiveRoute] = useState<RouteKey>("frances");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const currentData = CAMINO_ROUTES[activeRoute];

  return (
    <div className={`w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white ${BRAND_THEME.layout.borderRadius.card} relative z-0 group`}>
      
      <MapContainer 
        center={[42.6, -4.5]} 
        zoom={6} 
        scrollWheelZoom={false} // Evita scroll accidental
        className="w-full h-full bg-[#EBECE2]"
        zoomControl={true} // ¡ZOOM ACTIVADO!
      >
        {/* CAPA REALISTA (Esri World Topo - Relieve y Terreno) */}
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        />

        <MapUpdater coords={currentData.coords} />

        {/* LÍNEA DE RUTA */}
        <Polyline 
          key={activeRoute} 
          positions={currentData.coords} 
          pathOptions={{ 
            color: currentData.color, 
            weight: 5, 
            opacity: 0.9,
            dashArray: "1, 0", // Línea sólida
            lineCap: "round"
          }} 
        />

        {/* MARCADOR INICIO */}
        <Marker position={currentData.coords[0]}>
          <Popup>
            <div className="text-center font-sans">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Inicio</span>
              <br/>
              <strong className="text-[#333D29] text-sm">{currentData.name}</strong>
            </div>
          </Popup>
        </Marker>

        {/* MARCADOR FINAL */}
        <Marker position={currentData.coords[currentData.coords.length - 1]}>
          <Popup>
            <strong className="text-[#333D29] font-sans">¡Santiago de Compostela! 🌟</strong>
          </Popup>
        </Marker>

      </MapContainer>

      {/* --- UI DEL SELECTOR (Dropdown Flotante) --- */}
      <div className="absolute top-4 right-4 z-[1000] w-64">
        
        {/* Botón Principal del Dropdown */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-[#333D29]/10 flex items-center justify-between text-[#333D29] transition-all hover:bg-white"
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full shadow-sm" 
              style={{ backgroundColor: currentData.color }}
            />
            <div className="text-left">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#656D4A] mb-0.5">Ruta Activa</span>
              <span className="block font-bold text-sm leading-none">{currentData.name}</span>
            </div>
          </div>
          <IconChevronDown 
            size={20} 
            className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} 
          />
        </button>

        {/* Lista Desplegable */}
        {isDropdownOpen && (
          <div className="mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-[#333D29]/5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {(Object.keys(CAMINO_ROUTES) as RouteKey[]).map((routeKey) => {
              const route = CAMINO_ROUTES[routeKey];
              const isActive = activeRoute === routeKey;
              
              return (
                <button
                  key={routeKey}
                  onClick={() => {
                    setActiveRoute(routeKey);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    w-full text-left p-3 flex items-center gap-3 transition-colors border-b border-gray-100 last:border-0
                    ${isActive ? "bg-[#333D29]/5" : "hover:bg-gray-50"}
                  `}
                >
                  <IconWalk 
                    size={18} 
                    className={isActive ? "text-[#333D29]" : "text-gray-400"} 
                  />
                  <div>
                    <span className={`block text-sm font-bold ${isActive ? "text-[#333D29]" : "text-gray-600"}`}>
                      {route.name}
                    </span>
                    <span className="text-[10px] text-gray-400 leading-none">
                      {route.desc}
                    </span>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-[#333D29]" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Etiqueta decorativa inferior */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-[#582F0E] shadow-sm pointer-events-none flex items-center gap-1.5">
        <IconMapPin size={14} /> Explorador de Rutas
      </div>

    </div>
  );
};