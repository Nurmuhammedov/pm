import "react-lazy-load-image-component/src/effects/blur.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import React, {useContext, useEffect, useRef, useState} from 'react';
import defaultImage from "../../assets/images/logo.jpg";
import styles from "./SolvingTest.module.css"
import {useParams} from "react-router-dom";
import axios from "../../axios";
import Loader from "../../components/loader/Loader";
import {ctx} from "../../App";
import PreviousIcon from "../../assets/icons/previousIcon/PreviousIcon";
import NextIcon from "../../assets/icons/nextIcon/NextIcon";
import {handleAnswers} from "../../utils/utils";
import EndTestModal from "../../components/endTestModal/EndTestModal";
import dayjs from "dayjs";
import RankModal from "../../components/rankModal/RankModal";

const SolvingTest = ({freeTest, checkAnswers = false}) => {
    const {id} = useParams()
    const {handleAuth, handleAlert} = useContext(ctx)
    const [activeQuestion, setActiveQuestion] = useState({})
    const [answers, setAnswers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [timer, setTimer] = useState(0); // 0 minutes
    const [endTestModal, setEndTestModal] = useState(false);
    const [rankModal, setRankModal] = useState(false)
    const [scoreData, setScoreData] = useState({})
    const tick = useRef(); // <-- React ref
    const [data, setData] = useState({
        id: 0,
        duration: 0,
        title: "",
        question: []
    })

    useEffect(() => {
        if (!checkAnswers) {
            if (freeTest) {
                axios.get(`v1/tests/free-tests/${id}/`).then(res => {
                    setData(res.data)
                    setActiveQuestion(res?.data?.question[0] || [])
                    const startTime = dayjs()
                    const endTime = dayjs(res?.data?.deadline)
                    const diff = parseInt(`${endTime.diff(startTime) / 1000}`)
                    console.log(res?.data?.deadline)
                    setTimer(diff > 0 ? diff : 0)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 0)
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
            } else {
                axios.get(`v1/tests/user-tests/${id}/`).then(res => {
                    setData(res.data)
                    setActiveQuestion(res?.data?.question[0] || [])
                    const startTime = dayjs()
                    const endTime = dayjs(res?.data?.deadline)
                    const diff = parseInt(`${endTime.diff(startTime) / 1000}`)
                    console.log(diff)
                    setTimer(diff > 0 ? diff : 0)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 0)
                }).catch(error => {
                    if (error?.response?.status === 401) {
                        handleAuth()
                    } else {
                        handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
                    }
                    console.log(error)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 0)
                })
            }
        } else {
            setIsLoading(true)
            axios.get(`v1/tests/see-answers/${id}/`).then(res => {
                setData(res.data)
                setActiveQuestion(res?.data?.question[0] || [])
                setTimeout(() => {
                    setIsLoading(false)
                }, 0)
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
        }
    }, [id, checkAnswers])


    useEffect(() => {
        if (!checkAnswers) {
            if (timer > 0) {
                tick.current = setInterval(() => { // <-- set tick ref current value
                    setTimer((timer) => timer - 1);
                }, 1000);
            } else {
                clearInterval(tick.current); // <-- access tick ref current value
            }
            if (timer === 11 && !rankModal) {
                handleAlert("alert", "Javoblarni yuborishinigiz uchun 10 soniya vaqtingiz bor!")
            }
            if (timer === 1 && !rankModal) {
                setTimeout(() => {
                    axios.post(`v1/tests/check-user-test/${data.id}/`, handleAnswers(answers, data.id)).then(res => {
                        setScoreData(res?.data)
                        setEndTestModal(false)
                        setTimeout(() => {
                            setRankModal(true)
                        }, 0)
                    }).catch(error => {
                        if (error?.response?.status === 401) {
                            handleAuth()
                        } else {
                            handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
                        }
                    })
                }, 2000)
            }
            return () => clearInterval(tick.current); // <-- clear on unmount!
        }
    }, [timer]);

    const handleChangeQuestion = (id) => {
        setActiveQuestion(data.question.filter(question => question.id === id)?.[0])
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }


    const handleSelectAnswer = (answer) => {
        if (timer > 0) {
            setAnswers(p => {
                let newAnswers = [...p]
                const currentItemIndex = newAnswers.findIndex(answer => answer.id === activeQuestion.id)
                if (currentItemIndex < 0) {
                    return [
                        ...newAnswers,
                        {
                            id: activeQuestion.id,
                            answer: answer,
                        }
                    ]
                } else if (newAnswers[currentItemIndex].answer === answer) {
                    newAnswers = newAnswers.filter((answer, index) => index !== currentItemIndex)
                    return [...newAnswers]
                } else {
                    newAnswers = newAnswers.filter((answer, index) => index !== currentItemIndex)
                    return [...newAnswers, {
                        id: activeQuestion.id,
                        answer: answer
                    }]
                }
            })
        }
    }

    const handlePreviousQuestion = () => {
        const currentItemIndex = data.question.findIndex(answer => answer.id === activeQuestion.id)
        if (currentItemIndex > 0) {
            setActiveQuestion(data.question[currentItemIndex - 1])
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }

    const handleNextQuestion = () => {
        const currentItemIndex = data.question.findIndex(answer => answer.id === activeQuestion.id)
        if (currentItemIndex < data.question.length - 1) {
            setActiveQuestion(data.question[currentItemIndex + 1])
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }

    const handleStartTestModal = () => setEndTestModal(false)
    const handleRankModal = () => setRankModal(false)
    const onSubmit = () => {
        if (!checkAnswers) {
            setEndTestModal(true)
        }
    }

    return (
        <>
            {
                isLoading ? <Loader/> :
                    <>
                        <section className={`${styles.self} container`}>
                            <div className={styles["question-section"]}>
                                <div className={styles.title}>{data?.title}</div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "4rem"
                                }}>
                                    <div className={styles["question-number"]}>Savol
                                        raqami: {activeQuestion?.number}</div>
                                    {
                                        !checkAnswers &&
                                        <span style={timer < 10 ? {color: "red"} : null} className={styles.timer}>
                                        {`${Math.floor(timer / 60) <= 9 ? "0" : ""}${Math.floor(timer / 60)}:${Math.floor(timer % 60) <= 9 ? "0" : ""}${Math.floor(timer % 60)}`}
                                    </span>
                                    }
                                </div>
                                <div className={styles.question}
                                     dangerouslySetInnerHTML={{__html: activeQuestion?.text || ""}}>
                                </div>
                            </div>
                            <div>
                                <LazyLoadImage
                                    wrapperClassName={styles.img}
                                    src={activeQuestion?.image || defaultImage}
                                    effect="blur"
                                    alt="Savol rasmi"
                                />
                            </div>
                            {
                                !checkAnswers ?
                                    <div>
                                        <div className={styles.variants}>
                                            <div
                                                style={timer <= 0 ? {cursor: "auto", pointerEvents: "none"} : null}
                                                onClick={() => handleSelectAnswer("a")}
                                                className={`${styles.choice} ${answers.filter(answer => answer.id === activeQuestion.id)[0]?.answer === "a" ? styles["active-answer"] : null}`}
                                            >
                                                <div style={{color: "#F53F64"}} className={styles.label}>
                                                    A
                                                </div>
                                                <div
                                                    className={styles["answer-text"]}
                                                    dangerouslySetInnerHTML={{__html: activeQuestion?.a}}
                                                >
                                                </div>
                                            </div>
                                            <div
                                                style={timer <= 0 ? {cursor: "auto", pointerEvents: "none"} : null}
                                                onClick={() => handleSelectAnswer("b")}
                                                className={`${styles.choice} ${answers.filter(answer => answer.id === activeQuestion.id)[0]?.answer === "b" ? styles["active-answer"] : null}`}
                                            >
                                                <div style={{color: "#0173FF"}} className={styles.label}>
                                                    B
                                                </div>
                                                <div
                                                    className={styles["answer-text"]}
                                                    dangerouslySetInnerHTML={{__html: activeQuestion?.b}}
                                                >
                                                </div>
                                            </div>
                                            <div
                                                style={timer <= 0 ? {cursor: "auto", pointerEvents: "none"} : null}
                                                onClick={() => handleSelectAnswer("c")}
                                                className={`${styles.choice} ${answers.filter(answer => answer.id === activeQuestion.id)[0]?.answer === "c" ? styles["active-answer"] : null}`}
                                            >
                                                <div style={{color: "#DDA700"}} className={styles.label}>
                                                    C
                                                </div>
                                                <div
                                                    className={styles["answer-text"]}
                                                    dangerouslySetInnerHTML={{__html: activeQuestion?.c}}
                                                >
                                                </div>
                                            </div>
                                            <div
                                                style={timer <= 0 ? {cursor: "auto", pointerEvents: "none"} : null}
                                                onClick={() => handleSelectAnswer("d")}
                                                className={`${styles.choice} ${answers.filter(answer => answer.id === activeQuestion.id)[0]?.answer === "d" ? styles["active-answer"] : null}`}
                                            >
                                                <div style={{color: "#2C9408"}} className={styles.label}>
                                                    D
                                                </div>
                                                <div
                                                    className={styles["answer-text"]}
                                                    dangerouslySetInnerHTML={{__html: activeQuestion?.d}}
                                                >
                                                </div>
                                            </div>
                                        </div>
                                    </div> :
                                    <div>
                                        <div className={styles.variants}>
                                            <div
                                                style={checkAnswers ? {cursor: "auto", pointerEvents: "none"} : null}
                                                className={`${styles.choice} ${activeQuestion?.answer === "a" ? styles["active-answer"] : activeQuestion?.answer !== activeQuestion?.user_answer && activeQuestion?.user_answer === "a" ? styles["error-answer"] : null}`}
                                            >
                                                <div style={{color: "#F53F64"}} className={styles.label}>
                                                    A
                                                </div>
                                                <div
                                                    className={styles["answer-text"]}
                                                    dangerouslySetInnerHTML={{__html: activeQuestion?.a}}
                                                >
                                                </div>
                                            </div>
                                            <div
                                                style={checkAnswers ? {cursor: "auto", pointerEvents: "none"} : null}
                                                className={`${styles.choice} ${activeQuestion?.answer === "b" ? styles["active-answer"] : activeQuestion?.answer !== activeQuestion?.user_answer && activeQuestion?.user_answer === "b" ? styles["error-answer"] : null}`}
                                            >
                                                <div style={{color: "#0173FF"}} className={styles.label}>
                                                    B
                                                </div>
                                                <div
                                                    className={styles["answer-text"]}
                                                    dangerouslySetInnerHTML={{__html: activeQuestion?.b}}
                                                >
                                                </div>
                                            </div>
                                            <div
                                                style={checkAnswers ? {cursor: "auto", pointerEvents: "none"} : null}
                                                className={`${styles.choice} ${activeQuestion?.answer === "c" ? styles["active-answer"] : activeQuestion?.answer !== activeQuestion?.user_answer && activeQuestion?.user_answer === "c" ? styles["error-answer"] : null}`}
                                            >
                                                <div style={{color: "#DDA700"}} className={styles.label}>
                                                    C
                                                </div>
                                                <div
                                                    className={styles["answer-text"]}
                                                    dangerouslySetInnerHTML={{__html: activeQuestion?.c}}
                                                >
                                                </div>
                                            </div>
                                            <div
                                                style={checkAnswers ? {cursor: "auto", pointerEvents: "none"} : null}
                                                className={`${styles.choice} ${activeQuestion?.answer === "d" ? styles["active-answer"] : activeQuestion?.answer !== activeQuestion?.user_answer && activeQuestion?.user_answer === "d" ? styles["error-answer"] : null}`}
                                            >
                                                <div style={{color: "#2C9408"}} className={styles.label}>
                                                    D
                                                </div>
                                                <div
                                                    className={styles["answer-text"]}
                                                    dangerouslySetInnerHTML={{__html: activeQuestion?.d}}
                                                >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <div className={checkAnswers && styles['pc-navigation']}>
                                    {
                                        !checkAnswers ?
                                            <div className={styles.navigation}>
                                                {
                                                    data.question.map((question) => {
                                                        return <span
                                                            className={activeQuestion?.id === question.id ? styles["active-button"] : answers.filter(answer => answer.id === question.id).length !== 0 ? styles["selected-button"] : null}
                                                            onClick={() => handleChangeQuestion(question.id)}
                                                            key={question?.id}
                                                        >
                                                        {question?.number}
                                                    </span>
                                                    })
                                                }
                                            </div> :
                                            <div className={styles.navigation}>
                                                {
                                                    data.question.map((question) => {
                                                        return <span
                                                            className={activeQuestion?.id === question.id ? styles["active-button"] : question.user_answer === question.answer ? styles["correct-answer-button"] : question?.user_answer && question.user_answer !== question.answer ? styles['error-answer-button'] : styles["selected-button"]}
                                                            onClick={() => handleChangeQuestion(question.id)}
                                                            key={question?.id}
                                                        >
                                                        {question?.number}
                                                    </span>
                                                    })
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                            <div
                                className={`${checkAnswers && styles['pc-navigation']} ${styles["navigation-buttons"]}`}>
                                <div>
                                    <button
                                        className={data.question.findIndex(answer => answer.id === activeQuestion.id) <= 0 ? styles.passive : null}
                                        onClick={handlePreviousQuestion}
                                    >
                                        <PreviousIcon/>
                                        <span style={{marginRight: ".3rem"}}>Avvalgi</span>
                                    </button>
                                    <button
                                        className={data.question.findIndex(answer => answer.id === activeQuestion.id) === data.question.length - 1 ? styles.passive : null}
                                        onClick={handleNextQuestion}
                                    >
                                        <span style={{marginLeft: ".3rem"}}>Keyingi</span>
                                        <NextIcon/>
                                    </button>
                                </div>
                                {
                                    !checkAnswers &&
                                    <button onClick={onSubmit}>
                                        Testni yakunlash
                                    </button>
                                }
                            </div>
                            {
                                endTestModal &&
                                <EndTestModal
                                    id={data.id}
                                    answers={answers}
                                    title={data.title}
                                    handleScoreData={(data) => {
                                        setScoreData(data)
                                        setRankModal(true)
                                    }}
                                    handleStartTestModal={handleStartTestModal}
                                />
                            }
                            {
                                rankModal &&
                                <RankModal
                                    data={scoreData}
                                    id={data.id}
                                    handleRankModal={handleRankModal}
                                />
                            }
                        </section>
                        {
                            checkAnswers ?
                                <section className={styles["answer-helper-text"]}>
                                    <div className="container">
                                        <div>
                                            <h3>Savol yechimi:</h3>
                                            <p dangerouslySetInnerHTML={{__html: activeQuestion?.solution || ""}}></p>
                                        </div>
                                        <div className={styles["img-container"]}>
                                            {
                                                activeQuestion?.solution_image ?
                                                    <LazyLoadImage
                                                        wrapperClassName={styles.img}
                                                        src={activeQuestion?.solution_image || defaultImage}
                                                        effect="blur"
                                                        alt="Savol rasmi"
                                                    /> : null
                                            }
                                        </div>
                                    </div>
                                    <div className={`${styles['mobile-navigation']} container`}>
                                        {
                                            !checkAnswers ?
                                                <div className={styles.navigation}>
                                                    {
                                                        data.question.map((question) => {
                                                            return <span
                                                                className={activeQuestion?.id === question.id ? styles["active-button"] : answers.filter(answer => answer.id === question.id).length !== 0 ? styles["selected-button"] : null}
                                                                onClick={() => handleChangeQuestion(question.id)}
                                                                key={question?.id}
                                                            >
                                                        {question?.number}
                                                    </span>
                                                        })
                                                    }
                                                </div> :
                                                <div className={styles.navigation}>
                                                    {
                                                        data.question.map((question) => {
                                                            return <span
                                                                className={activeQuestion?.id === question.id ? styles["active-button"] : question.user_answer === question.answer ? styles["correct-answer-button"] : question?.user_answer && question.user_answer !== question.answer ? styles['error-answer-button'] : styles["selected-button"]}
                                                                onClick={() => handleChangeQuestion(question.id)}
                                                                key={question?.id}
                                                            >
                                                        {question?.number}
                                                    </span>
                                                        })
                                                    }
                                                </div>
                                        }
                                    </div>
                                    <div
                                        className={`${styles['mobile-navigation']} ${styles["navigation-buttons"]} container`}>
                                        <div>
                                            <button
                                                className={data.question.findIndex(answer => answer.id === activeQuestion.id) <= 0 ? styles.passive : null}
                                                onClick={handlePreviousQuestion}
                                            >
                                                <PreviousIcon/>
                                                <span style={{marginRight: ".3rem"}}>Avvalgi</span>
                                            </button>
                                            <button
                                                className={data.question.findIndex(answer => answer.id === activeQuestion.id) === data.question.length - 1 ? styles.passive : null}
                                                onClick={handleNextQuestion}
                                            >
                                                <span style={{marginLeft: ".3rem"}}>Keyingi</span>
                                                <NextIcon/>
                                            </button>
                                        </div>
                                        {
                                            !checkAnswers &&
                                            <button onClick={onSubmit}>
                                                Testni yakunlash
                                            </button>
                                        }
                                    </div>
                                </section> : null
                        }
                    </>

            }
        </>
    );
};

export default SolvingTest;