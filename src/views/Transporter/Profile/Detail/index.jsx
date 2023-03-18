import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Rate,
  Row,
  Select,
  Tabs,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.css';
//import * as api from '../../api/api';
import moment from 'moment';
import PropTypes from 'prop-types'; // yarn add prop-types
import Column from 'antd/lib/table/Column';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';

function TransDetails() {
  const [TransData, setTransData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://w62n1e1wfj.execute-api.us-east-1.amazonaws.com/prod/transporter'
      )
      .then((response) => {
        setTransData(response.data.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Transporter Profile</h1>
      {TransData.map((trans) => (
        <div key={trans.transID}>
          <p>Transporter ID: {trans.transID}</p>
          <p>Name: {trans.name}</p>
          <p>Contact: {trans.contact}</p>
          <p>Email: {trans.email}</p>
          <p>Website: {trans.website}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default TransDetails;
