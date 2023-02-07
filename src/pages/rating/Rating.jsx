import React, {useContext, useEffect, useState} from 'react';
import TestsStyles from "../tests/Tests.module.css";
import styles from "./Rating.module.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";
import {ctx} from "../../App";
import Loader from "../../components/loader/Loader";
import Pagination from "../../components/pagination/Pagination";

const Rating = ({tests}) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {handleAuth, handleAlert, user} = useContext(ctx)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPage, setSelectedPage] = useState(1);
    const [data, setData] = useState({
        results: [],
        index: null,
        count: 0,
        currentPage: 1,
        page_size: 1,
        totalPages: 1
    })

    useEffect(() => {
        axios.get(`/v1/users/rating/?subject_id=${id.toString() === "all" ? "" : id}&p=${selectedPage}&page_size=10`).then(res => {
            setData(res?.data || {
                results: [],
                index: null,
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

    useEffect(() => {
        setTimeout(() => {
            setSelectedPage(1)
        }, 0)
        axios.get(`/v1/users/rating/?subject_id=${id.toString() === "all" ? "" : id}&p=1&page_size=10`).then(res => {
            setData(res?.data || {
                results: [],
                index: null,
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
    }, [id])
    const handlePageClick = ({selected}) => {
        setSelectedPage(selected + 1);
    };

    return (
        <>
            {
                isLoading ? <Loader/> :
                    <section className={`${styles.self} container`}>
                        <div className={styles["navigation-container"]}>
                            <div style={{marginBottom: 0}} className={TestsStyles.navigation}>
                                {tests.map(test => {
                                    return <button
                                        onClick={() => navigate(`/rating/${test.value.toString()}`)}
                                        key={test.value}
                                        className={id.toString() === test.value.toString() ? TestsStyles.active : null}
                                    >
                                        {test.label}
                                    </button>
                                })}
                            </div>
                            {
                                !!user && !!data.index &&
                                <div>
                                    <div className={styles.rating}>
                                        Siz {data.index} o‘rindasiz
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styles['rating-list']}>
                            {
                                data.results.map((rating, index) => {
                                    return (
                                        <div key={index} className={styles["rating-item"]}>
                                            <div
                                                style={
                                                    (data.currentPage - 1) * 10 + index + 1 === 1 ? {background: "linear-gradient(180deg, #FF6B00 0%, #FFD600 100%)"} :
                                                        (data.currentPage - 1) * 10 + index + 1 === 2 ? {background: "linear-gradient(180deg, #696969 0%, #DFDFDF 100%)"} :
                                                            (data.currentPage - 1) * 10 + index + 1 === 3 ? {background: "linear-gradient(180deg, #8B3A00 0%, #FF5C00 100%)"} : null
                                                }
                                                className={styles.order}
                                            >
                                                {(data.currentPage - 1) * 10 + index + 1}
                                            </div>
                                            <div className={styles["order-content"]}>
                                                <p style={{flex: 2}}>{rating.first_name} {rating.last_name}</p>
                                                <div style={{
                                                    display: "flex",
                                                    flex: 1,
                                                    justifyContent: "space-between"
                                                }}>
                                                    <p>{rating["tests_efficiency"]}%</p>
                                                    <p>{rating["tests_rank"]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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

export default Rating;