//import { Button, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import { Button, message, Icon } from 'antd';
import React, { useEffect, useState } from 'react';
//import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.css';
import axios from "axios";
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';
import { SolutionOutlined } from '@ant-design/icons';


function AvailableJobDetails() {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [timerVisible, setTimerVisible] = useState(false);
  const [timer, setTimer] = useState(3);
  const navigate = useNavigate();
  const { JobID } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [availableJobDetails, setAvailableJobDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("searching for job id " + searchParams.get("JobID"));
  useEffect(() => {
    axios
      .get(`https://luncgccwm9.execute-api.us-east-1.amazonaws.com/v2/prod?jobid=` +searchParams.get("JobID"))
      .then((response) => {
        setAvailableJobDetails(response.data.body);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onFinish = async (values) => {
    message.info('Successfully Saved!');
  };

  const onFinishFailed = () => {};

  if (isLoading){
    return (<>
    <div className={styles.home} >
      <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%", marginBottom: 30 }}>
        <Spin tip="Loading..." size="large"/>
      </div>
    </div>
    </>)
  }


  

  const handleAcceptJob = (jobId) => {
    setButtonVisible(false);
    setTimerVisible(true);

    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(countdown);
      setTimerVisible(false);
      message.success("Great! You got this order!");
      message.success("Redirecting you to Smart Contract Page");
      navigate('/transporter/transContract?JobID=' + jobId);
    }, 3000);
  };
//   {buttonVisible && (
//     <Button
//       style={{
//         backgroundColor: '#4abc3a',
//         color: '#fff',
//         height: 50,
//         width: 200,
//         marginTop: 20,
//         borderRadius: 5,
//       }}
//       onClick={() => handleAcceptJob(item.JobID)}
//     >
//       Accept job
//     </Button>
//   )}
//   {timerVisible && (
//     <div
    
//       style={{
//         backgroundColor: '#ccc',
//         color: '#000',
//         height: 50,
//         width: 200,
//         marginTop: 20,
//         borderRadius: 5,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       Matching {timer}...
//     </div>
// )}
  // return (
  //   <>
  //     {availableJobDetails.map((item) => (
  //       <div className={styles.home}>
  //         <div
  //           style={{
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: 'space-between',
  //           }}
  //         >
  //           <h1>From {item.originstate} To {item.deststate}</h1>
  //           <div style={{ fontSize: 20 }}>Shipment Duration:{item.shipmentduration}hours </div>
  //         </div>
  //         <div style={{ display: 'flex' }}>
  //           <div>
  //             <img
  //               src={'/images/ship.jpg'}
  //               alt=""
  //               style={{ width: 150, height: 150 }}
  //             ></img>
  //             <div className={styles.label}>Job ID</div>
  //             <div className={styles.value}>{item.JobID}</div>
              
  
              
  
  //             <div style={{ fontSize: 20, marginTop: 30 }}>Shipment</div>
  //             <div style={{ fontSize: 20 }}>Allowance: RM{item.allowance}</div>

  //           </div>
  
  //           <div style={{ flex: 1, paddingLeft: 30 }}>
  //             <div className={styles.label}>Remarks</div>
  //             <div className={styles.value}>
  //             {item.remarks}
  //             </div>
  
  //             <div style={{ display: 'flex', alignItems: 'center' }}>
  //             <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Origin State</div>
  //             <div className={styles.value}>{item.originstate}</div>
  //           </div>

  //              <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Shipment Penalty</div>
  //             <div className={styles.value}>RM{item.penalty}</div>
  //           </div>
  //         </div>

  //         <div style={{ display: 'flex', alignItems: 'center' }}>
  //           <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Origin Address</div>
  //             <div className={styles.value}>{item.originaddress}</div>
  //           </div>
  //           <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Item Type</div>
  //             <div className={styles.value}>{item.itemtype}</div>
  //           </div>
  //         </div>

  //         <div style={{ display: 'flex', alignItems: 'center' }}>
  //           <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Destination State</div>
  //             <div className={styles.value}>{item.deststate}</div>
  //           </div>
  //           <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Shipping Method</div>
  //             <div className={styles.value}>{item.shipmentmethod}</div>
  //           </div>
  //         </div>

  //         <div style={{ display: 'flex', alignItems: 'center' }}>
  //           <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Destination Address</div>
  //             <div className={styles.value}>{item.destaddress}</div>
  //           </div>
  //           <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Shipment Weight</div>
  //             <div className={styles.value}>{item.shipmentweight}kg</div>
  //           </div>
  //         </div>

  //         <div style={{ display: 'flex', alignItems: 'center' }}>
  //           <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Destinatian Postcode</div>
  //             <div className={styles.value}>{item.destpostcode}</div>
  //           </div>
  //           <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Shipment Dimensions Length*Width*Height</div>
  //             <div className={styles.value}>{item.itemlength}M*{item.itemwidth}M*{item.itemheight}M</div>
  //           </div>
  //         </div>
          

  //         <div style={{ display: 'flex', alignItems: 'center' }}>
  //           <div style={{ flex: 1 }}>
  //             <div className={styles.label}>Receiver Name and Contact</div>
  //             <div className={styles.value}>{item.recipientname} {item.recipientcontact}</div>
  //           </div>
            
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </>
  // );
  return (
    <>
      {availableJobDetails.map((item) => (
        <div className={styles.home}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1>Job ID: {item.JobID}</h1>
            <h1>From {item.originstate} To {item.deststate}</h1>
            <h1>Shipment Duration: {item.shipmentduration} hours </h1>
          </div>
          
          <div style={{ display: 'flex' }}>

  
            <div style={{ flex: 1, paddingTop: 30, paddingLeft: 30 }}>


              <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex:1}}><SolutionOutlined style={{fontSize: "150px",}}/></div>
              <div style={{ flex: 1, paddingTop:"60px"}}>
                <div className={styles.label}>Shipment Allowance</div>
                <div className={styles.value}>RM{item.allowance}</div>
              </div>
              <div style={{ flex: 1, paddingTop:"60px" }}>
                <div className={styles.label}>Shipment Penalty</div>
                <div className={styles.value}>RM{item.penalty}</div>
              </div>


            </div>


          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style = {{flex:1}}>

        <div style={{flex:1}}>
                <Button
                style={{
                  backgroundColor: '#3944bc',
                  color: '#fff',
                  height: 50,
                  width: 200,
                  marginTop: 20,
                  borderRadius: 5,
                }}
                onClick={() => {
                  navigate("/transporter/availableJob");
                }}
                >
                Return to Available Jobs
                </Button>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Dimensions Length*Width*Height</div>
              <div className={styles.value}>{item.itemlength}M*{item.itemwidth}M*{item.itemheight}M</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Item Type</div>
              <div className={styles.value}>{item.itemtype}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <div style={{ flex: 1 }}></div> */}
            <div style={{ flex: 1 }}>
            {buttonVisible && (
    <Button
      style={{
        backgroundColor: '#4abc3a',
        color: '#fff',
        height: 50,
        width: 200,
        marginTop: 20,
        borderRadius: 5,
      }}
      onClick={() => handleAcceptJob(item.JobID)}
    >
      Accept job
    </Button>
  )}
  {timerVisible && (
    <div
    
      style={{
        backgroundColor: '#ccc',
        color: '#000',
        height: 50,
        width: 200,
        marginTop: 20,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Matching {timer}...
    </div>
)}

        </div>
          <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipment Weight</div>
              <div className={styles.value}>{item.shipmentweight}kg</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Shipping Method</div>
              <div className={styles.value}>{item.shipmentmethod}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>

            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destination State</div>
              <div className={styles.value}>{item.deststate}</div>
            </div>

            <div style={{ flex: 1 }}>
              <div className={styles.label}>Origin State</div>
              <div className={styles.value}>{item.originstate}</div>
            </div>
            <div style={{ flex: 1 }}>
                <div className={styles.label}>Receiver Name and Contact</div>
                <div className={styles.value}>{item.recipientname} {item.recipientcontact}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>

            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destination Address</div>
              <div className={styles.value}>{item.destaddress}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Origin Address</div>
              <div className={styles.value}>{item.originaddress}</div>
            </div>
            <div style={{ flex: 1 }}>
                <div className={styles.label}>Remarks</div>
                <div className={styles.value}>{item.remarks}</div>
            </div>
          </div>
          

          <div style={{ display: 'flex', alignItems: 'center' }}>

            <div style={{ flex: 1 }}>
              <div className={styles.label}>Destination Postcode</div>
              <div className={styles.value}>{item.destpostcode}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className={styles.label}>Origin Postcode</div>
              <div className={styles.value}>{item.originpostcode}</div>
            </div>
            <div style={{ flex: 1 }}>

            </div>
            
          </div>


        
            </div>
          </div>
        </div>



      ))}
    </>
  );

              }

export default AvailableJobDetails;
