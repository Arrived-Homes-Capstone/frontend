import React from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import data from './assets/tempData.json';

const App = () => {
  return (
    <div>
      <FilterBar />
      <div className="flex-row flex-start">
        <Map />
        <PropertyList data={data} />
        </div>
    </div>
  )
}
export default App;
