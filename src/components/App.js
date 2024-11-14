import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import NewPlantForm from "./NewPlantForm";

function App() {
  const [plants, setPlants] = useState([]);

  // Fetch plants data from the backend when the component mounts
  useEffect(() => {
    fetch("https://plantsy-q1eq.onrender.com/plants") // Replace with your Render URL
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data);
        setPlants(data);
      })
      .catch(error => console.error("Fetch error:", error));
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Add new plant to the backend and update the state
  const onAddPlant = (newPlant) => {
    fetch("https://plantsy-q1eq.onrender.com/plants", { // Replace with your Render URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to add plant");
      }
      return response.json();
    })
    .then(addedPlant => {
      setPlants(prevPlants => [...prevPlants, addedPlant]);
    })
    .catch(error => console.error("Error adding plant:", error));
  };

  // Delete plant from the backend and update the state
  const onDeletePlant = (plantId) => {
    fetch(`https://plantsy-q1eq.onrender.com/plants/${plantId}`, { // Replace with your Render URL
      method: "DELETE",
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete plant");
      }
      setPlants(prevPlants => prevPlants.filter(plant => plant.id !== plantId));
    })
    .catch(error => console.error("Error deleting plant:", error));
  };

  // Update the price of a plant and update the state
  const onUpdatePrice = (plantId, newPrice) => {
    fetch(`https://plantsy-q1eq.onrender.com/plants/${plantId}`, { // Replace with your Render URL
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update plant price");
      }
      return response.json();
    })
    .then(updatedPlant => {
      setPlants(prevPlants =>
        prevPlants.map(plant =>
          plant.id === plantId ? updatedPlant : plant
        )
      );
    })
    .catch(error => console.error("Error updating plant price:", error));
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
