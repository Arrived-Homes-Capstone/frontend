const endpoint = 'http://18.224.93.180';

// TODO: Make sure the client can also search by ZIPCODE for this route
// TODO: Rename the route from GetAlAddresses to GetAllListings
// Get ever property in the database given the order type and zipcode
export const getAllListings = (order) => {
    return fetch(`${endpoint}/GetAllAddresses?OrderType=${order}`);
}

// Gets Agent notes and proforma calculations based on a single listing property
export const getSingleListing = (listingID) => {
    return fetch(`${endpoint}/GetSingleListing?ListingID${listingID}`);
}

// TODO: Create the API route to get all the locations for the search bar component