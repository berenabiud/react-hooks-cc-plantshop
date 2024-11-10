import React, { useState } from "react";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage({ plants, onDeletePlant, onUpdatePrice }) {
 
  const [searchQuery, setSearchQuery] = useState("");

  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

 
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery)
  );

  return (
    <main>
      <Search searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <PlantList plants={filteredPlants} onDeletePlant={onDeletePlant} onUpdatePrice={onUpdatePrice} />
    </main>
  );
}

export default PlantPage;