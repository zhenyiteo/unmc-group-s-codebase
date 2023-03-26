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
      status: 'Declined',
    },
    {
      logo: '/images/tlogo.jpg',
      jobId: 'A773',
      shiperId: 'Fantacy Glass',
      transporterId: 'DHL',
      shipmentWeight: '10KG',
      shipmentType: 'Glass',
      allowance: 'RM500/1000',
      status: 'Expired',
    },
    {
      logo: '/images/tlogo.jpg',
      jobId: 'F429',
      shiperId: 'Fantacy Glass',
      transporterId: 'DHL',
      shipmentWeight: '10KG',
      shipmentType: 'Glass',
      allowance: 'RM500/1000',
      status: 'Expired',
    },
    {
      logo: '/images/tlogo.jpg',
      jobId: 'M27',
      shiperId: 'Fantacy Glass',
      transporterId: 'DHL',
      shipmentWeight: '10KG',
      shipmentType: 'Glass',
      allowance: 'RM500/1000',
      status: 'Declined',
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
        <div style={{ fontSize: 40, fontWeight: 'bold' }}>Pending Jobs</div>
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
                if (item.jobId === '23' && flag === 1) {
                  navigate('/transporter/waitAdminConfirm');
                } else if (item.jobId === '23' && flag === 2) {
                  navigate('/transporter/transDeclinedByAdmin');
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
                  <div style={{ color: '#ad8b00' }}>
                    {flag === 1 ? 'Waiting' : item.status}
                  </div>
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
              <div
                style={{
                  height: 100,
                  width: 10,
                  backgroundColor: flag === 1 ? '#ffec3d' : '#ff0000',
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
            <div className={styles.item}>{item.name}</div>
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
            <Radio value={1}>Waiting</Radio>
            <Radio value={2}>Declined/ Expired</Radio>
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
