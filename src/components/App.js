import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";
import NewPlantForm from "./NewPlantForm";

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const storedPlants = JSON.parse(localStorage.getItem("plants"));
    if (storedPlants) {
      setPlants(storedPlants);
    } else {
      fetch("https://plantsy-q1eq.onrender.com/plants") // Replace with your Render URL
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => setPlants(data))
        .catch(error => console.error("Fetch error:", error));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

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

  const onUpdatePrice = (plantId, newPrice) => {
    fetch(`https://https://plantsy-q1eq.onrender.com/plants/${plantId}`, { // Replace with your Render URL
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
