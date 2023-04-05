import React, { useEffect, useState } from 'react';
import styles from './layout.module.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, Radio, Space } from 'antd';
import {
MailOutlined,
AntCloudOutlined,
SettingOutlined,
ArrowLeftOutlined,
} from '@ant-design/icons';

export default function Layout() {
const navigate = useNavigate();

const [accountName, setAccountName] = useState('');

useEffect(() => {
// set the account name in sessionStorage
sessionStorage.setItem('accountName', 'MICasa');
// retrieve account name from sessionStorage
const storedAccountName = sessionStorage.getItem('accountName');
if (storedAccountName) {
  setAccountName(storedAccountName);
}

if (!window.location.hash || window.location.hash === '#/') {
  navigate('/transporter/profile');
}
}, []);

function handleLogout() {
// clear user session and navigate to login page
sessionStorage.clear();
navigate("/");
}

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
key: '/transporter/profile',
icon: <MailOutlined />, //can change later lah
label: 'Profile',
},
{
key: '/transporter/availableJob',
icon: <MailOutlined />,
label: 'Available Jobs',
},
{
key: '/transporter/appliedJob',
icon: <MailOutlined />,
label: 'Applied Jobs',
},
{
key: '/transporter/pendingJob',
icon: <MailOutlined />,
label: 'Pending Job',
},
{
key: '/transporter/jobHistory',
icon: <MailOutlined />,
label: 'Job History',
},
]}
/>

<div style={{ flex: 1 }}></div>
<SettingOutlined />
<div style={{ marginTop: 10 }}>
  <ArrowLeftOutlined style={{ marginRight: 10 }} />
  <span onClick={handleLogout} style={{cursor: "pointer"}}>
    Logout
  </span>
</div>
<div style={{ display: 'flex', marginTop: 10 }}>
  <img
    alt=""
    src="/images/headimg.jpg"
    style={{ width: 40, height: 40 }}
  ></img>
  <div style={{ marginLeft: 10 }}>
    <div>{accountName}</div>
    <div style={{ color: '#aaa' }}>MICasa@gmail.com</div>
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