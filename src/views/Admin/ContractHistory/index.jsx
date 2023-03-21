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
      name: "Glass"
    },
    {
      name: "Flammable"
    },
    {
      name: "Frozen"
    },
    {
      name: "Medicine"
    },
    {
      name: "Electronics"
    },
    {
      name: "Fragile"
    },
    {
      name: "Daily"
    },
    {
      name: "Plastice"
    }
  ]);
  const [list, setList] = useState([
    {
      logo: "/images/tlogo.jpg",
      name: "MyonDong Daily Production",
      remark: "Type: Fragile, Egg"
    },
    {
      logo: "/images/tlogo.jpg",
      name: "Hengyang Medicine Company",
      remark: "Tune: Medicine"
    },
    {
      logo: "/images/tlogo.jpg",
      name: "Xixi Electronic Production",
      remark: "Toe: Electronics"
    },
    {
      logo: "/images/tlogo.jpg",
      name: "Fantacy Glass Company",
      remark: "Type: Fragile, Glass"
    },
    {
      logo: "/images/tlogo.jpg",
      name: "Happy Month Firework Production",
      remark: "Type: Fragile, Egg"
    },

  ]);
  const [selectCate, setSelectCate] = useState(cates[0]);
  useEffect(() => { }, []);

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

  const onFinishFailed = () => { };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 30, alignItems: "center" }}>


    </div >
  );
}
