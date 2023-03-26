import {
  Button,
  Col,
  Form,
  Input,
  message,
  Rate,
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
  const navagite = useNavigate();
  const [detail, setDetail] = useState({
    publishDate: '08/09/2022',
    jobId: '35626378312',
    allowance: 'RM 500',
    finishDate: '11/09/2022',
    transactionId: 'NDJ#asasa2121',
    penalty: 'RM 0',
  });
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
      <div style={{ display: 'flex' }}>
        <span style={{ fontSize: 20, fontWeight: 'bold', marginRight: 100 }}>
          Job History
        </span>
        <Input.Search
          placeholder="Search company"
          style={{ flex: 1 }}
        ></Input.Search>
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex' }}>
          <Upload>
            <div
              style={{
                backgroundColor: '#f7f5fe',
                width: 300,
                height: 280,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileImageOutlined style={{ fontSize: 40, color: '#999' }} />
            </div>
          </Upload>
          <div style={{ flex: 1, marginLeft: 20 }}>
            <div
              style={{
                backgroundColor: '#a9fbb0',
                height: 40,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                fontSize: 20,
              }}
            >
              <span>Status</span>
              <span>Delivered Job</span>
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
                <div className={styles['label']}>Publish Date:</div>
                <div className={styles['value']}>{detail.publishDate}</div>
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <div className={styles['label']}>Job ID:</div>
                <div className={styles['value']}>{detail.jobId}</div>
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <div className={styles['label']}>Allowance:</div>
                <div className={styles['value']}>{detail.allowance}</div>
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
                <div className={styles['label']}>Finish Date:</div>
                <div className={styles['value']}>{detail.finishDate}</div>
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <div className={styles['label']}>Transacation ID:</div>
                <div className={styles['value']}>{detail.transactionId}</div>
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                <div className={styles['label']}>Penally:</div>
                <div className={styles['value']}>{detail.penalty}</div>
              </div>
            </div>
            <div>
              <span style={{ color: '#999', marginRight: 10 }}>
                Rated by Others
              </span>
              <Rate value={3}></Rate>
            </div>
            <div>
              <a href="/#/shipper/uploadedJobDetail">View Attachment</a>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
              <Upload>
                <div className={styles['img-wrapper']}>
                  <FileImageOutlined style={{ fontSize: 40, color: '#999' }} />
                </div>
              </Upload>
              <Upload>
                <div className={styles['img-wrapper']}>
                  <FileImageOutlined style={{ fontSize: 40, color: '#999' }} />
                </div>
              </Upload>
              <Upload>
                <div className={styles['img-wrapper']}>
                  <FileImageOutlined style={{ fontSize: 40, color: '#999' }} />
                </div>
              </Upload>
              <Upload>
                <div className={styles['img-wrapper']}>
                  <FileImageOutlined style={{ fontSize: 40, color: '#999' }} />
                </div>
              </Upload>
              <Upload>
                <div className={styles['img-wrapper']}>
                  <FileImageOutlined style={{ fontSize: 40, color: '#999' }} />
                </div>
              </Upload>
              <div style={{ flex: 1 }}></div>
              <div
                style={{
                  width: 280,
                  height: 70,
                  backgroundColor: '#afb1b6',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navagite('/shipper/finishedJob');
                }}
              >
                View Smart Contract
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>origin address</span>
            <span>12, Jalan Aman, Taman Aman</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Origin Postcode</span>
            <span>12345</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Origin State</span>
            <span>Pula Pinang</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Job Briefing</span>
            <span>Deliver a box of glasses to University of</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Destination Address</span>
            <span>University of Nottingham Malaysia</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Destination Postcode</span>
            <span>43500</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Destination State</span>
            <span>Selangor</span>
          </div>
          <div className={styles['item']}>
            <span>
              Nottingham Malaysia by air. Company who are able to make sure the
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Recipient Name</span>
            <span>John Wong</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Contact Number</span>
            <span>1234512332</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Welght</span>
            <span>100KG</span>
          </div>
          <div className={styles['item']}>
            <span>
              glasses are not damaged and deliver the parcel within 72
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Dimensions</span>
            <span>1.0M x 3.0M x 0.5M</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Allowance</span>
            <span>Rm500</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Penalty</span>
            <span>Rm1000</span>
          </div>
          <div className={styles['item']}>
            <span>hours can pick up this job.</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Method</span>
            <span>Air</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Type</span>
            <span>Glass</span>
          </div>
          <div className={styles['item']}>
            <span className={styles['item-title']}>Shipment Duration</span>
            <span>72 hours</span>
          </div>
          <div className={styles['item']}>
            <span>Remarks</span>
          </div>
        </div>
      </div>
    </div>
  );
}
