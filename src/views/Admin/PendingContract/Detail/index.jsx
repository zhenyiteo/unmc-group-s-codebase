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

async function SignContract(item, signature){

  // var testNewDate = new Date(dateTime);
  // console.log(testNewDate);
  // console.log(item.shipmentduration);
  // testNewDate.setHours(testNewDate.getHours()+parseInt(item.shipmentduration)); 
  // console.log("Expected Delivery ", testNewDate.toISOString());

  await axios
  .post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "accord-contracts-accord-run",
      "data": {
        ledgerDataPath: "Accord",
        contractId: item.JobID,
        requestString: JSON.stringify({$class:"org.accordproject.testcontract2.AdminSignRequest","signature":signature})}
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

async function AdminUpdate(item, signature, adminRemark){
  // await axios
  // .put('https://hwr1f5bqsg.execute-api.us-east-1.amazonaws.com/adminsign2',
  // {
  //   "jobID": item.JobID,
  //   "adminSign": signature,
  //   "adminRemark": adminRemark
  // },{headers:{
  //   "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
  //   "X-Requested-With": "*"
  // }}).then((response) => {
  //   console.log(response);
  // }
  // )
  // .catch((error) =>{
  //   console.error(error);
  // }

  // );
  await axios
  .post(
    'https://kcc9v1oqjh.execute-api.us-east-1.amazonaws.com/v2/lambdainvoke',
    {
      "function": "adminsign",
      "data": {
        jobID:item.JobID,
        adminSign: signature,
        adminRemark: adminRemark}
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


export default function Login() {
  const navigate = useNavigate();

  const [reason, setReason] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [pendingJobDetails, setPendingJobDetails] = useState([]);
  const [template, setTemplate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    axios
      .get(`https://po4jb5x48e.execute-api.us-east-1.amazonaws.com/v1?jobid=` +searchParams.get("JobID"))
      .then((response) => {
        setPendingJobDetails(response.data.body);
        console.log(response.data.body[0]);
        const contractText = async() =>{

          await GenerateContract(response.data.body[0]).then((response)=>{
            setTemplate(response);
            setIsLoading(false);
          });

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
    {pendingJobDetails.map((item) => (

    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 30,
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1.5, paddingRight:60}}>
        <div style={{ fontSize: 40, fontWeight: 'bold', marginTop: -20 }}>
          Pending Contract
        </div>
        <div style={{ display: 'flex', width: '100%', marginTop: 20, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>
              Job ID: <span style={{color:'#6565ff'}}>{item.JobID}</span>
            </div>

          </div>

        </div>

        <div style={{paddingLeft:30,paddingTop:30,paddingBottom:30, backgroundColor: 'lightyellow',maxHeight: "65vh",overflow:"auto"}}>
          <ReactMarkdown style={{textAlign: "center"}}children={template}/>
        </div>
        
        {/* <div
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'red',
          }}
        >
          Expires in: 10 minutes and will automatically decline
        </div> */}
      </div>

      <div style={{ flex: 1, marginLeft: 20 }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 39,
              }}
            >
              Shipper ID
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                color: '#6565ff',
              }}
            >
              {item.ShipperID}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 39,
              }}
            >
              Transporter ID
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                color: '#6565ff',
              }}
            >
              {item.transID}
            </div>
          </div>
        </div>
        <div
          name="avatar"
          style={{
            width: 100,
            height: 100,
            marginTop: 10,
            backgroundColor: '#eee',
            border: '1px solid #ddd',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          listType="picture-card"
        >
          <FileImageOutlined style={{ fontSize: 30, color: '#aaa' }} />
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            flex: 1,
            marginTop: 20,
            color: '#8c8c8c',
          }}
        >
          Full Origin Address
        </div>
        <div
          style={{ fontSize: 15, fontWeight: 'bold', flex: 1, marginTop: 5 }}
        >
          {item.originaddress} {item.originpostcode} {item.originstate}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            flex: 1,
            marginTop: 30,
            color: '#8c8c8c',
          }}
        >
          Destination Address
        </div>
        <div
          style={{ fontSize: 15, fontWeight: 'bold', flex: 1, marginTop: 5 }}
        >
          {item.destaddress} {item.destpostcode} {item.deststate}
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 30,
                color: '#8c8c8c',
              }}
            >
              {' '}
              Shipment Type
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 5,
              }}
            >
              {' '}
              {item.itemtype}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 30,
                color: '#8c8c8c',
              }}
            >
              {' '}
              Shipment Weight
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 5,
              }}
            >
              {' '}
              {item.shipmentweight} KG
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 10,
                color: '#8c8c8c',
              }}
            >
              Remarks
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 5,
              }}
            >
              {item.remarks}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 30,
                color: '#8c8c8c',
              }}
            >
              Allowance / Penalty
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 5,
              }}
            >
              RM{item.allowance} / RM{item.penalty}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <Button
              type="primary"
              style={{
                marginTop: 120,
                marginLeft: 100,
                height: 40,
                width: 240,
                borderRadius: 5,
              }}
              onClick={() => {
                navigate('/admin/pendingContract');
              }}
            >
              Return to Contract List
            </Button>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <Button
            type="primary"
            style={{
              backgroundColor: '#4abb3a',
              border: 'none',
              height: 40,
              width: 240,
              borderRadius: 5,
            }}
            onClick={() => {
              setIsLoading(true);
              SignContract(item,true).then(()=>{
                console.log('signed');
                AdminUpdate(item, true, '').then(()=>{
                  navigate('/admin/approvedContract?JobID=' + item.JobID);
                  setIsLoading(false);
                  
                });
              });

  
            }}
          >
            Confirm
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (reason) {
                setIsLoading(true);
                SignContract(item,false).then(()=>{
                  console.log('declined');
                  AdminUpdate(item, true, reason).then(()=>{
                    navigate('/admin/declinedContract?JobID=' + item.JobID);
                    setIsLoading(false);
                    
                  });
  
                });


              } else {
                message.error('Please Input Reason!');
              }
            }}
            style={{
              backgroundColor: '#af363c',
              border: 'none',
              height: 40,
              width: 240,
              borderRadius: 5,
            }}
          >
            Decline
          </Button>
        </div>
        <Input
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          style={{ marginTop: 20, height: 40, borderRadius: 10 }}
          placeholder="Reason of declination:"
        />
        <div style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
          *** Must be filled if decline
        </div>
      </div>
    </div>
    ))}
    </>
  );
}
