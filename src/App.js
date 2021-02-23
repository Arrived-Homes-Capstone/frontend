import React, { useState } from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import data from './assets/tempData.json';

const App = () => {
  const [zipcode, setZipcode] = useState('98226');
  const [center, setCenter] = useState({ lat: 36.082157, lng: -94.71852 });

  return (
    <div>
      <FilterBar {...{ zipcode, setZipcode }}/>
      <div className="flex-row flex-start" >
        <Map {...{ center }}  />
        <PropertyList data={data} />
        </div>
    </div>
  )
}
export default App;
