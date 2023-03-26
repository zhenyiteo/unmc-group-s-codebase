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

  const [reason, setReason] = useState('');
  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 30,
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1.5 }}>
        <div style={{ fontSize: 40, fontWeight: 'bold', marginTop: -20 }}>
          Pending Contracts
        </div>
        <div style={{ display: 'flex', width: '100%', marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>
              Job ID
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                color: '#6565ff',
              }}
            >
              123
            </div>
          </div>
          <div style={{ flex: 2 }}>
            <div style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>
              Transaction ID
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                color: '#6565ff',
              }}
            >
              827302
            </div>
          </div>
        </div>
        <div
          style={{ display: 'flex', backgroundColor: '#f5f5f5', padding: 20 }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', flex: 1 }}>
              Deliverables
            </div>
            <div style={{ fontSize: 15, fontWeight: 'bold', flex: 1 }}>
              Deliverable Here
            </div>
            <div style={{ marginTop: 10 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget quam
              luctus feugiat feugiat sit. Urna, semper sagittis non faucibus
              nunc tortor, id sed donec.
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 20,
              }}
            >
              Process
            </div>
            <div style={{ marginTop: 10 }}>
              Lorem ipsum dolor sit amet. consectetur adipiscing elit. Eget quam
              luctus feugiat feugiat sit. Urna, semper sagittis non faucibus
              nunc tortor, id sed donec.
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 20,
              }}
            >
              Round Two
            </div>
            <div style={{ marginTop: 10 }}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Eget quam
              luctus feugiat feugiat sit. Urna, semper sagittis non faucibus
              nunc tortor, id sed donec.
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 20,
              }}
            >
              CONDITIONS AND CLARIFICATIONS
            </div>
            <div style={{ marginTop: 10 }}>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero terpore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus id quod
              maxime placeat facere possimus. omnis voluptas assumenda est,
              omnis dolor repellendus. Temporibus autem quibusdam et aut
              officiis debitis aut rerum, Et harum quidem rerum facilis est et
              expedita distinctio. Nam libero tempore, cum soluta nobis est
              elipendi optio cumque nihil impedit quo minus id quod maxime
              placeat facere possimus, omnis voluptas assumende est. omnis dolor
              repellendus.
            </div>
            <div style={{ marginTop: 10 }}>
              Fleetata holds the final explaination right of this general
              condition.
            </div>
            <h1 style={{ marginTop: 20 }}>Allowance Fee</h1>

            <div style={{ marginTop: 10 }}>
              <div
                style={{
                  display: 'flex',
                  borderBottom: '1px solid #333',
                  justifyContent: 'space-between',
                  paddingBottom: 20,
                }}
              >
                <h3>
                  Service
                  <br /> Item
                </h3>
                <h3>QTY</h3>
                <h3>AMOUNT</h3>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 20,
              }}
            >
              <h3>
                TOTAL <br />
                ESTIMATED FEES
              </h3>
              <h3>MYR 500.00</h3>
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'red',
          }}
        >
          Expires in: 01:23:22 and will automatically decline
        </div>
      </div>

      <div style={{ flex: 1, marginLeft: 20 }}>
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 39,
              }}
            >
              Shipper ID
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                color: '#6565ff',
              }}
            >
              Fantacy Glass
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 39,
              }}
            >
              Transporter ID
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                flex: 1,
                color: '#6565ff',
              }}
            >
              DHL
            </div>
          </div>
        </div>
        <div
          name="avatar"
          style={{
            width: 100,
            height: 100,
            marginTop: 10,
            backgroundColor: '#eee',
            border: '1px solid #ddd',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          listType="picture-card"
        >
          <FileImageOutlined style={{ fontSize: 30, color: '#aaa' }} />
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            flex: 1,
            marginTop: 20,
            color: '#8c8c8c',
          }}
        >
          Full Origin Address
        </div>
        <div
          style={{ fontSize: 15, fontWeight: 'bold', flex: 1, marginTop: 5 }}
        >
          12, Jalan Aman, Taman Aman, 12345 Pulau Pinang
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            flex: 1,
            marginTop: 30,
            color: '#8c8c8c',
          }}
        >
          Destination Address
        </div>
        <div
          style={{ fontSize: 15, fontWeight: 'bold', flex: 1, marginTop: 5 }}
        >
          University of Nottingham Malaysia, 43500 Selangor
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 30,
                color: '#8c8c8c',
              }}
            >
              {' '}
              Shipment Type
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 5,
              }}
            >
              {' '}
              Glass
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 30,
                color: '#8c8c8c',
              }}
            >
              {' '}
              Shipment Weight
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 5,
              }}
            >
              {' '}
              10 KG
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 20 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 10,
                color: '#8c8c8c',
              }}
            >
              Remarks
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 5,
              }}
            >
              None
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 30,
                color: '#8c8c8c',
              }}
            >
              Allowance / Penalty
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                flex: 1,
                marginTop: 5,
              }}
            >
              RM500 / RM1000
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <Button
              type="primary"
              style={{
                marginTop: 120,
                marginLeft: 60,
                height: 40,
                width: 240,
                borderRadius: 5,
              }}
              onClick={() => {
                navigate('/admin/pendingContract');
              }}
            >
              Return to Contract List
            </Button>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <Button
            type="primary"
            style={{
              backgroundColor: '#4abb3a',
              border: 'none',
              height: 40,
              width: 240,
              borderRadius: 5,
            }}
            onClick={() => {
              navigate('/admin/approvedContract');
            }}
          >
            Confirm
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (reason) {
                navigate('/admin/declinedContract');
              } else {
                message.error('Please Input Reason!');
              }
            }}
            style={{
              backgroundColor: '#af363c',
              border: 'none',
              height: 40,
              width: 240,
              borderRadius: 5,
            }}
          >
            Decline
          </Button>
        </div>
        <Input
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
          style={{ marginTop: 20, height: 40, borderRadius: 10 }}
          placeholder="Reason of declination:"
        />
        <div style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
          *** Must be filled if decline
        </div>
      </div>
    </div>
  );
}
