import React, { useState, useEffect } from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import tempData from './assets/tempData.json';
import abbrState from './assets/stateAbbreves';
import houseTypeOptions from './assets/houseTypeOptions';

// TODO: Call the ExampleGetCurrentLocations API on application start
  // X Pass down all addresses to the filterbar search input area
  // X Make a handler when the user changes locations
  // X Only run this function one time (useRef)
  // X Do not render the application until this API call is handled

// TODO: Call the ExampleGetAllListings?ZipCode={ZipCode} on user address input
  // Create a state that has all the data of each listing in the chosen region
  // Rerender all posts whenever the state is changed
  // X Set the first "address" state to the Fayetteville object
  // X Set the first center to Fayetteville center

// TODO: Make the "Sort By" button work by calling the correct API

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [focusedLocation, setFocusedLocation] = useState(null);               // Currently focused location 
  const [center, setCenter] = useState({ lat: 36.082157, lng: -94.71852 });   // Center of the currently focused location (defaults to Fayetteville, AR)
  const [houseTypes, setHouseTypes] = useState(houseTypeOptions);             // All of the possible house types
  const [data, setData] = useState(null);                                     // All the data for every listings
  const [locations, setLocations] = useState(null);                           // All locations that can be focused on


  // Only run on application start up
  useEffect(async() => {
    if (isLoading) {
      const allData = await getData();
      setData(allData);
      const allLocations = await getLocations();
      setLocations(allLocations);
      setFocusedLocation(allLocations[0]);
      setIsLoading(false);
    }
  }, []);

  // Returns all data stored in DB
  // TODO: Switch this from loading all data to just loading the current location's data
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

    // Format the locations array to include a label and value (used for the user text input component)
    for (let i = 0; i < formatLocs.length; i++) {
      let curr = formatLocs[i];
      let abbrev = abbrState(curr.State, 'abbr');
      curr.label  = curr.City + ", " + abbrev + " " + curr.PostalCode;
      curr.value = i;
    } 

    return formatLocs;
  }

  if (isLoading) {
    return <div></div>
  } else {
  return (
      <div>
        <FilterBar {...{ locations, focusedLocation, setFocusedLocation, setCenter, houseTypes, setHouseTypes }}/>
        <div className="flex-row flex-start" >
          <Map {...{ center }}  />
          <PropertyList data={tempData} />
          </div>
      </div>
    )
    }
}
export default App;
