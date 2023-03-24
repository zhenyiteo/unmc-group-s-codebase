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
      isMatched = item.remark.toLowerCase().includes(selectCate.name.toLowerCase());
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
          JobID: item.JobID ,
          logo: '/images/tlogo.jpg',
          name: `RM${item.allowance} From: ${item.originpostcode},${item.originstate} To: ${item.destpostcode},${item.deststate}` ,
          remark: `Type: ${item.itemtype}`,
        })));
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching uploaded job data:', error));
  }, []);

  const handleItemClick = (item) => {
    const matchingItem = list.find((listItem) => listItem.JobID === item.JobID);
    if (matchingItem) {
      navigate('/transporter/availableJobDetail?JobID=' + item.JobID);
    }
  };
  if (isLoading){
    return (<>
    <div className={styles.home} >
      <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%", marginBottom: 30 }}>
        <Spin tip="Loading..." size="large"/>
      </div>
    </div>
    </>)
  }

  return (
    <div className={styles.home}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
        <div>
          <Input.Search
            placeholder="Search by keyword"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            allowClear
          />
        </div>
      </div>
      <h1 style={{ marginTop: 20 }}>Results</h1>
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

export default AvailableJob;
