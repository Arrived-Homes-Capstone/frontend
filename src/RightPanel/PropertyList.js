import React from 'react';
import Property from './Property'
import PropTypes from 'prop-types';

// TODO: Render all the properties here with real data.
const PropertyList = ({ data }) => {
    return (
        <div>
            {data.map((property, index) => {
                return <Property key={index} property={property} />
            })}
        </div>
    );
};

PropertyList.propTypes = {
    
};

export default PropertyList;