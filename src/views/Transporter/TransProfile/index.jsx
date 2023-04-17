import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

function TransDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [accountName, setAccountName] = useState('');
  const filteredList = list.filter(item=>{
      let isMatched = true;
      if(item.TransID != accountName){
        isMatched = false;
      }
      return isMatched;
});
  const total = filteredList.length;
  const totalCompleted = filteredList.filter(item=>{
    let isMatched = true;
      if(item.JobStatus != "Completed"){
        isMatched = false;
      }
      return isMatched;
  }).length;

  const totalPendingShipper = filteredList.filter(item=>{
    let isMatched = true;
      if(item.JobStatus != "Waiting For Shipper To Confirm"){
        isMatched = false;
      }
      return isMatched;
  }).length;
  const totalPendingAdmin = filteredList.filter(item=>{
    let isMatched = true;
      if(item.JobStatus != "Pending Admin Approval"){
        isMatched = false;
      }
      return isMatched;
  }).length;
  const totalActive = filteredList.filter(item=>{
    let isMatched = true;
      if(item.JobStatus != "Active"){
        isMatched = false;
      }
      return isMatched;
  }).length;
  const totalDelivered = filteredList.filter(item=>{
    let isMatched = true;
      if(item.JobStatus != "Delivered"){
        isMatched = false;
      }
      return isMatched;
  }).length;
  const totalCancelled = filteredList.filter(item=>{
    let isMatched = true;
      if(item.JobStatus != "Cancelled"){
        isMatched = false;
      }
      return isMatched;
  }).length;



  useEffect(() => {
    axios.get('https://cs6cmxy7k7.execute-api.us-east-1.amazonaws.com/prod/prod')
      .then(response => {
        setList(response.data.body.map(item => ({
          JobID: item.JobID,
          logo: '/images/tlogo.jpg',
          name: `RM${item.allowance} From: ${item.originpostcode},${item.originstate} To: ${item.destpostcode},${item.deststate}` ,
          itemtype: item.itemtype, 
          JobStatus: item.JobStatus,
          ShipperID: item.ShipperID,
          TransID: item.transID,
          shipmentWeight: item.shipmentweight + 'kg',
          allowance: 'RM' + item.allowance,
          penalty: 'RM' + item.penalty,
          shipmentMethod: item.shipmentmethod,
          transPenalty: item.transPenalty,

        })));
        setIsLoading(false);
        console.log(filteredList);

      })
      .catch(error => console.error('Error fetching pending job data:', error));

      const storedAccountName = sessionStorage.getItem('accountName');
      if (storedAccountName) {
        setAccountName(storedAccountName);
        console.log(accountName);
      }
  }, []);

  if (isLoading){
    return (<>
    <div className={styles.home} >
      <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%", marginBottom: 30 }}>
        <Spin tip="Loading..." size="large"/>
      </div>
    </div>
    </>)
  }

  return (<>
    <div style={{ margin: '2rem auto', maxWidth: 800 }} > 
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }} >
        Transporter Profile
      </h1>
      <h2>Total Jobs: {total}</h2>

      <h2>Total Jobs Pending Shipper Approval: {totalPendingShipper}</h2>
      <h2>Total Jobs Pending Admin Approval: {totalPendingAdmin}</h2>
      <h2>Total Active Jobs: {totalActive}</h2>
      <h2>Total Delivered Jobs: {totalDelivered}</h2>
      <h2>Total Completed Jobs: {totalCompleted}</h2>
      <h2>Total Cancelled Jobs: {totalCancelled}</h2>

    </div>
    </>
  );
}

export default TransDetails;
