import React from 'react';
import styles from './Arrows.module.css'

const LeftArrow = () => {
    return (
        <svg className={styles.self} viewBox="0 0 33 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M32.6816 12.1718C7.23883 12.1718 0.878122 12.1718 0.878122 12.1718M0.878122 12.1718C5.68178 12.3347 14.9909 10.3146 13.7983 0.930664M0.878122 12.1718C5.18485 11.5202 13.7983 13.1493 13.7983 24.8792"
                stroke="black" strokeWidth="3"/>
        </svg>
    );
};

export default LeftArrow;