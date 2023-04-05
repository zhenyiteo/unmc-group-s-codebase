import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';

export default function SelectCompany() {
  const navigate = useNavigate();

  const handleCompanyClick = (company) => {
    navigate(`/transporter/availableJob`);
  }

  return (
    <div className={styles.container}>
      <h1>Select a Company</h1>
      <ul className={styles.companyList}>
        <li>
          <button onClick={() => handleCompanyClick("company1")}>J&T Express</button>
        </li>
        <li>
          <button onClick={() => handleCompanyClick("company2")}>DHL Express</button>
        </li>
        <li>
          <button onClick={() => handleCompanyClick("company3")}>Ninjavan</button>
        </li>
      </ul>
    </div>
  );
}
