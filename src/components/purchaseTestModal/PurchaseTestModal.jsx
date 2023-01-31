import CurrencyInput from 'react-currency-input-field';
import {Controller, useForm} from "react-hook-form";
import React, {useContext, useEffect, useState} from 'react';
import CancelIcon from "../../assets/icons/cancelIcon/CancelIcon";
import ClickIcon from "../../assets/icons/clickIcon/ClickIcon";
import BankIcon from "../../assets/icons/bankIcon/BankIcon";
import styles from "./PurchaseTestModal.module.css"
import button from "../UI/button/Button";
import Modal from "../UI/modal";
import axios from "../../axios";
import {ctx} from "../../App";

const PurchaseTestModal = ({handleRefreshData, id, title, balance, price, handlePurchaseTestModal, propPage = 0}) => {
    const {handleAuth, handleAlert} = useContext(ctx)
    const [visible, setVisible] = useState(false)
    const [page, setPage] = useState(!!propPage ? propPage : 1)
    const [isPurchaseTestButtonActive, setIsPurchaseTestButtonActive] = useState(true)
    const [isBalanceButtonActive, setIsBalanceButtonActive] = useState(true)
    const {
        handleSubmit,
        reset,
        control,
        setFocus,
        formState: {errors},
    } = useForm({
        defaultValues: {
            balance: '',
        },
        mode: "onSubmit",
    });

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

    useEffect(() => {
        if (page === 2) {
            setFocus("balance")
        }
    }, [page])
    const handleLoginInputKeyDown = (e) => {
        if (e.key === "Enter") {
            document.querySelector("[data-name='payment-button']")?.click();
        }
    };

    const onSubmit = (data) => {
        if (isBalanceButtonActive) {
            axios.post('/v1/users/add-account-funds/', {
                amount: data.balance
            }).then(res => {
                window.open(res.data.click, "_blank")
                reset()
                setIsBalanceButtonActive(true)
            }).catch(error => {
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

    const handlePurChaseTest = () => {
        if (isPurchaseTestButtonActive) {
            axios.post(`/v1/users/purchase-test/`, {
                test: id
            }).then(() => {
                handleAlert("success", "Test muvaffaqiyatli sotib olindi")
                handlePurchaseTestModal()
                handleRefreshData()
                setIsPurchaseTestButtonActive(true)
            }).catch(error => {
                if (error?.response?.status === 401) {
                    handleAuth()
                    setIsPurchaseTestButtonActive(true)
                } else {
                    handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
                    setIsPurchaseTestButtonActive(true)
                }
            })
        }
        setIsPurchaseTestButtonActive(false)
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
                <div className={styles["payment-title"]}>
                    {
                        page === 1 ? `${title} testi uchun to‘lovni amalga oshirish` : `Hisobni to‘ldirish`
                    }
                </div>
                <div className={styles.click}>
                    <span>To‘lov usuli:</span><ClickIcon/>
                </div>
                <div className={styles.label}>Siznig hisobingiz</div>
                <div className={styles.balance}>
                    <div className={styles.icon}>
                        <BankIcon/>
                    </div>
                    <div style={{width:"30rem"}} className={styles.sum}>
                        {balance || 0} so‘m
                    </div>
                </div>
                <div className={styles.label}>
                    {
                        page === 1 ? 'Test uchun yechib olinadigan summa' : 'Summani kiriting'
                    }
                </div>
                {
                    page === 1 ?
                        <div className={styles.balance}>
                            <div className={styles.icon}>
                                <BankIcon/>
                            </div>
                            <div style={{color: "#EB3741"}} className={styles.sum}>
                                -{price || 0} so‘m
                            </div>
                        </div> :
                        <form
                            onSubmit={e => {
                                e.preventDefault()
                            }}
                            className={styles["payment-form"]}
                            style={errors?.balance ? {borderColor: "red"} : null}
                        >
                            <span className={styles.icon}>
                                <BankIcon/>
                            </span>
                            <Controller
                                control={control}
                                name="balance"
                                rules={{
                                    validate: {
                                        required: (value) => {
                                            if (!value || value?.trim().length <= 1) {
                                                return "Ushbu maydon to‘ldirilishi shart"
                                            }
                                        },
                                        minLength: (value) => {
                                            if (value?.trim().length < 4) {
                                                return "Minimal summa 1.000 so‘m"
                                            }
                                        },
                                        maxLength: (value) => {
                                            if (value?.trim().length >= 7) {
                                                return "Maksimal summa 999.999 so‘m"
                                            }
                                        },
                                    }
                                }}
                                render={({
                                             field: {onChange, onBlur, value, ref},
                                         }) => (
                                    <CurrencyInput
                                        id="balance"
                                        name="balance"
                                        placeholder="Summani kiriting"
                                        disableAbbreviations={true}
                                        allowDecimals={false}
                                        defaultValue={value}
                                        allowNegativeValue={false}
                                        maxLength={6}
                                        ref={ref}
                                        value={value}
                                        onBlur={onBlur}
                                        groupSeparator="."
                                        decimalSeparator=","
                                        onKeyDown={handleLoginInputKeyDown}
                                        onValueChange={(v) => {
                                            if (!v) {
                                                onChange("")
                                            } else {
                                                onChange(v)
                                            }
                                        }}
                                    />
                                )}
                            />
                            <span className={styles["helper-text"]}>{errors?.balance?.message}</span>
                            <span className={styles.uzs}>so‘m</span>
                        </form>
                }
                <div className={styles.buttons}>
                    {
                        page === 1 && <button onClick={() => setPage(2)}>
                            Hisobni to‘ldirish
                        </button>
                    }
                    {
                        page === 2 &&
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
                            To‘lovni amalga oshirish
                        </button>
                    }
                    {
                        balance && +balance >= +price && page === 1 ?
                            <button
                                onClick={handlePurChaseTest}
                                className={styles.active}
                                style={!isPurchaseTestButtonActive ? {
                                    background: "rgba(192, 192, 192, 0.3)",
                                    color: "rgba(192, 192, 192, 1)",
                                    cursor: "not-allowed"
                                } : null}
                            >
                                Sotib olish
                            </button> : null
                    }
                    {
                        page === 2 && !propPage ? < button onClick={() => setPage(1)}>
                            Orqaga
                        </button> : null
                    }
                </div>
            </div>
        </Modal>
    );
};

export default PurchaseTestModal;
