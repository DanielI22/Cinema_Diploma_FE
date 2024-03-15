import { useState } from 'react';
import styles from './Login.module.css'; 
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import AuthContext from "../../contexts/authContext"
import { useContext } from 'react';

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        loginSubmitHandler({ email, password })
    };

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