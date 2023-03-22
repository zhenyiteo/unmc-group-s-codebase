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
  const [showSign, setShowSign] = useState(false);


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
    <div className={styles.home}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 30 }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>Smart Contract</div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.left}>
          {
            showSign ? <div style={{
              position: "absolute",
              top: 120,
              right: -80,
              width: 150,
              height: 150,
              backgroundColor: "#efb5b4",
              borderRadius: 100
            }}></div> : <></>}
          <div style={{ position: "relative" }}>
            <div className={styles.label}>
              Job ID:357347546072812
            </div>
            <div className={styles.label}>
              Transacation ID:NDJ#378459023Y
            </div>
            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Smart Contract Valid Since:
              </div>
              <div className={styles.rowValue}>
                09:21:36 25/12/2022
              </div>
            </div>



            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Smart Contract Valid Since:
              </div>
              <div className={styles.rowValue}>
                09:21:36 25/12/2022
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Smart Contract End:
              </div>
              <div className={styles.rowValue}>
                17:11:28 28/12/2022
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel} style={{ color: "#999" }}>
                Penality:
              </div>
              <div className={styles.rowValue} style={{ color: "#999" }}>
                RM 1,000
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel}>
                Admin Signature
              </div>
              <div className={styles.rowValue}>
                ADMIN NO2 FLEETATA
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowLabel}>
                CLIENT - SHIPPER NAME
              </div>
              <div className={styles.rowValue}>
                COMPANY - TRANSPORTER NAME
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <h2>Violet Shah</h2>
                <div>Visual Designer</div>
                <div>Vancouver,British Columnbia</div>
                <div>rosadiaz@gmail.com</div>
              </div>
              <div style={{ flex: 1 }}>
                <h2>Dylan Drake Bhd.xx</h2>
                <div>Robbie Alvarea</div>
                <div>VSelangor,Malaysia</div>
                <div>Yzx9887@yahoo.com</div>
              </div>
            </div>
            <h2 style={{ marginTop: 20 }}>Deliverables</h2>
            <h3>Deliverable Here</h3>
            <div>Lorem ipsum dolor sit amet consectetur adipising edit,Eget quam lucus feugiat sit. Una,semper sagittls non faucibus nunc tortor,id sed donec</div>

            <h2 style={{ marginTop: 20 }}>Process</h2>
            <h3 style={{ marginTop: 20 }}>Round One</h3>
            <div style={{ marginTop: 20 }}>Lorem ipsum dolor sit ametconsectertur adipising ediy,Eget quam luctus feugiats feuaislas site, Urna msemper sagittis no faucibus nunc tortot,id send donc</div>

            <h3 style={{ marginTop: 20 }}>Round Two</h3>
            <div style={{ marginTop: 20 }}>Lorem ipsum dolor sit ametconsectertur adipising ediy,Eget quam luctus feugiats feuaislas site, Urna msemper sagittis no faucibus nunc tortot,id send donc</div>

            <h3 style={{ marginTop: 20 }}>Round Three</h3>
            <div style={{ marginTop: 20 }}>Lorem ipsum dolor sit ametconsectertur adipising ediy,Eget quam luctus feugiats feuaislas site, Urna msemper sagittis no faucibus nunc tortot,id send donc</div>
          </div>
        </div>



        <div style={{ flex: 1, paddingLeft: 60 }}>
          <h1 >
            Terms and Conditions
          </h1>
          <h2>
            CONDITIONS AND CLARIFICATIONS
          </h2>
          <div className={styles.value}>
            At ver cos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
            corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
            distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
            maxime placeat facere possimus, omnis voluptas assumenda est. omnis dolor repellendus. Temporibus autem
            quibusdam et aut officils debitis aut rerum.
          </div>
          <h2 style={{ marginTop: 10 }}>
            Terms
          </h2>
          <div className={styles.value}>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
            cumque nihil imped it quo minus id quod maxime placeat facere passimus, omnis voluptas assumenda est, omnis
            dolor repellendus.
            Et harum quidem rerum facilis est et expedita distinctio. Nam liber tempore, cum soluta nobis est eligendi optio
            cumque nihil imped it quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
            dolor repellendus.
            Fleetata holds the final explaination right of this general condition.
          </div>

          <h2 style={{ marginTop: 10 }}>
            EXPLANATION OF FEES:
          </h2>
          <div className={styles.label}>
            Violet Shah reserves the right to include the completed product of this project in a professional portfolio.
          </div>

          <h1 style={{ marginTop: 20 }}>
            Allowance Fee
          </h1>



          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", borderBottom: "1px solid #333", justifyContent: "space-between", paddingBottom: 20 }}>
              <h3>Service Item</h3>
              <h3>QTY</h3>
              <h3>AMOUNT</h3>
            </div>
            <div style={{ display: "flex", borderBottom: "1px solid #333", justifyContent: "space-between", paddingBottom: 20, paddingTop: 20 }}>
              <div >
                <div>Fragile Object Delivery,</div>
                <div>A box of glasses to University of,</div>
                <div> Nottingham Malaysia.</div>
              </div>
              <div>1</div>
              <div>MYR 500.0</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            <h3>TOTAL ESTIMATED FEES</h3>
            <h3>MYR 500.00</h3>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <h2>Press Confirm and we will send for admin approval</h2>
              <h2 style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#000", marginRight: 5 }}></div>
                <span>or it will auto reject within 30 minutes*</span>
              </h2>
            </div>
          </div>
          {
            !showSign ? <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Button style={{ backgroundColor: "#4abc3a", color: "#fff", height: 50, width: 200, marginTop: 20, borderRadius: 5 }} onClick={() => {
                setShowSign(true);
              }}>Confrim</Button>
              <Button style={{ backgroundColor: "#ab423d", color: "#fff", height: 50, width: 200, marginTop: 20, borderRadius: 5, marginLeft: 20 }} onClick={() => {
              }}>Decline</Button>
            </div> : <></>
          }
          {showSign ?
            <div>
              <div style={{ display: "flex", width: "100%", fontWeight: "bold", marginBottom: 20, marginTop: 30 }}>
                <div style={{ flex: 1 }}>
                  <span>Signed by :</span>
                  <span> Violet Shah</span>
                </div>
                <div style={{ flex: 1 }}>
                  <span> Signed by :</span>
                  <span> Dvlan Drake Bhd xxx</span>
                </div>
              </div>
              <div style={{ display: "flex", width: "100%", fontWeight: "bold", marginBottom: 20 }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    top: -80,
                    zIndex: -1,
                    left: 100,
                    width: 150,
                    height: 150, backgroundColor: "#efb5b4",
                    borderRadius: 100
                  }}></div>
                  <span>Date:
                  </span>
                  <span> 18:34:05
                    24/12/2022</span>

                </div>
                <div style={{ flex: 1, position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    top: -80,
                    zIndex: -1,
                    left: 100,
                    width: 150,
                    height: 150, backgroundColor: "#efb5b4",
                    borderRadius: 100
                  }}></div>
                  <span> Date:</span>
                  <span> 19:14:21
                    24/12/2027</span>
                </div>
              </div>
            </div> : <></>}


          {
            !showSign ? <div style={{ color: "red", fontWeight: "bold", textAlign: "center", marginTop: 10 }}>
              Expires is 00:23:22 and will automatically decline
            </div> : <></>}

        </div>

      </div>

    </div >
  );
}
