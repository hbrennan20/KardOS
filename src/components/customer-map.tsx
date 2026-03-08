"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { customerLocations, formatCurrency } from "@/lib/data";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const IRELAND_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [-10.8, 51.3], // SW
  [-5.3, 55.5],  // NE
];

const sectorColors: Record<string, string> = {
  Pharmaceuticals: "#6366f1",
  "Food Processing": "#22c55e",
  Construction: "#f59e0b",
  Healthcare: "#06b6d4",
  Manufacturing: "#ef4444",
  Retail: "#a855f7",
};

export function CustomerMap({ className }: { className?: string }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-7.6, 53.4],
      zoom: 6.2,
      maxBounds: IRELAND_BOUNDS,
      minZoom: 5.5,
      maxZoom: 12,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    map.current.on("load", () => {
      customerLocations.forEach((loc) => {
        const color = sectorColors[loc.sector] || "#6b7280";
        const size = Math.max(12, Math.min(28, Math.sqrt(loc.revenue / 10000)));

        const el = document.createElement("div");
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.backgroundColor = color;
        el.style.borderRadius = "50%";
        el.style.border = "2px solid white";
        el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
        el.style.cursor = "pointer";

        const popup = new mapboxgl.Popup({ offset: 15, closeButton: false })
          .setHTML(
            `<div style="font-family: Inter, sans-serif; font-size: 12px; line-height: 1.5; min-width: 140px;">
              <div style="font-weight: 600; margin-bottom: 2px;">${loc.name}</div>
              <div style="color: #6b7280;">${loc.sector}</div>
              <div style="font-weight: 600; margin-top: 4px;">${formatCurrency(loc.revenue)}</div>
              <div style="color: #9ca3af; font-size: 10px;">Lifetime value</div>
            </div>`
          );

        new mapboxgl.Marker(el)
          .setLngLat([loc.lng, loc.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
}
