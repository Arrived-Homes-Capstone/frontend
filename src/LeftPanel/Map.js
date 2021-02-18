import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import constants from '../assets/constants';
import '../styles.css'

const Map = () => {
    const [center, setCenter] = useState({ lat: 36.082157, lng: -94.71852 });
    const [zoom, setZoom] = useState(10);

    return (
        <div className="map-container">
            {/* <GoogleMapReact
                bootstrapURLKeys={{ key: constants.GOOGLE_API_KEY }}
                defaultCenter={center}
                defaultZoom={zoom}
                resetBoundsOnResize={true}
                // yesIWantToUseGoogleMapApiInternals
                // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
            </GoogleMapReact> */}
        </div>
    );
};

export default Map;