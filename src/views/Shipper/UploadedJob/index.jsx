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
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';

function UploadedJobDetails() {
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

  const navigate = useNavigate();
  const filteredList = selectCate && selectCate.name !== 'All' ? list.filter(item => item.remark.toLowerCase().includes(selectCate.name.toLowerCase())) : list;

  useEffect(() => {
    axios.get('https://s2fdn95cu1.execute-api.us-east-1.amazonaws.com/prod/uploadedjob')
      .then(response => {
        setList(response.data.body.map(item => ({
          JobID: item.JobID,
          logo: '/images/tlogo.jpg',
          name: `RM${item.allowance} From: ${item.originpostcode},${item.originstate} To: ${item.destpostcode},${item.deststate} ` ,
          remark: `Type: ${item.itemtype}`,
          
        })));
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching uploaded job data:', error));
  }, []);

  const handleItemClick = (item) => {
    navigate(`/shipper/uploadedJobDetail/`);
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

export default UploadedJobDetails;
