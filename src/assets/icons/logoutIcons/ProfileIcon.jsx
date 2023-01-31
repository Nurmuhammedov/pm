import React from 'react';
import styles from "./LogoutIocns.module.css"

const ProfileIcon = () => {
    return (
        <svg className={styles.self} viewBox="0 0 18 19"
             fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.364 12.136C14.3837 11.1558 13.217 10.4301 11.9439 9.99085C13.3074 9.05179 14.2031 7.4802 14.2031 5.70312C14.2031 2.83413 11.869 0.5 9 0.5C6.131 0.5 3.79688 2.83413 3.79688 5.70312C3.79688 7.4802 4.69262 9.05179 6.05609 9.99085C4.78308 10.4301 3.61631 11.1558 2.63605 12.136C0.936176 13.8359 0 16.096 0 18.5H1.40625C1.40625 14.3128 4.81279 10.9062 9 10.9062C13.1872 10.9062 16.5938 14.3128 16.5938 18.5H18C18 16.096 17.0638 13.8359 15.364 12.136ZM9 9.5C6.90641 9.5 5.20312 7.79675 5.20312 5.70312C5.20312 3.6095 6.90641 1.90625 9 1.90625C11.0936 1.90625 12.7969 3.6095 12.7969 5.70312C12.7969 7.79675 11.0936 9.5 9 9.5Z"
                fill="#1D588B"/>
        </svg>
    );
};

export default ProfileIcon;