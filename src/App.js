import React, { useState, useEffect } from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import { getAllLocations, getAllListings, getSingleListing, getAllHomeTypes } from './API/functions';

// TODO: Set up propforma calculations

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [focusedLocation, setFocusedLocation] = useState(null);               // Currently focused location 
  const [center, setCenter] = useState(null);                                 // Center of the currently focused location
  const [bounds, setBounds] = useState(null);                                 // Bounds of the Google Map
  const [houseTypes, setHouseTypes] = useState(null);                         // All of the possible house types
  const [locations, setLocations] = useState(null);                           // All locations that can be focused on
  const [data, setData] = useState(null);
  const [currentListings, setCurrentListings] = useState(null);               // Most relevant listings based on focused location
  const [sortOrder, setSortOrder] = useState('MostRecent');                   // How the data for the listings are being ordered
  const [reqBody, setReqBody] = useState({});                                 // Body parameters for the GetAllListings API call

  // Ran on application start up
  useEffect(async () => {
    if (isLoading) {
      updateListings();

      const allLocations = await getAllLocations();
      setLocations(allLocations);

      setFocusedLocation(allLocations[1]);
      setCenter({ lat: allLocations[1].Lat, lng: allLocations[1].Long });

      const homeTypes = await getAllHomeTypes();
      setHouseTypes(homeTypes);

      setIsLoading(false);
    }
  }, []);

  // Load data every time reqBody is updated and when the sort order is oupdated
  useEffect(async () => {
    if (!isLoading) {
      updateListings();
    }
  }, [sortOrder, reqBody]);

  // Get all the correct data based on filtering, house type, sort by, and map location
  const updateListings = async () => {
    const response = await getAllListings({ ...reqBody, ...bounds }, sortOrder);
    setData(response);
    await fetchDetailedListings(response, 0, 10);
  }

  // Gets more detail for each property that is currently in the right listings panel
  const fetchDetailedListings = async (data, start, end) => {
    let res = [];
    for (let i = start; i < end; i++) {
      if (i >= data.length) {
        break;
      }
      const curr = data[i];
      const resp = await getSingleListing(curr.ListingID);
      res.push(resp);
    }
    setCurrentListings(res);
  }

  if (isLoading || currentListings == null || data == null) {
    return <div></div>
  } else {
    return (
      <div>
        <FilterBar {...{
          locations, focusedLocation, setFocusedLocation,
          setCenter, houseTypes, setHouseTypes, sortOrder,
          setSortOrder, setReqBody, reqBody, updateListings, bounds
        }} />
        <div className="flex-row flex-start" >
          <Map {...{ center, data, setBounds, updateListings }} />
          <PropertyList {...{ currentListings, fetchDetailedListings, data }} />
        </div>
      </div>
    )
  }
}
export default App;
