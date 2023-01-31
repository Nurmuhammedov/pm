import React, {useContext, useEffect, useState} from 'react';
import "react-lazy-load-image-component/src/effects/blur.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {ctx} from "../../App";
import axios from "../../axios";
import Loader from "../../components/loader/Loader";
import styles from "../aboutUs/AboutUs.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination} from "swiper";
import ContactUs from "../../components/contactUs/ContactUs";
import {useParams} from "react-router-dom";

const Channel = () => {
    const {id} = useParams()
    const {handleAuth, handleAlert} = useContext(ctx)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        title: "",
        short_description: "",
        content: "",
        images: []
    })

    useEffect(() => {
        axios.get(`/v1/core/channels/${id}/`).then(res => {
            setData(res?.data || {
                title: "",
                short_description: "",
                content: "",
                images: []
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
    }, [id])

    return (
        <>
            {
                isLoading ? <Loader/> :
                    <section className={`${styles.self} container`}>
                        <div className={styles.header}>
                            <div style={{display: "block"}}>
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
                        <ContactUs/>
                    </section>
            }
        </>
    );
};
export default Channel;