import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
import styles from './index.module.css';

function ShipperDetails() {
  const [shipperData, setShipperData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    axios
      .get(
        'https://oxvie2kqq5.execute-api.us-east-1.amazonaws.com/prod/shippername'
      )
      .then((response) => {
        setShipperData(response.data.body);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading){
    return (<>
    <div className={styles.home} >
      <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%", marginBottom: 30 }}>
        <Spin tip="Loading..." size="large"/>
      </div>
    </div>
    </>)
  }

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
