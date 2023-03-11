import React, { useState } from 'react';

function UpdateTransporterForm() {
  const [formData, setFormData] = useState({
    transID: '',
    name: '',
    email: '',
    contact: '',
    website: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      'https://w62n1e1wfj.execute-api.us-east-1.amazonaws.com/prod/transporter',
      {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      alert('Transporter Profile updated successfully!');
      setFormData({
        transID: '',
        name: '',
        email: '',
        contact: '',
        website: '',
      });
    } else {
      alert('Failed to update transporter profile.');
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
      id="transporter-form"
      onSubmit={handleSubmit}
    >
      <h1>Edit Transporter Profile</h1>
      <label htmlFor="transID">Transporter ID : </label>
      <input
        type="text"
        name="transID"
        id="transID"
        required
        value={formData.transID}
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

export default UpdateTransporterForm;