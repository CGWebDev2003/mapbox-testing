"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
	"pk.eyJ1IjoiY29saW5ncmFobSIsImEiOiJjbThkNzBnNzcyNGFwMm5zN3RvYjhwYXo2In0.eaozaaDb45kZaaiFvOLRbQ";

const MyMap = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);

	useEffect(() => {
		if (map.current) return; // Verhindert doppelte Initialisierung

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v11",
			center: [13.405, 52.52], // [lng, lat]
			zoom: 10,
		});

		return () => map.current?.remove(); // Cleanup bei Unmount
	}, []);

	return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MyMap;
