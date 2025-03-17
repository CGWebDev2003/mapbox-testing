"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
	"pk.eyJ1IjoiY29saW5ncmFobSIsImEiOiJjbThkNzBnNzcyNGFwMm5zN3RvYjhwYXo2In0.eaozaaDb45kZaaiFvOLRbQ";

const MyMap = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const marker = useRef(null);
	const [lng, setLng] = useState(13.405); // Standardwert für Berlin
	const [lat, setLat] = useState(52.52);
	const [zoom] = useState(10);

	// Geolocation abrufen
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLng(position.coords.longitude);
				setLat(position.coords.latitude);
			},
			(error) =>
				console.error("Fehler beim Abrufen der Position:", error),
			{ enableHighAccuracy: true }
		);
	}, []);

	// Map initialisieren (nur einmal)
	useEffect(() => {
		if (map.current || !mapContainer.current) return; // Verhindert doppelte Initialisierung

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [lng, lat], // Startposition
			zoom: zoom,
		});

		// Marker initialisieren
		marker.current = new mapboxgl.Marker()
			.setLngLat([lng, lat])
			.addTo(map.current);

		return () => map.current?.remove();
	}, []); // Nur beim ersten Rendern ausführen

	// Position updaten, wenn lng oder lat sich ändern
	useEffect(() => {
		if (map.current) {
			map.current.flyTo({ center: [lng, lat], essential: true });
		}
		if (marker.current) {
			marker.current.setLngLat([lng, lat]);
		}
	}, [lng, lat]); // Map zentrieren, wenn sich die Position ändert

	return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MyMap;
