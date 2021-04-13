import React from 'react';
import Property from './Property'

const PropertyList = ({ data, setSelectedListings, selectedListings }) => {
    return (
        <div className="property-list">
            {data.map((property, index) => {
                return <Property key={index} property={property} isModal={false} {...{ setSelectedListings, selectedListings }} />
            })}
        </div>
    );
};

export default PropertyList;