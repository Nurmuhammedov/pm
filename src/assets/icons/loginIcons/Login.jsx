import React from 'react';
import styles from "./LoginIcons.module.css"

const Login = () => {
    return (
        <svg className={styles.self} viewBox="0 0 16 16" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_587_7323)">
                <path
                    d="M4 6.66683V5.3335C4 3.12683 4.66667 1.3335 8 1.3335C11.3333 1.3335 12 3.12683 12 5.3335V6.66683M8 12.3335C8.44203 12.3335 8.86595 12.1579 9.17851 11.8453C9.49107 11.5328 9.66667 11.1089 9.66667 10.6668C9.66667 10.2248 9.49107 9.80088 9.17851 9.48832C8.86595 9.17576 8.44203 9.00016 8 9.00016C7.55797 9.00016 7.13405 9.17576 6.82149 9.48832C6.50893 9.80088 6.33333 10.2248 6.33333 10.6668C6.33333 11.1089 6.50893 11.5328 6.82149 11.8453C7.13405 12.1579 7.55797 12.3335 8 12.3335Z"
                    stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M11.334 14.667H4.66732C2.00065 14.667 1.33398 14.0003 1.33398 11.3337V10.0003C1.33398 7.33366 2.00065 6.66699 4.66732 6.66699H11.334C14.0007 6.66699 14.6673 7.33366 14.6673 10.0003V11.3337C14.6673 14.0003 14.0007 14.667 11.334 14.667Z"
                    stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_587_7323">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    );
};

export default Login;