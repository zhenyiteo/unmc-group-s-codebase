import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShipperDetails() {
  const [shipperData, setShipperData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://oxvie2kqq5.execute-api.us-east-1.amazonaws.com/prod/shippername'
      )
      .then((response) => {
        setShipperData(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Shipper Profile</h1>
      {shipperData.map((shipper) => (
        <div key={shipper.ShipperID}>
          <p>Shipper ID: {shipper.ShipperID}</p>
          <p>Name: {shipper.name}</p>
          <p>Contact: {shipper.contact}</p>
          <p>Email: {shipper.email}</p>
          <p>Website: {shipper.website}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ShipperDetails;
