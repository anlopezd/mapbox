/* eslint import/no-webpack-loader-syntax: off */

import React from 'react';
import ReactDOM from 'react-dom';
import MapsApp from './MapsApp';

// @ts-ignore 
import mapboxgl from '!mapbox-gl'; 

 
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5sb3BlemQiLCJhIjoiY2t6dWhwcjAxM2pkMTJ3bnhxa3dzMGIyaSJ9.K-aKNVswGa4_RGOSrLAGtg'

if( !navigator.geolocation ){
  alert("No tiene geolocalización")
  throw new Error("Su navegador no tiene geolocalización");
  
}


ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
);

