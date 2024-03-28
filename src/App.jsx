import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/authContext';
import Footer from "./components/Footer/Footer";
import AppRoutes from './AppRoutes';
import './locales/i18n';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <ToastContainer />
        <div className="container min-h-[90vh]">
         <AppRoutes />
        </div>
      </AuthProvider>
      <Footer />
    </Router>
  );
}

export default App
