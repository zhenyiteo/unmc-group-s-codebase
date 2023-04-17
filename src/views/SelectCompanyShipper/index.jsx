import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function SelectCompany() {
  const navigate = useNavigate();

  const handleCompanyClick = (company) => {
    sessionStorage.setItem('accountName', company);
  }

  return (
    

    <div style={{ display: "flex", justifyContent: "center", padding: 150, alignItems: "center" }}>

    <div style={{ marginRight: 70 }}>
      <span style={{ fontSize: 30, fontWeight: "bold", marginBottom: 50, marginLeft: 120}}>Select a Company</span>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
        <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
          handleCompanyClick("Spa Paragon");
          navigate("/shipper/postJob");
        }}>Spa Paragon</Button>
        <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
          handleCompanyClick("Cloudmore");
          navigate("/shipper/postJob");
        }}>Cloudmore</Button>
        <Button type='primary' style={{ marginTop: 10, width: 500, height: 43, borderRadius: 10 }} onClick={() => {
          handleCompanyClick("Quanterra");
          navigate("/shipper/postJob");
        }}>Quanterra</Button>
      </div>
      </div>
      </div>

    
  );
}

