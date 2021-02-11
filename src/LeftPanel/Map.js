import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import constants from '../assets/constants';
import PropTypes from 'prop-types';
import '../styles.css'

const Map = () => {
    const [center, setCenter] = useState({ lat: 36.082157, lng: -94.71852 });
    const [zoom, setZoom] = useState(14);

    return (
        <div className="map-container">
            <GoogleMapReact
                bootstrapURLKeys={{ key: constants.GOOGLE_API_KEY }}
                defaultCenter={center}
                defaultZoom={zoom}
                // yesIWantToUseGoogleMapApiInternals
                // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
            </GoogleMapReact>
        </div>
    );
};

Map.propTypes = {
    
};

export default Map;