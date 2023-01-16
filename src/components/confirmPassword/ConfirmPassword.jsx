import React, {useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import styles from "../login/Login.module.css";
import {customTrim} from "../../utils/utils";
import PasswordIcon from "../../assets/icons/loginIcons/Password";
import Eye from "../../assets/icons/loginIcons/Eye";
import axios from "../../axios";
import {ctx} from "../../App";
import loginStyles from "../login/Login.module.css";

const ConfirmPassword = ({handlePage, handleUser, user}) => {
        const {handleAuthModal, handleAlert, handleAuth} = useContext(ctx)
        const [isPasswordInputTypeText, setIsPasswordInputTypeText] = useState(false);
        const [isConfirmPasswordInputTypeText, setIsConfirmPasswordInputTypeText] = useState(false);
        const {
            handleSubmit,
            register,
            reset,
            watch,
            setFocus,
            formState: {errors},
        } = useForm({
            defaultValues: {
                pwd: "",
                confirmPassword: ""
            },
            mode: "onSubmit",
        });

        useEffect(() => {
            setFocus("pwd")
        }, [])
        const handlePasswordInputKeyDown = (e) => {
            if (e.key === "Enter") {
                document.querySelector("[data-name='confirmPassword']").focus();
            }
        };
        const handleConfirmPasswordInputKeyDown = (e) => {
            if (e.key === "Enter") {
                document.querySelector("[data-name='submit']").click();
            }
        };

        const onSubmit = (data) => {
            if (user?.resetPwd) {
                axios.patch("/v1/users/update-user-password/", {
                    phone: user.phone.trim().split(" ").join("").slice(1).toLowerCase(),
                    password: data.pwd.trim(),
                    show_password: data.confirmPassword.trim()
                }).then(() => {
                    handleUser(null)
                    handleAuthModal(false)
                    handleAlert("success", "Maxfiy so‘z muvaffaqiyatli o‘zgartirildi")
                    handlePage(5)
                }).catch(error => {
                    if (error.response.status === 401) {
                        handleAuth()
                    }
                    handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
                    reset()
                })
            } else {
                axios.post("/v1/users/register/", {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    phone: user.phone.trim().split(" ").join("").slice(1).toLowerCase(),
                    password: data.pwd.trim(),
                    show_password: data.confirmPassword.trim()
                }).then(() => {
                    handleUser(null)
                    handleAlert("success", "Muvaffaqiyatli ro‘yhatdan o‘tdingiz")
                    handlePage(5)
                }).catch(error => {
                    if (error.response.status === 401) {
                        handleAuth()
                    }
                    handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
                    reset()
                })
            }
        }

        return (
            <section className={styles.self}>
                <h3>{user?.resetPwd ? "Maxfiy so‘zni o‘zgartirish" : "Maxfiy so‘zni yaratish"}</h3>
                <p>
                    Yaratgan maxfiy so‘zingizni yodingizdan chiqarmang!
                </p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={styles["pwd-container"]} style={{marginTop: "2.5rem"}}>
                        <input
                            {...register("pwd", {
                                required: true,
                                validate: {
                                    whiteSpace: (value) =>
                                        customTrim(value).length > 0,
                                    minLength: (value) =>
                                        customTrim(value).split(" ").join("").length >= 6,
                                    maxLength: (value) =>
                                        customTrim(value).length <= 32,
                                },
                            })}
                            type={isPasswordInputTypeText ? "text" : "password"}
                            data-name="password"
                            autoComplete="on"
                            onKeyDown={handlePasswordInputKeyDown}
                            placeholder="Maxfiy so‘zni kiriting"
                            style={errors?.pwd ? {borderColor: "red"} : null}
                        />
                        <span onClick={() => setFocus("pwd")} className={styles.icon}>
                        <PasswordIcon/>
                    </span>
                        <span
                            className={styles["eye-icon"]}
                            onClick={() => {
                                setIsPasswordInputTypeText(p => !p)
                            }}
                        >
                        <Eye/>
                    </span>
                        {errors?.pwd?.type === "required" ? (
                            <span className={styles["helper-text"]}>
                            Ushbu maydon to‘ldirilishi shart
                        </span>
                        ) : null}
                        {errors?.pwd?.type === "whiteSpace" ? (
                            <span className={styles["helper-text"]}>
                            Bosh joy tashlash mumkin emas
                        </span>
                        ) : null}
                        {errors?.pwd?.type === "minLength" ? (
                            <span className={styles["helper-text"]}>
                            Maxfiy so‘z kamida 6 ta belgidan iborat bo‘lishi
                            kerak
                        </span>
                        ) : null}
                        {errors?.pwd?.type === "maxLength" ? (
                            <span className={styles["helper-text"]}>
                            Maxfiy so‘z 32 ta belgidan oshmasligi kerak
                        </span>
                        ) : null}
                    </div>

                    <div className={styles["pwd-container"]} style={{marginTop: "2.5rem"}}>
                        <input
                            {...register("confirmPassword", {
                                required: true,
                                validate: {
                                    whiteSpace: (value) =>
                                        customTrim(value).length > 0,
                                    minLength: (value) =>
                                        customTrim(value).split(" ").join("").length >= 6,
                                    maxLength: (value) =>
                                        customTrim(value).length <= 32,
                                    confirm: (value) => {
                                        return watch("pwd") === value
                                    },
                                },
                            })}
                            type={isConfirmPasswordInputTypeText ? "text" : "password"}
                            data-name="confirmPassword"
                            autoComplete="on"
                            onKeyDown={handleConfirmPasswordInputKeyDown}
                            placeholder="Maxfiy so‘zni qayta kirting"
                            style={errors?.confirmPassword ? {borderColor: "red"} : null}
                        />
                        <span onClick={() => setFocus("confirmPassword")} className={styles.icon}>
                        <PasswordIcon/>
                    </span>
                        <span
                            className={styles["eye-icon"]}
                            onClick={() => {
                                setIsConfirmPasswordInputTypeText(p => !p)
                            }}
                        >
                        <Eye/>
                    </span>
                        {errors?.confirmPassword?.type === "required" ? (
                            <span className={styles["helper-text"]}>
                            Ushbu maydon to‘ldirilishi shart
                        </span>
                        ) : null}
                        {errors?.confirmPassword?.type === "whiteSpace" ? (
                            <span className={styles["helper-text"]}>
                            Bosh joy tashlash mumkin emas
                        </span>
                        ) : null}
                        {errors?.confirmPassword?.type === "minLength" ? (
                            <span className={styles["helper-text"]}>
                            Maxfiy so‘z kamida 6 ta belgidan iborat bo‘lishi
                            kerak
                        </span>
                        ) : null}
                        {errors?.confirmPassword?.type === "maxLength" ? (
                            <span className={styles["helper-text"]}>
                            Maxfiy so‘z 32 ta belgidan oshmasligi kerak
                        </span>
                        ) : null}
                        {errors?.confirmPassword?.type === "confirm" ? (
                            <span className={styles["helper-text"]}>
                            Maxfiy so‘zlar mos kelmadi
                        </span>
                        ) : null}
                    </div>
                </form>
                <div className={styles.buttons}>
                    <button onClick={handleSubmit(onSubmit)} data-name="submit" type="button">
                        {user?.resetPwd ? "O‘zgartirish" : "Tizimga kirish"}
                    </button>
                    <button
                        className={loginStyles.register}
                        onClick={() => {
                            handleAuthModal(false)
                            handlePage(5)
                        }}
                        type="button"
                    >
                        Bekor qilish
                    </button>
                </div>
            </section>
        );
    }
;

export default ConfirmPassword;