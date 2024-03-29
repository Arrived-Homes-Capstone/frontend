import React, { useState, useEffect } from 'react';
import { getSingleListing } from '../API/functions';
import Modal from 'react-modal';
import Property from '../RightPanel/Property';
import '../styles.css';

const formatter = Intl.NumberFormat();
const root = document.getElementById("root");
Modal.setAppElement(root);

// https://www.npmjs.com/package/react-modal
const customStyles = {
    content: {
        top: '15%',
        left: '17%',
        height: '55vh',
        width: '65vw',
        paddingLeft: '24px',
        paddingRight: '0px',
        overflow: 'visible',
    }
}

// On hover, it shows the image, buy price, beds/baths. Also, change color from red to blue.
// On click, opens an alert with the entire house component
const MapMarker = ({ property, clickedProperty }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [focusProperty, setFocusProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Automatically time out preview modal after 5 seconds
    useEffect(() => {
        if (showPreview) {
            setTimeout(() => {
                setShowPreview(false);
            }, 5000)
        }
    }, [showPreview])

    // If the user clicked the right panel property, show its marker's preview 
    useEffect(() => {
        if (clickedProperty == property.ListingID) {
            setShowPreview(true);
        }
    }, [clickedProperty]);

    // Get more information on the property before rendering the proeprty modal
    const getInfo = async () => {
        const prop = await getSingleListing(property.ListingID);
        console.log(prop);
        setFocusProperty(prop);
        setIsLoading(false);
    }

    return (
        <button className="marker-container"
            onClick={() => setModalIsOpen(true)}
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}>
            <div className="marker-button"></div>
            {showPreview &&
                <div className="marker-prev">
                    <div className="flex-row flex-start">
                        <img src={property.HouseImageURL}
                            className="marker-image"
                            alt=""
                        />
                        <div className="marker-col">
                            <p className="marker-text marker-price">{property.FullAddress}</p>
                            <div className="marker-row">
                                {property.Beds !== "None" && <p className="marker-text">{property.Beds + " Beds"}</p>}
                                {property.Beds !== "None" && property.Baths !== "None" && <p className="marker-text">/ </p>}
                                {property.Baths !== "None" && <p className="marker-text">{property.Baths + " Baths"}</p>}
                            </div>
                            {property.SquareFeet && property.SquareFeet > 0 &&
                                <p className="marker-text">{formatter.format(property.SquareFeet) + " sqft"}</p>}
                        </div>
                    </div>
                </div>
            }
            <div onClick={(e) => e.stopPropagation()}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Listing Modal"
                    style={customStyles}
                    onAfterOpen={() => getInfo()}
                >
                    {!isLoading && focusProperty &&
                        <>
                            <Property property={focusProperty} isModal={true} />
                            <button className="marker-modal-close" onClick={() => setModalIsOpen(false)}>
                                <img className="modal-img-close" src={'images/close_modal.png'} alt="close modal" />
                            </button>
                        </>
                    }
                </Modal>
            </div>
        </button>
    )
}

export default MapMarker;