import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import axios from "axios";
//import * as api from '../../api/api';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';


async function GenerateContract(item){

  const test = await new Promise((resolve, reject)=>{
    axios.post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "GetContractTemplate",
      "data": {$class: "org.accordproject.testcontract2.TestContract",shipper:"resource:org.accordproject.party.Party#123",
          transporter:"resource:org.accordproject.party.Party#456",
          shippingPrice:{$class:"org.accordproject.money.MonetaryAmount",doubleValue:parseFloat(item.allowance),currencyCode:"MYR",},admin:"AdminCompany",deliveryDate:"2023-03-18T00:00:00.000+08:00",originAddress:item.originaddress,originState:item.originstate,originPostcode:"12345",destAddress:item.destaddress,destState:item.deststate,destPostcode:item.destpostcode,itemWidth:parseFloat(item.itemwidth),itemHeight:parseFloat(item.itemheight),itemWeight:parseFloat(item.shipmentweight),recipientName:item.recipientname,recipientContact:item.recipientcontact,itemType:item.itemtype,jobId:item.JobID,shipmentMethod:item.shipmentmethod,contractId:item.JobID,$identifier:item.JobID}
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

function CreateContract(item){
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

export default function Add() {

  const [cates, setCates] = useState([
    {
      name: "Glass"
    },
    {
      name: "Flammable"
    },
    {
      name: "Frozen"
    },
    {
      name: "Medicine"
    },
    {
      name: "Electronics"
    },
    {
      name: "Fragile"
    },
    {
      name: "Daily"
    },
    {
      name: "Plastice"
    }
  ]);
  const [list, setList] = useState([
    {
      logo: "/images/tlogo.jpg",
      name: "MyonDong Daily Production",
      remark: "Type: Fragile, Egg"
    },
    {
      logo: "/images/tlogo.jpg",
      name: "Hengyang Medicine Company",
      remark: "Tune: Medicine"
    },
    {
      logo: "/images/tlogo.jpg",
      name: "Xixi Electronic Production",
      remark: "Toe: Electronics"
    },
    {
      logo: "/images/tlogo.jpg",
      name: "Fantacy Glass Company",
      remark: "Type: Fragile, Glass"
    },
    {
      logo: "/images/tlogo.jpg",
      name: "Happy Month Firework Production",
      remark: "Type: Fragile, Egg"
    },

  ]);
  const [selectCate, setSelectCate] = useState(cates[0]);
  useEffect(() => { }, []);

  const onFinish = async (values) => {
    // console.log('Success:', values);
    // if (!id) {
    //   await api.add({
    //     ...values,
    //     type: tab === "1" ? 1 : 2,
    //     cate: selectCate.title
    //   });
    // } else {
    //   await api.update(id, {
    //     ...values,
    //     type: tab === "1" ? 1 : 2,
    //     cate: selectCate.title
    //   });
    // }

    message.info('Successfully Saved!');
  };

  const onFinishFailed = () => { };
  const [searchParams, setSearchParams] = useSearchParams();
  const [availableJobDetails, setAvailableJobDetails] = useState([]);
  const [template, setTemplate] = useState([]);
  useEffect(() => {
    axios
      .get(`https://luncgccwm9.execute-api.us-east-1.amazonaws.com/v2/prod?jobid=` +searchParams.get("JobID"))
      .then((response) => {
        setAvailableJobDetails(response.data.body);
        console.log(response.data.body[0]);
        const contractText = async() =>{
          const contract = await GenerateContract(response.data.body[0]);
          setTemplate(contract);
        }
        contractText();
      })
      .catch((error) => {
        console.log(error);
      });

  
    }, []);


  return (
    <>
    {availableJobDetails.map((item) => (
      
    <div className={styles.home}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>Smart Contract</div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.left}>
          <div className={styles.label}>
            Job ID:357347546072812
          </div>
          <div className={styles.label}>
            Transacation ID:NDJ#378459023Y
          </div>
          <div className={styles.row}>
            <div className={styles.rowLabel}>
              Smart Contract Valid Since:
            </div>
            <div className={styles.rowValue}>
              09:21:36 25/12/2022
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              Smart Contract End:
            </div>
            <div className={styles.rowValue}>
              17:11:28 28/12/2022
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel} style={{ color: "#999" }}>
              Penality:
            </div>
            <div className={styles.rowValue} style={{ color: "#999" }}>
              RM 1,000
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              Admin Signature
            </div>
            <div className={styles.rowValue}>
              ADMIN NO2 FLEETATA
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowLabel}>
              CLIENT - SHIPPER NAME
            </div>
            <div className={styles.rowValue}>
              COMPANY - TRANSPORTER NAME
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <h2>Violet Shah</h2>
              <div>Visual Designer</div>
              <div>Vancouver,British Columnbia</div>
              <div>rosadiaz@gmail.com</div>
            </div>
            <div style={{ flex: 1 }}>
              <h2>Dylan Drake Bhd.xx</h2>
              <div>Robbie Alvarea</div>
              <div>VSelangor,Malaysia</div>
              <div>Yzx9887@yahoo.com</div>
            </div>
          </div>
          <h2 style={{ marginTop: 20 }}>Deliverables</h2>
          <h3>Deliverable Here</h3>
          <div>Lorem ipsum dolor sit amet consectetur adipising edit,Eget quam lucus feugiat sit. Una,semper sagittls non faucibus nunc tortor,id sed donec</div>

          <h2 style={{ marginTop: 20 }}>Process</h2>
          <h3 style={{ marginTop: 20 }}>Round One</h3>
          <div style={{ marginTop: 20 }}>Lorem ipsum dolor sit ametconsectertur adipising ediy,Eget quam luctus feugiats feuaislas site, Urna msemper sagittis no faucibus nunc tortot,id send donc</div>

          <h3 style={{ marginTop: 20 }}>Round Two</h3>
          <div style={{ marginTop: 20 }}>Lorem ipsum dolor sit ametconsectertur adipising ediy,Eget quam luctus feugiats feuaislas site, Urna msemper sagittis no faucibus nunc tortot,id send donc</div>

          <h3 style={{ marginTop: 20 }}>Round Three</h3>
          <div style={{ marginTop: 20 }}>Lorem ipsum dolor sit ametconsectertur adipising ediy,Eget quam luctus feugiats feuaislas site, Urna msemper sagittis no faucibus nunc tortot,id send donc</div>
        </div>


        <div style={{ flex: 1, paddingLeft: 60}}>
        <h3 style={{paddingLeft:250,paddingTop:30,paddingBottom:30, backgroundColor: 'lightyellow'}}dangerouslySetInnerHTML={{ __html:  template}}>
          </h3>
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h2>Press Confirm and we will send for admin approval</h2>
              <h2 style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#000", marginRight: 5 }}></div>
                <span>or it will auto reject within 30 minutes*</span>
              </h2>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Button id ="confirmBtn" style={{ backgroundColor: "#4abc3a", color: "#fff", height: 50, width: 200, marginTop: 20, borderRadius: 5 }} onClick={() => {CreateContract(item)
            }}>Confirm</Button>
            <Button style={{ backgroundColor: "#ab423d", color: "#fff", height: 50, width: 200, marginTop: 20, borderRadius: 5, marginLeft: 20 }} onClick={() => {
            }}>Decline</Button>
          </div>

        </div>

      </div>

    </div >
  ))}
  </>
  );
}
