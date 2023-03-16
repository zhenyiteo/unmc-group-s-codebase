import { HashRouter as Router, useRoutes } from 'react-router-dom';
import Layout from './views/Shipper/Layout';
import LayoutTransporter from './views/Transporter/Layout';

//shipper
import Profile from './views/Shipper/Profile';
import PostJob from './views/Shipper/PostJob';
import UploadedJob from './views/Shipper/UploadedJob';
// import ActiveJob from './views/Shipper/ActiveJob';

//transporter
//import Profile from './views/Transporter/Profile';
import AvailableJob from './views/Transporter/AvailableJob';
import AppliedJob from './views/Transporter/AppliedJob';
import AvailableJobDetail from './views/Transporter/AvailableJob/Detail';

//in common
import PendingJob from './views/Shipper/PendingJob';
// import JobHistory from './views/Shipper/JobHistory';

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
              path: 'pendingJob',
              element: <PendingJob></PendingJob>,
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
              path: 'appliedJob',
              element: <AppliedJob></AppliedJob>,
            },
            {
              path: 'pendingJob',
              element: <PendingJob></PendingJob>,
            },
            {
              path: 'profile4',
              element: <Profile></Profile>,
            },
            {
              path: 'availableJobDetail',
              element: <AvailableJobDetail></AvailableJobDetail>,
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
