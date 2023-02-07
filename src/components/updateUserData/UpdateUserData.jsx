import React, {useContext, useEffect, useState} from 'react';
import {ctx} from "../../App";
import {useForm} from "react-hook-form";
import axios from "../../axios";
import Modal from "../UI/modal";
import styles from "../purchaseTestModal/PurchaseTestModal.module.css";
import CancelIcon from "../../assets/icons/cancelIcon/CancelIcon";
import button from "../UI/button/Button";
import {customTrim} from "../../utils/utils";
import loginStyles from "../login/Login.module.css";
import Login from "../../assets/icons/loginIcons/Login";
import selfStyles from "./UpdateUserData.module.css"

const UpdateUserData = ({handleRefreshData, name, handlePurchaseTestModal, surname}) => {
    const {handleAuth, handleAlert} = useContext(ctx)
    const [visible, setVisible] = useState(false)
    const [isBalanceButtonActive, setIsBalanceButtonActive] = useState(true)
    const {
        handleSubmit,
        reset,
        setFocus,
        register,
        formState: {errors},
    } = useForm({
        defaultValues: {
            name,
            surname
        },
        mode: "onTouched",
    });

    useEffect(() => {
        setFocus("name")
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
        if (visible) {
            document.querySelector("body").style.overflow = "hidden"
        } else {
            document.querySelector("body").style.overflow = "auto"
        }
    }, [visible])


    const onSubmit = (data) => {
        if (isBalanceButtonActive) {
            axios.patch('v1/users/user-detail-update/', {
                first_name: data.name,
                last_name: data.surname
            }).then(res => {
                reset()
                setIsBalanceButtonActive(true)
                handleAlert("success", "Maʼlumotlar muvaffaqiyatli yangilandi")
                handlePurchaseTestModal()
                handleRefreshData(res?.data)
            }).catch(error => {
                console.log(error)
                if (error?.response?.status === 401) {
                    handleAuth()
                    setIsBalanceButtonActive(true)
                } else {
                    handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
                    setIsBalanceButtonActive(true)
                }
            })
        }
        setIsBalanceButtonActive(false)
    }

    return (
        <Modal visible={visible}
               effect="fadeInDown"
               onClick={handlePurchaseTestModal}
        >
            <div className={styles.times}>
                <CancelIcon onClick={handlePurchaseTestModal}/>
            </div>
            <div className={styles.payment}>
                <form
                    className={selfStyles.form}
                    onSubmit={e => {
                        e.preventDefault()
                    }}
                >
                    <div>
                        <input
                            {...register("name", {
                                required: true,
                                validate: {
                                    whiteSpace: (value) =>
                                        customTrim(value).length > 0,
                                    minLength: (value) =>
                                        customTrim(value).split(" ").join("").length >= 3,
                                    maxLength: (value) =>
                                        customTrim(value).length <= 30,
                                },
                            })}
                            type="text"
                            data-name="name"
                            autoComplete="on"
                            placeholder="Ismingizni kiriting"
                            style={errors?.name ? {borderColor: "red"} : null}
                        />
                        <span onClick={() => setFocus("name")} className={loginStyles.icon}>
                        <Login/>
                    </span>
                        {errors?.name?.type === "required" ? (
                            <span className={loginStyles["helper-text"]}>
                            Ushbu maydon to‘ldirilishi shart
                        </span>
                        ) : null}
                        {errors?.name?.type === "whiteSpace" ? (
                            <span className={loginStyles["helper-text"]}>
                            Bosh joy tashlash mumkin emas
                        </span>
                        ) : null}
                        {errors?.name?.type === "minLength" ? (
                            <span className={loginStyles["helper-text"]}>
                            Ismingiz kamida 3 ta belgidan iborat bo‘lishi
                            kerak
                        </span>
                        ) : null}
                        {errors?.name?.type === "maxLength" ? (
                            <span className={loginStyles["helper-text"]}>
                            Ismingiz 30 ta belgidan oshmasligi kerak
                        </span>
                        ) : null}
                    </div>
                    <div style={{marginTop: "2.5rem"}}>
                        <input
                            {...register("surname", {
                                required: true,
                                validate: {
                                    whiteSpace: (value) =>
                                        customTrim(value).length > 0,
                                    minLength: (value) =>
                                        customTrim(value).split(" ").join("").length >= 3,
                                    maxLength: (value) =>
                                        customTrim(value).length <= 30,
                                },
                            })}
                            type="text"
                            data-name="surname"
                            autoComplete="on"
                            placeholder="Familiyangizni kiriting"
                            style={errors?.surname ? {borderColor: "red"} : null}
                        />
                        <span onClick={() => setFocus("surname")} className={loginStyles.icon}>
                        <Login/>
                    </span>
                        {errors?.surname?.type === "required" ? (
                            <span className={loginStyles["helper-text"]}>
                            Ushbu maydon to‘ldirilishi shart
                        </span>
                        ) : null}
                        {errors?.surname?.type === "whiteSpace" ? (
                            <span className={loginStyles["helper-text"]}>
                            Bosh joy tashlash mumkin emas
                        </span>
                        ) : null}
                        {errors?.surname?.type === "minLength" ? (
                            <span className={loginStyles["helper-text"]}>
                            Familiyangiz kamida 3 ta belgidan iborat bo‘lishi kerak
                        </span>
                        ) : null}
                        {errors?.surname?.type === "maxLength" ? (
                            <span className={loginStyles["helper-text"]}>
                            Familiyangiz 30 ta belgidan oshmasligi kerak
                        </span>
                        ) : null}
                    </div>
                </form>
                <div className={styles.buttons}>
                    <button
                        style={!isBalanceButtonActive ? {
                            background: "rgba(192, 192, 192, 0.3)",
                            color: "rgba(192, 192, 192, 1)",
                            cursor: "not-allowed"
                        } : null}
                        data-name="payment-button"
                        onClick={handleSubmit(onSubmit)}
                        className={styles.active}
                    >
                        Tahrirlash
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateUserData;