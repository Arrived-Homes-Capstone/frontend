import React, { useState, useEffect } from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import abbrState from './assets/stateAbbreves';
import houseTypeOptions from './assets/houseTypeOptions';

// TODO: Call the ExampleGetCurrentLocations API on application start
  // X Pass down all addresses to the filterbar search input area
  // X Make a handler when the user changes locations
  // X Only run this function one time (useRef)
  // X Do not render the application until this API call is handled

// TODO: Call the ExampleGetAllListings?ZipCode={ZipCode} on user address input
  // X Create a state that has all the data of each listing in the chosen region
  // X Rerender all posts whenever the state is changed
  // X Set the first "address" state to the Fayetteville object
  // X Set the first center to Fayetteville center

// TODO: Make the "Sort By" button work by calling the correct API
// Set up Google Map Markers (make them clickable and render the corrent listing on right panel)
// Set up all house components

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [focusedLocation, setFocusedLocation] = useState(null);               // Currently focused location 
  const [center, setCenter] = useState(null);                                 // Center of the currently focused location
  const [houseTypes, setHouseTypes] = useState(houseTypeOptions);             // All of the possible house types
  const [locations, setLocations] = useState(null);                           // All locations that can be focused on
  const [data, setData] = useState(null);                                     // All the data for every listings
  const [currentListings, setCurrentListings] = useState(null);               // Most relevant listings based on focused location

  // Ran on application start up
  useEffect(async () => {
    if (isLoading) {
      const allData = await getData();
      setData(allData);
      const allLocations = await getLocations();
      setLocations(allLocations);

      setFocusedLocation(allLocations[0]);
      setCenter({ lat: allLocations[0].Lat, lng: allLocations[0].Long });

      setIsLoading(false);
    }
  }, []);

  // Every time the focused location is updated, get the most relevant posts in the area
  useEffect(async () => {
    if (!isLoading) {
      const newListings = await fetchRelevantListings();
      setCurrentListings(newListings);
    }
  }, [focusedLocation, isLoading]);
 
  // Helper function that gets all the correct listings based on focus location
  const fetchRelevantListings = async () => {
    let newListings = [];
      for (let i = 0; i < data.length; i++) {
        const curr = data[i];
        // Add the closest radius listings first
        if (Math.abs(curr.Lat - focusedLocation.Lat) < .05 || Math.abs(curr.Long - focusedLocation.Long) < .05) {
          const response = await fetch(`https://7sgcz9f6id.execute-api.us-east-2.amazonaws.com/ExampleGetSingleListing?ListingID=${curr.ListingID}`);
          const listing = await response.json();
          newListings.unshift(listing);
          // Wider radius here
        } else if (Math.abs(curr.Lat - focusedLocation.Lat) < .1 || Math.abs(curr.Long - focusedLocation.Long) < .1) {
          const response = await fetch(`https://7sgcz9f6id.execute-api.us-east-2.amazonaws.com/ExampleGetSingleListing?ListingID=${curr.ListingID}`);
          const listing = await response.json();
          newListings.push(listing);
        }
      }
    return newListings;
  }

  // Returns all data stored in DB
  const getData = async () => {
    const response = await fetch('https://7sgcz9f6id.execute-api.us-east-2.amazonaws.com/ExampleGetAllListings');
    const allListings = await response.json();
    return allListings.Results;
  }

  // Returns all the locations that the user can search for in the filter bar
  const getLocations = async () => {
    const response = await fetch('https://7sgcz9f6id.execute-api.us-east-2.amazonaws.com/ExampleGetCurrentLocations');
    const allLocs = await response.json();
    let formatLocs = allLocs.Results;

    // Format the locations array to include a label and value
    for (let i = 0; i < formatLocs.length; i++) {
      let curr = formatLocs[i];
      let abbrev = abbrState(curr.State, 'abbr');
      curr.label  = curr.City + ", " + abbrev + " " + curr.PostalCode;
      curr.value = i;
    } 

    return formatLocs;
  }

  if (isLoading || currentListings == null) {
    return <div></div>
  } else {
  return (
      <div>
        <FilterBar {...{ locations, focusedLocation, setFocusedLocation, setCenter, houseTypes, setHouseTypes }}/>
        <div className="flex-row flex-start" >
          <Map {...{ center, currentListings }}  />
          <PropertyList data={currentListings} />
          </div>
      </div>
    )
    }
}
export default App;
