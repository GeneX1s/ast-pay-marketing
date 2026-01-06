import React, { useState } from 'react';
import styles from './Auth.module.css';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>AST PAY</h1>
                <p className={styles.subtitle}>Masuk ke Panel Marketing</p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email/Username</label>
                        <input
                            type="text"
                            id="email"
                            className={styles.input}
                            placeholder="Masukan email atau username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">Kata Sandi</label>
                        <input
                            type="password"
                            id="password"
                            className={styles.input}
                            placeholder="Masukan kata sandi"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.row}>
                        <label className={styles.checkboxContainer}>
                            <input type="checkbox" />
                            Ingat saya
                        </label>
                        <a href="#" className={styles.link}>Lupa kata sandi?</a>
                    </div>

                    <button type="submit" className={styles.button}>
                        Masuk
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>ATAU</span>
                </div>

                <button type="button" className={styles.googleButton} onClick={() => onLogin('google', 'auth')}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.52 12.29C23.52 11.43 23.44 10.61 23.3 9.82H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.95 21.1C22.21 19.01 23.52 15.92 23.52 12.29Z" fill="#4285F4" />
                        <path d="M12 24C15.24 24 17.96 22.92 19.95 21.1L16.08 18.1C15 18.82 13.62 19.24 12 19.24C8.87 19.24 6.22 17.13 5.27 14.29L1.29 17.38C3.25 21.28 7.31 24 12 24Z" fill="#34A853" />
                        <path d="M5.27 14.29C5.02 13.56 4.89 12.79 4.89 12C4.89 11.21 5.03 10.44 5.27 9.71L1.29 6.62C0.47 8.24 0 10.06 0 12C0 13.94 0.47 15.76 1.29 17.38L5.27 14.29Z" fill="#FBBC05" />
                        <path d="M12 4.76C13.76 4.76 15.34 5.37 16.59 6.55L20.03 3.11C17.96 1.17 15.24 0 12 0C7.31 0 3.25 2.72 1.29 6.62L5.27 9.71C6.22 6.87 8.87 4.76 12 4.76Z" fill="#EA4335" />
                    </svg>
                    Masuk dengan Google
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
