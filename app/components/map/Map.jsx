"use client";
import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
	"pk.eyJ1IjoiY29saW5ncmFobSIsImEiOiJjbThkNzBnNzcyNGFwMm5zN3RvYjhwYXo2In0.eaozaaDb45kZaaiFvOLRbQ";

const MyMap = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const marker = useRef(null);

	// Start position Leipzig
	const [lng, setLng] = useState(12.350865);
	const [lat, setLat] = useState(51.345843);
	const [zoom] = useState(14);

	// Initialize Map (only once)
	useEffect(() => {
		if (map.current || !mapContainer.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		});

		// Initialize Marker
		marker.current = new mapboxgl.Marker()
			.setLngLat([lng, lat])
			.addTo(map.current);

		// Ensure cleanup on unmount
		return () => {
			map.current?.remove();
			map.current = null;
		};
	}, []); // Run only once on mount

	// Update Map Position if lng or lat changes
	useEffect(() => {
		if (map.current) {
			map.current.flyTo({ center: [lng, lat], essential: true });
		}
		if (marker.current) {
			marker.current.setLngLat([lng, lat]);
		}
	}, [lng, lat]);

	// Add Route Layer after map loads
	useEffect(() => {
		if (!map.current) return;

		const onLoad = () => {
			map.current.addSource("route", {
				type: "geojson",
				data: {
					type: "Feature",
					properties: {},
					geometry: {
						type: "LineString",
						coordinates: [
							[12.350865, 51.345843],
							[12.353526, 51.341218],
							[12.358526, 51.342036],
							[12.368353, 51.334864],
						],
					},
				},
			});

			map.current.addLayer({
				id: "route",
				type: "line",
				source: "route",
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
				paint: {
					"line-color": "cyan",
					"line-opacity": 0.7,
					"line-width": 7,
				},
			});
		};

		map.current.on("load", onLoad);

		// Cleanup function
		return () => {
			if (map.current?.getSource("route")) {
				map.current.removeLayer("route");
				map.current.removeSource("route");
			}
			map.current.off("load", onLoad);
		};
	}, []);

	return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default MyMap;
