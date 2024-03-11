import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/authContext';
import Footer from "./components/Footer/Footer";
import AppRoutes from './AppRoutes';
import './locales/i18n';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <AppRoutes />
      </AuthProvider>
      <Footer />
    </Router>
  );
}

export default App
