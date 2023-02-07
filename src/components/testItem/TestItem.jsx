import "react-lazy-load-image-component/src/effects/blur.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import React, {useContext, useState} from 'react';
import TestDurationIcon from "../../assets/icons/testDurationIcon/TestDurationIcon";
import PurchaseTestModal from "../purchaseTestModal/PurchaseTestModal";
import carouselImg from '../../assets/images/logo.jpg'
import StartTestModal from "../startTestModal/StartTestModal";
import styles from "./TestItem.module.css"
import {ctx} from "../../App";
import {useNavigate} from "react-router-dom";

const TestItem = ({
                      id = 0,
                      balance = null,
                      title = "",
                      price = 0,
                      discount_price = 1,
                      is_sale = false,
                      is_free = false,
                      duration = 0,
                      questions_count = 0,
                      image = null,
                      user_test = null,
                      handleRefreshData,
                  }) => {
    const navigate = useNavigate()
    const {user, handleAlert, handleLoginModal} = useContext(ctx)
    const [purchaseTestModal, setPurchaseTestModal] = useState(false)
    const [startTestModal, setStartTestModal] = useState(false)
    const handlePurchaseTest = () => {
        if (user) {
            setPurchaseTestModal(true)
            if (!balance || +balance < +price) {
                handleAlert("alert", "Hisobingizda yetarli mablag‘ mavjud emas")
            }
        } else {
            handleLoginModal(true)
            handleAlert("alert", "Iltimos, ushbu testni xarid qilishdan avval tizimga kiring!")
        }
    }
    const handleStartTest = () => {
        if (user) {
            setStartTestModal(true)
        } else {
            handleLoginModal(true)
            handleAlert("alert", "Iltimos, ushbu testni yechish uchun avval tizimga kiring!")
        }
    }
    const handleSeeTestAnswers = () => {
        if (user) {
            navigate(`/see-answers/${user_test?.id}`)
        } else {
            handleLoginModal(true)
            handleAlert("alert", "Iltimos, ushbu testning yechimlarini ko‘rish uchun avval tizimga kiring!")
        }
    }
    const handlePurchaseTestModal = () => setPurchaseTestModal(false)
    const handleStartTestModal = () => setStartTestModal(false)

    return (
        <div className={styles.self}>
            <div className={styles.header}>
                <LazyLoadImage
                    wrapperClassName={styles.slide}
                    src={image || carouselImg}
                    effect="blur"
                />
                {
                    user_test && user_test?.is_solution ? <div className={styles["free-test"]}>
                        <span style={{color: "#0FC341"}}>{user_test.score}</span>/{questions_count}
                    </div> : null
                }
            </div>
            <div className={styles.body}>
                <div className={styles.heading}>{title}</div>
                <div className={styles["title-container"]}>
                    <div className={styles.title}>
                        {
                            is_sale && !user_test?.is_solution && !user_test?.is_sold &&
                            <del className={styles['discount-price']}>{discount_price} so‘m</del>
                        }
                        {user_test?.is_solution ? <span>Yechilgan</span> :
                            user_test?.is_sold ? <span>Sotib olingan</span> :
                                is_free ? <span>Bepul</span> :
                                    <span>{price} so‘m</span>
                        }
                    </div>
                    <div className={styles.duration}>
                        <TestDurationIcon/>
                        <span>{duration} min</span>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.count}>
                        {questions_count}ta savol
                    </div>
                    {
                        user_test?.is_solution ?
                            <button onClick={handleSeeTestAnswers}>
                                Yechimni ko‘rish
                            </button>
                            : user_test?.is_sold || is_free ?
                                <button onClick={handleStartTest}>
                                    Testni yechish
                                </button> :
                                <button onClick={handlePurchaseTest}>
                                    Sotib olish
                                </button>
                    }
                </div>
            </div>
            {
                purchaseTestModal &&
                <PurchaseTestModal
                    handleRefreshData={handleRefreshData}
                    title={title}
                    balance={balance}
                    price={price}
                    id={id}
                    handlePurchaseTestModal={handlePurchaseTestModal}
                />
            }
            {
                startTestModal &&
                <StartTestModal
                    questions_count={questions_count}
                    duration={duration}
                    handleStartTestModal={handleStartTestModal}
                    id={id}
                    isFree={is_free}
                    userTestId={user_test?.id}
                    title={title}
                />
            }
        </div>
    );
};

export default TestItem;