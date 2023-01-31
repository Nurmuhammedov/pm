import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Modal from "../UI/modal";
import styles from "../purchaseTestModal/PurchaseTestModal.module.css";
import CancelIcon from "../../assets/icons/cancelIcon/CancelIcon";
import selfStyles from "./RankModal.module.css";
import button from "../UI/button/Button";
import StarIcon from "../../assets/icons/star/StarIcon";

const RankModal = ({id, data, handleRankModal}) => {
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
               onClick={() => {
                   handleRankModal()
                   navigate("/tests/all", {
                       replace: true
                   })
               }}
        >
            <div className={styles.times}>
                <CancelIcon onClick={() => {
                    handleRankModal()
                    navigate("/tests/all", {
                        replace: true
                    })
                }}/>
            </div>
            <div className={styles.payment}>
                <div className={selfStyles.stars}>
                    <StarIcon className={data.rank >= 1 ? selfStyles.active : null}/>
                    <StarIcon className={`${selfStyles["second-start"]} ${data.rank >= 3 ? selfStyles.active : null}`}/>
                    <StarIcon className={data.rank >= 2 ? selfStyles.active : null}/>
                </div>
                <div className={selfStyles.rating}>
                    <span>{data?.score}</span>/{data?.questions_count}
                </div>
                <div className={selfStyles.desc}>
                    Siz <span>{data.rank}</span> ball topladingiz
                </div>
                <div className={styles.buttons}>
                    <button
                        onClick={() => {
                            navigate(`/tests/all`, {
                                replace: true
                            })
                            handleRankModal()
                        }}
                    >
                        Orqaga
                    </button>
                    <button
                        onClick={() => {
                            navigate(`/see-answers/${id}`, {
                                replace: true
                            })
                            handleRankModal()
                        }}
                        className={styles.active}
                    >
                        Yechimlarni ko‘rish
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default RankModal;