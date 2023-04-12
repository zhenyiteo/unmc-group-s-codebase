import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import axios from "axios";
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
import ReactMarkdown from 'react-markdown';
//import * as api from '../../api/api';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';

async function ConfirmedContract(item){

  await axios
  .post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "accord-contracts-accord-run",
      "data": {
        ledgerDataPath: "Accord",
        contractId: item.JobID,
        requestString: JSON.stringify({$class:"org.accordproject.testcontract2.ReceivedRequest"})}
    },{headers:{
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
      "X-Requested-With": "*"
    }}
  )
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

  await axios
  .post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "QLDBtest",
      "data": {
        jobid:item.JobID}
    },{headers:{
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
      "X-Requested-With": "*"
    }}).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

}

async function GenerateContract(item){

  const test = await new Promise((resolve, reject)=>{
    const contractShipper = item.ShipperID.replace(/ /g, '%20');
    const contractTrans = item.transID.replace(/ /g, '%20');

    axios.post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "GetContractTemplate",
      "data": {$class: "org.accordproject.testcontract2.TestContract",shipper:"resource:org.accordproject.party.Party#" + contractShipper,
      transporter:"resource:org.accordproject.party.Party#" + contractTrans,
      shippingPrice:{$class:"org.accordproject.money.MonetaryAmount",doubleValue:parseFloat(item.allowance),currencyCode:"MYR",},penalty:{$class:"org.accordproject.money.MonetaryAmount",doubleValue:parseFloat(item.penalty),currencyCode:"MYR",},admin:"AdminCompany",expectedDeliveryDate:item.expecteddate,beginningDate:item.beginningdate,originAddress:item.originaddress,originState:item.originstate,originPostcode:"12345",destAddress:item.destaddress,destState:item.deststate,destPostcode:item.destpostcode,itemLength:parseFloat(item.itemlength),itemWidth:parseFloat(item.itemwidth),itemHeight:parseFloat(item.itemheight),itemWeight:parseFloat(item.shipmentweight),recipientName:item.recipientname,recipientContact:item.recipientcontact,itemType:item.itemtype,jobId:item.JobID,shipmentMethod:item.shipmentmethod,contractId:item.JobID,$identifier:item.JobID}
    },{headers:{
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
      "X-Requested-With": "*"
    }}
  ).then((response) => {    
    resolve(response.data.body);
  }).catch((error) => {
    console.error(error);
    reject();
  })
});
console.log(test);
return test;

}

