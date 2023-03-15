import React, { useEffect, useState } from 'react';
import styles from './layout.module.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, Radio } from 'antd';
import { MailOutlined, AntCloudOutlined } from '@ant-design/icons';

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#/') {
      navigate('/shipper/profile');
    }
  }, []);

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
              key: '/shipper/profile',
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
              key: '/shipper/pendingJob',
              icon: <MailOutlined />,
              label: 'Pending Jobs',
            },
            {
              key: '/shipper/jobHistory',
              icon: <MailOutlined />,
              label: 'Job History',
            },
          ]}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.outletContent}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
