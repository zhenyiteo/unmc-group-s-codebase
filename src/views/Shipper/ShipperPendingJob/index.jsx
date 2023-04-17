import {
  Input,
  Radio
} from 'antd';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

export default function     Add() {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(1);

  const [cates, setCates] = useState([
      {
        name: 'All',
      },
      {
        name: 'Glass',
      },
      {
        name: 'Flammable',
      },
      {
        name: 'Electronics',
      },
      {
        name: 'Frozen',
      },
      {
        name: 'Medicine',
      },
      {
        name: 'Fragile',
      },
      {
        name: 'Daily',
      },
      {
        name: 'Dangerous',
      },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [selectCate, setSelectCate] = useState(cates[0]);
  const [searchText, setSearchText] = useState('');
  const [accountName, setAccountName] = useState('');
  const filteredList = list.filter(item => {
    let isMatched = true;
    if(item.ShipperID !== accountName){
      isMatched = false;
    }
    if(item.JobStatus === 'Waiting For Shipper To Confirm' && flag === 1){
      isMatched = isMatched;
    }
    if (selectCate && selectCate.name !== 'All') {
      isMatched = item.itemtype.toLowerCase().includes(selectCate.name.toLowerCase());
    }
    if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
      isMatched = false;
    }

    if (flag === 1){
      if(item.JobStatus === 'Waiting For Shipper To Confirm'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }
    else if (flag === 2){
      if(item.JobStatus === 'Pending Admin Approval'){
        isMatched = isMatched;
      }
      else{
        isMatched = false;
      }
    }

    return isMatched;
  });

  useEffect(() => {
    axios.get('https://2jpelfyt89.execute-api.us-east-1.amazonaws.com/v1')
      .then(response => {
        console.log(response.data.body);
        setList(response.data.body.map(item => ({
          JobID: item.JobID,
          logo: '/images/tlogo.jpg',
          name: `RM${item.allowance} From: ${item.originpostcode},${item.originstate} To: ${item.destpostcode},${item.deststate}` ,
          itemtype: item.itemtype, 
          JobStatus: item.JobStatus,
          ShipperID: item.ShipperID,
          TransID: item.transID,
          shipmentWeight: item.shipmentweight + 'kg',
          allowance: 'RM' + item.allowance,
          penalty: 'RM' + item.penalty,
          shipmentMethod: item.shipmentmethod

        })));
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching pending job data:', error));

      const storedAccountName = sessionStorage.getItem('accountName');
      if (storedAccountName) {
        setAccountName(storedAccountName);
        console.log(accountName);
      }
  }, []);

  const handleItemClick = (item) => {

    if (item.JobStatus === 'Waiting For Shipper To Confirm') {
      
      navigate('/shipper/shipperContract?JobID=' + item.JobID);
    }
    else if (item.JobStatus === 'Pending Admin Approval'){
      navigate('/shipper/shipperWaitAdmin?JobID=' + item.JobID);
    }
  };

  if (isLoading){
    return (<>
    <div  >
      <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%",  marginBottom: 30 }}>
        <Spin tip="Loading..." size="large"/>
      </div>
    </div>
    </>)
  }

  return (
    <div className={styles.home}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 'bold' }}>Pending Jobs</div>


        <div style={{ marginTop: 20 }}>
          <Input.Search
            placeholder="Search by description"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            allowClear
          />
        </div>

        <div className={styles.list}>
          {filteredList.map((item) => (
            <div
              className={styles.item}
              style={{ backgroundColor: selectCate === item ? '#d7dffc' : '' }}
              onClick={() => {

                handleItemClick(item);
              }}
            >
              <img
                src={item.logo}
                alt=""
                style={{ width: 70, height: 70 }}
              ></img>
              <div className={styles.itemright}>
                <div className={styles.row}>
                  <div
                    className={styles.name}
                    style={{ fontSize: 20, fontWeight: 'bold' }}
                  >
                    Job ID:{item.JobID}
                  </div>
                  <div style={{ color: '#ad8b00' }}>
                    {item.JobStatus === 'Waiting For Shipper To Confirm' ? 'Waiting for Shipper' : 'Waiting For Admin'}
                  </div>
                </div>
                <div className={styles.row}>
                  <div
                    className={styles.name}
                    style={{ color: 'blue' }}
                  >
                    Shipper ID:{item.ShipperID}
                  </div>
                  <div style={{ color: 'blue' }}>
                    Transporter ID:{item.TransID}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.name}>
                    Shipment Weight: {item.shipmentWeight}
                  </div>
                  <div>Shipment Type: {item.itemtype}</div>
                </div>
                <div className={styles.row}>
                  <div>Allowance/Penalty: {item.allowance}/{item.penalty}</div>
                  <div>Description: {item.name}</div>
                </div>
              </div>
              <div
                style={{
                  height: 100,
                  width: 10,
                  backgroundColor: item.JobStatus === "Waiting For Shipper To Confirm" ? '#ffec3d' : '#FFA500',
                  marginLeft: 10,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles['right']}>
        <div style={{ marginTop: 100, fontWeight: 'bold' }}>
          Category Filter
        </div>
        <div className={styles.cates}>
          {cates.map((item) => (
            <div 
            style={{
              backgroundColor: selectCate === item ? '#d7dffc' : '',
            }}
            onClick={() => {setSelectCate(item)}} className={styles.item}>{item.name}</div>
          ))}
        </div>
        <div style={{ marginTop: 40, fontWeight: 'bold' }}>Status</div>
        <div style={{ marginTop: 10 }}>
          <Radio.Group
            value={flag}
            onChange={(e) => {
              setFlag(e.target.value);
            }}
            defaultValue={1}
          >
            <Radio value={1}>Waiting for Shipper Confirmation</Radio>
            <Radio value={2}>Waiting for Admin Confirmation</Radio>
          </Radio.Group>
        </div>

      </div>
    </div>
  );
}
