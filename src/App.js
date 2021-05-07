import React, { useState, useEffect } from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import { getAllLocations, getAllListings, getSingleListing, getAllHomeTypes } from './API/functions';

//TODO: Reload properties whenever the focused Locaiton changes from the top left search bar

// FAYETTEVILLE CONSTANTS
const LAT = 36.052437393;
const LONG = -94.13423309;
const FAYETTEVILLE = {
  City: "Fayetteville",
  Lat: 36.052437393,
  Long: -94.13423309,
  PostalCode: "72701",
  State: "AR",
  label: "Fayetteville, AR",
  value: 10
}
const BOUNDSHIFT = .08;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [focusedLocation, setFocusedLocation] = useState(null);               // Currently focused location 
  const [center, setCenter] = useState(null);                                 // Center of the currently focused location
  const [bounds, setBounds] = useState(null);                                 // Bounds of the Google Map
  const [houseTypes, setHouseTypes] = useState(null);                         // All of the possible house types
  const [locations, setLocations] = useState(null);                           // All locations that can be focused on
  const [data, setData] = useState(null);                                     // All the data from the app, less detailed than the focused data
  const [currentListings, setCurrentListings] = useState(null);               // Most relevant listings based on focused location
  const [sortOrder, setSortOrder] = useState('MostRecent');                   // How the data for the listings are being ordered
  const [reqBody, setReqBody] = useState({});                                 // Body parameters for the GetAllListings API call
  const [clickedProperty, setClickedProperty] = useState(null);               // Represents the current property that was clicked in the right panel

  // Ran on application start up
  useEffect(async () => {
    if (isLoading) {
      setFocusedLocation(FAYETTEVILLE);
      setCenter({ lat: LAT, lng: LONG });
      setBounds({
        Lat: {
          Max: LAT + BOUNDSHIFT,
          Min: LAT - BOUNDSHIFT
        },
        Long: {
          Max: LONG + BOUNDSHIFT,
          Min: LONG - BOUNDSHIFT
        }
      });

      updateListings();

      const allLocations = await getAllLocations();
      setLocations(allLocations);

      const homeTypes = await getAllHomeTypes();
      setHouseTypes(homeTypes);

      setIsLoading(false);
    }
  }, []);

  // Load data every time reqBody is updated and when the sort order is updated
  useEffect(async () => {
    if (!isLoading) {
      updateListings();
    }
  }, [sortOrder, reqBody]);

  // Get all the correct data based on filtering, house type, sort by, and map location
  const updateListings = async () => {
    let response;
    // TODO: The first run needs bounds on it so it does not take forever to run. Try to implement this better by waiting for the
    // setBounds function in the starting useEffect function.
    if (!bounds) {
      const temp_bounds = {
        Lat: {
          Max: LAT + BOUNDSHIFT,
          Min: LAT - BOUNDSHIFT
        },
        Long: {
          Max: LONG + BOUNDSHIFT,
          Min: LONG - BOUNDSHIFT
        }
      }
      console.log('first run')
      response = await getAllListings({ ...reqBody, ...temp_bounds }, sortOrder);
    } else {
      response = await getAllListings({ ...reqBody, ...bounds }, sortOrder);
    }

    setData(response);
    await fetchDetailedListings(response, 0, 10);
  }

  // Gets more detail for each property that is currently in the right listings panel (start to end, inclusive)
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
          setSortOrder, setReqBody, reqBody, updateListings
        }} />
        <div className="flex-row flex-start" >
          <Map {...{ center, data, setBounds, updateListings, clickedProperty }} />
          <PropertyList {...{ currentListings, fetchDetailedListings, data, setCenter, setClickedProperty }} />
        </div>
      </div>
    )
  }
}
export default App;
