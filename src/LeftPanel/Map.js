import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';
import constants from '../assets/constants';
import '../styles.css'

const Map = ({ center, data, setBounds }) => {
    const [zoom, setZoom] = useState(10);
    const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (map) {
            var bounds = map.getBounds();
            var NE = bounds.getNorthEast();
            var SW = bounds.getSouthWest();

            setBounds({
                Lat: {
                    Max: NE.lat(),
                    Min: SW.lat()
                },
                Long: {
                    Max: NE.lng(),
                    Min: SW.lng()
                }
            })
            map.setCenter(center);
        }
    }, [center]);

    const boundsChange = () => {
        if (map && !loading) {
            var bounds = map.getBounds();
            var NE = bounds.getNorthEast();
            var SW = bounds.getSouthWest();

            setBounds({
                Lat: {
                    Max: NE.lat(),
                    Min: SW.lat()
                },
                Long: {
                    Max: NE.lng(),
                    Min: SW.lng()
                }
            })
        }
    }

    // Customize the map as needed, documentation of google map react: https://github.com/google-map-react/google-map-react
    // Check out google maps api for further specs
    const handleApiLoaded = (map, maps) => {
        setMap(map);
        map.setCenter(center);
        setLoading(false);
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
                onChange={() => boundsChange()}
            >
                {data.map((listing, index) => {
                    console.log(listing);
                    if (listing.Lat && listing.Long) {
                        return <MapMarker key={index} lat={listing.Lat} lng={listing.Long} property={listing} />;
                    }
                })}
            </GoogleMapReact>
        </div>
    );
};

export default Map;