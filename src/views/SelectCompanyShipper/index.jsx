import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

export default function SelectCompany() {
  const navigate = useNavigate();

  const handleCompanyClick = (company) => {
    sessionStorage.setItem('accountName', company);
    navigate(`/shipper/postJob`);
  }

  return (
    <div className={styles.container}>
      <h1>Select a Company</h1>
      <ul className={styles.companyList}>
        <li>
          <button onClick={() => handleCompanyClick("Spa Paragon")}>Spa Paragon</button>
        </li>
        <li>
          <button onClick={() => handleCompanyClick("Cloudmore")}>Cloudmore</button>
        </li>
        <li>
          <button onClick={() => handleCompanyClick("Quanterra")}>Quanterra</button>
        </li>
      </ul>
    </div>
  );
}

