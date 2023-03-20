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

function AppliedJob() {
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

  const navigate = useNavigate();
  const filteredList = selectCate && selectCate.name !== 'All' ? list.filter(item => item.remark.toLowerCase().includes(selectCate.name.toLowerCase())) : list;

  useEffect(() => {
    axios.get('https://j3gs5whr05.execute-api.us-east-1.amazonaws.com/prod/prod')
      .then(response => {
        setList(response.data.body.map(item => ({
          JobID: item.JobID ,
          logo: '/images/tlogo.jpg',
          name: `RM${item.allowance} From: ${item.originpostcode},${item.originstate} To: ${item.destpostcode},${item.deststate}` ,
          remark: `Type: ${item.itemtype}`,
        })))
      })
      .catch(error => console.error('Error fetching uploaded job data:', error));
  }, []);

  
    
   
 

  const handleItemClick = (item) => {
    const matchingItem = list.find((listItem) => listItem.JobID === item.JobID);
    if (matchingItem) {
      navigate('/transporter/appliedJobDetail?JobID=' + item.JobID);
    }
  };

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
          <Select
            defaultValue=" "
            style={{ width: 200 }}
            options={[            {              value: '1',              label: 'sort by allowance',            },            {              value: '2',              label: 'sort by location',            },            {              value: '3',              label: 'sort by rating',            },            {              value: '4',              label: 'oldest',            },            {              value: '5',              label: 'latest(newest)',            },          ]}
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

export default AppliedJob;