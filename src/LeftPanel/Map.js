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

    // Load marker components for the latitude and longitude of each listing
    const renderMarkers = () => {  
        let markers = [];
        currentListings.map((listing, index) => {
            return <MapMarker key={index} lat={listing.Lat} long={listing.Long} />;
        });
        //return markers;
    }

    return (
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: constants.GOOGLE_API_KEY }}
                defaultCenter={center}
                defaultZoom={zoom}
                resetBoundsOnResize={true}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
                {currentListings.map((listing, index) => {
                    if (listing.Latitude && listing.Longitude) {
                        return <MapMarker key={index} lat={listing.Latitude} lng={listing.Longitude} />;
                    }
                })} 
            </GoogleMapReact>
        </div>
    );
};

export default Map;