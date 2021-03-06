/* eslint import/no-webpack-loader-syntax: off */

// @ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { useContext, useEffect, useReducer } from "react";
import { directionApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";
import { PlacesContext } from "../places/PlacesContext";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  marker: Marker[]
}
interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  marker: []
};

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const { places } = useContext(PlacesContext);

  useEffect(() => {

    state.marker.forEach(marker => marker.remove())
    const newMarkers: Marker[] = []

    for (const place of places) {
      const [lng, lat]= place.center;
      const popup = new Popup().setHTML(`<h6>${place.text}</h6>
      <p>${place.place_name}</p>
      `)

      const newMarker = new Marker().setPopup( popup ).setLngLat([lng, lat]).addTo(state.map!)

      newMarkers.push(newMarker)
    }

    dispatch({type: "setMarkers", payload: newMarkers})

  }, [ places, state.map ])

  const setMap = (map: Map) => {

    const myLocationPopUp = new Popup().setHTML(`<h4>Aquí estoy</h4>
    <p>En algún lugar del mundo</p>
    `) 

      new Marker({
        color: "#64DAFB"
      }).setLngLat( map.getCenter() )
      .setPopup( myLocationPopUp )
      .addTo( map )

      dispatch({type: "setMap", payload: map})
  }

  const getRouteBetweenPoints = async(start: [number, number], end: [number, number]) => {
      const resp = await directionApi.get<DirectionsResponse>(`/${start.join(",")};${end.join(",")}`)
 
      const { distance, duration, geometry } = resp.data.routes[0];
      const { coordinates:coords} = geometry

      let kms = distance / 1000;
      kms = Math.round( kms * 100)
      kms /= 100

      const minutes = Math.floor(duration / 60);

      const bounds = new LngLatBounds(
        start,
        start
      )

      for (const coord of coords) {
        const newCoord: [number, number] = [coord[0], coord[1]]
        bounds.extend( newCoord )
      }

      state.map?.fitBounds(bounds, {
        padding: 200
      })

      const sourceData: AnySourceData = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: coords
              }
            }
          ]
        }
      }
      if(state.map?.getLayer("RouteString")){
        state.map.removeLayer("RouteString");
        state.map.removeSource("RouteString")
      }

      state.map?.addSource("RouteString", sourceData)
      state.map?.addLayer({
        id: "RouteString",
        type: "line",
        source: "RouteString",
        layout: {
          "line-cap": "round",
          "line-join": "round"
        },
        paint: {
          "line-color": "blue",
          "line-width": 3
        }
      })

    }

  return (
    <MapContext.Provider value={{
       ...state,
       setMap,
       getRouteBetweenPoints
     }}>{children}</MapContext.Provider>
  );
};
