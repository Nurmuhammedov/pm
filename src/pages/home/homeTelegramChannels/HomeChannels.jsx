import React, {useState} from 'react';
import styles from './HomeChannels.module.css'

const HomeChannels = ({channels}) => {
    const [data, setData] = useState([
        {
            backgroundColor: "#989CFF",
            color: "#2B1755",
        },
        {
            backgroundColor: "#DCD3E8",
            color: "#644D83",
        },
        {
            backgroundColor: "#6ECCAF",
            color: "#233F37",
        },
        {
            backgroundColor: "#644D83",
            color: "#3C255B",
        }
    ])

    return (
        <section className={`${styles.self} container`}>
            <h2>Bizning telegram kanallarimiz</h2>
            <div className={styles["channels-container"]}>
                {
                    channels.map((item, index) => {
                        return (
                            <div
                                style={{backgroundColor: data[index].backgroundColor}}
                                className={styles.channel}
                                key={item.id}
                            >
                                <div style={{color: data[index].color}} className={styles.title}>
                                    {item.title}
                                </div>
                                <p style={{color: data[index].color}} className={styles.desc}>
                                    {item.short_description}
                                </p>
                                <button id="nextButtonRef" className={styles.btn}>
                                    <div className={styles["wrapper-right"]}>
                                        <div className={styles["wrapper-inner"]}>
                                            <div data-color={data[index].color}
                                                 className={styles["btn-label"]}>Batafsil
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default HomeChannels;