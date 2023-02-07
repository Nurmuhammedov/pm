import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Modal from "../UI/modal";
import styles from "../purchaseTestModal/PurchaseTestModal.module.css";
import CancelIcon from "../../assets/icons/cancelIcon/CancelIcon";
import button from "../UI/button/Button";

const ChannelModal = ({
                          id,
                          handleStartTestModal,
                          title,
                          link
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
                    {title}
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => {
                        navigate(`/channels/${id}`)
                        handleStartTestModal()
                    }}>
                        Batafsil o‘qish
                    </button>
                    <button
                        onClick={() => {
                            window.open(link, "blank")
                            handleStartTestModal()
                        }}
                        className={styles.active}>
                        Kanalga ulanish
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ChannelModal;