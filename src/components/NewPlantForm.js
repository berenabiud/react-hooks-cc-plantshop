import React, { useState } from "react";

// Adds new plant with its details
function NewPlantForm({ onAddPlant }) {
  
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

// handleChange updates the formData 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, 
      [name]: value, 
    });
  };

    const handleSubmit = (e) => {
    e.preventDefault(); 
    onAddPlant(formData); 
    setFormData({ name: "", image: "", price: "" }); // Reset form fields
  };

  // The form UI with inputs for plant name, image URL, and price
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;