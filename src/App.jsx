import { useEffect } from 'react';
import Routers from './routers/Routers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEffect(() => {
    const changeFavicon = () => {
      const link = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = 'https://web-dev.imgix.net/image/vS06HQ1YTsbMKSFTIPl2iogUQP73/L7VkSaYGIxnCnqU8NbCG.png?auto=format';
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
