import Routers from './routers/Routers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="w-full min-h-screen bg-primary overflow-hidden">
      <Routers />
      <ToastContainer />
    </div>
  );
};

export default App;
