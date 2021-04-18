import React, { useState, useEffect, useRef } from 'react';
import Property from './Property';

// Number of posts on screen at one time
const dataLimit = 10;

// Number of pages user can see at one time
const pageLimit = 5;

const PropertyList = ({ currentListings, fetchDetailedListings, data }) => {
    const pages = Math.round(currentListings.length / dataLimit);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        fetchDetailedListings(data, currentPage * dataLimit - dataLimit, currentPage * dataLimit);
    }, [currentPage]);

    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    }

    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    }

    const changePage = (event) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    if (isLoading) {
        return <div className="property-list">
            <p>Loading data...</p>
        </div>
    }
    else {
        return (
            <div>
                <div className="property-list">
                    {currentListings.map((d, idx) => (
                        <Property key={idx} property={d} isModal={false} />
                    ))}
                </div>
                <div className="pagination">
                    {/* previous button */}
                    <button
                        onClick={goToPreviousPage}
                        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                    >
                        prev
                 </button>

                    {/* show page numbers */}
                    {getPaginationGroup().map((item, index) => (
                        <button
                            key={index}
                            onClick={changePage}
                            className={`paginationItem ${currentPage === item ? 'active' : null}`}
                        >
                            <span>{item}</span>
                        </button>
                    ))}

                    {/* next button */}
                    <button
                        onClick={goToNextPage}
                        className={`next ${currentPage === pages ? 'disabled' : ''}`}
                    >
                        next
                </button>
                </div>
            </div>
        );
    }
};

export default PropertyList;