import React, { useState, useEffect } from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import abbrState from './assets/stateAbbreves';
import houseTypeOptions from './assets/houseTypeOptions';
import { getAllLocations, getAllListings } from './API/functions';

// IMPORTANT DEV UPDATE: GETALLLISTINGS NOW WORKS AS THE FETCHRELEVANTLISTINGS. NO NEED TO HAVE TWO DIFFERENT
// STATES OR FUNCTION CALLS

// TODO: Make the "Sort By" button work by calling the correct API
// ExampleGetAllListings?Order=Recent,LeastRecent?Zipcode={Zipcode}

// TODO: Get the bounds of lat and long from google map
// Use these in the getAllData queries

// TODO: Update the houseTypes state by calling the correct API endpoint.
// Not using the internally written houseTypeOptions

// TODO: Change the state formatting of the mapBounds to look like the one being accepted by the backend body param

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [focusedLocation, setFocusedLocation] = useState(null);               // Currently focused location 
  const [center, setCenter] = useState(null);                                 // Center of the currently focused location
  const [mapBounds, setMapBounds] = useState(null);
  const [houseTypes, setHouseTypes] = useState(houseTypeOptions);             // All of the possible house types
  const [locations, setLocations] = useState(null);                           // All locations that can be focused on
  const [data, setData] = useState(null);                                     // All the data for every listings
  const [currentListings, setCurrentListings] = useState(null);               // Most relevant listings based on focused location
  const [sortOrder, setSortOrder] = useState('MostRecent');                   // How the data for the listings are being ordered

  // Ran on application start up
  useEffect(async () => {
    if (isLoading) {
      const response = await getAllListings();
      setData(response);

      const allLocations = await getLocations();
      setLocations(allLocations);

      setFocusedLocation(allLocations[1]);
      setCenter({ lat: allLocations[1].Lat, lng: allLocations[1].Long });

      setIsLoading(false);
    }
  }, []);

  // Every time the focused location is updated, get the most relevant posts in the area
  // useEffect(async () => {
  //   if (!isLoading && focusedLocation) {
  //     const newListings = await fetchRelevantListings();
  //     setCurrentListings(newListings);
  //   }
  // }, [focusedLocation, isLoading]);

  // Every time the sort order is updated (least recent, most recent, most relevant)
  useEffect(async () => {
    if (!isLoading) {
      console.log("App Updated")
      const response = await getAllListings(null, sortOrder); // TODO:  Call this with a post request body
      const allListings = await response.json();
      setData(allListings);
      // const newListings = await fetchRelevantListings();
      // setCurrentListings(newListings);
    }
  }, [sortOrder, focusedLocation, isLoading]);

  // // TODO: (For austin) Must make sure that there are Lat and Long fields in the exampleGetAllListings object
  // // Helper function that gets all the correct listings based on focus location
  // const fetchRelevantListings = async () => {
  //   let newListings = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const curr = data[i];
  //     // Add the closest radius listings first
  //     if (Math.abs(curr.Lat - focusedLocation.Lat) < .05 || Math.abs(curr.Long - focusedLocation.Long) < .05) {
  //       const response = await fetch(`https://7sgcz9f6id.execute-api.us-east-2.amazonaws.com/ExampleGetSingleListing?ListingID=${curr.ListingID}`);
  //       const listing = await response.json();
  //       if (!listing.Error) {
  //         newListings.unshift(listing);
  //       }
  //       // Wider radius here
  //     } else if (Math.abs(curr.Lat - focusedLocation.Lat) < .1 || Math.abs(curr.Long - focusedLocation.Long) < .1) {
  //       const response = await fetch(`https://7sgcz9f6id.execute-api.us-east-2.amazonaws.com/ExampleGetSingleListing?ListingID=${curr.ListingID}`);
  //       const listing = await response.json();
  //       if (!listing.Error) {
  //         newListings.push(listing);
  //       }
  //     }
  //   }
  //   return newListings;
  // }

  // Returns all the locations that the user can search for in the filter bar
  // Filters it so that there are no duplicates accoring to City and State name
  const getLocations = async () => {
    const response = await getAllLocations();
    const allLocs = await response.json();
    let res = [];

    // Format the locations array to include a label and value
    // This is O(n^2) and will need configuring in the future !!
    for (let i = 0; i < allLocs.length; i++) {
      let curr = allLocs[i];
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

  if (isLoading || currentListings == null) {
    return <div></div>
  } else {
    return (
      <div>
        <FilterBar {...{ locations, focusedLocation, setFocusedLocation, setCenter, houseTypes, setHouseTypes, sortOrder, setSortOrder }} />
        <div className="flex-row flex-start" >
          <Map {...{ center, currentListings, setMapBounds }} />
          <PropertyList data={currentListings} />
        </div>
      </div>
    )
  }
}
export default App;
