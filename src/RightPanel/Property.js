import React, { useState } from 'react';
import Modal from 'react-modal';
import { getProformaCalcs } from '../API/functions';
import ProformaCalculator from './ProformaCalculator';
import '../styles.css';

// Dollar formatter
const formatter = Intl.NumberFormat();
const root = document.getElementById("root");
Modal.setAppElement(root);

// https://www.npmjs.com/package/react-modal
const customStyles = {
    content: {
        top: '15%',
        left: '17%',
        height: '60vh',
        width: '65vw',
        paddingLeft: '24px',
        paddingRight: '0px',
        overflow: 'visible',
    }
}

const Property = ({ property, isModal, setCenter, setClickedProperty }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Get constants for proforma calculator module??? I guess?
    const getInfo = async () => {
        // const body = {
        //     OfferPrice: property.OfferPrice,
        //     RenoBudget: property.RenovationPrice,
        //     HOAFee: property.HOAFee,
        //     PropertyTax: property.ProformaData.Constants.Tax
        // }
        // //await getProformaCalcs(body);

        // setIsLoading(false);
    }

    const renderPrices = () => {
        let result = "";
        if (property.ListPrice !== null) {
            result += "List: $" + formatter.format(property.ListPrice) + `\u00A0\u00A0`;
        }
        if (property.OfferPrice && property.OfferPrice !== 'Need Agent Input') {
            result += " Offer: $" + formatter.format(property.OfferPrice) + `\u00A0\u00A0`;
        }
        if (property.RenovationPrice && property.RenovationPrice !== 'Need Agent Input') {
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
            result += formatter.format(property.SquareFeet) + " sqft. house"
        }
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
        if (property.LotFootage) {
            result += formatter.format(property.LotFootage) + " sqft. lot size"
        }
        return result;
    }

    const renderZillowHyperlink = () => {
        const address = property.FullAddress;
        const newAddr = address.replace(/ /g, "-");
        const link = `http://zillow.com/homes/${newAddr}_rb`

        return <div className="flex-row" style={{ alignItems: 'center', marginTop: 4, marginLeft: 4 }}>
            <img src={'images/zillow.png'} alt="zillow" className="property-hyper-img" />
            <a href={link} style={{ fontSize: 14 }} target="_blank">View on Zillow</a>
        </div>
    }

    // When clicking component, it loads the same location on the map
    const handleFocusProperty = () => {
        setClickedProperty(property.ListingID);
        setCenter({ lat: property.Latitude, lng: property.Longitude });
    }

    return (
        <>
            <div
                onClick={() => !isModal && handleFocusProperty()}
                className="flex-row prop-container"
                style={!isModal ? { cursor: 'pointer' } : { cursor: 'default' }}
            >
                {/* Left column */}
                <div className="prop-col-1">
                    <img src={property.HouseImageURL}
                        className={isModal ? "prop-image-lg" : "prop-image"}
                        alt="Single family home"
                    />
                    {renderZillowHyperlink()}
                    <div className="flex-row" style={{ alignItems: 'center', marginTop: 4, marginLeft: 4 }}>
                        <button onClick={() => setModalIsOpen(true)}>Calculate Proforma</button>
                    </div>

                </div>
                {/* Right column */}
                <div className="prop-col-2">
                    <p className="prop-title">{property.FullAddress}, {property.City}</p>

                    <div className="prop-text-container">
                        <p>{renderPrices()}</p>
                        <div className="flex-row">
                            {property.RentLow &&
                                <p>Rent Low: ${formatter.format(Math.round(property.RentLow)) + `\u00A0\u00A0`}</p>
                            }
                            {property.RentHigh &&
                                <p>Rent High: ${formatter.format(Math.round(property.RentHigh))}</p>
                            }
                        </div>
                        <p>{renderAmenities()}</p>
                        <p>{renderBuildDate()}</p>
                    </div>
                    <div className="flex-row flex-start prop-text-container">
                        <div className="prop-proforma-col-1">
                            <p>Investor Equity Required</p>
                            <p>Investor IRR (Year 7)</p>
                            <p>Investor Yield (Year 1)</p>
                            <p>Arrived Upfront Revenue</p>
                            <p>Arrived Property AUM Fees (7 yr)</p>
                            {/* TODO: Implement the below line when it is in the backend */}
                            {/* <p>Arrived Management Markup (7yr)</p> */}
                        </div>
                        <div>
                            <p>${formatter.format(Math.round(property.ProformaData.InvestorEquityRequired))}</p>
                            <p>{Math.round(property.ProformaData.InvestorIRR * 10000) / 100}%</p>
                            <p>{Math.round(property.ProformaData.InvestorYield * 10000) / 100}%</p>
                            <p>${formatter.format(Math.round(property.ProformaData.ArrivedUpfrontRevenue))}</p>
                            <p>${formatter.format(Math.round(property.ProformaData.ArrivedPropertyAUMFees))}</p>
                            {/* <p>${formatter.format(property.ProformaData.ArrivedManagementMarkup)}</p> */}
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Listing Modal"
                    style={customStyles}
                //onAfterOpen={() => getInfo()}
                >

                    <>
                        <ProformaCalculator property={property} />
                        <button className="marker-modal-close" onClick={() => setModalIsOpen(false)}>
                            <img className="modal-img-close" src={'images/close_modal.png'} alt="close modal" />
                        </button>
                    </>

                </Modal>
            </div>
        </>
    );
};

export default Property;