export default function Add() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeJobDetails, setActiveJobDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cates, setCates] = useState([]);
  const [list, setList] = useState([]);
  const [selectCate, setSelectCate] = useState(cates[0]);
  const [template, setTemplate] = useState([]);

 useEffect(() => {
    axios
      .get(`https://z1i84g73j3.execute-api.us-east-1.amazonaws.com/v2?jobid=` +searchParams.get("JobID"))
      .then((response) => {
        console.log(response.data.body);
        setActiveJobDetails(response.data.body);
        GenerateContract(response.data.body[0]).then((response)=>{
            setTemplate(response);
            setIsLoading(false);

          });

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const onFinish = async (values) => {

    message.info('Successfully Saved!');
  };

  const onFinishFailed = () => {};

  
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
    <>
    {activeJobDetails.map((item) => (
      
    <div style={{paddingLeft:"5vw", paddingRight:"5vw"}} className={styles.home} >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>{item.JobStatus} Job</div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.left}>
          <div style={{ position: "relative" }}>
            <h2>
              Job ID: {item.JobID}
            </h2>
            <h2 style ={{color:"  #000080", textDecoration:"underline"}}> Deliver Item to {item.recipientname} From: {item.originpostcode}, {item.originstate} To: {item.destpostcode}, {item.deststate} for RM{item.allowance}</h2>
            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Smart Contract Creation Date:
              </div>
              <div className={styles.rowValue}>
                {item.beginningdate}
              </div>
            </div>

            <div className={styles.row}>
              <div
                className={styles.rowLabel}
              >
                Allowance:
              </div>
              <div
                className={styles.rowValue}
              >
                RM {item.allowance}
              </div>
            </div>

            <div  className={styles.row}>
              <div className={styles.rowLabel}>
                Penalty:
              </div>
              <div className={styles.rowValue}>
                RM {item.penalty}
              </div>
            </div>

            <div  className={styles.row}>
              <div className={styles.rowLabel}>
                Origin Address:
              </div>
              <div className={styles.rowValue}>
                {item.originaddress}
              </div>
            </div>

            <div  className={styles.row}>
              <div className={styles.rowLabel}>
                Origin State:
              </div>
              <div className={styles.rowValue}>
                {item.originstate}
              </div>
            </div>

            <div  className={styles.row}>
              <div className={styles.rowLabel}>
                Origin Postcode:
              </div>
              <div className={styles.rowValue}>
                {item.originpostcode}
              </div>
            </div>

            <div  className={styles.row}>
              <div className={styles.rowLabel}>
                Destination Address:
              </div>
              <div className={styles.rowValue}>
                {item.destaddress}
              </div>
            </div>

            <div  className={styles.row}>
              <div className={styles.rowLabel}>
                Destination State:
              </div>
              <div className={styles.rowValue}>
                {item.deststate}
              </div>
            </div>

            <div  className={styles.row}>
              <div className={styles.rowLabel}>
                Destination Postcode:
              </div>
              <div className={styles.rowValue}>
                {item.destpostcode}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Shipment Type
              </div>
              <div className={styles.rowValue}>
                {item.itemtype}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Shipment Method
              </div>
              <div className={styles.rowValue}>
                {item.shipmentmethod}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Shipment Weight
              </div>
              <div className={styles.rowValue}>
                {item.shipmentweight}kg
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Shipment Dimensions
              </div>
              <div className={styles.rowValue}>
              {item.itemlength}M x {item.itemwidth}M x {item.itemheight}M
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Receiver Name
              </div>
              <div className={styles.rowValue}>
                {item.recipientname}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Receiver Contact
              </div>
              <div className={styles.rowValue}>
                {item.recipientcontact}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Remarks
              </div>
              <div className={styles.rowValue}>
                {item.remarks}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Beginning Date
              </div>
              <div className={styles.rowValue}>
                {item.beginningdate}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Expected Delivery Date
              </div>
              <div className={styles.rowValue}>
                {item.expecteddate}
              </div>
            </div>


            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Signing Admin
              </div>
              <div className={styles.rowValue}>
                ADMIN NO.2
              </div>
            </div>

            <div className={styles.row}>
              <br/>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel}>
                CLIENT - SHIPPER NAME
              </div>
              <div className={styles.rowLabel}>
                COMPANY - TRANSPORTER NAME
              </div>
            </div>

            


          <div className={styles.row}>
              <div className={styles.rowLabel}>
                <h2>{item.ShipperID}</h2>
              </div>
              <div className={styles.rowLabel} style={{ textAlign: 'right' }}>
                <h2>{item.transID}</h2>
              </div>
            </div>
            
           


          </div>
        </div>


        <div style={{ flex: 1, paddingLeft: 60, marginLeft:"10%"}}>
          <div style={{paddingLeft:30,paddingTop:30,paddingBottom:30, backgroundColor: 'lightyellow',maxHeight: "65vh",overflow:"auto"}}>
            <ReactMarkdown style={{textAlign: "center"}}children={template}/>
          </div>
          <div>
            <div style={{ display: "flex", width: "100%", fontWeight: "bold", marginBottom: 20, marginTop: 30 }}>
              <div style={{ flex: 1, visibility: item.JobStatus === 'Available' ? 'hidden' : 'visible'}}>
                <span>Signed by :</span>
                <span>{item.ShipperID}</span>
              </div>
              <div style={{ flex: 1 }}>
                <span> Signed by :</span>
                <span> {item.transID}</span>
              </div>
            </div>
            <div style={{ display: "flex", width: "100%", fontWeight: "bold", marginBottom: 20 }}>
              <div style={{ flex: 1, position: "relative", visibility: item.JobStatus === 'Available' ? 'hidden' : 'visible'}} >
                <div style={{
                  position: "absolute",
                  top: -80,
                  zIndex: -1,
                  left: 100,
                  width: 150,
                  height: 150, backgroundColor: "#efb5b4",
                  borderRadius: 100
                }}></div>
                <span>Date:
                </span>
                <span> {item.shipperSignDate}</span>

              </div>
              <div style={{ flex: 1, position: "relative" }}>
                <div style={{
                  position: "absolute",
                  top: -80,
                  zIndex: -1,
                  left: 100,
                  width: 150,
                  height: 150, backgroundColor: "#efb5b4",
                  borderRadius: 100
                }}></div>
                <span> Date:</span>
                <span> {item.beginningdate}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row"}}>
            <h3 style ={{color:"  #000080"}}><em>{item.JobStatus === "Delivered" ? "Transporter has delivered your product. Please press the button to complete the final step of the contract" :
            "Please wait for the transporter to deliver to complete the last step of the contract"
            }</em></h3>

          </div>

          <div style={{ display: "flex", flexDirection: "row"}}>

            <Button style={{ backgroundColor: "#50C878", color: "#fff", height: 50, width: 200, marginTop: 20, borderRadius: 5, visibility: item.JobStatus === "Delivered" ? "visible" : "hidden"  }} onClick={() => {

              setIsLoading(true);
              ConfirmedContract(item).then(()=>{navigate('/shipper/activeJob'); setIsLoading(false);});
            }}>Confirm Finished</Button>

          </div>

        </div>
        

      </div>

    </div >
  ))}
  </>
  );

}
