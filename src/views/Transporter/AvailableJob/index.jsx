import { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import styles from './index.module.css';
import axios from 'axios';

function AvailableJob() {
  const [list, setList] = useState([]);
  const [selectCate, setSelectCate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
  const [searchText, setSearchText] = useState('');

  const navigate = useNavigate();

  const filteredList = list.filter(item => {
    let isMatched = true;
    if (selectCate && selectCate.name !== 'All') {
      isMatched = item.itemtype.toLowerCase().includes(selectCate.name.toLowerCase());
    }
    if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
      isMatched = false;
    }
    return isMatched;
  });

  useEffect(() => {
    axios.get('https://uiuokt5tql.execute-api.us-east-1.amazonaws.com/prod/transporteravailablejob')
      .then(response => {
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
      .catch(error => console.error('Error fetching available job data:', error));
  }, []);

  const handleItemClick = (item) => {
    const matchingItem = list.find((listItem) => listItem.JobID === item.JobID);
    if (matchingItem) {
      navigate('/transporter/availableJobDetail?JobID=' + item.JobID);
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
        //justifyContent: 'space-between',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 'bold' }}>
        Available Jobs
      </div>
      <div className={styles.search}  style={{ marginTop: 20 }}>
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
                  <div className={styles.name}>Job ID:{item.JobID}</div>
                  <div style={{ color: 'red' }}>{item.JobStatus}</div>
                </div>
                <div className={styles.row}>
                  <div
                    className={styles.name}
                    style={{ color: 'blue' }}
                  >
                    Shipper ID: {item.ShipperID}
                  </div>
                  <div style={{ color: 'blue' }}>
                    Shipment Method: {item.shipmentMethod}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.name}>
                    Shipment Weight: {item.shipmentWeight}
                  </div>
                  <div>Shipment Type: {item.itemtype}</div>
                </div>
                <div className={styles.row}>
                  <div>Allowance: {item.allowance}</div>
                </div>
                <div className={styles.row}>
                  <div>Penalty: {item.penalty}</div>
                  <div>Description: {item.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      
    </div>


      <div className={styles['right']}>
        <div style={{ marginTop: 111, fontWeight: 'bold' }}>
          Category Filter
        </div>
        <div className={styles.cates}>
          {cates.map((item) => (
            <div className={styles.item} 
            style={{
              backgroundColor: selectCate === item ? '#d7dffc' : '',
            }}
            onClick={() => {setSelectCate(item)}} >{item.name}</div>
          ))}
        </div>

    </div>
  
  </div>
  );
  
}

export default AvailableJob;
