import { Button, Divider } from 'antd';
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
  const handleEditProfile = () => {
    // logic to handle edit profile click
    console.log('Edit profile clicked');
  };

  return (
    <div style={{ margin: '2rem auto', maxWidth: 800 }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Shipper Profile
      </h1>
      {shipperData.map((shipper) => (
        <div key={shipper.ShipperID} style={{ marginBottom: '2rem' }}>
          <p>
            <strong>Shipper ID:</strong> {shipper.ShipperID}
          </p>
          <p>
            <strong>Name:</strong> {shipper.name}
          </p>
          <p>
            <strong>Contact:</strong> {shipper.contact}
          </p>
          <p>
            <strong>Email:</strong> {shipper.email}
          </p>
          <p>
            <strong>Website:</strong> {shipper.website}
          </p>
          <Button type="primary" onClick={handleEditProfile}>
            Edit Profile
          </Button>
          <Divider />
        </div>
      ))}
    </div>
  );
}

export default ShipperDetails;
