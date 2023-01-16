import React from 'react';
import styles from "./AlertIcons.module.css";

const ErrorIcon = () => {
    return (
        <svg className={styles.self} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_808_23076)">
                <path d="M12 0C5.38293 0 0 5.38293 0 12C0 18.6171 5.38293 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38293 18.6171 0 12 0Z" fill="#E74C3C"/>
                <path d="M16.2426 16.2426L11.9999 12M11.9999 12L7.75729 7.75736M11.9999 12L16.2426 7.75736M11.9999 12L7.75729 16.2426" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
            <defs>
                <clipPath id="clip0_808_23076">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    );
};

export default ErrorIcon;