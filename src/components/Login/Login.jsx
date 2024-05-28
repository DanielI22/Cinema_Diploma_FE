import { useState } from 'react';
import styles from './Login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PATHS, ROLES } from '../../utils/constants';
import { useAuth } from "../../contexts/authContext"
import Spinner from '../Spinner/Spinner';

export default function Login() {
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
        console.log(role);
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
        setIsLoading(false);
    };

    if (isLoading) {
        return <Spinner />
    }
    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.loginButton}>Log In</button>
                <div className={styles.registerPrompt}>
                    Don&apos;t have an account? <Link to={PATHS.REGISTER} className={styles.registerLink}>Register</Link>
                </div>
            </form>
        </div>
    );
}