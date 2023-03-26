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

export default function Add() {
  const navigate = useNavigate();

  const [cates, setCates] = useState([
    {
      name: 'Glass',
    },
    {
      name: 'Flammable',
    },
    {
      name: 'Frozen',
    },
    {
      name: 'Medicine',
    },
    {
      name: 'Electronics',
    },
    {
      name: 'Fragile',
    },
    {
      name: 'Daily',
    },
    {
      name: 'Plastice',
    },
  ]);
  const [list, setList] = useState([
    {
      logo: '/images/tlogo.jpg',
      jobId: '23',
      shiperId: 'Fantacy Glass',
      transporterId: 'DHL',
      shipmentWeight: '10KG',
      shipmentType: 'Glass',
      allowance: 'RM500/1000',
      expires: 'Expires in: 01:23:22',
    },
    {
      logo: '/images/tlogo.jpg',
      jobId: 'A773',
      shiperId: 'Fantacy Glass',
      transporterId: 'DHL',
      shipmentWeight: '10KG',
      shipmentType: 'Glass',
      allowance: 'RM500/1000',
      expires: 'Expires in: 01:23:22',
    },
    {
      logo: '/images/tlogo.jpg',
      jobId: 'F429',
      shiperId: 'Fantacy Glass',
      transporterId: 'DHL',
      shipmentWeight: '10KG',
      shipmentType: 'Glass',
      allowance: 'RM500/1000',
      expires: 'Expires in: 01:23:22',
    },
    {
      logo: '/images/tlogo.jpg',
      jobId: 'M27',
      shiperId: 'Fantacy Glass',
      transporterId: 'DHL',
      shipmentWeight: '10KG',
      shipmentType: 'Glass',
      allowance: 'RM500/1000',
      expires: 'Expires in: 01:23:22',
    },
  ]);
  const [selectCate, setSelectCate] = useState(cates[0]);
  useEffect(() => {}, []);

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

  return (
    <div className={styles.home}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 'bold' }}>
          Pending Contracts
        </div>
        <div style={{ marginTop: 20 }}>
          <Input.Search
            style={{ height: 40, borderRadius: 10 }}
            placeholder="Search company"
          ></Input.Search>
        </div>

        <div className={styles.list}>
          {list.map((item) => (
            <div
              className={styles.item}
              style={{ backgroundColor: selectCate === item ? '#d7dffc' : '' }}
              onClick={() => {
                if (item.jobId === '23') {
                  navigate('/admin/pendingContractDetail');
                }
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
                    Job ID:{item.jobId}
                  </div>
                  <div style={{ color: 'red' }}>{item.expires}</div>
                </div>
                <div className={styles.row}>
                  <div
                    className={styles.name}
                    style={{ color: 'blue' }}
                  >
                    Shipper ID:{item.shiperId}
                  </div>
                  <div style={{ color: 'blue' }}>
                    Transporter ID:{item.transporterId}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.name}>
                    Shipment Weight:{item.shipmentWeight}
                  </div>
                  <div>Shipment Type:{item.shipmentType}</div>
                </div>
                <div className={styles.row}>
                  <div>Allowance/Penalty:{item.allowance}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['right']}>
        <div style={{ marginTop: 20, fontWeight: 'bold' }}>Try search here</div>
        <Input
          placeholder="Search by Shipper ID"
          style={{ marginTop: 20 }}
        ></Input>
        <Input
          placeholder="Search by Transporter ID"
          style={{ marginTop: 20 }}
        ></Input>
        <div style={{ marginTop: 20, fontWeight: 'bold' }}>Category Filter</div>
        <div className={styles.cates}>
          {cates.map((item) => (
            <div className={styles.item}>{item.name}</div>
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
