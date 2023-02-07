import React, {useContext, useEffect, useState} from "react";
import Modal from "../UI/modal";
import styles from "../purchaseTestModal/PurchaseTestModal.module.css";
import CancelIcon from "../../assets/icons/cancelIcon/CancelIcon";
import selfStyles from "./EndTestModal.module.css";
import axios from "../../axios";
import {handleAnswers} from "../../utils/utils";
import {ctx} from "../../App";

const EndTestModal = ({
                          id,
                          handleStartTestModal,
                          answers,
                          title,
                          handleScoreData
                      }) => {
    const {handleAuth, handleAlert} = useContext(ctx)
    const [visible, setVisible] = useState(false)
    const [isSubmitButtonActive, setIsSubmitTestButtonActive] = useState(true)


    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 0)

        return () => {
            setTimeout(() => {
                setVisible(false)
                document.querySelector("body").style.overflow = "auto"
            }, 0)
        }
    }, [])

    useEffect(() => {
        if (!visible) {
            document.querySelector("body").style.overflow = "auto"
        } else {
            document.querySelector("body").style.overflow = "hidden"
        }
    }, [visible])


    const handleOnSubmit = () => {
        if (isSubmitButtonActive) {
            axios.post(`v1/tests/check-user-test/${id}/`, handleAnswers(answers, id)).then(res => {
                setIsSubmitTestButtonActive(true)
                handleStartTestModal()
                handleScoreData(res?.data)
            }).catch(error => {
                if (error?.response?.status === 401) {
                    handleAuth()
                } else {
                    handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
                    setIsSubmitTestButtonActive(true)
                }
            })
        }
        setIsSubmitTestButtonActive(false)
    }

    return (
        <Modal visible={visible}
               effect="fadeInDown"
               onClick={handleStartTestModal}
        >
            <div className={styles.times}>
                <CancelIcon onClick={handleStartTestModal}/>
            </div>
            <div className={styles.payment}>
                <div className={styles["payment-title"]}>
                    Haqiqatdan ham <span style={{color: "#0173FF"}}>{title}</span> testini yakunlamoqchimisiz?
                </div>
                <div className={selfStyles.desc}>
                    Sizda ushbu testni qayta yechish uchun imkon bo‘lmaydi
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => handleStartTestModal()}>
                        Bekor qilish
                    </button>
                    <button
                        onClick={handleOnSubmit}
                        className={styles.active}
                        style={!isSubmitButtonActive ? {
                            background: "rgba(192, 192, 192, 0.3)",
                            color: "rgba(192, 192, 192, 1)",
                            cursor: "not-allowed"
                        } : null}
                    >
                        Testni yakunlash
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EndTestModal;