import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';
import { PATHS } from '../../utils/constants';
import AuthContext from "../../contexts/authContext"

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { registerSubmitHandler } = useContext(AuthContext);

    const handleSubmit = (e) => {

        e.preventDefault();
        if (password.length < 3) {
            setError("Password must be at least 3 characters long.")
            return;
        }

        if (confirmPassword !== password) {
            setError('Passwords do not match!');
            return
        }
        
        setError('');
        registerSubmitHandler({ username, email, password })
    };

    return (
        <div className={styles.registerContainer}>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <h2>Register</h2>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <button type="submit" className={styles.registerButton}>Register</button>
                <div className={styles.loginPrompt}>
                    Already have an account? <Link to={PATHS.LOGIN} className={styles.loginLink}>Login</Link>
                </div>
            </form>
        </div>
    );
}