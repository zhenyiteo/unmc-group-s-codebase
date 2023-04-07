import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

export default function SelectCompany() {
  const navigate = useNavigate(); 

  

  return (
    

    <div style={{ display: "flex", justifyContent: "center", padding: 150, alignItems: "center" }}>

    <div style={{ marginRight: 70 }}>
      <span style={{ fontSize: 30, fontWeight: "bold", marginBottom: 50, marginLeft: 120}}>Select a Company</span>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
        <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
          navigate("/transporter/availableJob");
        }}>J&T Express</Button>
        <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
          navigate("/transporter/availableJob");
        }}>DHL Express</Button>
        <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
          navigate("/transporter/availableJob");
        }}>Ninjavan</Button>
      </div>
      </div>
      </div>

    
  );
}
