import React from "react";
import styles from "./Account.module.css";

const Account = ({stroke = "#263751"}) => {
    return (
        <svg
            className={styles.self}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.1585 18.3332C17.1585 15.1082 13.9501 12.4998 10.0001 12.4998C6.05013 12.4998 2.8418 15.1082 2.8418 18.3332M10.0001 9.99984C11.1052 9.99984 12.165 9.56085 12.9464 8.77945C13.7278 7.99805 14.1668 6.93824 14.1668 5.83317C14.1668 4.7281 13.7278 3.66829 12.9464 2.88689C12.165 2.10549 11.1052 1.6665 10.0001 1.6665C8.89506 1.6665 7.83525 2.10549 7.05385 2.88689C6.27245 3.66829 5.83346 4.7281 5.83346 5.83317C5.83346 6.93824 6.27245 7.99805 7.05385 8.77945C7.83525 9.56085 8.89506 9.99984 10.0001 9.99984V9.99984Z"
                stroke={stroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default Account;
