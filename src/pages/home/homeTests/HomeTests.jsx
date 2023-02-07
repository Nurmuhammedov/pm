import "react-lazy-load-image-component/src/effects/blur.css";
import {Swiper, SwiperSlide} from "swiper/react";
import React, {useState} from 'react';
import {Autoplay} from "swiper";
import homeCarouselStyles from "../homeCarousel/HomeCarousel.module.css";
import RightArrow from "../../../assets/icons/arrows/RightArrow";
import LeftArrow from "../../../assets/icons/arrows/LeftArrow";
import "./HomeTestsCarousel.css"
import NewsItem from "../../../components/newsItem/NewsItem";

const HomeTests = ({data = []}) => {
    const [swiper, setSwiper] = useState(null);
    const nextSlide = () => {
        swiper.slideNext();
    };
    const prevSlide = () => {
        swiper.slidePrev();
    };
    return (
        <section style={{marginBottom: "10rem"}} className="container">
            <div className={homeCarouselStyles.header}>
                <div className={homeCarouselStyles.title}>Bizning testlar</div>
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
                slidesPerView={1.2}
                autoplay={{delay: 5000, disableOnInteraction: false}}
                grabCursor={true}
                loop={true}
                spaceBetween={20}
                modules={[Autoplay]}
                onSwiper={(s) => {
                    setSwiper(s);
                }}
                breakpoints={{
                    768: {
                        slidesPerView: 2.2,
                        spaceBetween: 25,
                    },
                    1200: {
                        slidesPerView: 3.2,
                        spaceBetween: 30,
                    }
                }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <NewsItem title={item.title} link={`/tests/${item.id}`}
                                          short_description={item.short_description} image={item.image}/>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </section>
    );
};

export default HomeTests;