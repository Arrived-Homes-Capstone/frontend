import React, { useState } from 'react'
import Modal from 'react-modal';
import Property from '../RightPanel/Property';
import '../styles.css';

const formatter = Intl.NumberFormat();
const root = document.getElementById("root");
Modal.setAppElement(root);

// https://www.npmjs.com/package/react-modal
const customStyles = {
    content: {
        top: '20%',
        left: '15%',
        height: '50vh',
        width: '70vw',
        paddingLeft: '24px',
        paddingBottom: '36px',
        overflow: 'visible'
    }
}

// On hover, it shows the image, buy price, beds/baths. Also, change color from red to blue.
// On click, opens an alert with the entire house component
const MapMarker = ({ property }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
                            <p className="marker-text marker-price">${formatter.format(property.ListPrice)}</p>
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
            <div onClick={e => e.stopPropagation()}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Listing Modal"
                    style={customStyles}
                >
                    <Property property={property} isModal={true} />
                    <button className="marker-modal-close" onClick={() => setModalIsOpen(false)}>
                        <img className="modal-img-close" src={'images/close_modal.png'} alt="close modal" />
                    </button>

                </Modal>
            </div>
        </button>
    )
}

export default MapMarker;