import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
//import * as api from '../../api/api';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import reactMarkdown from 'react-markdown';


async function GenerateContract(item){

  const test = await new Promise((resolve, reject)=>{
    axios.post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "GetContractTemplate",
      "data": {$class: "org.accordproject.testcontract2.TestContract",shipper:"resource:org.accordproject.party.Party#123",
      transporter:"resource:org.accordproject.party.Party#456",
      shippingPrice:{$class:"org.accordproject.money.MonetaryAmount",doubleValue:parseFloat(item.allowance),currencyCode:"MYR",},penalty:{$class:"org.accordproject.money.MonetaryAmount",doubleValue:parseFloat(item.penalty),currencyCode:"MYR",},admin:"AdminCompany",expectedDeliveryDate:"2023-03-26 20:00:00",beginningDate:"2023-03-24 00:00:00",originAddress:item.originaddress,originState:item.originstate,originPostcode:"12345",destAddress:item.destaddress,destState:item.deststate,destPostcode:item.destpostcode,itemLength:parseFloat(item.itemlength),itemWidth:parseFloat(item.itemwidth),itemHeight:parseFloat(item.itemheight),itemWeight:parseFloat(item.shipmentweight),recipientName:item.recipientname,recipientContact:item.recipientcontact,itemType:item.itemtype,jobId:item.JobID,shipmentMethod:item.shipmentmethod,contractId:item.JobID,$identifier:item.JobID}
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

async function CreateContract(item){
  await axios
  .post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "accord-contracts-accord-deploy",
      "data": {
        contractSourceS3BucketObjectPath: "test-contract9.cta",
        ledgerDataPath: "Accord",
        eventsQueue: "accord-contracts-output",
        contractId: item.JobID,
        contractData: JSON.stringify({$class: "org.accordproject.testcontract2.TestContract",shipper:"resource:org.accordproject.party.Party#123",
          transporter:"resource:org.accordproject.party.Party#456",
          shippingPrice:{$class:"org.accordproject.money.MonetaryAmount",doubleValue:parseFloat(item.allowance),currencyCode:"MYR",},penalty:{$class:"org.accordproject.money.MonetaryAmount",doubleValue:parseFloat(item.penalty),currencyCode:"MYR",},admin:"AdminCompany",expectedDeliveryDate:"2023-03-26 20:00:00",beginningDate:"2023-03-24 00:00:00",originAddress:item.originaddress,originState:item.originstate,originPostcode:"12345",destAddress:item.destaddress,destState:item.deststate,destPostcode:item.destpostcode,itemLength:parseFloat(item.itemlength),itemWidth:parseFloat(item.itemwidth),itemHeight:parseFloat(item.itemheight),itemWeight:parseFloat(item.shipmentweight),recipientName:item.recipientname,recipientContact:item.recipientcontact,itemType:item.itemtype,jobId:item.JobID,shipmentMethod:item.shipmentmethod,contractId:item.JobID,$identifier:item.JobID})}
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
  const [showSign, setShowSign] = useState(false);


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
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTemplate("<center>Please wait while the smart contract is loading...</center>");
    axios
      .get(`https://luncgccwm9.execute-api.us-east-1.amazonaws.com/v2/prod?jobid=` +searchParams.get("JobID"))
      .then((response) => {
        setAvailableJobDetails(response.data.body);
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
    {availableJobDetails.map((item) => (
      
    <div className={styles.home} >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>Smart Contract</div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.left}>
          {
            showSign ? <div style={{
              position: "absolute",
              top: 120,
              right: -80,
              width: 150,
              height: 150,
              backgroundColor: "#efb5b4",
              borderRadius: 100
            }}></div> : <></>}
          <div style={{ position: "relative" }}>
            <div className={styles.label}>
              Job ID: {item.JobID}
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
                Penalty:
              </div>
              <div className={styles.rowValue} style={{ color: "#999" }}>
                RM {item.penalty}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Signing Admin
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
            {/* <div style={{ display: "flex" }}>
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
            </div> */}

          <div className={styles.row}>
              <div className={styles.rowLabel}>
                <h2>Violet Shah</h2>
                <div>Visual Designer</div>
                <div>Vancouver,British Columnbia</div>
                <div>rosadiaz@gmail.com</div>
              </div>
              <div className={styles.rowLabel} style={{ textAlign: 'right' }}>
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
        </div>


        <div style={{ flex: 1, paddingLeft: 60, marginLeft:"10%"}}>
          <div style={{paddingLeft:30,paddingTop:30,paddingBottom:30, backgroundColor: 'lightyellow',maxHeight: "65vh",overflow:"auto"}}>
            <ReactMarkdown style={{textAlign: "center"}}children={template}/>
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h2>Press Confirm and we will send for admin approval</h2>
              <h2 style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#000", marginRight: 5 }}></div>
                <span>or it will auto reject within 30 minutes*</span>
              </h2>
            </div>
          </div>
          {
            !showSign ? <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Button style={{ backgroundColor: "#4abc3a", color: "#fff", height: 50, width: 200, marginTop: 20, borderRadius: 5 }} onClick={() => {CreateContract(item);
                setShowSign(true);
              }}>Confrim</Button>
              <Button style={{ backgroundColor: "#ab423d", color: "#fff", height: 50, width: 200, marginTop: 20, borderRadius: 5, marginLeft: 20 }} onClick={() => {
              }}>Decline</Button>
            </div> : <></>
          }
          {showSign ?
            <div>
              <div style={{ display: "flex", width: "100%", fontWeight: "bold", marginBottom: 20, marginTop: 30 }}>
                <div style={{ flex: 1 }}>
                  <span>Signed by :</span>
                  <span> Violet Shah</span>
                </div>
                <div style={{ flex: 1 }}>
                  <span> Signed by :</span>
                  <span> Dvlan Drake Bhd xxx</span>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%", fontWeight: "bold", marginBottom: 20 }}>
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
                  <span>Date:
                  </span>
                  <span> 18:34:05
                    24/12/2022</span>

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
                  <span> 19:14:21
                    24/12/2027</span>
                </div>
              </div>
            </div> : <></>}


          {
            !showSign ? <div style={{ color: "red", fontWeight: "bold", textAlign: "center", marginTop: 10 }}>
              Expires is 00:23:22 and will automatically decline
            </div> : <></>}

        </div>

      </div>

    </div >
  ))}
  </>
  );
}
