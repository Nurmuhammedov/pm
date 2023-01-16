import React from 'react';
import styles from "./TestDurationIcon.module.css"

const TestDurationIcon = () => {
    return (
        <svg className={styles.self} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_498_2165)">
                <path d="M11 6C11 8.76 8.76 11 6 11C3.24 11 1 8.76 1 6C1 3.24 3.24 1 6 1C8.76 1 11 3.24 11 6Z"
                      stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.85543 7.58988L6.30543 6.66488C6.03543 6.50488 5.81543 6.11988 5.81543 5.80488V3.75488"
                      stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_498_2165">
                    <rect width="12" height="12" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    );
};

export default TestDurationIcon;