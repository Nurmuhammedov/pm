import React from 'react';
import styles from './HomeHeader.module.css'
import Header from "../../../components/header/Header";
import Button from "../../../components/UI/button/Button";
import {Link} from "react-router-dom";

const HomeHeader = ({dropdownOptions, selectOptions}) => {
    return (
        <section className={styles.self}>
            <div className={styles["self-inner"]}>
                <Header
                    dropdownOptions={dropdownOptions}
                    selectOptions={selectOptions}
                />
                <div className="container">
                    <h1>
                        Siz qidirayotgan sifatli testlar<br/><span style={{color: "#FFF61B"}}>shu yerda</span>
                    </h1>
                    <p>
                        Ushbu saytdan prezident maktablariga tayyorgarlik ko‘rish uchun sifatli testlarni sotib
                        olishingiz va foydalanishingiz mumkin
                    </p>
                    <div style={{display: 'flex', gap: ".8rem"}}>
                        <Link to="/register">
                            <Button
                                fontFamily='"SourceSansPro-SemiBold", sans-serif'
                                fontWeight='600'
                                fontSize='1.8rem'
                                lineHeight='2rem'
                                padding="1.5rem 3rem"
                                color='#FFFFFF'
                                backgroundColor="rgba(255, 255, 255, 0.1)"
                            >
                                Ro‘yhatdan o‘tish
                            </Button>
                        </Link>
                        <Button
                            fontFamily='"SourceSansPro-SemiBold", sans-serif'
                            fontWeight='600'
                            fontSize='1.8rem'
                            lineHeight='2rem'
                            padding="1.5rem 3rem"
                            color='#0173FF'
                            backgroundColor="#FFFFFF"
                        >
                            Barcha testlar
                        </Button>
                    </div>
                </div>
            </div>
        </section>);
};

export default HomeHeader;