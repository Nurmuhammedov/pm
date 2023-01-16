import React from 'react';
import Header from "../../components/header/Header";
import styles from "./Tests.module.css"

const Tests = ({dropdownOptions, selectOptions}) => {
    return (
        <>
            <Header dropdownOptions={dropdownOptions} selectOptions={selectOptions} coloredLogo={true}/>
            <section className={styles.self}>

            </section>
        </>
    );
};

export default Tests;