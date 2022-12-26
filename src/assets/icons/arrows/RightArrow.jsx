import React from 'react';
import styles from './Arrows.module.css'

const RightArrow = () => {
    return (
        <svg className={styles.self} viewBox="0 0 33 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.318359 12.1718C25.7612 12.1718 32.1219 12.1718 32.1219 12.1718M32.1219 12.1718C27.3182 12.3347 18.0091 10.3146 19.2017 0.930664M32.1219 12.1718C27.8152 11.5202 19.2017 13.1493 19.2017 24.8792"
                stroke="black" strokeWidth="3"/>
        </svg>

    );
};

export default RightArrow;