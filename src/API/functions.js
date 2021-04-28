const endpoint = 'https://huskymarket.club';
const getListings = 'GetAllListings';

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

// Get all the locations of all the Arrived Homes markets for the search bar component
export const getAllHomeTypes = async () => {
    const resp = await fetch(`${endpoint}/GetAllHomeTypes`);
    const data = await resp.json();
    let res = [];
    for (let i = 0; i < data.length; i++) {
        let curr = data[i];
        // There needs to be more than 5 listing of this type to add it to our filter bar
        if (curr.Quantity > 5) {
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

function abbrState(input, to) {

    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr') {
        input = input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        for (let i = 0; i < states.length; i++) {
            if (states[i][0] == input) {
                return (states[i][1]);
            }
        }
    } else if (to == 'name') {
        input = input.toUpperCase();
        for (let i = 0; i < states.length; i++) {
            if (states[i][1] == input) {
                return (states[i][0]);
            }
        }
    }
}