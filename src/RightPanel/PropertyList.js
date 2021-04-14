import React from 'react';
import Property from './Property'

const PropertyList = ({ data }) => {
    // console.log('data in PropertyList: ');
    // console.log(data);
    return (
        <div className="property-list">
            {data.map((property, index) => {
                return <Property key={index} property={property} isModal={false} />
            })}
        </div>
    );
};

export default PropertyList;