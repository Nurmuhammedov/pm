import "react-lazy-load-image-component/src/effects/blur.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper";
import React, {useState} from 'react';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import CardIcon1 from "../../../assets/icons/cardItemsIcons/CardIcon1";
import CardIcon2 from "../../../assets/icons/cardItemsIcons/CardIcon2";
import CardIcon3 from "../../../assets/icons/cardItemsIcons/CardIcon3";
import CounterUp from "../../../components/UI/countUp/CounterUp";
import RightArrow from "../../../assets/icons/arrows/RightArrow";
import LeftArrow from "../../../assets/icons/arrows/LeftArrow";
import styles from './HomeCarousel.module.css';
import "./HomeCarousel.css";

const HomeCarousel = ({schools, usersCount}) => {
    const [swiper, setSwiper] = useState(null);
    const [activeData, setActiveData] = useState(schools[0])
    const [activeDataIndex, setActiveDataIndex] = useState(0)
    const nextSlide = () => {
        if (schools.length > activeDataIndex + 1) {
            setActiveData(schools[activeDataIndex + 1])
            setActiveDataIndex(p => p + 1)
        } else {
            setActiveDataIndex(0)
            setActiveData(schools[0])
        }
    };
    const prevSlide = () => {
        if (activeDataIndex >= 1) {
            setActiveData(schools[activeDataIndex - 1])
            setActiveDataIndex(p => p - 1)
        } else {
            setActiveDataIndex(schools.length - 1)
            setActiveData(schools[schools.length - 1])
        }
    };
    return (
        <section className={`${styles.self} container`}>
            <div className={styles.cards}>
                <div className={styles["card-item"]}>
                    <CardIcon1/>
                    <h2>Bilim-Muvaffaqiyat</h2>
                    <p>Biz bilan prezident maktablarining 7 yillik grantiga (112 000$ lik) ega
                        bo‘ling</p>
                </div>
                <div className={styles["card-item"]}>
                    <CardIcon2/>
                    <h2>Qulay narxlar</h2>
                    <p>Barcha turdagi testlarni bizning tizimda yechib boring</p>
                </div>
                <div className={styles["card-item"]}>
                    <CardIcon3/>
                    <h2>{usersCount} foydalanuvchi</h2>
                    <p>Saytimiz prezident maktablariga tayyorlanayotgan barcha o‘quvchilar uchun mo‘ljallangan</p>
                </div>
            </div>
            <div className={styles.carousel}>
                <div className={styles.header}>
                    <div className={styles.title}>{activeData.title}</div>
                    <div className={styles.buttons}>
                        <button onClick={prevSlide} className={styles.btn}>
                            <div className={styles["wrapper-left"]}>
                                <div className={styles["wrapper-inner"]}>
                                    <LeftArrow/>
                                </div>
                            </div>
                        </button>
                        <button onClick={nextSlide} id="nextButtonRef" className={styles.btn}>
                            <div className={styles["wrapper-right"]}>
                                <div className={styles["wrapper-inner"]}>
                                    <RightArrow/>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <Swiper
                    className="home-carousel"
                    autoplay={{delay: 5000, disableOnInteraction: false}}
                    loop={true}
                    grabCursor={true}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true
                    }}
                    modules={[Autoplay, Pagination]}
                >
                    {
                        activeData.images.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <LazyLoadImage
                                        wrapperClassName={styles.slide}
                                        src={item.image}
                                        effect="blur"
                                    />
                                </SwiperSlide>
                            )
                        })
                    }
                    <div className={styles.count}>
                        <div>
                            <CounterUp className={styles["count-up"]} end={activeData.students_count} duration={2}
                                       suffix="+"/>
                            <div className={styles["count-up__label"]}>O‘quvchilar</div>
                        </div>
                        <div>
                            <CounterUp className={styles["count-up"]} end={activeData.teachers_count} duration={2}
                                       suffix="+"/>
                            <div className={styles["count-up__label"]}>O‘qituvchilar</div>
                        </div>
                        <div>
                            <CounterUp className={styles["count-up"]} end={activeData.subjects_count} duration={2}
                                       suffix="+"/>
                            <div className={styles["count-up__label"]}>Fanlar</div>
                        </div>
                    </div>
                </Swiper>
                <div className={styles.footer}>
                    <div>
                        <div className={styles.title}>{activeData.title}</div>
                        <p>{activeData.short_description}</p>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: activeData.content}}></p>
                </div>
            </div>
        </section>
    );
};

export default HomeCarousel;