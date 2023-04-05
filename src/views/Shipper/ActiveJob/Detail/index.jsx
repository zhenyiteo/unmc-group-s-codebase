import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import axios from "axios";
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
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

export default function Add() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeJobDetails, setActiveJobDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cates, setCates] = useState([]);
  const [list, setList] = useState([]);
  const [selectCate, setSelectCate] = useState(cates[0]);

 useEffect(() => {
    axios
      .get(`https://z1i84g73j3.execute-api.us-east-1.amazonaws.com/v2?jobid=` +searchParams.get("JobID"))
      .then((response) => {
        console.log(response.data.body);
        setActiveJobDetails(response.data.body);
        setIsLoading(false);
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
    
    <div className={styles.home}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>Job ID: {item.JobID}</h1>
        <div style={{ fontSize: 40 }}>Remaining Time: 26:45:03</div>
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <img
            src={'/images/ship.jpg'}
            alt=""
            style={{ width: 150, height: 150 }}
          ></img>
          <div className={styles.label}>Job Status</div>
          <div className={styles.value}>{item.JobStatus}</div>
          <div className={styles.label}>Transporter</div>
          <div className={styles.value}>{item.transID}</div>
          <div className={styles.label}>Shipment Penalty</div>
              <div className={styles.value}>
                {item.penalty}
              </div>

          <div className={styles.label}>Beginning Date</div>
          <div className={styles.value}>{item.beginningdate}</div>
          <div className={styles.label}>Expected Date of Delivery</div>
          <div className={styles.value}>{item.expecteddate}</div>

          <div style={{ fontSize: 20, marginTop: 60 }}>
            Shipment Allowance: {item.allowance}
          </div>
          <div style={{ fontSize: 20, marginTop: 5 }}></div>
          <Button
            style={{
              backgroundColor: '#1677ff',
              color: '#fff',
              height: 60,
              width: 230,
              marginTop: 8,
              borderRadius: 5,
              visibility: item.JobStatus === "Delivered" ? "visible" : "hidden" 
            }}
            onClick={() => {
              setIsLoading(true);
              ConfirmedContract(item).then(()=>{navigate('/shipper/activeJob'); setIsLoading(false);});
              
            }}
          >
            Confirm Finished
          </Button>
        </div>

        <div style={{ flex: 1, paddingLeft: 30 }}>
          <div className={styles.label}>Job Description</div>
          <div className={styles.value}>
          Deliver Item to {item.recipientname} From: {item.originpostcode}, {item.originstate} To: {item.destpostcode}, {item.deststate} for RM{item.allowance}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Origin State</div>
              <div className={styles.value}>{item.originstate}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Receiver Contact Number</div>
              <div className={styles.value}>{item.recipientcontact}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Origin Address</div>
              <div className={styles.value}>{item.originaddress}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Type</div>
              <div className={styles.value}>{item.itemtype}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destination State</div>
              <div className={styles.value}>Selangor</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipping Method</div>
              <div className={styles.value}>{item.shipmentmethod}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destination Address</div>
              <div className={styles.value}>
                {item.destaddress}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Weight</div>
              <div className={styles.value}>{item.shipmentweight}KG</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destination Postcode</div>
              <div className={styles.value}>{item.destpostcode}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Dimensions</div>
              <div className={styles.value}>{item.itemlength}M x {item.itemwidth}M x {item.itemheight}M</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>

            <div style={{ flex: 1 }}>
              <div className={styles.label}>Receiver Name</div>
              <div className={styles.value}>{item.recipientname}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Remarks</div>
              <div className={styles.value}>{item.remarks}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ))}
    </>
  );
}
