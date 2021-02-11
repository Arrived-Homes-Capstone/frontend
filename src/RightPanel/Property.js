import React from 'react';
import PropTypes from 'prop-types';

const property = {
    address: "4455 West Chaparral Lane",
    city: "Fayetteville",
    zip: "72701"
}

// TODO: Implement style after getting API connected
const Property = () => {
    return (
        <div className="flex-row prop-container">
            {/* Left column */}
            <div className="prop-col-1">
                <img src="https://webassetsprdnvrsan.blob.core.windows.net/images/f0b7d0fd-1451-4299-9e86-8b3c83de0a05/desktop/thumbnail"
                    className="prop-image"
                    alt="Single family home" 
                />
                <button className="prop-proforma" onClick={() => console.log("Link proforma")}>View Proforma</button>
            </div>
            {/* Right column */}
            <div className="prop-col-2">
                <p className="prop-title">{property.address}, {property.city}</p>
            </div>
        </div>
    );
};

Property.propTypes = {
    
};

export default Property;