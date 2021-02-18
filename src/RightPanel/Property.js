import React from 'react';
//import '../styles.css';

// Dollar formatter
const formatter = Intl.NumberFormat();

// TODO: Find a spot to render the lot footage
const Property = ({ property }) => {

    // Renders the List, Offer, and Renovation prices
    const renderPrices = () => {
        let result = "";
        if (property.ListPrice !== null) {
            result += "List: $" + formatter.format(property.ListPrice) + `\u00A0\u00A0`;
        }
        if (property.OfferPrice) {
            result += " Offer: $" + formatter.format(property.OfferPrice) + `\u00A0\u00A0`;
        }
        if (property.RenovationPrice) {
            result += " Reno: $" + formatter.format(property.RenovationPrice);
        }

        return result;
    }

    // Renders the beds, baths, and square feet
    const renderAmenities = () => {
        let result = "";
        if (property.Beds) {
            result += property.Beds + " Bed"
        }
        if (property.Beds && property.Baths) result += " / ";
        if (property.Baths) {
            result += property.Baths + " Bath" + `\u00A0\u00A0`;
        }
        if (property.SquareFeet) {
            result += property.SquareFeet + "sqft. "
        }
        // if (property.LotFootage) {
        //     result += property.LotFootage + "sqft. Lot Space"
        // }
        return result;
    }

    const renderBuildDate = () => {
        let result = "";
        if (property.YearBuilt) {
            result += "Built: " + property.YearBuilt + `\u00A0\u00A0`;
        }
        if (property.YearRenovated) {
            result += "Renovated: " + property.YearRenovated
        }
        return result;
    }

    return (
        <div className="flex-row prop-container">
            {/* Left column */}
            <div className="prop-col-1">
                <img src={property.HouseImageURL}
                    className="prop-image"
                    alt="Single family home" 
                />
                <button className="prop-proforma" onClick={() => console.log("Link proforma")}>View Proforma</button>
            </div>
            {/* Right column */}
            <div className="prop-col-2">
                <p className="prop-title">{property.FullAddress}, {property.City}</p>

                <div className="prop-text-container">
                    <p>{renderPrices()}</p>
                    {/* TODO: Check for agent notes on a low and high rent estimate. If this is there, render it */}
                    {property.RentPrice
                        && <p>Rent Estimate: ${formatter.format(property.RentPrice)}</p>
                    }
                    <p>{renderAmenities()}</p>
                    <p>{renderBuildDate()}</p>
                </div>
                <div className="flex-row flex-start prop-text-container">
                    <div className="prop-proforma-col-1">
                        <p>Investor Equity Required</p>
                        <p>Investor IRR (Year 7)</p>
                        <p>Investor Yield (Year 1)</p>
                        <p>Arrived Opfront Revenue</p>
                        <p>Arrived Property AUM Fees (7 yr)</p>
                        <p>Arrived Management Markup (7yr)</p>
                    </div>
                    <div>
                        <p>${formatter.format(property.InvestorEquityRequired)}</p>
                        <p>{property.InvestorIRR}%</p>
                        <p>{property.InvestorYield}%</p>
                        <p>${formatter.format(property.ArrivedOpfrontRevenue)}</p>
                        <p>${formatter.format(property.ArrivedPropertyAUMFees)}</p>
                        <p>${formatter.format(property.ArrivedManagementMarkup)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Property;