import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
//import * as api from '../../api/api';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import axios from "axios";
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';

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
    console.log(response);
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
  const [showSign, setShowSign] = useState(false);

  useEffect(() => {}, []);

  const onFinish = async (values) => {

    message.info('Successfully Saved!');
  };

  const onFinishFailed = () => {};

  const [searchParams, setSearchParams] = useSearchParams();
  const [JobDetails, setJobDetails] = useState([]);
  const [template, setTemplate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    axios
      .get(`https://ahzympj30d.execute-api.us-east-1.amazonaws.com/v1?jobid=`+searchParams.get("JobID"))
      .then((response) => {
        setJobDetails(response.data.body);
        console.log(response.data.body[0]);
        const contractText = async() =>{

          const contract = await GenerateContract(response.data.body[0]);
          setTemplate(contract);
          setIsLoading(false);
        }
        contractText();
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
    <>
     {JobDetails.map((item) => (

    <div className={styles.home}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          Smart Contract
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontWeight: 'bold',
            // color: '#d48806',
            marginLeft: 810,
          }}
        >
          {item.JobStatus}
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div className={styles.left}>
          <div style={{ position: 'relative' }}>
            <div className={styles.label}>Job ID: {item.JobID}</div>

            <div className={styles.row}>
              <div
                className={styles.rowLabel}
              >
                Smart Contract Creation Date:
              </div>
              <div
                className={styles.rowValue}
              >
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


            <div className={styles.row}>
              <div
                className={styles.rowLabel}
              >
                Penalty:
              </div>
              <div
                className={styles.rowValue}
              >
                RM {item.penalty}
              </div>
            </div>

            <div className={styles.row}>
              <div
                className={styles.rowLabel}
              >
                Signing Admin
              </div>
              <div
                className={styles.rowValue}
              >
                ADMIN NO.2
              </div>
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
                <div>Visual Designer</div>
                <div>Vancouver,British Columnbia</div>
                <div>rosadiaz@gmail.com</div>
              </div>
              <div className={styles.rowLabel} style={{ textAlign: 'right' }}>
                <h2>{item.transID}</h2>
                <div>Robbie Alvarea</div>
                <div>VSelangor,Malaysia</div>
                <div>Yzx9887@yahoo.com</div>
              </div>
            </div>
            <h1 style={{ marginTop: 20, textAlign:"center" }}>Contract Specifications</h1>
            <h2>Developed with Accord Project</h2>
            <h3>
            Consisting of:
            </h3>
            <div>Data Model - produced with: Concerto</div>
            <div>Contract Template - created with: Cicero</div>
            <div>Contract clause logic - created and executed with: Ergo</div>
            <h2 style={{ marginTop: 20 }}>Hosted Platform</h2>
            <div>Contract Clause Logic: executed on AWS Lambda Serverless Platform</div>
            <div>Contract Clause Results: saved on AWS QLDB Ledger Platform</div>
          </div>
        </div>

        <div style={{ flex: 1, paddingLeft: 60, marginLeft:"10%" }}>
          <div style={{paddingLeft:30,paddingTop:30,paddingBottom:30, backgroundColor: 'lightyellow',maxHeight: "65vh",overflow:"auto"}}>
            <ReactMarkdown style={{textAlign: "center"}}children={template}/>
          </div>


          {!showSign ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
            </div>
          ) : (
            <></>
          )}
          {!showSign ? (
            <div>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  fontWeight: 'bold',
                  marginBottom: 20,
                  marginTop: 30,
                }}
              >
                <div style={{ flex: 1, visibility: item.JobStatus === 'Cancelled' && !item.hasOwnProperty('adminRemark') ? 'hidden' : 'visible'}}>
                  <span>Signed by :</span>
                  <span> {item.ShipperID}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <span> Signed by :</span>
                  <span> {item.transID}</span>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}
              >
                <div style={{ flex: 1, position: 'relative', visibility: item.JobStatus === 'Cancelled' && !item.hasOwnProperty('adminRemark') ? 'hidden' : 'visible' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: -80,
                      zIndex: -1,
                      left: 100,
                      width: 150,
                      height: 150,
                      backgroundColor: '#efb5b4',
                      borderRadius: 100,
                    }}
                  ></div>
                  <span>Date:</span>
                  <span> {item.shipperSignDate}</span>
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: -80,
                      zIndex: -1,
                      left: 100,
                      width: 150,
                      height: 150,
                      backgroundColor: '#efb5b4',
                      borderRadius: 100,
                    }}
                  ></div>
                  <span> Date:</span>
                  <span> {item.beginningdate}</span>
                </div>
              </div>
              <div
                style={{
                  // display: !item.adminSign ? "none" : "flex",
                  display: item.JobStatus === "Cancelled" ? "flex" : "none",
                  color: '#FF0000',
                  fontWeight: "bold",
                  fontSize: "20px"
                  
                }}
              >
                {item.adminSign ? "Cancelled by Admin: Reason: "+ item.adminRemark : "Cancelled by Shipper"}
                {/* Reason For Cancellation: {item.adminRemark} */}
              </div>
            </div>
          ) : (
            <></>
          )}

        </div>
      </div>
    </div>
      ))}
      </>
  );
}
