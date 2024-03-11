import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>YourCinema © {new Date().getFullYear()}</p>
        </footer>
    );
}