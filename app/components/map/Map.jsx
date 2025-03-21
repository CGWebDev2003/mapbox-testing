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
	const [zoom] = useState(13);

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
							[12.37445, 51.335741],
							[12.377261, 51.335928],
							[12.379525, 51.336022],
							[12.380373, 51.336438],
							[12.381059, 51.337128],
							[12.381993, 51.338623],
							[12.384836, 51.338073],
							[12.388195, 51.336502],
							[12.392501, 51.333965],
							[12.398019, 51.329958],
							[12.399051, 51.328864],
							[12.399794, 51.32705],
							[12.401354, 51.324322],
							[12.405393, 51.319919],
							[12.411404, 51.314764],
							[12.410327, 51.314756],
							[12.409239, 51.314736],
							[12.408558, 51.314646],
							[12.407646, 51.314466],
							[12.406661, 51.314205],
							[12.406049, 51.313906],
							[12.401312, 51.311756],
							[12.396353, 51.310266],
							[12.395409, 51.312311],
							[12.395209, 51.312919],
							[12.394476, 51.314515],
							[12.405989, 51.313899],
							[12.405975, 51.31405],
							[12.394428, 51.314688],
							[12.395038, 51.318908],
							[12.395022, 51.319389],
							[12.394924, 51.319799],
							[12.39476, 51.320126],
							[12.394617, 51.320248],
							[12.392533, 51.322389],
							[12.393542, 51.322812],
							[12.39471, 51.322149],
							[12.394633, 51.321928],
							[12.394667, 51.321713],
							[12.394833, 51.321512],
							[12.395224, 51.321259],
							[12.395742, 51.321018],
							[12.396566, 51.320821],
							[12.396715, 51.320814],
							[12.396821, 51.320981],
							[12.397175, 51.321289],
							[12.396625, 51.321781],
							[12.39604, 51.322126],
							[12.395567, 51.322283],
							[12.395293, 51.322311],
							[12.395087, 51.322297],
							[12.394736, 51.322182],
							[12.393317, 51.322986],
							[12.382642, 51.329841],
							[12.382634, 51.329681],
							[12.393295, 51.322896],
							[12.386697, 51.320996],
							[12.38505, 51.320679],
							[12.384104, 51.320635],
							[12.382907, 51.32068],
							[12.373484, 51.320756],
							[12.369148, 51.320948],
							[12.369308, 51.322229],
							[12.368957, 51.322259],
							[12.368863, 51.320927],
							[12.365747, 51.321052],
							[12.365262, 51.320981],
							[12.363059, 51.321114],
							[12.361233, 51.321248],
							[12.360427, 51.321208],
							[12.359329, 51.320985],
							[12.351263, 51.319247],
							[12.347789, 51.318727],
							[12.346253, 51.318782],
							[12.345148, 51.31902],
							[12.341221, 51.318526],
							[12.339604, 51.318412],
							[12.339502, 51.318409],
							[12.337316, 51.319001],
							[12.33615, 51.319251],
							[12.334219, 51.319479],
							[12.335486, 51.321747],
							[12.338308, 51.327297],
							[12.341258, 51.331965],
							[12.349525, 51.332136],
							[12.357021, 51.336111],
							[12.356279, 51.336768],
							[12.35369, 51.340812],
							[12.351319, 51.345028],
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
