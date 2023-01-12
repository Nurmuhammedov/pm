import React from 'react';
import styles from './SocialNetworks.module.css'

const FaceBook = () => {
    return (
        <svg className={styles.self} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M23.3333 15.5V20.3333H27.6667C28 20.3333 28.1667 20.6667 28.1667 21L27.5 24.1667C27.5 24.3333 27.1667 24.5 27 24.5H23.3333V36.6667H18.3333V24.6667H15.5C15.1667 24.6667 15 24.5 15 24.1667V21C15 20.6667 15.1667 20.5 15.5 20.5H18.3333V15C18.3333 12.1667 20.5 10 23.3333 10H27.8333C28.1667 10 28.3333 10.1667 28.3333 10.5V14.5C28.3333 14.8333 28.1667 15 27.8333 15H23.8333C23.5 15 23.3333 15.1667 23.3333 15.5V15.5Z"
                stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
            <path
                d="M24.9967 36.6683H14.9967C6.66341 36.6683 3.33008 33.335 3.33008 25.0016V15.0016C3.33008 6.66829 6.66341 3.33496 14.9967 3.33496H24.9967C33.3301 3.33496 36.6634 6.66829 36.6634 15.0016V25.0016C36.6634 33.335 33.3301 36.6683 24.9967 36.6683Z"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default FaceBook;