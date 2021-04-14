const endpoint = 'http://18.224.93.180';

const getListings = 'GetAllListings'

// Gets all the listings given a body parameter that is an object representing all filters
// Also includes a URL parameter that tell show the listings should be sorted (least or most recent)
export const getAllListings = async (body, order) => {
    const resp = await fetch(`${endpoint}/${getListings}?Order=${order}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({
            body
        })
    });

    const content = await resp.json();
    console.log(content);
}

// Gets Agent notes and proforma calculations based on a single listing property
export const getSingleListing = (listingID) => {
    return fetch(`${endpoint}/GetSingleListing?ListingID${listingID}`);
}

// Get all the locations of all the Arrived Homes markets for the search bar component
export const getAllLocations = () => {
    return fetch(`${endpoint}/GetAllLocations`)
}