import React, {useContext, useEffect, useState} from 'react';
import "react-lazy-load-image-component/src/effects/blur.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import styles from "./AboutUs.module.css"
import {ctx} from "../../App";
import Loader from "../../components/loader/Loader";
import axios from "../../axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper";
import NewsItem from "../../components/newsItem/NewsItem";
import homeCarouselStyles from "../home/homeCarousel/HomeCarousel.module.css";
import LeftArrow from "../../assets/icons/arrows/LeftArrow";
import RightArrow from "../../assets/icons/arrows/RightArrow";
import ContactUs from "../../components/contactUs/ContactUs";

const AboutUs = () => {
    const {handleAuth, handleAlert} = useContext(ctx)
    const [swiper, setSwiper] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        title: "",
        short_description: "",
        content: "",
        images: [],
        schools: [],
        students: [],
    })

    useEffect(() => {
        axios.get(`/v1/core/about-us/`).then(res => {
            setData(res?.data || {
                title: "",
                short_description: "",
                content: "",
                images: [],
                schools: [],
                students: [],
            })
            setTimeout(() => {
                setIsLoading(false)
            }, 0)
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }).catch(error => {
            if (error?.response?.status === 401) {
                handleAuth()
            } else {
                handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
            }
            setTimeout(() => {
                setIsLoading(false)
            }, 0)
        })
    }, [])
    const nextSlide = () => {
        swiper.slideNext();
    };
    const prevSlide = () => {
        swiper.slidePrev();
    };

    return (
        <>
            {
                isLoading ? <Loader/> :
                    <section className={`${styles.self} container`}>
                        <div className={styles.header}>
                            <div>
                                <div className={styles.title}>{data.title}</div>
                                <div className={styles.description}>{data.short_description}</div>
                                <div className={styles.content} dangerouslySetInnerHTML={{__html: data.content}}></div>
                            </div>
                            <Swiper
                                className="about-us-carousel"
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
                                    data.images.map(item => {
                                        return (
                                            <SwiperSlide key={item.id}>
                                                <LazyLoadImage
                                                    wrapperClassName={styles.slide}
                                                    src={item.image}
                                                    effect="blur"
                                                />
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                        <div className={styles.schools}>
                            {
                                data.schools.map(school => <NewsItem isNewsItem={false} key={school.id} {...school}/>)
                            }
                        </div>
                        <div className={styles.students}>
                            <div style={{marginBottom: "3.5rem"}} className={homeCarouselStyles.header}>
                                <div className={homeCarouselStyles.title}>Bizning o‘quvchilarimiz</div>
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
                                slidesPerView={3.2}
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
                                    data.students.map(item => {
                                        return (
                                            <SwiperSlide key={item.id}>
                                                <div className={styles.student}>
                                                    <LazyLoadImage
                                                        wrapperClassName={styles["student-photo"]}
                                                        src={item.image}
                                                        effect="blur"
                                                    />
                                                    <div className={styles["student-name"]}>{item["full_name"]}</div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                        <ContactUs/>
                    </section>
            }
        </>
    );
};

export default AboutUs;