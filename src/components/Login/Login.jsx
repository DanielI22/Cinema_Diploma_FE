import { useState } from 'react';
import styles from './Login.module.css'; 
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useAuth } from "../../contexts/authContext"
import Spinner from '../Spinner/Spinner';

export default function Login() {
    const { loginSubmitHandler } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await loginSubmitHandler({ email, password });
        setIsLoading(false);
    };

    if(isLoading) {
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