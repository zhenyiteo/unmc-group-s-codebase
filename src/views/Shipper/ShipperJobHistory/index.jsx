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
import 'antd/es/spin/style/css';
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
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [selectCate, setSelectCate] = useState(cates[0]);
  const [searchText, setSearchText] = useState('');
  const [accountName, setAccountName] = useState('');
  const filteredList = list.filter(item => {
    let isMatched = true;
    // if(item.JobStatus === 'Waiting For Shipper To Confirm' && flag === 1){
    //   isMatched = isMatched;
    // }
    if (selectCate && selectCate.name !== 'All') {
      isMatched = item.itemtype.toLowerCase().includes(selectCate.name.toLowerCase());
    }
    if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
      isMatched = false;
    }

    if (flag === 1){
      isMatched = isMatched;
    }
    else if (flag === 2){
      if(item.JobStatus === 'Waiting For Shipper To Confirm'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
    else if (flag === 3){
      if(item.JobStatus === 'Pending Admin Approval'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
    else if (flag === 4){
      if(item.JobStatus === 'Available'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
    else if (flag === 5){
      if(item.JobStatus === 'Delivered'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
    else if (flag === 6){
      if(item.JobStatus === 'Completed'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
    else if (flag === 7){
      if(item.JobStatus === 'Unlisted'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
    else if (flag === 8){
      if(item.JobStatus === 'Cancelled'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
    else if (flag === 9){
      if(item.JobStatus === 'Active'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }

    if(item.ShipperID !== accountName){
      isMatched = false;
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
          transPenalty: item.transPenalty,

        })));
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching pending job data:', error));

      const storedAccountName = sessionStorage.getItem('accountName');
      if (storedAccountName) {
        setAccountName(storedAccountName);
        console.log(accountName);
      }
  }, []);

  const onFinish = async (values) => {
    message.info('Successfully Saved!');
  };

  const onFinishFailed = () => {};

  const handleItemClick = (item) => {
      navigate('/shipper/shipperJobHistoryDetail?JobID=' + item.JobID)
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
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 'bold' }}>Job History</div>

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
                    Job ID:{item.JobID}
                  </div>
                  <div >
                    {item.JobStatus} 
                    {item.transPenalty == null ? '': item.transPenalty ? ' by Transporter - penalty not paid' : ' by Transporter - penalty paid'}
                  </div>
                </div>
                <div className={styles.row}>
                  <div
                    className={styles.name}
                    style={{ color: 'blue' }}
                  >
                    Shipper ID:{item.ShipperID}
                  </div>
                  <div style={{ color: 'blue' }}>
                    Transporter ID:{item.TransID}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.name}>
                    Shipment Weight: {item.shipmentWeight}
                  </div>
                  <div>Shipment Type: {item.itemtype}</div>
                </div>
                <div className={styles.row}>
                  <div>Allowance/Penalty: {item.allowance}/{item.penalty}</div>
                  <div>Description: {item.name}</div>
                </div>
              </div>
              <div
                style={{
                  height: 100,
                  width: 10,
                  backgroundColor: item.JobStatus === "Waiting For Shipper To Confirm" ? '#ffec3d' : item.JobStatus === "Pending Admin Approval" ? '#FFA500' : 
                  item.JobStatus === 'Available' ? '#820080': item.Jobstatus === 'Delivered' ? '#008268' :
                  item.JobStatus === 'Completed' ? '#00FF00' : item.JobStatus === 'Unlisted' ? '#808080' :
                  item.JobStatus === 'Cancelled' ? '#FF0000' : 'Active' ? '#3944BC' : '#000000',
                  marginLeft: 10,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['right']}>
        <div style={{ marginTop: 100, fontWeight: 'bold' }}>
          Category Filter
        </div>
        <div className={styles.cates}>
          {cates.map((item) => (
            <div 
            style={{
              backgroundColor: selectCate === item ? '#d7dffc' : '',
            }}
            onClick={() => {setSelectCate(item)}} className={styles.item}>{item.name}</div>
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
            <Radio value={1}>All</Radio><br></br>
            <Radio value={2}>Pending Shipper Confimation</Radio><br></br>
            <Radio value={3}>Pending Admin Confirmation</Radio><br></br>
            <Radio value={4}>Available</Radio><br></br>
            <Radio value={5}>Delivered</Radio><br></br>
            <Radio value={6}>Completed</Radio><br></br>
            <Radio value={7}>Unlisted</Radio><br></br>
            <Radio value={8}>Cancelled</Radio><br></br>
            <Radio value={9}>Active</Radio>
          </Radio.Group>
        </div>

      </div>
    </div>
  );
}
