import { useEffect } from 'react';
import Routers from './routers/Routers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoRentalHousefavi from './Assets/logoRentalHousefavi.png';

const App = () => {
  useEffect(() => {
    const changeFavicon = () => {
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = logoRentalHousefavi;
      }
    };
    changeFavicon();
  }, []);

  return (
    <div className="w-full min-h-screen bg-primary overflow-hidden">
      <Routers />
      <ToastContainer />
    </div>
  );
};

export default App;
