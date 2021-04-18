import abbrState from '../assets/stateAbbreves';

const endpoint = 'http://18.224.93.180';
const getListings = 'GetAllListings';
const getAddresses = 'GetAllAddresses';

// Example: http://18.224.93.180/GetAllListings?OrderType=MostRecent

// Gets all the listings given a body parameter that is an object representing all filters
// Also includes a URL parameter that tell show the listings should be sorted (least or most recent)
export const getAllListings = async (body, order) => {
    console.log(body);
    const resp = await fetch(`${endpoint}/${getListings}?OrderType=${order}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify(body)
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
// Returns all the locations that the user can search for in the filter bar
// Filters it so that there are no duplicates accoring to City and State name
export const getAllLocations = async () => {
    const resp = await fetch(`${endpoint}/GetAllLocations`);
    const data = await resp.json();
    let res = [];

    // Format the locations array to include a label and value
    // This is O(n^2) and will need configuring in the future !!
    for (let i = 0; i < data.length; i++) {
        let curr = data[i];
        let alreadySaved = false;
        let state = curr.State;
        if (state.length > 2) {
            state = abbrState(state, 'abbr');
            curr.State = state;
        }

        for (let j = 0; j < res.length; j++) {
            if (res[j].City == curr.City && res[j].State == curr.State) {
                alreadySaved = true;
                break;
            }
        }

        // If not already in the list of locations, add it
        if (alreadySaved === false) {
            curr.label = curr.City + ", " + state;
            curr.value = i;
            res.push(curr);
        }
    }

    return res;
}

// // Helper function to alloow for sorting the home types based on their quantity in our database
// const compare = (a, b) => {
//     if (a.Quantity > b.Quantity) return 1;
//     if (a.Quantity < b.Quantity) return -1;
//     return 0;
// }

// Get all the locations of all the Arrived Homes markets for the search bar component
export const getAllHomeTypes = async () => {
    const resp = await fetch(`${endpoint}/GetAllHomeTypes`);
    const data = await resp.json();
    let res = [];
    for (let i = 0; i < data.length; i++) {
        let curr = data[i];
        // There needs to be more than 1 listing of this type to add it to our filter bar
        if (curr.Quantity > 1) {
            res.push({
                value: curr.HomeType,
                label: curr.HomeType,
                index: i,
                selected: true
            });
        }

    }
    return res;
}