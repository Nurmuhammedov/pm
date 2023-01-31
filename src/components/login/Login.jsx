import React, {useContext, useEffect, useState} from "react";
import styles from "./Login.module.css";
import {Controller, useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import {customTrim} from "../../utils/utils";
import LoginIcon from "../../assets/icons/loginIcons/Login";
import PasswordIcon from "../../assets/icons/loginIcons/Password";
import Eye from "../../assets/icons/loginIcons/Eye";
import axios from "../../axios";
import {ctx} from "../../App";

const Login = ({handlePage}) => {
    const {handleAlert, handleAuth, handleLoginModal} = useContext(ctx)
    const [isPasswordInputTypeText, setIsPasswordInputTypeText] = useState(false);
    const {
        handleSubmit,
        register,
        reset,
        control,
        setFocus,
        formState: {errors},
    } = useForm({
        defaultValues: {
            phone: "",
        },
        mode: "onTouched",
    });

    useEffect(() => {
        setFocus("phone")
    }, [])
    const handleLoginInputKeyDown = (e, value) => {
        if (e.key === "Enter" && value.length === 17) {
            document.querySelector("[data-name='password']").focus();
        }
    };
    const handlePasswordInputKeyDown = (e) => {
        if (e.key === "Enter") {
            document.querySelector("[data-name='submit']").click();
        }
    };
    const onSubmit = (data) => {
        data.phone = data.phone.trim().split(" ").join("").slice(1).toLowerCase()
        data.password = data.password.trim()
        axios.post('/v1/login/', {...data}).then(r => {
            localStorage.setItem("accessToken", r.data?.access)
            handleAuth({balance: r.data?.balance})
            handleAlert("success", "Tizimga muvaffaqiyatli kirdingiz!")
            handleLoginModal(false)
            reset()
        }).catch(error => {
            if (error?.response?.status === 401) {
                handleAuth()
            }
            reset()
            handleAlert("error", error?.response?.detail || "Telefon raqam yoki maxfiy so‘z xato!")
        })
    };

    return (
        <section className={styles.self}>
            <h3>Tizimga kirish</h3>
            <p>
                Tizimdan ro‘yhatdan o‘tmagan bo‘lsangiz <br/><span
                style={{color: "#0173FF", cursor: "pointer"}}
                onClick={() => handlePage(1)}
            >
                    “Ro‘yatdan o‘tish”
                </span> tugmasini bosing
            </p>
            <form
                onSubmit={e => {
                    e.preventDefault()
                }}
            >
                <Controller
                    control={control}
                    name="phone"
                    rules={{
                        required: {
                            value: true,
                            message: "Ushbu maydon to‘ldirilishi shart",
                        },
                        minLength: {
                            value: 17,
                            message:
                                "Kiritilgan telefon raqam yaroqli emas",
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
                            mask="+\9\98 99 999 99 99"
                            placeholder="Telefon raqamingizni kiriting"
                        >
                            {(inputProps) => (
                                <div>
                                    <input
                                        onKeyDown={(e) => handleLoginInputKeyDown(e, value)}
                                        {...inputProps}
                                        type="text"
                                        data-name="login"
                                        ref={ref}
                                        autoComplete="on"
                                        style={
                                            errors?.phone
                                                ? {borderColor: "red"}
                                                : null
                                        }
                                    />
                                    <span onClick={() => setFocus("phone")} className={styles.icon}>
                                            <LoginIcon/>
                                        </span>
                                    {errors?.phone ? (
                                        <span
                                            className={
                                                styles["helper-text"]
                                            }
                                        >
                                                {errors?.phone?.message}
                                            </span>
                                    ) : null}
                                </div>
                            )}
                        </InputMask>
                    )}
                />
                <div className={styles["pwd-container"]} style={{marginTop: "2.5rem"}}>
                    <input
                        {...register("password", {
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
                        style={errors?.password ? {borderColor: "red"} : null}
                    />
                    <span onClick={() => setFocus("password")} className={styles.icon}>
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
                    {errors?.password?.type === "required" ? (
                        <span className={styles["helper-text"]}>
                            Ushbu maydon to‘ldirilishi shart
                        </span>
                    ) : null}
                    {errors?.password?.type === "whiteSpace" ? (
                        <span className={styles["helper-text"]}>
                            Bosh joy tashlash mumkin emas
                        </span>
                    ) : null}
                    {errors?.password?.type === "minLength" ? (
                        <span className={styles["helper-text"]}>
                            Maxfiy so‘z kamida 6 ta belgidan iborat bo‘lishi
                            kerak
                        </span>
                    ) : null}
                    {errors?.password?.type === "maxLength" ? (
                        <span className={styles["helper-text"]}>
                            Maxfiy so‘z 32 ta belgidan oshmasligi kerak
                        </span>
                    ) : null}
                </div>
                <span
                    onClick={() => handlePage(4)}
                    style={{marginTop: "2rem", cursor: 'pointer'}}
                    className={styles["reset-password"]}
                >
                    Maxfiy so‘zni unutdingizmi?
                </span>
            </form>
            <div className={styles.buttons}>
                <button onClick={handleSubmit(onSubmit)} data-name="submit" type="button">Davom etish</button>
                <button onClick={() => handlePage(1)} className={styles.register} type="button">
                    Ro‘yatdan o‘tish
                </button>
            </div>
        </section>
    );
};

export default Login;
