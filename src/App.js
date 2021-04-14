import React, { useState, useEffect } from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import { getAllLocations, getAllListings, getSingleListing, getAllHomeTypes } from './API/functions';

// IMPORTANT DEV UPDATE: GETALLLISTINGS NOW WORKS AS THE FETCHRELEVANTLISTINGS. NO NEED TO HAVE TWO DIFFERENT
// STATES OR FUNCTION CALLS

// TODO: Make the "Sort By" button work by calling the correct API
// ExampleGetAllListings?Order=Recent,LeastRecent?Zipcode={Zipcode}

// TODO: Get the bounds of lat and long from google map
// Use these in the getAllData queries

// TODO: Change the state formatting of the mapBounds to look like the one being accepted by the backend body param

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [focusedLocation, setFocusedLocation] = useState(null);               // Currently focused location 
  const [center, setCenter] = useState(null);                                 // Center of the currently focused location
  const [mapBounds, setMapBounds] = useState(null);
  const [houseTypes, setHouseTypes] = useState(null);             // All of the possible house types
  const [locations, setLocations] = useState(null);                           // All locations that can be focused on
  const [data, setData] = useState(null);                                     // All the data for every listings
  const [currentListings, setCurrentListings] = useState(null);               // Most relevant listings based on focused location
  const [sortOrder, setSortOrder] = useState('MostRecent');                   // How the data for the listings are being ordered

  // Ran on application start up
  useEffect(async () => {
    if (isLoading) {
      const response = await getAllListings({}, sortOrder);
      setData(response);

      const allLocations = await getAllLocations();
      setLocations(allLocations);

      setFocusedLocation(allLocations[1]);
      setCenter({ lat: allLocations[1].Lat, lng: allLocations[1].Long });

      const homeTypes = await getAllHomeTypes();
      setHouseTypes(homeTypes);

      setIsLoading(false);
    }
  }, []);

  // Every time the sort order is updated (least recent, most recent, most relevant)
  useEffect(async () => {
    if (!isLoading && data) {
      console.log("App Updated: " + sortOrder)



      const response = await getAllListings({}, sortOrder);
      setData(response);
      const listings = await fetchDetailedListings();
      setCurrentListings(listings);
    }
  }, [sortOrder, focusedLocation, isLoading]);

  // Gets more detail for each property that is currently on screen
  const fetchDetailedListings = async () => {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      const curr = data[i];
      const resp = await getSingleListing(curr.ListingID);
      res.push(resp);
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
