import React from 'react';
import styles from "./AlertIcons.module.css";

const SuccessIcon = () => {
    return (
        <svg className={styles.self} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_810_22817)">
                <path
                    d="M12 0C5.38293 0 0 5.38293 0 12C0 18.6171 5.38293 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38293 18.6171 0 12 0Z"
                    fill="#00A811"/>
                <path
                    d="M18.0823 9.45703L11.5822 15.9569C11.3872 16.1519 11.1312 16.2501 10.8752 16.2501C10.6193 16.2501 10.3633 16.1519 10.1683 15.9569L6.91833 12.707C6.52722 12.316 6.52722 11.684 6.91833 11.293C7.30927 10.9019 7.94116 10.9019 8.33228 11.293L10.8752 13.836L16.6683 8.04309C17.0593 7.65198 17.6912 7.65198 18.0823 8.04309C18.4732 8.43402 18.4732 9.06592 18.0823 9.45703V9.45703Z"
                    fill="#FAFAFA"/>
            </g>
            <defs>
                <clipPath id="clip0_810_22817">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    );
};

export default SuccessIcon;