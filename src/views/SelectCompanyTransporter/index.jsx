import { Button } from 'antd';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

async function CheckPenalty(transID){
  
  const response = await axios
  .post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "CheckTransCancel",
      "data": {
        transID:transID}
    },{headers:{
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
      "X-Requested-With": "*"
    }}).then((response) => {
      return response;
      
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
    return response;
}



export default function SelectCompany() {
  const navigate = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading){
    return (<>
    <div>
      <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%", marginBottom: 30 }}>
        <Spin tip="Loading..." size="large"/>
      </div>
    </div>
    </>)
  }

  return (
    

    <div style={{ display: "flex", justifyContent: "center", padding: 150, alignItems: "center" }}>

      <div style={{ marginRight: 70 }}>
        <span style={{ fontSize: 30, fontWeight: "bold", marginBottom: 50, marginLeft: 120}}>Select a Company</span>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
            <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
              sessionStorage.setItem('accountName', "J&T Express");
              setIsLoading(true);
              
              CheckPenalty("J&T Express").then((response)=>{ 
                if (response.data.body.penalty){
                  navigate("/transporter/penalty?JobID=" + response.data.body.data.JobID);
                }
                else{
                  navigate("/transporter/availableJob");
                }
                setIsLoading(false)});
            }}>J&T Express</Button>
            <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
              sessionStorage.setItem('accountName', "DHL Express");
              setIsLoading(true);
              CheckPenalty("DHL Express").then((response)=>{
                if (response.data.body.penalty){
                  navigate("/transporter/penalty?JobID=" + response.data.body.data.JobID);
                }
                else{
                  navigate("/transporter/availableJob");
                }
                setIsLoading(false)});
            }}>DHL Express</Button>
            <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
              sessionStorage.setItem('accountName', "Ninjavan");
              setIsLoading(true);
              CheckPenalty("Ninjavan").then((response)=>{ 
                if (response.data.body.penalty){
                  navigate("/transporter/penalty?JobID=" + response.data.body.data.JobID);
                }
                else{
                  navigate("/transporter/availableJob");
                }
                
                setIsLoading(false)});
            }}>Ninjavan</Button>
          </div>
        </div>
      </div>

    
  );
}
