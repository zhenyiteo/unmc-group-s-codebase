import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.css';
//import * as api from '../../api/api';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css'

export default function Add() {
  const navigate = useNavigate();

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
    if(item.JobStatus === 'Waiting For Shipper To Confirm'){
      isMatched = false;
    }
    if(shipperFilter && !item.ShipperID.toLowerCase().includes(shipperFilter.toLowerCase())){
      isMatched = false;
    }
    if(transFilter && !item.TransID.toLowerCase().includes(transFilter.toLowerCase())){
      isMatched = false;
    }


    return isMatched;
  });

  useEffect(() => {
    axios.get('https://2jpelfyt89.execute-api.us-east-1.amazonaws.com/v1')
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
          expiry: item.expirytime

        })));
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching pending job data:', error));
  }, []);

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

  const onFinishFailed = () => {};

  const handleItemClick = (item) => {
      
    navigate('/admin/pendingContractDetail?JobID=' + item.JobID);

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
        <div style={{ fontSize: 40, fontWeight: 'bold' }}>
          Pending Contracts
        </div>
        {/* <div style={{ marginTop: 20 }}>
          <Input.Search
            style={{ height: 40, borderRadius: 10 }}
            placeholder="Search company"
          ></Input.Search>
        </div> */}

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
                handleItemClick(item)
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
                  <div style={{ color: 'red' }}>Expires in: {item.expiry} hours</div>
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
                  <div>Allowance/Penalty: RM{item.allowance}/{item.penalty}</div>
                  <div>{item.name}</div>
                </div>
              </div>
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
            <div onClick={() => {setSelectCate(item)}} className={styles.item}>{item.name}</div>
          ))}
        </div>
        <div style={{ marginTop: 20, fontWeight: 'bold' }}>
          {' '}
          Select by sorting
        </div>
        <Select
          defaultValue=" "
          style={{ width: '100%', marginTop: 20 }}
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
