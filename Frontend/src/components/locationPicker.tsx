import { useState, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";


type LocationPickerProps = {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
};

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const defaultPosition = { lat: -24.1858, lng: -65.2995 }; // Posición inicial
  const [mapCenter, setMapCenter] = useState(defaultPosition); // Estado del centro del mapa
  const mapRef = useRef<LeafletMap | null>(null); // Referencia al mapa

  function HandleMapMove() {
    const map = useMapEvents({
      move() {
        setMapCenter(map.getCenter()); // Actualiza el centro cuando el usuario mueve el mapa
      },
    });
    return null;
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "400px",zIndex:1}}>
      {/* Mapa */}
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <HandleMapMove />
      </MapContainer>

      {/* Marcador flotante */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex:1000
        }}
      >
        <img
          src="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
          alt="marker"
          width="25"
          height="41"
        />
      </div>

      {/* Botón para confirmar ubicación */}
      <button
        onClick={() => onLocationSelect(mapCenter)}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex:1000
        }}
      >
        📍 Confirmar ubicación
      </button>
    </div>
  );
}
