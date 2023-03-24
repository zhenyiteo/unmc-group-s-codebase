import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.css';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';

function TransDetails() {
  const [TransData, setTransData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        'https://w62n1e1wfj.execute-api.us-east-1.amazonaws.com/prod/transporter'
      )
      .then((response) => {
        setTransData(response.data.body);
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
      <h1>Transporter Profile</h1>
      {TransData.map((trans) => (
        <div key={trans.transID}>
          <p>Transporter ID: {trans.transID}</p>
          <p>Name: {trans.name}</p>
          <p>Contact: {trans.contact}</p>
          <p>Email: {trans.email}</p>
          <p>Website: {trans.website}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default TransDetails;
