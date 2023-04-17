import {
  message
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
import axios from "axios";

import {
  SolutionOutlined
} from '@ant-design/icons';

export default function Add() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [JobDetails, setJobDetails] = useState([]);
  useEffect(() => {}, []);

  useEffect(() => {
    axios.get('https://ahzympj30d.execute-api.us-east-1.amazonaws.com/v1?jobid=' + searchParams.get("JobID"))
      .then(response => {
        console.log(response.data.body);
        setJobDetails(response.data.body);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching job data:', error));
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
      <div style={{ display: 'flex' }}>
        <span style={{ fontSize: 40, fontWeight: 'bold', marginRight: 100 }}>
          Job History
        </span>

      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex' }}>

            <div
              style={{

                width: 200,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SolutionOutlined style={{ fontSize: "180px", color: '#000000' }} />
            </div>
         
          <div style={{ flex: 1, marginLeft: 20 }}>
            <div
              style={{
                backgroundColor:  item.JobStatus === "Waiting For Shipper To Confirm" ? '#ffec3d' : item.JobStatus === "Pending Admin Approval" ? '#FFA500' : 
                item.JobStatus === 'Available' ? '#820080': item.Jobstatus === 'Delivered' ? '#008268' :
                item.JobStatus === 'Completed' ? '#00FF00' : item.JobStatus === 'Unlisted' ? '#808080' :
                item.JobStatus === 'Cancelled' ? '#FF0000' : 'Active' ? '#3944BC' : '#000000',
                height: 40,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                fontSize: 20,
              }}
            >
              <span>Status</span>
              <span>{item.JobStatus}</span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 30,
              }}
            >
              <div style={{ flex: 1, display: 'flex'}}>
                <div className={styles['label']}>Beginning Date:</div>
                <div className={styles['value']}>{item.beginningdate}</div>
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <div className={styles['label']}>Job ID:</div>
                <div className={styles['value']}>{item.JobID}</div>
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <div className={styles['label']}>Allowance:</div>
                <div className={styles['value']}>{item.allowance}</div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}
            >
              <div style={{ flex: 1, display: 'flex' }}>
                <div className={styles['label']}>Expected Delivery Date:</div>
                <div className={styles['value']}>{item.expecteddate}</div>
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <div className={styles['label']}>Transporter ID</div>
                <div className={styles['value']}>{item.transID}</div>
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <div className={styles['label']}>Penalty:</div>
                <div className={styles['value']}>{item.penalty}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Origin Address</span>
            <span>{item.originaddress}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Origin Postcode</span>
            <span>{item.originpostcode}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Origin State</span>
            <span>{item.originstate}</span>
          </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Destination Address</span>
            <span>{item.destaddress}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Destination Postcode</span>
            <span>{item.destpostcode}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Destination State</span>
            <span>{item.deststate}</span>
          </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Recipient Name</span>
            <span>{item.recipientname}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Contact Number</span>
            <span>{item.recipientcontact}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Weight</span>
            <span>{item.shipmentweight}kg</span>
          </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Dimensions</span>
            <span>{item.itemlength}M x {item.itemwidth}M x {item.itemheight}M</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Allowance</span>
            <span>Rm{item.allowance}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Penalty</span>
            <span>Rm{item.penalty}</span>
          </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Method</span>
            <span>{item.shipmentmethod}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Type</span>
            <span>{item.itemtype}</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Duration</span>
            <span>{item.shipmentduration} hours</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Remarks</span>
            <span>{item.remarks}</span>
          </div>
        </div>

        <div
          style={{
            width: 280,
            height: 70,
            backgroundColor: '#0000FF',
            color: '#fff',
            display: item.JobStatus === "Available" ? "none" : 
            item.JobStatus === "Unlisted" ? "none" : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          onClick={() => {
            if (!(item.JobStatus === 'Available') || !(item.JobStatus === 'Unlisted')){
              if(item.JobStatus === 'Waiting For Shipper To Confirm'){
                navigate('/shipper/shipperContract?JobID=' + item.JobID);
              }
              else if (item.JobStatus === 'Pending Admin Approval'){
                navigate('/shipper/shipperWaitAdmin?JobID=' + item.JobID);
              }
              else{
                navigate('/shipper/shipperContractHistory?JobID=' + item.JobID);
              }
            }

          }}
        >
          View Smart Contract
        </div>
      </div>
    </div>
    ))}
    </>
  );
}
