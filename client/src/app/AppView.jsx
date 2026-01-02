import { BrowserRouter as Router } from 'react-router-dom';
// import Routers from '../Routers/Routers';
import AppRoutes from '../Routers/AppRoutes';
import { ToastContainer } from 'react-toastify';

function AppView() {
  return (
    <Router>
      {/* <Routers /> */}
      <ToastContainer />
      <AppRoutes />
      {/* <div>hello</div> */}
    </Router>
  );
}

export default AppView;
