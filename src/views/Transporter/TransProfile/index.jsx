import {
  Button,
  Col,
  Divider,
  Row,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';

const { Title } = Typography;

function TransDetails() {
  const [transData, setTransData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        'https://w62n1e1wfj.execute-api.us-east-1.amazonaws.com/prod/transporter'
      )
      .then((response) => {
        setTransData(response.data.body);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading){
    return (<>
    <div className={styles.home} >
      <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%", marginBottom: 30 }}>
        <Spin tip="Loading..." size="large"/>
      </div>
    </div>
    </>)
  }
  const handleEditProfile = () => {
    // handle edit profile button click
    console.log('Edit profile clicked');
  };

  return (
    <div style={{ margin: '2rem auto', maxWidth: 800 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Transporter Profile
      </Title>
      {transData.map((trans) => (
        <div key={trans.transID} style={{ marginBottom: '2rem' }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <strong>Transporter ID:</strong> {trans.transID}
            </Col>
            <Col span={12}>
              <strong>Name:</strong> {trans.name}
            </Col>
            <Col span={12}>
              <strong>Contact:</strong> {trans.contact}
            </Col>
            <Col span={12}>
              <strong>Email:</strong> {trans.email}
            </Col>
            <Col span={24}>
              <strong>Website:</strong> {trans.website}
            </Col>
          </Row>
          <Button type="primary" onClick={handleEditProfile}>
            Edit Profile
          </Button>
          {transData.indexOf(trans) !== transData.length - 1 && (
            <Divider />
          )}
        </div>
      ))}
    </div>
  );
}

export default TransDetails;
