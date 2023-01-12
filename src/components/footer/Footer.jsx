import React from 'react';
import styles from './Footer.module.css'
import ColoredLogo from "../../assets/icons/coloredLogo/ColoredLogo";
import FaceBook from "../../assets/icons/socialNetworksMiniIcons/FaceBook";
import Telegram from "../../assets/icons/socialNetworksMiniIcons/Telegram";
import YouTube from "../../assets/icons/socialNetworksMiniIcons/YouTube";
import Instagram from "../../assets/icons/socialNetworksMiniIcons/Instagram";
import {Link} from "react-router-dom";

const Footer = () => {

    const handleWindowUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <footer className={`${styles.self} container`}>
            <div className={styles["logo-container"]}>
                <div className={styles.logo}>
                    <ColoredLogo
                        style={{cursor: "pointer"}}
                        onClick={handleWindowUp}
                    />
                    <span>
                        President maktabi testlari
                    </span>
                </div>
                <div className={styles["social-networks"]}>
                    <div>
                        <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                            <Instagram/>
                        </a>
                        <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                            <Telegram/>
                        </a>
                    </div>
                    <div>
                        <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                            <YouTube/>
                        </a>
                        <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                            <FaceBook/>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.links}>
                <h4>Testlar</h4>
                <ul>
                    <li>
                        <Link to="/">
                            Muammoli masalalar
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Saralash testlari
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Tanqidiy fikrlash
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Ingliz tili
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.links}>
                <h4>Kanallarimiz</h4>
                <ul>
                    <li>
                        <Link to="/">
                            Pullik testlar kanali
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Asosiy kanal
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Matematika
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.links}>
                <h4>Jamoamiz</h4>
                <ul>
                    <li>
                        <Link to="/">
                            Biz bilan bog‘lanish
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Biz haqimizda
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;