import React from 'react';
import FilterBar from './TopPanel/FilterBar';
import Map from './LeftPanel/Map';
import PropertyList from './RightPanel/PropertyList.js';

const App = () => {

  return (
    <div>
      <FilterBar />
      <Map />
      <PropertyList />
    </div>
  )
}
export default App;