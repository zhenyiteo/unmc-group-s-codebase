//import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import { Input, message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.css';
//import * as api from '../../api/api';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';

//localhost:3000/#/transporter/availableJob
//localhost:3000/#/shipper/postJob

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Input.Search placeholder="Search company"></Input.Search>
          <div className={styles.cates}>
            {cates.map((item) => (
              <div
                className={styles.cate}
                style={{
                  backgroundColor: selectCate === item ? '#d7dffc' : '',
                }}
                onClick={() => {
                  setSelectCate(item);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <Select
            defaultValue=" "
            style={{ width: 200 }}
            options={[
              {
                value: '1',
                label: 'sort by allowance',
              },
              {
                value: '2',
                label: 'sort by location',
              },
              {
                value: '3',
                label: 'sort by rating',
              },
              {
                value: '4',
                label: 'oldest',
              },
              {
                value: '5',
                label: 'latest(newest)',
              },
            ]}
          />
        </div>
      </div>
      <div className={styles.list}>
        {list.map((item) => (
          <div
            className={styles.item}
            style={{ backgroundColor: selectCate === item ? '#d7dffc' : '' }}
            onClick={() => {
              if (item.name === 'Fantacy Glass Company') {
                navigate('/transporter/pendingJobDetail');
              }
            }}
          >
            <img
              src={item.logo}
              alt=""
              style={{ width: 70, height: 70 }}
            ></img>
            <div className={styles.right}>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.remark}>{item.remark}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}