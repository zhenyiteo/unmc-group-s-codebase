import { HashRouter as Router, useRoutes } from 'react-router-dom';
import Layout from './views/Shipper/Layout';
import LayoutTransporter from './views/Transporter/Layout';

//shipper
import Profile from './views/Shipper/Profile';
import PostJob from './views/Shipper/PostJob';
import UploadedJob from './views/Shipper/UploadedJob';
import UploadedJobDetail from './views/Shipper/UploadedJob/Detail';
// import ActiveJob from './views/Shipper/ActiveJob';

//transporter
//import Profile from './views/Transporter/Profile';
import AvailableJob from './views/Transporter/AvailableJob';
import AvailableJobDetail from './views/Transporter/AvailableJob/Detail';
import SmartContract from './views/Transporter/AvailableJob/SmartContract';
import AppliedJob from './views/Transporter/AppliedJob';
import AppliedJobDetail from './views/Transporter/AppliedJob/Detail';

//in common
import PendingJob from './views/Transporter/PendingJob';
//import PendingJobDetail from './views/Transporter/PendingJob/Detail';
import JobHistory from './views/Shipper/JobHistory';

const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      children: [
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
              element: <Profile></Profile>,
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
              element: <Profile></Profile>,
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
              path: 'profile4',
              element: <Profile></Profile>,
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