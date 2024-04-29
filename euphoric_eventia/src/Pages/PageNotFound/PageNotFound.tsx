import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from 'react-i18next';


const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const {t}=useTranslation()

    const goHome = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.errorText}>{t("404 Error")}</h1>
            <p style={styles.message}>{t("Oops! The page you're looking for doesn't exist.")}</p>
            <button style={styles.button} onClick={goHome}>{t("Go Home")}</button>
        </div>
    );
};

// You can replace these styles with your own
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center' as 'center',
    },
    errorText: {
        fontSize: '48px',
        color: '#333',
    },
    message: {
        fontSize: '24px',
        color: '#666',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '18px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default NotFoundPage;
