import React from 'react';
import styles from "./LoginIcons.module.css"

const Login = () => {
    return (
        <svg className={styles.self} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.7268 14.6668C13.7268 12.0868 11.1601 10.0002 8.0001 10.0002C4.8401 10.0002 2.27344 12.0868 2.27344 14.6668M8.0001 8.00016C8.88416 8.00016 9.73201 7.64897 10.3571 7.02385C10.9822 6.39873 11.3334 5.55088 11.3334 4.66683C11.3334 3.78277 10.9822 2.93493 10.3571 2.30981C9.73201 1.68469 8.88416 1.3335 8.0001 1.3335C7.11605 1.3335 6.2682 1.68469 5.64308 2.30981C5.01796 2.93493 4.66677 3.78277 4.66677 4.66683C4.66677 5.55088 5.01796 6.39873 5.64308 7.02385C6.2682 7.64897 7.11605 8.00016 8.0001 8.00016V8.00016Z"
                stroke="black" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default Login;