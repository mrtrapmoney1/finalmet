"use client";

import { useEffect, useRef } from "react";
import { COVERED_ZIPS, SERVICE_REGIONS } from "@/lib/zip-codes";

declare global {
  interface Window {
    google: typeof google;
    initServiceAreaMap: () => void;
  }
}

export function ServiceAreaMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Bounds covering Lincoln → Omaha → Council Bluffs → Grand Island
    const SERVICE_BOUNDS = {
      north: 41.55,
      south: 40.20,
      east: -95.75,
      west: -98.60,
    };

    function initMap() {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 41.0, lng: -96.85 },
        zoom: 8,
        mapTypeId: "roadmap",
        restriction: { latLngBounds: SERVICE_BOUNDS, strictBounds: false },
        styles: [
          // Muted base — surface color palette
          { featureType: "all", elementType: "geometry", stylers: [{ color: "#f6f3f2" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#d6e3ff" }] },
          { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#c4c6cf" }] },
          { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#e4e2e1" }] },
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
          { featureType: "transit", elementType: "labels", stylers: [{ visibility: "off" }] },
          { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#1b1c1c" }] },
          { featureType: "administrative.locality", elementType: "labels.text.stroke", stylers: [{ color: "#fbf9f8" }] },
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });

      mapInstanceRef.current = map;

      // Region center markers
      SERVICE_REGIONS.forEach((region) => {
        const marker = new window.google.maps.Marker({
          position: region.center,
          map,
          title: `${region.name}, ${region.state}`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#ae3100",
            fillOpacity: 0.9,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="font-family: Inter, sans-serif; padding: 4px 8px; max-width: 220px;">
              <p style="font-weight: 700; font-size: 14px; margin: 0 0 4px; color: #1b1c1c;">
                ${region.name}, ${region.state}
              </p>
              <p style="font-size: 12px; color: #43474e; margin: 0 0 4px;">
                ${region.zips.length} zip codes covered
              </p>
              <p style="font-size: 11px; color: #74777f; margin: 0;">
                ${region.description}
              </p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });

      // Highlight service shop location
      new window.google.maps.Marker({
        position: { lat: 40.8358, lng: -96.6467 },
        map,
        title: "Metro TV & Appliances — Our Shop",
        icon: {
          path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 7,
          fillColor: "#002045",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
        zIndex: 10,
      });
    }

    if (window.google?.maps) {
      initMap();
      return;
    }

    window.initServiceAreaMap = initMap;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initServiceAreaMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Clean up callback on unmount
      delete window.initServiceAreaMap;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full rounded-2xl overflow-hidden shadow-ambient-lg bg-surface-container-low"
      style={{ height: "480px" }}
      aria-label="Interactive map of Metro TV & Appliances service area"
    />
  );
}
