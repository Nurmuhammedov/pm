import React from 'react';
import {Link} from "react-router-dom";
import Instagram from "../../assets/icons/socialNetworksMiniIcons/Instagram";
import Telegram from "../../assets/icons/socialNetworksMiniIcons/Telegram";
import FaceBook from "../../assets/icons/socialNetworksMiniIcons/FaceBook";
import YouTube from "../../assets/icons/socialNetworksMiniIcons/YouTube";
import ColoredLogo from "../../assets/icons/coloredLogo/ColoredLogo";
import styles from './Footer.module.css'

const Footer = ({data: {tests = [], channels = []}}) => {
    const handleWindowUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    return (
        <section className={`${styles.section} container`}>

            <footer className={styles.self}>
                <div>
                    <div className={styles["logo-container"]}>
                        <div className={styles.logo}>
                            <ColoredLogo
                                style={{cursor: "pointer"}}
                                onClick={handleWindowUp}
                            />
                            <span>
                        Prezident maktabi testlari
                    </span>
                        </div>
                        <div className={styles["social-networks"]}>
                            <div>
                                <a href="https://www.instagram.com/pmtests.uz/" target="_blank"
                                   rel="noreferrer">
                                    <Instagram/>
                                </a>
                                <a href="https://t.me/pmtests/" target="_blank" rel="noreferrer">
                                    <Telegram/>
                                </a>
                            </div>
                            <div>
                                <a href="https://www.youtube.com/@curiosityoquvmarkazi/videos/" target="_blank"
                                   rel="noreferrer">
                                    <YouTube/>
                                </a>
                                <a href="https://www.facebook.com/Prezidentmaktabitestlari/" target="_blank"
                                   rel="noreferrer">
                                    <FaceBook/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.links}>
                        <h4>Testlar</h4>
                        <ul>
                            {
                                tests.map((test, index) => {
                                    if (index !== 0) {
                                        return (
                                            <li key={index}>
                                                <Link to={`/tests/${test.value}`}>
                                                    {test.label}
                                                </Link>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.links}>
                        <h4>Kanallarimiz</h4>
                        <ul>
                            {
                                channels.map((channel, index) => {
                                    if (index !== 0) {
                                        return (
                                            <li key={index}>
                                                <Link to={`/channels/${channel.value}`}>
                                                    {channel.label}
                                                </Link>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles.links}>
                        <h4>Jamoamiz</h4>
                        <ul>
                            <li>
                                <Link to="/about-us">
                                    Biz haqimizda
                                </Link>
                            </li>
                            <li>
                                <Link to="/rating/all">
                                    Reyting
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.copyright}>
                <span>
                     © {new Date().getFullYear()} Prezident maktabi testlari
                </span>
                    <div className={styles.developer}>
                        <a href="https://primeteam.uz/uz" target="_blank" rel="noreferrer">Prime Team</a> tomonidan
                        ishlab
                        chiqarilgan
                    </div>
                </div>
            </footer>
        </section>

    );
};

export default Footer;