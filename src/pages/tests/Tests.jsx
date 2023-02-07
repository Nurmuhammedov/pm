import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
import Pagination from "../../components/pagination/Pagination";
import TestItem from "../../components/testItem/TestItem";
import styles from "./Tests.module.css"
import axios from "../../axios";
import {ctx} from "../../App";
import Loader from "../../components/loader/Loader";

const Tests = ({tests = []}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {handleAuth, user,handleAlert} = useContext(ctx)
    const [selectedPage, setSelectedPage] = useState(1);
    const [refreshData, setRefreshData] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState({
        results: [],
        balance: null,
        count: 0,
        currentPage: 1,
        page_size: 1,
        totalPages: 1
    });

    useEffect(() => {
        axios.get(`/v1/tests/?subject_id=${id.toString() === "all" ? "" : id}&p=${selectedPage}&page_size=12`).then(res => {
            setData(res?.data || {
                results: [],
                balance: null,
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
    }, [selectedPage, refreshData, user])

    useEffect(() => {
        setTimeout(() => {
            setSelectedPage(1)
        }, 0)
        axios.get(`/v1/tests/?subject_id=${id.toString() === "all" ? "" : id}&p=1&page_size=12`).then(res => {
            setData(res?.data || {
                results: [],
                balance: null,
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

    const handleRefreshData = () => {
        setRefreshData(p => !p);
    };

    return (
        <>
            {
                isLoading ? <Loader/> :
                    <section className={`${styles.self} container`}>
                        <div className={styles.navigation}>
                            {tests.map(test => {
                                return <button
                                    onClick={() => navigate(`/tests/${test.value.toString()}`)}
                                    key={test.value}
                                    className={id.toString() === test.value.toString() ? styles.active : null}
                                >
                                    {test.label}
                                </button>
                            })}
                        </div>
                        <div className={styles.tests}>
                            {
                                data.results.map(item => {
                                        return <TestItem handleRefreshData={handleRefreshData} key={item.id}
                                                         balance={data.balance} {...item}/>

                                    }
                                )
                            }
                        </div>
                        {data.totalPages > 1 && (
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
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

export default Tests;