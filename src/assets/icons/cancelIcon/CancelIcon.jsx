import React from 'react';
import styles from "./CancelIcon.module.css"

const CancelIcon = ({
                        onClick = () => {
                        }
                    }) => {
    return (
        <svg onClick={onClick} className={styles.self} viewBox="0 0 12 12" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M1.05025 1.05033L10.9497 10.9498M10.9497 1.05033L1.05025 10.9498" stroke="black" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>


    );
};

export default CancelIcon;