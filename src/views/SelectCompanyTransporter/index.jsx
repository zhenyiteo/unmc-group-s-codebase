import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

export default function SelectCompany() {
  const navigate = useNavigate();

  const handleCompanyClick = (company) => {
    sessionStorage.setItem('accountName', company);
    navigate(`/transporter/availableJob`);
  }

  return (
    <div className={styles.container}>
      <h1>Select a Company</h1>
      <ul className={styles.companyList}>
        <li>
          <button onClick={() => handleCompanyClick("J&T Express")}>J&T Express</button>
        </li>
        <li>
          <button onClick={() => handleCompanyClick("DHL Express")}>DHL Express</button>
        </li>
        <li>
          <button onClick={() => handleCompanyClick("Ninjavan")}>Ninjavan</button>
        </li>
      </ul>
    </div>
  );
}
