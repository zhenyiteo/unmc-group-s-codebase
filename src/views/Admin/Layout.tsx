import React, { useEffect, useState } from 'react';
import styles from './layout.module.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, Radio, Space, Avatar } from 'antd';
import {
  MailOutlined,
  AntCloudOutlined,
  SettingOutlined,
  ArrowLeftOutlined,
  UserOutlined
} from '@ant-design/icons';

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#/') {
      navigate('/pendingContract');
    }
  }, []);

  const handleLogout = () => {

    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AntCloudOutlined style={{ fontSize: 60, color: '#4444ff' }} />
          <span style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 10 }}>
            Admin
          </span>
        </div>
        <Menu
          onClick={(e) => {
            console.log(e);
            navigate(e.key);
          }}
          style={{ width: 256 }}
          defaultSelectedKeys={['/pendingContract']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={[
            {
              key: '/admin/pendingContract',
              icon: <MailOutlined />, //can change later lah
              label: 'Pending Contracts ',
            },
            {
              key: '/admin/contractHistory',
              icon: <MailOutlined />,
              label: 'Contract History',
            },
          ]}
        />

        <div style={{ flex: 1 }}></div>
        <SettingOutlined />
        <div style={{ marginTop: 10, cursor:"pointer" }} onClick={handleLogout}>
          <ArrowLeftOutlined style={{ marginRight: 10 }} />
          Logout
        </div>
        <div style={{ display: 'flex', marginTop: 10 }}>
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
          <div style={{ marginLeft: 10 }}>
            <div>Admin</div>
            <div style={{ color: '#aaa' }}>admin@gmail.com</div>
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
