import React, { useRef, useEffect } from 'react';
import maplibregl, {GlobeControl} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

export default function Map({ children, color }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const lng = 139.768;
  const lat = 35.6844;
  const zoom = 14;

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json`,
      center: [lng, lat],
      zoom: zoom,
    });
   
    new maplibregl.Marker({scale: 5, color: 'red'})
		  .setLngLat([lng, lat])
		  .addTo(map.current);

  }, [lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
