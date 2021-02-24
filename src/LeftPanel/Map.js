import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import constants from '../assets/constants';
import '../styles.css'

const Map = ({ center }) => {
    const [zoom, setZoom] = useState(10);
    const [map, setMap] = useState(null);
    console.log(center);

    // Customize the map as needed, documentation of google map react: https://github.com/google-map-react/google-map-react
    // Check out google maps api for further specs
    const handleApiLoaded = (map, maps) => {
        setMap(map);
        map.setCenter(center);
    };

    useEffect(() => {
        if (map) {
        map.setCenter(center);
        }
    }, [center]);

    return (
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: constants.GOOGLE_API_KEY }}
                defaultCenter={{ lat: 36.082157, lng: -94.71852 }}
                defaultZoom={zoom}
                resetBoundsOnResize={true}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
            </GoogleMapReact>
        </div>
    );
};

export default Map;