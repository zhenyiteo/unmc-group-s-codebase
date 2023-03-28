import {
  Button,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.css';
import axios from 'axios';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css'
//import * as api from '../../api/api';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';

export default function Add() {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(1);

  const [cates, setCates] = useState([
    {
      name: 'All',
    },
    {
      name: 'Glass',
    },
    {
      name: 'Flammable',
    },
    {
      name: 'Electronics',
    },
    {
      name: 'Frozen',
    },
    {
      name: 'Medicine',
    },
    {
      name: 'Fragile',
    },
    {
      name: 'Daily',
    },
    {
      name: 'Dangerous',
    },
  ]);
  const [list, setList] = useState([
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [selectCate, setSelectCate] = useState(cates[0]);
  const [searchText, setSearchText] = useState('');
  const [shipperFilter, setShipperFilter] = useState('');
  const [transFilter, setTransFilter] = useState('');
  const filteredList = list.filter(item => {
    let isMatched = true;
    if (selectCate && selectCate.name !== 'All') {
      isMatched = item.itemtype.toLowerCase().includes(selectCate.name.toLowerCase());
    }
    if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
      isMatched = false;
    }
    if(item.JobStatus === "Waiting For Shipper To Confirm" || item.JobStatus === "Available" || item.JobStatus === "Unlisted"){
      isMatched = false;
    }
    if(item.JobStatus === 'Cancelled'){
      if (item.adminSign){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
 
    if(shipperFilter && !item.ShipperID.toLowerCase().includes(shipperFilter.toLowerCase())){
      isMatched = false;
    }
    if(transFilter && !item.TransID.toLowerCase().includes(transFilter.toLowerCase())){
      isMatched = false;
    }

    if (flag === 1){
      isMatched = isMatched;
    }
    else if (flag === 2){
      if (item.JobStatus === "Pending Admin Approval"){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
      
    else if (flag === 3){
      if (item.JobStatus === "Active" || item.JobStatus === "Completed" || item.JobStatus === "Delivered"){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
    else if (flag === 4){
      if(item.JobStatus === "Cancelled"){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }

   return isMatched;
  });
   useEffect(() => {
    axios.get('https://cs6cmxy7k7.execute-api.us-east-1.amazonaws.com/prod/prod')
      .then(response => {
        console.log(response.data.body);
        setList(response.data.body.map(item => ({
          JobID: item.JobID,
          logo: '/images/tlogo.jpg',
          name: `RM${item.allowance} From: ${item.originpostcode},${item.originstate} To: ${item.destpostcode},${item.deststate}` ,
          itemtype: item.itemtype, 
          JobStatus: item.JobStatus,
          ShipperID: item.ShipperID,
          TransID: item.transID,
          shipmentWeight: item.shipmentweight + 'kg',
          allowance: 'RM' + item.allowance,
          penalty: 'RM' + item.penalty,
          shipmentMethod: item.shipmentmethod,
          expiry: item.expirytime,
          adminSign: item.adminSign

        })));
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching pending job data:', error));
  }, []);

  const onFinish = async (values) => {
    message.info('Successfully Saved!');
  };

  const onFinishFailed = () => {};

  const handleItemClick = (item) => {
    if (item.JobStatus === "Pending Admin Approval"){
      navigate('/admin/pendingContractDetail?JobID=' + item.JobID);
    }
    else if (item.JobStatus === "Cancelled"){
      navigate('/admin/declinedContract?JobID=' + item.JobID);
    }
    else{
      navigate('/admin/approvedContract?JobID=' + item.JobID);
    }

};

if (isLoading){
  return (<>
  <div  >
    <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%",  marginBottom: 30 }}>
      <Spin tip="Loading..." size="large"/>
    </div>
  </div>
  </>)
}

  return (
    <div className={styles.home}>
      <div
        style={{
          display: 'flex',
          // justifyContent: 'space-between',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 'bold' }}>Contract History</div>
        <div style={{ marginTop: 20 }}>
          <Input.Search
            placeholder="Search by description"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            allowClear
          />
        </div>

        <div className={styles.list}>
          {filteredList.map((item) => (
            <div
              className={styles.item}
              style={{ backgroundColor: selectCate === item ? '#d7dffc' : '' }}
              onClick={() => {
                handleItemClick(item);
              }}
            >
              <img
                src={item.logo}
                alt=""
                style={{ width: 70, height: 70 }}
              ></img>
              <div className={styles.itemright}>
                <div className={styles.row}>
                  <div
                    className={styles.name}
                    style={{ fontSize: 20, fontWeight: 'bold' }}
                  >
                    Job ID: {item.JobID}
                  </div>
                  <div style={{ color: 'red' }}>
                    {item.JobStatus}
                  </div>
                </div>
                <div className={styles.row}>
                  <div
                    className={styles.name}
                    style={{ color: 'blue' }}
                  >
                    Shipper ID: {item.ShipperID}
                  </div>
                  <div style={{ color: 'blue' }}>
                    Transporter ID: {item.TransID}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.name}>
                    Shipment Weight: {item.shipmentWeight}
                  </div>
                  <div>Shipment Type: {item.itemtype}</div>
                </div>
                <div className={styles.row}>
                  <div>Allowance/Penalty:{item.allowance}/{item.penalty}</div>
                  <div>Description: {item.name}</div>
                </div>
              </div>
              <div
                style={{
                  height: 100,
                  width: 10,
                  backgroundColor: item.JobStatus === "Cancelled" ?'#ff0000' : item.JobStatus === "Pending Admin Approval" ? "#FFFF00":'#9cffaa' ,
                  marginLeft: 10,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['right']}>
        <div style={{ marginTop: 20, fontWeight: 'bold' }}>Search by Company ID</div>
        <Input
          placeholder="Search by Shipper ID"
          value={shipperFilter}
          onChange={(event) => setShipperFilter(event.target.value)}
          style={{ marginTop: 20 }}
          allowClear
        ></Input>
        <Input
          placeholder="Search by Transporter ID"
          value={transFilter}
          onChange={(event) => setTransFilter(event.target.value)}
          style={{ marginTop: 20 }}
          allowClear
        ></Input>
        <div style={{ marginTop: 20, fontWeight: 'bold' }}>Category Filter</div>
        <div className={styles.cates}>
          {cates.map((item) => (
            <div className={styles.item} onClick={() => {setSelectCate(item)}}  >{item.name}</div>
          ))}
        </div>
        <div style={{ marginTop: 40, fontWeight: 'bold' }}>Status</div>
        <div style={{ marginTop: 10 }}>
          <Radio.Group
            value={flag}
            onChange={(e) => {
              setFlag(e.target.value);
            }}
            defaultValue={1}
          >
            <Radio value={1}>All</Radio>
            <Radio value={2}>Pending</Radio>
            <Radio value={3}>Signed</Radio>
            <Radio value={4}>Declined</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginTop: 28, fontWeight: 'bold' }}>
          Select by sorting
        </div>
        <Select
          defaultValue=" "
          style={{ width: '100%', marginTop: 0 }}
          options={[
            {
              value: '1',
              label: 'Expiring soonest',
            },
            {
              value: '2',
              label: 'Newly Created',
            },
            {
              value: '3',
              label: 'Shipment Weight',
            },
            {
              value: '4',
              label: 'Shipment Allowance',
            },
            {
              value: '5',
              label: 'Shipment Penalty',
            },
          ]}
        />
      </div>
    </div>
  );
}
