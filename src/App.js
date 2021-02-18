import React from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';
import data from './assets/tempData.json';

// TODO: When setting map-container: z-index: -1, it looks good and the filter bar shows stuff,
// but you can't interact with map. How can we get it to look good and also work well?
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
