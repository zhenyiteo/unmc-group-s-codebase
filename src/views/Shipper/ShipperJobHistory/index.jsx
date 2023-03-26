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
import { Option } from 'antd/lib/mentions';
import { hover } from '@testing-library/user-event/dist/hover';

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
          justifyContent: 'space-between',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ fontSize: 35, fontWeight: 'bold' }}>Job History</div>
        <div style={{ marginTop: 10 }}>
          <div style={{ fontsize: 30 }}>
            {' '}
            Shipping Methods
            <Select
              defaultValue="Select Type "
              style={{ width: '100%', marginTop: 20 }}
              options={[
                {
                  value: '1',
                  label: 'By Transportations',
                },
                {
                  value: '2',
                  label: 'By Deliverable Types',
                },
                {
                  value: '3',
                  label: 'Failed Smart Contracts',
                },
                {
                  value: '4',
                  label: 'Cancelled Jobs',
                },
                {
                  value: '5',
                  label: 'Finished Jobs',
                },
              ]}
              onSelect={() => {
                navigate('/shipper/shipperJobHistoryTransportation');
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles['right']}>
        <Input.Search
          style={{ height: 33, borderRadius: 10 }}
          placeholder="Search company"
        ></Input.Search>
      </div>
    </div>
  );
}
