import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { upcomingTrips } from "@/data/upcomingTrip"; // path might vary

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 23.2599, // Central India (e.g. Bhopal)
  lng: 77.4126,
};

export default function Maps() {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
      >
        {upcomingTrips.map((trip) => (
          <Marker
            key={trip.id}
            position={trip.location}
            title={`${trip.destination} - ${trip.date}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
