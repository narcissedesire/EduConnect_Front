// Map.jsx
import React, { useEffect } from "react";
import L from "leaflet";

export default function Map() {
  useEffect(() => {
    const map = L.map("map").setView([-18.87919, 47.507905], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    L.marker([-18.87919, 47.507905]).addTo(map);

    // Cleanup function
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="map" style={{ height: "300px", width: "100%" }} className="z-10" />
  );
}
