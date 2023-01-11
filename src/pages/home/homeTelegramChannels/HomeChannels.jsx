import React, {useEffect, useState} from 'react';
import styles from './HomeChannels.module.css'

const HomeChannels = () => {
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

    useEffect(() => {
        setData([
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
    }, [])
    return (
        <section className={`${styles.self} container`}>
            <h2>Bizning telegram kanallarimiz</h2>
            <div className={styles["channels-container"]}>
                {
                    data.map((item, index) => {
                        return (
                            <div
                                style={{backgroundColor: data[index].backgroundColor}}
                                className={styles.channel}
                                key={index}
                            >
                                <div style={{color: data[index].color}} className={styles.title}>
                                    Prezident maktabi testlari | Asosiy kanal.
                                </div>
                                <p style={{color: data[index].color}} className={styles.desc}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the.
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