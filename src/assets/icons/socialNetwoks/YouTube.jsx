import React from 'react';
import styles from './SocialNetworks.module.css'

const YouTube = () => {
    return (
        <svg className={styles.self} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M28.3301 33.3317H11.6634C6.66341 33.3317 3.33008 29.9984 3.33008 24.9984V14.9984C3.33008 9.99837 6.66341 6.66504 11.6634 6.66504H28.3301C33.3301 6.66504 36.6634 9.99837 36.6634 14.9984V24.9984C36.6634 29.9984 33.3301 33.3317 28.3301 33.3317Z"
                stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M19 15.8335L23.1667 18.3335C24.6667 19.3335 24.6667 20.8335 23.1667 21.8335L19 24.3335C17.3333 25.3335 16 24.5002 16 22.6668V17.6668C16 15.5002 17.3333 14.8335 19 15.8335Z"
                stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
};

export default YouTube;