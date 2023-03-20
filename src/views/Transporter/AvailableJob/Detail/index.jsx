//import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
//import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.css';
import axios from "axios";
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
//import * as api from '../../api/api';
// import {
//   LoadingOutlined,
//   FileImageOutlined
//   PlusOutlined,
// } from '@ant-design/icons';

function CreateContract(item){
  //const [searchParams, setSearchParams] = useSearchParams();
  axios
  .post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "accord-contracts-accord-deploy",
      "data": {
        contractSourceS3BucketObjectPath: "test-contract7.cta",
        ledgerDataPath: "Accord",
        eventsQueue: "accord-contracts-output",
        contractId: item.JobID,
        contractData: JSON.stringify({$class: "org.accordproject.testcontract2.TestContract",shipper:"resource:org.accordproject.party.Party#123",
          transporter:"resource:org.accordproject.party.Party#456",
          shippingPrice:{$class:"org.accordproject.money.MonetaryAmount",doubleValue:parseFloat(item.allowance),currencyCode:"MYR",},admin:"AdminCompany",deliveryDate:"2023-03-18T00:00:00.000+08:00",originAddress:item.originaddress,originState:item.originstate,originPostcode:"12345",destAddress:item.destaddress,destState:item.deststate,destPostcode:item.destpostcode,itemWidth:parseFloat(item.itemwidth),itemHeight:parseFloat(item.itemheight),itemWeight:parseFloat(item.shipmentweight),recipientName:item.recipientname,recipientContact:item.recipientcontact,itemType:item.itemtype,jobId:item.JobID,shipmentMethod:item.shipmentmethod,contractId:item.JobID,$identifier:item.JobID})}
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

}

function AvailableJobDetails() {
  const navigate = useNavigate();
  const { JobID } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [availableJobDetails, setAvailableJobDetails] = useState([]);
  console.log("searching for job id " + searchParams.get("JobID"));
  useEffect(() => {
    axios
      .get(`https://luncgccwm9.execute-api.us-east-1.amazonaws.com/v2/prod?jobid=` +searchParams.get("JobID"))
      .then((response) => {
        setAvailableJobDetails(response.data.body);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onFinish = async (values) => {
    message.info('Successfully Saved!');
  };

  const onFinishFailed = () => {};

  return (
    <>
      {availableJobDetails.map((item) => (
        <div className={styles.home}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1>From {item.originstate} To {item.deststate}</h1>
            <div style={{ fontSize: 20 }}>Shipment Duration:{item.shipmentduration}hours </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div>
              <img
                src={'/images/ship.jpg'}
                alt=""
                style={{ width: 150, height: 150 }}
              ></img>
              <div className={styles.label}>Job ID</div>
              <div className={styles.value}>{item.JobID}</div>
              
  
              
  
              <div style={{ fontSize: 20, marginTop: 30 }}>Shipment</div>
              <div style={{ fontSize: 20 }}>Allowance: RM{item.allowance}</div>
              <Button
                style={{
                  backgroundColor: '#4abc3a',
                  color: '#fff',
                  height: 50,
                  width: 200,
                  marginTop: 20,
                  borderRadius: 5,
                }}
                onClick={() => {
                  CreateContract(item)
                  navigate("/transporter/smartContract");
                }}
              >
                Accept job
              </Button>
            </div>
  
            <div style={{ flex: 1, paddingLeft: 30 }}>
              <div className={styles.label}>Remarks</div>
              <div className={styles.value}>
              {item.remarks}
              </div>
  
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
              <div className={styles.label}>Origin State</div>
              <div className={styles.value}>{item.originstate}</div>
            </div>

               <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Penalty</div>
              <div className={styles.value}>RM{item.penalty}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Origin Address</div>
              <div className={styles.value}>{item.originaddress}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Item Type</div>
              <div className={styles.value}>{item.itemtype}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destination State</div>
              <div className={styles.value}>{item.deststate}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipping Method</div>
              <div className={styles.value}>{item.shipmentmethod}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destination Address</div>
              <div className={styles.value}>{item.destaddress}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Weight</div>
              <div className={styles.value}>{item.shipmentweight}kg</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destinatian Postcode</div>
              <div className={styles.value}>{item.destpostcode}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Dimensions Length*Width*Height</div>
              <div className={styles.value}>{item.itemlength}M*{item.itemwidth}M*{item.itemheight}M</div>
            </div>
          </div>
          

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Receiver Name and Contact</div>
              <div className={styles.value}>{item.recipientname} {item.recipientcontact}</div>
            </div>
            
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

              }

export default AvailableJobDetails;