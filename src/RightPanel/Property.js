import React, { useState } from 'react';
import Modal from 'react-modal';
import AgentNotesList from '../Misc/AgentNotesList';
import '../styles.css';

// Dollar formatter
const formatter = Intl.NumberFormat();
const root = document.getElementById("root");
Modal.setAppElement(root);

// https://www.npmjs.com/package/react-modal
const customStyles = {
    content: {
        top: '10%',
        left: '15%',
        height: '70vh',
        width: '70vw',
        paddingLeft: '24px',
        paddingBottom: '36px',
        overflow: 'visible'
    }
}

// TODO: Find a spot to render the lot footage
const Property = ({ property, isModal, setSelectedListings, selectedListings }) => {
    const [selected, setSelected] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    // Renders the ability to view agent notes or to add this property to the 
    // "send to agent" component
    const renderAgentStatus = () => {
        if (property.AgentNotes.length === 0) {
            return (
                <button className="filter-type-btn flex-row" onClick={() => handleSelect()}>
                    {selected
                        ? <img src={'/images/check_clicked.png'} alt="checkbox clicked" className="filter-check" />
                        : <img src={'/images/check_empty.png'} alt="checkbox empty" className="filter-check" />
                    }
                    <p style={{ fontWeight: 'bold', color: '#333333' }}>Notify Agent</p>
                </button>
            )
        } else {
            return (
                <button className="prop-button" onClick={() => setModalIsOpen(true)}>View Agent Notes</button>
            )
        }
    }

    // Either adds or removes the chosen property from the selected properties list. 
    // This is used to sned batch requests to agents in the area of selection.
    const handleSelect = () => {
        if (selected) {
            let newSelected = selectedListings.filter(item => item.ListingID !== property.ListingID);
            setSelectedListings(newSelected);
        } else {
            let newSelected = selectedListings.concat(property);
            setSelectedListings(newSelected);
        }
        setSelected(!selected);
    }

    return (
        <div className="flex-row prop-container">
            {/* Left column */}
            <div className="prop-col-1">
                <img src={property.HouseImageURL}
                    className={isModal ? "prop-image-lg" : "prop-image"}
                    alt="Single family home"
                />
                {renderAgentStatus()}
            </div>
            {/* Right column */}
            <div className="prop-col-2">
                <p className="prop-title">{property.FullAddress}, {property.City}</p>

                <div className="prop-text-container">
                    <p>{renderPrices()}</p>
                    {/* TODO: Check for agent notes on a low and high rent estimate. If this is there, render it */}
                    {property.RentPrice != "Need Agent Input"
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
            <div onClick={e => e.stopPropagation()}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Agent Notes Modal"
                    style={customStyles}
                >
                    <AgentNotesList address={property.FullAddress} agentNotes={property.AgentNotes} />
                    <button className="marker-modal-close" onClick={() => setModalIsOpen(false)}>
                        <img className="modal-img-close" src={'/images/close_modal.png'} alt="close modal" />
                    </button>

                </Modal>
            </div>
        </div>
    );
};

export default Property;