import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';
import constants from '../assets/constants';
import '../styles.css'

const Map = ({ center, currentListings }) => {
    const [zoom, setZoom] = useState(10);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (map) {
        map.setCenter(center);
        }
    }, [center]);

    // Customize the map as needed, documentation of google map react: https://github.com/google-map-react/google-map-react
    // Check out google maps api for further specs
    const handleApiLoaded = (map, maps) => {
        setMap(map);
        map.setCenter(center);
    };

    return (
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: constants.GOOGLE_API_KEY }}
                defaultCenter={{ lat: 36.07967, lng: -94.222055 }}
                defaultZoom={zoom}
                resetBoundsOnResize={true}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                {currentListings.map((listing, index) => {
                    if (listing.Latitude && listing.Longitude) {
                        return <MapMarker key={index} lat={listing.Latitude} lng={listing.Longitude} property={listing} />;
                    }
                })} 
            </GoogleMapReact>
        </div>
    );
};

export default Map;