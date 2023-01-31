import "react-lazy-load-image-component/src/effects/blur.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Swiper, SwiperSlide} from "swiper/react";
import React, {useState} from 'react';
import {Autoplay} from "swiper";
import homeCarouselStyles from "../homeCarousel/HomeCarousel.module.css";
import carouselImg from "../../../assets/images/placeholderImage.jpg";
import RightArrow from "../../../assets/icons/arrows/RightArrow";
import LeftArrow from "../../../assets/icons/arrows/LeftArrow";
import Button from "../../../components/UI/button/Button";
import styles from "./HomeTests.module.css";
import "./HomeTestsCarousel.css"

const HomeTests = () => {
    const [swiper, setSwiper] = useState(null);
    const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]);
    const nextSlide = () => {
        swiper.slideNext();
    };
    const prevSlide = () => {
        swiper.slidePrev();
    };
    return (
        <section style={{marginBottom: "10rem"}}>
            <div className={`${homeCarouselStyles.header} container`}>
                <div className={homeCarouselStyles.title}>Biznig testlar</div>
                <div className={homeCarouselStyles.buttons}>
                    <button onClick={prevSlide} className={homeCarouselStyles.btn}>
                        <div className={homeCarouselStyles["wrapper-left"]}>
                            <div className={homeCarouselStyles["wrapper-inner"]}>
                                <LeftArrow/>
                            </div>
                        </div>
                    </button>
                    <button onClick={nextSlide} id="nextButtonRef" className={homeCarouselStyles.btn}>
                        <div className={homeCarouselStyles["wrapper-right"]}>
                            <div className={homeCarouselStyles["wrapper-inner"]}>
                                <RightArrow/>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <Swiper
                className="home-tests__carousel"
                slidesPerView={2.5}
                autoplay={{delay: 5000, disableOnInteraction: false}}
                grabCursor={true}
                loop={true}
                spaceBetween={24}
                modules={[Autoplay]}
                onSwiper={(s) => {
                    setSwiper(s);
                }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.card}>
                                    <LazyLoadImage
                                        wrapperClassName={styles.slide}
                                        src={carouselImg}
                                        effect="blur"
                                    />
                                    <div className={styles.title}>
                                        Have you ever stopped to think abou
                                    </div>
                                    <div>
                                        <Button
                                            backgroundColor="#37756A"
                                            padding="2rem 4rem"
                                            color="#FFFFFF"
                                        >Testni boshlash</Button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </section>
    );
};

export default HomeTests;