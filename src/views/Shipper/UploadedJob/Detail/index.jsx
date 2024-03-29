import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { SolutionOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import Spin from 'antd/es/spin';
import 'antd/es/spin/style/css';

async function cancelJob(JobID) {
  try {
    const response = await axios.put(
      `https://30y3p7rcp5.execute-api.us-east-1.amazonaws.com/hey/hey?jobid=${JobID}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function UploadedJobDetails() {
  const navigate = useNavigate();
  const { JobID } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [uploadedJobDetails, setUploadedJobDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("searching for job id " + searchParams.get("JobID"));
  useEffect(() => {
    axios
    .get(` https://30y3p7rcp5.execute-api.us-east-1.amazonaws.com/hey/hey?jobid=` +searchParams.get("JobID"))
      .then((response) => {
        setUploadedJobDetails(response.data.body);
        setIsLoading(false);
         
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

const [isModalVisible, setIsModalVisible] = useState(false); //for prompt window function for concel job 

const handleCancelJob = () => { //for prompt window function for concel job 
  setIsModalVisible(true);
}

const handleOk = () => {
  setIsModalVisible(false);
  cancelJob(searchParams.get("JobID"))
    .then(() => {
      message.success('Job cancelled successfully');
      navigate("/shipper/uploadedJob");
    })
    .catch((error) => {
      console.error(error);
      message.error('Failed to cancel job');
    });
};

const handleCancel = () => { //for prompt window function for concel job 
  setIsModalVisible(false);
}

if (isLoading){
  return (<>
  <div className={styles.home} >
    <div style={{minHeight:"90vh", display: "flex", alignItems: "center", justifyContent: "center", top:"50%", marginBottom: 30 }}>
      <Spin tip="Loading..." size="large"/>
    </div>
  </div>
  </>)
}


  return (
    <>
      {uploadedJobDetails.map((item) => (
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
                  backgroundColor: '#4abc3a',
                  color: '#fff',
                  height: 50,
                  width: 200,
                  marginTop: 20,
                  borderRadius: 5,
                }}
                onClick={() => {
                  navigate("/shipper/uploadedJob");
                }}
                >
                Return to Uploaded Job
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
            <div style={{ flex: 1 }}>
            <Button
              style={{
                backgroundColor: 'red',
                color: '#fff',
                height: 50,
                width: 200,
                marginTop: 20,
                borderRadius: 5,
              }}
              onClick={handleCancelJob}
            >
          Cancel Job
        </Button>
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


        <Modal
          title="Cancel Job"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to cancel the job?</p>
          
        </Modal>
            </div>
          </div>
        </div>

      ))}
    </>
  );

              }

export default UploadedJobDetails;
