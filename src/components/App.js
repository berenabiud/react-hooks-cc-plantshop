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
      // Fetch initial plants data from the Render server
      fetch("https://your-json-server.onrender.com/plants") // Replace with your Render URL
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
    // Update local storage whenever plants state changes
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  const onAddPlant = (newPlant) => {
    fetch("https://your-json-server.onrender.com/plants", { // Replace with your Render URL
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
    setPlants(prevPlants => prevPlants.filter(plant => plant.id !== plantId));
    // You might also want to make a DELETE request here to the server.
  };

  const onUpdatePrice = (plantId, newPrice) => {
    setPlants(plants.map(plant => {
      if (plant.id === plantId) {
        return { ...plant, price: newPrice };
      }
      return plant;
    }));
    // You might also want to make a PATCH or PUT request here to the server.
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
