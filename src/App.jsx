import Routers from './routers/Routers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="w-screen h-screen bg-primary">
      <Routers />
      <ToastContainer />
    </div>
  );
};

export default App;
