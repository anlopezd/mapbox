import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { Feature } from "../interfaces/places";

export const SearchResult = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const [activeId, setActiveId] = useState("");

  const onPlaceClicked = (place: Feature) => {
    const [lng, lat] = place.center;

    setActiveId( place.id )

    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

 const getRoute = (place: Feature) => {
     if(!userLocation) return;
    const [lng, lat]= place.center

      getRouteBetweenPoints(userLocation, [lng, lat])
  }

  if (isLoadingPlaces) {
    return <></>;
  }

  if (places.length === 0) {
    return <></>;
  }

  return (
    <ul className="list-group mt-2">
      {places.map((place) => (
        <li
          key={place.id}
          className={`${activeId === place.id ? "active" : ""} list-group-item list-group-item-action pointer`}
          onClick={() => onPlaceClicked(place)}
        >
          <h6>{place.text} </h6>
          <p style={{ fontSize: "12px" }}>{place.place_name}</p>

          <button 
          onClick={() => getRoute( place )}
          className={`btn ${activeId === place.id ? "btn-outline-light" : "btn-outline-primary"}`}>Direcciones</button>
        </li>
      ))}
    </ul>
  );
};
