import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import NewPlantForm from "./NewPlantForm";

function App() {
  // State to hold the list of plants
  const [plants, setPlants] = useState([]);


  useEffect(() => {
    // Initialize plants from local storage if available
    const storedPlants = JSON.parse(localStorage.getItem("plants"));
    if (storedPlants) {
      setPlants(storedPlants);
    } else {
      // Fetch initial plants data from the server and set it to the state
      fetch("http://localhost:6001/plants")
        .then(response => response.json())
        .then(data => setPlants(data))
        console.log("Fetched Plants: ", )
        .catch(error => console.error('Error:', error));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever plants state changes
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  const onAddPlant = (newPlant) => {
    
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(newPlant),
    })
    .then(response => response.json())
    .then(addedPlant => {
      setPlants(prevPlants => [...prevPlants, addedPlant]);
    })
    .catch(error => console.error('Error:', error));
  };

  const onDeletePlant = (plantId) => {
    setPlants(prevPlants => prevPlants.filter(plant => plant.id !== plantId));
    
  };
  const onUpdatePrice = (plantId, newPrice) => {
    setPlants(plants.map(plant => {
      if (plant.id === plantId) {
        return { ...plant, price: newPrice };
      }
      return plant;
    }));
  };

  return (
    <div className="app">
      <Header />
      <NewPlantForm onAddPlant={onAddPlant} />
      <PlantPage plants={plants} onDeletePlant={onDeletePlant} onUpdatePrice={onUpdatePrice} />
    </div>
  );
}

export default App;