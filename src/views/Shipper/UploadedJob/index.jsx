import { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {
  LoadingOutlined,
  FileImageOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import styles from './index.module.css';
import axios from 'axios';

function UploadedJobDetails() {
  const [list, setList] = useState([]);
  const [selectCate, setSelectCate] = useState(null);
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
    axios.get('https://s2fdn95cu1.execute-api.us-east-1.amazonaws.com/prod/uploadedjob')
      .then(response => {
        setList(response.data.body.map(item => ({
          JobID: item.JobID,
          logo: '/images/tlogo.jpg',
          name: `RM${item.allowance} From: ${item.originpostcode},${item.originstate} To: ${item.destpostcode},${item.deststate}` ,
          remark: `Type: ${item.itemtype}`, 
          
        })))
      })
      .catch(error => console.error('Error fetching uploaded job data:', error));
  }, []);

  const handleItemClick = (item) => {
    navigate('/shipper/uploadedJobDetail?JobID=' + item.JobID);
  };


  return (
  <div className={styles.home}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className={styles.cates}>
        {cates.map((item) => (
          <div
            key={item.name}
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
      <div className={styles.search}>
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
          key={item.JobID}
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

export default UploadedJobDetails;
