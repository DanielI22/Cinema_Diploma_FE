import { useState } from 'react';
import styles from './Login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PATHS, ROLES } from '../../utils/constants';
import { useAuth } from "../../contexts/authContext";
import Spinner from '../Spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function Login() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const fromPath = location.state?.from || PATHS.HOME;
    const { loginSubmitHandler } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const role = await loginSubmitHandler({ email, password });
        if (role) {
            if (role === ROLES.USER) {
                if (fromPath.pathname === PATHS.LOGOUT) {
                    navigate(PATHS.HOME);
                } else {
                    navigate(fromPath);
                }
            } else if ([ROLES.OPERATOR, ROLES.VALIDATOR, ROLES.PROJECTOR].includes(role)) {
                navigate(PATHS.SELECT_CINEMA);
            } else {
                navigate(PATHS.HOME);
            }
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>{t('login')}</h2>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder={t('email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder={t('password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.loginButton}>{t('login')}</button>
                <div className={styles.extraOptions}>
                    <Link to={PATHS.FORGOT_PASSWORD} className={styles.extraLink}>{t('forgotPassword')}</Link>
                    <Link to={PATHS.RESEND_VERIFICATION} className={styles.extraLink}>{t('resendVerification')}</Link>
                </div>
                <div className={styles.registerPrompt}>
                    {t('noAccount')} <Link to={PATHS.REGISTER} className={styles.registerLink}>{t('register')}</Link>
                </div>
            </form>
        </div>
    );
}
