import { Button } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 150,
        alignItems: 'center',
      }}
    >
      <div style={{ marginRight: 70 }}>
        <span style={{ fontSize: 30, fontWeight: "bold", marginBottom: 50, marginLeft: 120 }}>Select Account Type</span>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
          <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
            navigate("/selectCompanyShipper");
          }}>Shipper</Button>
          <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
            navigate("/selectCompanyTransporter");
          }}>Transporter</Button>
          <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
            navigate("/admin/pendingContract");
          }}>Admin</Button>
        </div>
      </div>
    </div>
  );
}