import React, { useState } from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import data from './assets/tempData.json';
import locations from './assets/addresses';
import houseTypeOptions from './assets/houseTypeOptions';

const App = () => {
  const [address, setAddress] = useState(locations[2]);
  const [center, setCenter] = useState({ lat: 36.082157, lng: -94.71852 });
  const [houseTypes, setHouseTypes] = useState(houseTypeOptions);

  return (
    <div>
      <FilterBar {...{ address, setAddress, setCenter, houseTypes, setHouseTypes }}/>
      <div className="flex-row flex-start" >
        <Map {...{ center }}  />
        <PropertyList data={data} />
        </div>
    </div>
  )
}
export default App;
