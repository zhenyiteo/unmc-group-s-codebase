import React, { useState } from 'react';

function UpdateShipperForm() {
  const [formData, setFormData] = useState({
    shipperID: '',
    name: '',
    email: '',
    contact: '',
    website: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      'https://oxvie2kqq5.execute-api.us-east-1.amazonaws.com/prod/shippername',
      {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      alert('Shipper updated successfully!');
      setFormData({
        shipperID: '',
        name: '',
        email: '',
        contact: '',
        website: '',
      });
    } else {
      alert('Failed to update shipper.');
    }
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      id="shipper-form"
      onSubmit={handleSubmit}
    >
      <h1>Edit Shipper Profile</h1>
      <label htmlFor="shipperID">Shipper ID : </label>
      <input
        type="text"
        name="shipperID"
        id="shipperID"
        required
        value={formData.shipperID}
        onChange={handleInputChange}
      />
      <br />
      <br></br>

      <label htmlFor="name">Name: </label>
      <input
        type="text"
        name="name"
        id="name"
        required
        value={formData.name}
        onChange={handleInputChange}
      />
      <br />
      <br></br>

      <label htmlFor="email">Email: </label>
      <input
        type="email"
        name="email"
        id="email"
        required
        value={formData.email}
        onChange={handleInputChange}
      />
      <br />
      <br></br>

      <label htmlFor="contact">Contact: </label>
      <input
        type="text"
        name="contact"
        id="contact"
        required
        value={formData.contact}
        onChange={handleInputChange}
      />
      <br />
      <br></br>

      <label htmlFor="website">Website: </label>
      <input
        type="text"
        name="website"
        id="website"
        required
        value={formData.website}
        onChange={handleInputChange}
      />
      <br />
      <br></br>

      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateShipperForm;

