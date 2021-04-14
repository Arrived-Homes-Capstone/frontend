const endpoint = 'http://18.224.93.180';

const getListings = 'GetAllListings';
const getAddresses = 'GetAllAddresses';

// Example: http://18.224.93.180/GetAllListings?OrderType=MostRecent

// Gets all the listings given a body parameter that is an object representing all filters
// Also includes a URL parameter that tell show the listings should be sorted (least or most recent)
export const getAllListings = async (body, order) => {
    const resp = await fetch(`${endpoint}/${getListings}?OrderType=${order}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({
            BathroomsLows: 1.0
        })
    });

    const content = await resp.json();
    return content;
}

// Gets Agent notes and proforma calculations based on a single listing property
export const getSingleListing = async (listingID) => {
    const resp = await fetch(`${endpoint}/GetSingleListing?ListingID=${listingID}`);
    return resp.json();
}

// Get all the locations of all the Arrived Homes markets for the search bar component
export const getAllLocations = async () => {
    const resp = await fetch(`${endpoint}/GetAllLocations`);
    return resp.json();
}

// Get all the home types for the Home Type filter component
export const getAllHomeTypes = () => {
    return fetch(`${endpoint}/GetAllHomeTypes`)
}