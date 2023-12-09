import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export const isMapCreated = mapId => {
  const mapEl = document.getElementById(mapId);

  return mapEl.innerHTML !== '';
};

export const showMap = mapId => {
  if (isMapCreated(mapId)) return;

  // const map = L.map(mapId).setView([51.505, -0.09], 8);
  // remove default zoom controls and stop scroll wheel zoom
  const map = L.map(mapId, { scrollWheelZoom: false, zoomControl: false }).setView(
    [6.883, 79.887],
    8
  );
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    updateWhenZooming: false,
    maxZoom: 18,
    minZoom: 4,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // add zoom controls to bottom left
  L.control
    .zoom({
      position: 'bottomleft',
    })
    .addTo(map);

  return map;
};

export const setMarker = (map, coordinates, title) => {
  const marker = L.marker(coordinates);
  const popup = L.popup().setLatLng(coordinates).setContent(`<div>${title}</div>`);
  marker.bindPopup(popup);

  map.addLayer(popup);

  marker.addTo(map);
};
