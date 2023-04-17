import {
  AntCloudOutlined,
  ArrowLeftOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './layout.module.css';

export default function Layout() {
const navigate = useNavigate();

const [accountName, setAccountName] = useState('');

useEffect(() => {
  if (!window.location.hash || window.location.hash === '#/') {
    navigate('/transporter/profile');
  }

  // retrieve account name from sessionStorage
  const storedAccountName = sessionStorage.getItem('accountName');
  if (storedAccountName) {
    setAccountName(storedAccountName);
  }
  

  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AntCloudOutlined style={{ fontSize: 60, color: '#4444ff' }} />
          <span style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>
            Transporter
          </span>
        </div>
        <Menu
          onClick={(e) => {
            console.log(e);
            navigate(e.key);
          }}
          style={{ width: 256 }}
          defaultSelectedKeys={['/profile']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={[
            {
              key: '/transporter/transProfile',
              icon: <MailOutlined />, 
              label: 'Profile',
            },
            {
              key: '/transporter/availableJob',
              icon: <MailOutlined />,
              label: 'Available Jobs',
            },
            {
              key: '/transporter/onGoingJob',
              icon: <MailOutlined />,
              label: 'Active Jobs',
            },
            {
              key: '/transporter/transPendingJob',
              icon: <MailOutlined />,
              label: 'Pending Job',
            },
            {
              key: '/transporter/transJobHistory',
              icon: <MailOutlined />,
              label: 'Job History',
            },
          ]}
        />

        <div style={{ flex: 1 }}></div>
        <SettingOutlined />
        <div style={{ marginTop: 10, cursor: "pointer"}} onClick={handleLogout}>
          <ArrowLeftOutlined style={{ marginRight: 10 }} />
          Logout
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
        <Avatar shape="square" size="large" icon={<UserOutlined />} />
          <div style={{ marginLeft: 10 }}>
            <div>{accountName}</div>
            <div style={{ color: '#aaa' }}>transporter@gmail.com</div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.outletContent}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );

function handleLogout() {
// clear user session and navigate to login page
sessionStorage.clear();
navigate("/");
}

}