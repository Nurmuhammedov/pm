import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styles from "../purchaseTestModal/PurchaseTestModal.module.css";
import CancelIcon from "../../assets/icons/cancelIcon/CancelIcon";
import selfStyles from "./StartTestModal.module.css"
import button from "../UI/button/Button";
import Modal from "../UI/modal";

const StartTestModal = ({
                            id,
                            isFree = true,
                            userTestId = false,
                            handleStartTestModal,
                            title,
                            duration,
                            questions_count
                        }) => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 0)

        return () => {
            setTimeout(() => {
                setVisible(false)
            }, 0)
        }
    }, [])

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
                    Haqiqatdan ham <span style={{color: "#0173FF"}}>{title}</span> testini boshlamoqchimisiz?
                </div>
                <div className={selfStyles.desc}>
                    Ushbu test uchun {duration} daqiqa vaqt beriladi <br/>
                    Jami savollar soni {questions_count}ta
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => handleStartTestModal()}>
                        Bekor qilish
                    </button>
                    <button
                        onClick={() => !isFree && userTestId ? navigate(`/premium-tests/${userTestId}`) : navigate(`/free-tests/${id}`)}
                        className={styles.active}>
                        Testni boshlash
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default StartTestModal;