import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import ArrowheadsPolyline from "./ArrowheadPolyLine";

function SetBound({ bound }) {
  const map = useMap();

  if (bound.length >= 2) map.fitBounds(bound);
}

export default function Map({ flightPath }) {
  const boundArr = [];
  const fixNameArr = [];

  if (flightPath.length >= 2) {
    flightPath.forEach((point) => {
      boundArr.push(point.position);
      fixNameArr.push(point.designatedPoint);
    });
  }

  return (
    <MapContainer
      className="map"
      scrollWheelZoom={true}
      center={[1.35, 103.82]}
      zoom={11}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {boundArr.length >= 2
        ? boundArr.map((position, i) => (
            <Marker
              position={position}
              key={fixNameArr[i]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>Fix: {fixNameArr[i]}</Popup>
            </Marker>
          ))
        : null}

      <ArrowheadsPolyline
        positions={boundArr}
        arrowheads={{
          size: "15px",
          fill: true,
        }}
      />
      <SetBound bound={boundArr} />
    </MapContainer>
  );
}
