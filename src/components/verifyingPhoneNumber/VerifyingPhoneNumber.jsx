import React, {useContext, useEffect, useRef, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import PasswordIcon from "../../assets/icons/loginIcons/Password";
import Phone from "../../assets/icons/loginIcons/Phone";
import styles from "./VerifyingPhoneNumber.module.css";
import loginStyles from "../login/Login.module.css";
import axios from '../../axios'
import {ctx} from "../../App";

const VerifyingPhoneNumber = ({user, handlePage}) => {
    const {handleAuth, handleAlert} = useContext(ctx)
    const [timer, setTimer] = useState(180); // 3 minutes
    const tick = useRef(); // <-- React ref
    const {
        handleSubmit,
        reset,
        control,
        setFocus,
        formState: {errors},
    } = useForm({
        defaultValues: {
            code: "",
        },
        mode: "onTouched",
    });

    useEffect(() => {
        setFocus("code")
    }, [])

    useEffect(() => {
        if (timer > 0) {
            tick.current = setInterval(() => { // <-- set tick ref current value
                setTimer((timer) => timer - 1);
            }, 1000);
        } else {
            clearInterval(tick.current); // <-- access tick ref current value
        }
        return () => clearInterval(tick.current); // <-- clear on unmount!
    }, [timer]);

    const handleCodeInputKeyDown = (e, value) => {
        if (e.key === "Enter" && value.length === 5) {
            document.querySelector("[data-name='submit']").click();
            document.querySelector("[data-name='code']").focus();
        }
    };
    const handleResendCode = () => {
        if (user && timer === 0) {
            setTimer(180)
        }
    }

    const onSubmit = (data) => {
        if (user?.phone) {
            axios.post("/v1/users/check-sms-code/", {
                phone: user.phone.trim().split(" ").join("").slice(1).toLowerCase(),
                code: +data.code.trim()
            }).then(() => {
                handlePage(3)
                reset()
            }).catch(error => {
                if (error.response.status === 401) {
                    handleAuth()
                }
                handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
                reset()
            })
        }
    };
    return (
        <section className={loginStyles.self}>
            <h3>Telefon raqamni tasdiqlash</h3>
            <p>
                Ko‘rsatilgan telefon raqamiga yuborilgan <br/> tasdiqlash kodini kiriting
            </p>
            <form
                onSubmit={e => {
                    e.preventDefault()
                }}
            >
                <div className={styles.phone}>
                    <div>{user?.phone}</div>
                    <span onClick={() => setFocus("phone")} className={loginStyles.icon}>
                        <Phone/>
                    </span>
                </div>
                <Controller
                    control={control}
                    name="code"
                    rules={{
                        required: {
                            value: true,
                            message: "Ushbu maydon to‘ldirilishi shart",
                        },
                        minLength: {
                            value: 5,
                            message:
                                "Tasdiqlash kodi xato kiritildi",
                        },
                    }}
                    render={({
                                 field: {value, ref, ...rest},
                             }) => (
                        <InputMask
                            {...rest}
                            value={value}
                            maskChar=""
                            alwaysShowMask={false}
                            mask="99999"
                            placeholder="Tasdiqlash kodini kiriting"
                        >
                            {(inputProps) => (
                                <div style={{marginTop: "2.5rem"}}>
                                    <input
                                        onKeyDown={(e) => handleCodeInputKeyDown(e, value)}
                                        {...inputProps}
                                        type="text"
                                        data-name="code"
                                        ref={ref}
                                        autoComplete="on"
                                        style={
                                            errors?.code
                                                ? {borderColor: "red"}
                                                : null
                                        }
                                    />
                                    <span onClick={() => setFocus("login")} className={loginStyles.icon}>
                                        <PasswordIcon/>
                                    </span>
                                    {errors?.code ? (
                                        <span
                                            className={
                                                loginStyles["helper-text"]
                                            }
                                        >
                                                {errors?.code?.message}
                                            </span>
                                    ) : null}
                                </div>
                            )}
                        </InputMask>
                    )}
                />
                <div className={styles["timer-container"]}>
                    <span
                        onClick={handleResendCode}
                        className={loginStyles["reset-password"]}
                        style={timer !== 0 ? {color: 'silver', cursor: "not-allowed"} : null}
                    >
                        Qayta yuborish
                    </span>
                    <span style={timer === 0 ? {color: "red"} : null} className={styles.timer}>
                        {`${Math.floor(timer / 60) <= 9 ? "0" : ""}${Math.floor(timer / 60)}:${Math.floor(timer % 60) < 9 ? "0" : ""}${Math.floor(timer % 60)}`}
                    </span>
                </div>
            </form>
            <div className={loginStyles.buttons}>
                <button onClick={handleSubmit(onSubmit)} data-name="submit" type="button">Tasdiqlash</button>
                <button
                    type="button"
                    className={loginStyles.register}
                    onClick={() => {
                        if (user?.resetPwd) {
                            handlePage(4)
                        } else {
                            handlePage(1)
                        }
                    }}
                >
                    Orqaga
                </button>
            </div>
        </section>
    );
};

export default VerifyingPhoneNumber;