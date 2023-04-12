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

export default function Login() {
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
      name: 'MyonDong Daily Production',
      remark: 'Type: Fragile, Egg',
    },
    {
      logo: '/images/tlogo.jpg',
      name: 'Hengyang Medicine Company',
      remark: 'Tune: Medicine',
    },
    {
      logo: '/images/tlogo.jpg',
      name: 'Xixi Electronic Production',
      remark: 'Toe: Electronics',
    },
    {
      logo: '/images/tlogo.jpg',
      name: 'Fantacy Glass Company',
      remark: 'Type: Fragile, Glass',
    },
    {
      logo: '/images/tlogo.jpg',
      name: 'Happy Month Firework Production',
      remark: 'Type: Fragile, Egg',
    },
  ]);
  const [selectCate, setSelectCate] = useState(cates[0]);
  useEffect(() => {}, []);

  const onFinish = async (values) => {


    message.info('Successfully Saved!');
  };

  const onFinishFailed = () => {};

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 150,
        alignItems: 'center',
      }}
    >
      <div style={{ marginRight: 70 }}>
        <span style={{ fontSize: 30, fontWeight: "bold", marginBottom: 50, marginLeft: 120 }}>Select Account Type</span>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
            navigate("/selectCompanyShipper");
          }}>Shipper</Button>
          <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
            navigate("/selectCompanyTransporter");
          }}>Transporter</Button>
          <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
            navigate("/admin/pendingContract");
          }}>Admin</Button>
        </div>
      </div>
    </div>
  );
}