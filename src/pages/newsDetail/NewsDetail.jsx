import React, {useContext, useEffect, useState} from 'react';
import "react-lazy-load-image-component/src/effects/blur.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useParams} from "react-router-dom";
import {ctx} from "../../App";
import axios from "../../axios";
import Loader from "../../components/loader/Loader";
import styles from "./NewsDetail.module.css"
import NewsItem from "../../components/newsItem/NewsItem";

const NewsDetail = () => {
    const {id} = useParams()
    const {handleAuth, handleAlert} = useContext(ctx)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        title: "",
        content: "",
        image: "",
        news: []
    })

    useEffect(() => {
        axios.get(`/v1/core/news/${id}/`).then(res => {
            setData(res?.data || {
                title: "",
                content: "",
                image: "",
                news: []
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
                        <div className={styles["news-item"]}>
                            <LazyLoadImage
                                wrapperClassName={styles.slide}
                                src={data.image}
                                effect="blur"
                            />
                            <div className={styles.title}>{data.title}</div>
                            <div className={styles.content} dangerouslySetInnerHTML={{__html: data.content}}></div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "1.6rem"}}>
                            {
                                data.news.map(news => <NewsItem key={news.id} {...news}/>)
                            }
                        </div>
                    </section>
            }
        </>

    );
};

export default NewsDetail;