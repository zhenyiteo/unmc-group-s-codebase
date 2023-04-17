import { HashRouter as Router, useRoutes } from 'react-router-dom';

//layout
import Layout from './views/Shipper/Layout';
import LayoutTransporter from './views/Transporter/Layout';
import LayoutAdmin from './views/Admin/Layout';

//admin
import ApprovedContract from './views/Admin/ApprovedContract';
import DeclinedContract from './views/Admin/DeclinedContract';
import ContractHistory from './views/Admin/ContractHistory';
import PendingContract from './views/Admin/PendingContract';
import PendingContractDetail from './views/Admin/PendingContract/Detail';

//login
import Login from './views/Login';
import SelectCompanyTransporter from './views/SelectCompanyTransporter';
import SelectCompanyShipper from './views/SelectCompanyShipper';

//shipper
import ShipperProfile from './views/Shipper/ShipperProfile';
import PostJob from './views/Shipper/PostJob';
import UploadedJob from './views/Shipper/UploadedJob';
import ShipperSmartContract from './views/Shipper/UploadedJob/ShipperSmartContract';
import UploadedJobDetail from './views/Shipper/UploadedJob/Detail';
import ActiveJob from './views/Shipper/ActiveJob';
import ActiveJobDetail from './views/Shipper/ActiveJob/Detail';
import ShipperPendingJob from './views/Shipper/ShipperPendingJob';
import ShipperWaitAdmin from './views/Shipper/ShipperWaitAdmin';
import ShipperJobHistory from './views/Shipper/ShipperJobHistory';
import ShipperJobHistoryDetail from './views/Shipper/ShipperJobHistory/Detail';
import ShipperContractHistory from './views/Shipper/ShipperContractHistory';

//transporter
import TransProfile from './views/Transporter/TransProfile';
import AvailableJob from './views/Transporter/AvailableJob';
import WaitAdminConfirm from './views/Transporter/WaitAdminConfirm';
import WaitShipperConfirm from './views/Transporter/WaitShipperConfirm';
import AvailableJobDetail from './views/Transporter/AvailableJob/Detail';
import TransContract from './views/Transporter/AvailableJob/TransContract';
import TransContractHistory from './views/Transporter/TransContractHistory';
import OnGoingJob from './views/Transporter/OnGoingJob';
import OnGoingJobDetail from './views/Transporter/OnGoingJob/Detail';
import TransPendingJob from './views/Transporter/TransPendingJob';
import TransJobHistory from './views/Transporter/TransJobHistory';
import TransJobHistoryDetail from './views/Transporter/TransJobHistory/Detail';
import TransPenalty from './views/Transporter/Penalty';



const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      children: [
        {
          path: '/', 
          element: <Login></Login>,
        },
        {
          path: 'shipper',
          element: <Layout></Layout>,
          children: [
            {
              path: 'postJob',
              element: <PostJob></PostJob>,
            },
            {
              path: 'shipperProfile',
              element: <ShipperProfile></ShipperProfile>,
            },
            {
              path: 'uploadedJob',
              element: <UploadedJob></UploadedJob>,
            },
            {
              path: 'shipperContract',
              element: <ShipperSmartContract></ShipperSmartContract>,
            },
            {
              path: 'uploadedJobDetail',
              element: <UploadedJobDetail></UploadedJobDetail>,
            },
            {
              path: 'activeJob',
              element: <ActiveJob></ActiveJob>,
            },
            {
              path: 'activeJobDetail',
              element: <ActiveJobDetail></ActiveJobDetail>,
            },
            {
              path: 'shipperPendingJob',
              element: <ShipperPendingJob></ShipperPendingJob>,
            },
            {
              path: 'shipperWaitAdmin',
              element: <ShipperWaitAdmin></ShipperWaitAdmin>,
            },
            {
              path: 'shipperJobHistory',
              element: <ShipperJobHistory></ShipperJobHistory>,
            },
            {
              path: 'shipperJobHistoryDetail',
              element: <ShipperJobHistoryDetail></ShipperJobHistoryDetail>,
            },
            {
              path: 'shipperContractHistory',
              element: <ShipperContractHistory></ShipperContractHistory>
            }
          ],
        },

        {
        path:'selectCompanyTransporter',
        element: <SelectCompanyTransporter></SelectCompanyTransporter>,
        children:[],
        },

        {
          path:'selectCompanyShipper',
          element: <SelectCompanyShipper></SelectCompanyShipper>,
          children:[],
          },

        {
          path: 'transporter/penalty',
          element: <TransPenalty></TransPenalty>,
          children:[],
      
        },

        {
          path: 'transporter',
          element: <LayoutTransporter></LayoutTransporter>,
          children: [
            
            {
              path: 'transProfile',
              element: <TransProfile></TransProfile>,
            },
            {
              path: 'availableJob',
              element: <AvailableJob></AvailableJob>,
            },
            {
              path: 'waitAdminConfirm',
              element: <WaitAdminConfirm></WaitAdminConfirm>,
            },
            {
              path: 'waitShipperConfirm',
              element: <WaitShipperConfirm></WaitShipperConfirm>,
            },
            {
              path: 'availableJobDetail',
              element: <AvailableJobDetail></AvailableJobDetail>,
            },
            {
              path: 'transContract',
              element: <TransContract></TransContract>,
            },
            {
              path: 'transContractHistory',
              element: <TransContractHistory></TransContractHistory>,
            },
            {
              path: 'onGoingJob',
              element: <OnGoingJob></OnGoingJob>,
            },
            {
              path: 'onGoingJobDetail',
              element: <OnGoingJobDetail></OnGoingJobDetail>,
            },
            {
              path: 'transPendingJob',
              element: <TransPendingJob></TransPendingJob>,
            },
            {
              path: 'transJobHistory',
              element: <TransJobHistory></TransJobHistory>,
            },

            {
              path: 'transJobHistoryDetail',
              element: <TransJobHistoryDetail></TransJobHistoryDetail>,
            },
          ],
        },

        {
          path: 'admin',
          element: <LayoutAdmin></LayoutAdmin>,
          children: [
            {
              path: 'approvedContract',
              element: <ApprovedContract></ApprovedContract>,
            },
            {
              path: 'declinedContract',
              element: <DeclinedContract></DeclinedContract>,
            },
            {
              path: 'pendingContract',
              element: <PendingContract></PendingContract>,
            },
            {
              path: 'pendingContractDetail',
              element: <PendingContractDetail></PendingContractDetail>,
            },
            {
              path: 'contractHistory',
              element: <ContractHistory></ContractHistory>,
            },
          ],
        },
      ],
    },
  ]);

  return routes;
};

function App() {
  return (
    <Router>
      <GetRoutes />
    </Router>
  );
}

export default App;
