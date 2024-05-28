import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/authContext';
import Footer from "./components/Footer/Footer";
import AppRoutes from './AppRoutes';
import './locales/i18n';
import Header from './components/Header/Header';
import { CinemaProvider } from './contexts/cinemaContext';
import EventListener from './components/AuthGuards/EventListener';

function App() {
  return (
    <Router>
      <CinemaProvider>
        <AuthProvider>
          <Header />
          <ToastContainer />
          <EventListener />
          <div className="container min-h-[90vh]">
            <AppRoutes />
          </div>
        </AuthProvider>
      </CinemaProvider>
      <Footer />
    </Router>
  );
}

export default App
