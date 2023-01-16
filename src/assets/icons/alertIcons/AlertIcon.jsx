import React from 'react';
import styles from "./AlertIcons.module.css"

const AlertIcon = () => {
    return (
        <svg className={styles.self} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_808_23089)">
                <path
                    d="M12 0C5.38293 0 0 5.38293 0 12C0 18.6171 5.38293 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38293 18.6171 0 12 0Z"
                    fill="#E1842E"/>
                <path
                    d="M11.9986 15.0012C11.2094 15.0012 10.5674 15.6573 10.5674 16.4637C10.6393 18.4013 13.3581 18.4007 13.4298 16.4637C13.4298 15.6573 12.7877 15.0012 11.9986 15.0012V15.0012Z"
                    fill="#FAFAFA"/>
                <path
                    d="M13.4297 6.75868C12.7195 5.8584 11.2793 5.85796 10.5688 6.75873C10.213 7.19156 10.0637 7.75902 10.159 8.31561C10.4434 9.97586 10.8447 12.3191 11.0248 13.3715C11.2266 14.4792 12.772 14.4788 12.9736 13.3715L13.8395 8.31561C13.9349 7.75904 13.7855 7.19156 13.4297 6.75868V6.75868Z"
                    fill="#FAFAFA"/>
            </g>
            <defs>
                <clipPath id="clip0_808_23089">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
};

export default AlertIcon;