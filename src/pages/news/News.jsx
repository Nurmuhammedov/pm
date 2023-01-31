import React, {useContext, useEffect, useState} from 'react';
import styles from "./News.module.css"
import {useParams} from "react-router-dom";
import {ctx} from "../../App";
import axios from "../../axios";
import Loader from "../../components/loader/Loader";
import Pagination from "../../components/pagination/Pagination";
import NewsItem from "../../components/newsItem/NewsItem";

const News = () => {
    const {handleAuth, handleAlert} = useContext(ctx)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPage, setSelectedPage] = useState(1);
    const [data, setData] = useState({
        results: [],
        count: 0,
        currentPage: 1,
        page_size: 1,
        totalPages: 1
    })

    useEffect(() => {
        axios.get(`/v1/core/news/?p=${selectedPage}&page_size=9`).then(res => {
            setData(res?.data || {
                results: [],
                count: 0,
                currentPage: 1,
                page_size: 1,
                totalPages: 1
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
    }, [selectedPage])

    const handlePageClick = ({selected}) => {
        setSelectedPage(selected + 1);
    };

    return (
        <>
            {
                isLoading ? <Loader/> :
                    <section className={`${styles.self} container`}>
                        <div className={styles["news-list"]}>
                            {data.results.map(item => <NewsItem {...item} key={item.id}/>)}
                        </div>
                        {data.totalPages > 1 && (
                            <div style={{
                                marginTop: "4.8rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Pagination
                                    handlePageClick={handlePageClick}
                                    numPages={data.totalPages}
                                />
                            </div>
                        )}
                    </section>
            }
        </>
    );
};

export default News;