import { HashRouter as Router, useRoutes } from 'react-router-dom';

//layout
import Layout from './views/Shipper/Layout';
import LayoutTransporter from './views/Transporter/Layout';
import LayoutAdmin from './views/Admin/Layout';

//admin
import ContractHistory from './views/Admin/ContractHistory';

//login
import Login from './views/Login';

//shipper
import ShipperProfile from './views/Shipper/ShipperProfile';
import PostJob from './views/Shipper/PostJob';
import UploadedJob from './views/Shipper/UploadedJob';
import UploadedJobDetail from './views/Shipper/UploadedJob/Detail';
// import ActiveJob from './views/Shipper/ActiveJob';

//transporter
import TransProfile from './views/Transporter/TransProfile';
import AvailableJob from './views/Transporter/AvailableJob';
import AvailableJobDetail from './views/Transporter/AvailableJob/Detail';
import SmartContract from './views/Transporter/AvailableJob/SmartContract';
import AppliedJob from './views/Transporter/AppliedJob';
import AppliedJobDetail from './views/Transporter/AppliedJob/Detail';

//in common
import PendingJob from './views/Transporter/PendingJob';
//import PendingJobDetail from './views/Transporter/PendingJob/Detail';
import JobHistory from './views/Transporter/JobHistory';
//import JobHistory from './views/Shipper/JobHistory'; ************CHECK WHY GOT BOTH******************

const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      children: [
        {
          path: 'login',
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
              path: 'profile',
              element: <ShipperProfile></ShipperProfile>,
            },
            {
              path: 'uploadedJob',
              element: <UploadedJob></UploadedJob>,
            },
            {
              path: 'uploadedJobDetail',
              element: <UploadedJobDetail></UploadedJobDetail>,
            },
            {
              path: 'pendingJob',
              element: <PendingJob></PendingJob>,
            },
            {
              path: 'jobHistory',
              element: <JobHistory></JobHistory>,
            },
          ],
        },

        {
          path: 'transporter',
          element: <LayoutTransporter></LayoutTransporter>,
          children: [
            {
              path: 'profile',
              element: <TransProfile></TransProfile>,
            },
            {
              path: 'availableJob',
              element: <AvailableJob></AvailableJob>,
            },
            {
              path: 'availableJobDetail',
              element: <AvailableJobDetail></AvailableJobDetail>,
            },
            {
              path: 'smartContract',
              element: <SmartContract></SmartContract>,
            },
            {
              path: 'appliedJob',
              element: <AppliedJob></AppliedJob>,
            },
            {
              path: 'appliedJobDetail',
              element: <AppliedJobDetail></AppliedJobDetail>,
            },
            {
              path: 'pendingJob',
              element: <PendingJob></PendingJob>,
            },
            // {
            //   path: 'pendingJobDetail',
            //   element: <PendingJobDetail></PendingJobDetail>,
            // },
            {
              path: 'jobHistory',
              element: <JobHistory></JobHistory>,
            },
          ],
        },

        {
          path: 'admin',
          element: <LayoutAdmin></LayoutAdmin>,
          children: [
            {
              path: 'p1',
              element: <ContractHistory></ContractHistory>,
            },
            {
              path: 'profile',
              element: <ContractHistory></ContractHistory>,
              //  **************** CHECK what is profile 4****************************
              // path: 'profile4',
              // element: <Profile></Profile>,
            },
          ],
        },

        // {
        //   path: 'uploadedJob',
        //   element: <UploadedJob></UploadedJob>,
        // },
        // {
        //   path: 'activeJob',
        //   element: <ActiveJob></ActiveJob>,
        // },
        // {
        //   path: 'pendingJob',
        //   element: <PendingJob></PendingJob>,
        // },
        // {
        //   path: 'profile4',
        //   element: <JobHistory></JobHistory>,
        // },
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
