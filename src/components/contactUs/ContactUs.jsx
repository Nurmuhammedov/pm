import React from 'react';
import homeChannelsStyles from "../../pages/home/homeTelegramChannels/HomeChannels.module.css";
import styles from "./ContactUs.module.css";
import backgroundImage from "../../assets/images/carousel.jpg"

const ContactUs = () => {
    return (
        <section style={{marginBottom: "10rem"}} className={`${homeChannelsStyles.self} container`}>
            <h2 style={{marginBottom: "3rem"}}>Biz bilan bog‘lanish</h2>
            <div
                className={styles.self}
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            >
                <div className={styles.title}>
                    <h3>Savol va takliflaringiz bo‘lsa biz bilan bog‘laning</h3>
                    <span className={styles["social-networks"]}>

                    </span>
                </div>
                <div>
                    <div className={styles["contact-us"]}>
                        <div className={styles["contact-us__title"]}>
                            O‘zimiz aloqaga chiqamiz
                        </div>
                    </div>
                </div>
                <div className={styles.overlay}></div>
            </div>
        </section>
    );
};

export default ContactUs;