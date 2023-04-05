import React, { useEffect, useState } from 'react';
import styles from './layout.module.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, Radio } from 'antd';
import { MailOutlined, AntCloudOutlined, SettingOutlined,
  ArrowLeftOutlined, } from '@ant-design/icons';

export default function Layout() {
  const navigate = useNavigate();

  //set the account name in sessionStorage
  //sessionStorage.setItem('accountName', 'MICasa');

  const [accountName, setAccountName] = useState('');

  
  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#/') {
      navigate('/shipper/profile');
    }

   
    // retrieve account name from sessionStorage
    const storedAccountName = sessionStorage.getItem('accountName');
    if (storedAccountName) {
      setAccountName(storedAccountName);
    }
  }, []);

  console.log(accountName);

  const handleLogout = () => {
    // clear user session and navigate to login page
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AntCloudOutlined style={{ fontSize: 60, color: '#4444ff' }} />
          <span style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>
            Shipper
          </span>
        </div>
        <Menu
          onClick={(e) => {
            console.log(e);
            navigate(e.key);
          }}
          style={{ width: 256 }}
          defaultSelectedKeys={['/shipper/profile']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={[
            {
              key: '/shipper/shipperProfile',
              icon: <MailOutlined />, //can change later lah
              label: 'Profile',
            },
            {
              key: '/shipper/postJob',
              icon: <MailOutlined />,
              label: 'Post Job',
            },
            {
              key: '/shipper/uploadedJob',
              icon: <MailOutlined />,
              label: 'Uploaded Jobs',
            },
            {
              key: '/shipper/activeJob',
              icon: <MailOutlined />,
              label: 'Active Jobs',
            },
            {
              key: '/shipper/shipperPendingJob',
              icon: <MailOutlined />,
              label: 'Pending Jobs',
            },
            {
              key: '/shipper/shipperJobHistory',
              icon: <MailOutlined />,
              label: 'Job History',
            },
          ]}
        />
        <div style={{ flex: 1 }}></div>
        <SettingOutlined />
        <div style={{ marginTop: 10, cursor: "pointer" }} onClick={handleLogout}>
          <ArrowLeftOutlined style={{ marginRight: 10 }} />
          Logout
        </div>

        <div style={{ display: "flex", marginTop: 10 }}>
          <img
            alt=""
            src="/images/headimg.jpg"
            style={{ width: 40, height: 40 }}
          ></img>
          <div style={{ marginLeft: 10 }}>
            
            <div>{accountName}</div>
            <div style={{ color: '#aaa' }}>shipper@gmail.com</div>
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
}
