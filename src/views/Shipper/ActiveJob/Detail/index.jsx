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

  const [cates, setCates] = useState([]);
  const [list, setList] = useState([]);
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
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1>Fantacy Glass Company</h1>
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
          <div className={styles.value}>On Delivery</div>
          <div className={styles.label}>Released By</div>
          <div className={styles.value}>Fantacy Glass Company</div>
          <div className={styles.label}>Contact Number (Shipper)</div>
          <div className={styles.value}>019 276 3456</div>

          <div className={styles.label}>Publish Date</div>
          <div className={styles.value}>08 / 09 / 2022</div>
          <div className={styles.label}>Smart Contract Valid Since</div>
          <div className={styles.value}>08 / 09 / 2022 13:24:09</div>

          <div style={{ fontSize: 20, marginTop: 60 }}>
            Shipment Allowance: 500RM
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
            }}
            onClick={() => {
              navigate('/shipper/shipperJobHistoryDetail');
            }}
          >
            Confirm Finished
          </Button>
        </div>

        <div style={{ flex: 1, paddingLeft: 30 }}>
          <div className={styles.label}>Job Reguirment Briefing</div>
          <div className={styles.value}>
            Deliver a box of lasses to Universitv of Nottindham Malavsia hv air.
            Companv who are able to make sure the glasses are not damased and
            deliver the parcel within 72 hours can nick uo this job.
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Origin State</div>
              <div className={styles.value}>pulau Pinang</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Penalty</div>
              <div className={styles.value}>
                RM 1,000
                {/* <Button
                  style={{
                    backgroundColor: '#f5222d',
                    color: '#fff',
                    height: 30,
                    width: 140,
                    marginTop: 10,
                    borderRadius: 5,
                    fontSize: 10,
                    marginLeft: 20,
                  }}
                  onClick={() => {
                    navigate('');
                  }}
                >
                  Cancel Job
                </Button> */}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Origin Address</div>
              <div className={styles.value}>12 Jalan Aman. Taman Aman</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Type</div>
              <div className={styles.value}>Fragile (Glass)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Dacstinatian State</div>
              <div className={styles.value}>Selangor</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipping Method</div>
              <div className={styles.value}>Air</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destination Address</div>
              <div className={styles.value}>
                University of Nottindham Malaysia
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Weight</div>
              <div className={styles.value}>Pulau Pinang</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Dastinatian Postcode</div>
              <div className={styles.value}>43500</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Dimensions</div>
              <div className={styles.value}>1.0M x 3.0M x 0.5M</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Contact Number (Receiver)</div>
              <div className={styles.value}>1234512332</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Remarks</div>
              <div className={styles.value}>None</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
