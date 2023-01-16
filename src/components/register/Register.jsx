import React, {useContext, useEffect} from 'react';
import loginStyles from "../login/Login.module.css"
import {Controller, useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import {customTrim} from "../../utils/utils";
import Phone from "../../assets/icons/loginIcons/Phone";
import Login from "../../assets/icons/loginIcons/Login";
import axios from '../../axios'
import {ctx} from "../../App";

const Register = ({handlePage, handleUser, user}) => {
    const {handleAuth, handleAlert} = useContext(ctx)
    const {
        handleSubmit,
        register,
        reset,
        setFocus,
        control,
        formState: {errors},
    } = useForm({
        defaultValues: user?.resetPwd ? {
            phone: "",
        } : {...user},
        mode: "onSubmit",
    });

    useEffect(() => {
        setFocus("firstName")
    }, [])

    const handleFirstNameInputKeyDown = (e) => {
        if (e.key === "Enter") {
            document.querySelector("[data-name='lastName']").focus();
        }
    };
    const handleLastNameInputKeyDown = (e) => {
        if (e.key === "Enter") {
            document.querySelector("[data-name='phone']").focus();
        }
    };
    const handlePhoneInputKeyDown = (e, value) => {
        if (e.key === "Enter" && value.length === 17) {
            document.querySelector("[data-name='submit']").click();
            document.querySelector("[data-name='firstName']").focus();
        }
    };

    const onSubmit = (data) => {
        data.firstName = data.firstName.trim()
        data.lastName = data.lastName.trim()
        handleUser({...data, resetPwd: false})
        data.phone = data.phone.trim().split(" ").join("").slice(1).toLowerCase()
        axios.post("/v1/users/send-sms-code/", {
            phone: data.phone
        }).then(() => {
            handlePage(2)
            handleAlert("success", "Ko‘rsatilgan telefon raqamiga tasdiqlash kodi yuborildi")
            reset()
        }).catch(error => {
            if (error.response.status === 401) {
                handleAuth()
            }
            handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
            reset()
        })
    };

    return (
        <section className={loginStyles.self}>
            <h3>Ro‘yatdan o‘tish</h3>
            <form
                onSubmit={e => {
                    e.preventDefault()
                }}
            >
                <div>
                    <input
                        {...register("firstName", {
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
                        onKeyDown={handleFirstNameInputKeyDown}
                        data-name="firstName"
                        autoComplete="on"
                        placeholder="Ismingizni kiriting"
                        style={errors?.firstName ? {borderColor: "red"} : null}
                    />
                    <span onClick={() => setFocus("firstName")} className={loginStyles.icon}>
                        <Login/>
                    </span>
                    {errors?.firstName?.type === "required" ? (
                        <span className={loginStyles["helper-text"]}>
                            Ushbu maydon to‘ldirilishi shart
                        </span>
                    ) : null}
                    {errors?.firstName?.type === "whiteSpace" ? (
                        <span className={loginStyles["helper-text"]}>
                            Bosh joy tashlash mumkin emas
                        </span>
                    ) : null}
                    {errors?.firstName?.type === "minLength" ? (
                        <span className={loginStyles["helper-text"]}>
                            Ismingiz kamida 3 ta belgidan iborat bo‘lishi
                            kerak
                        </span>
                    ) : null}
                    {errors?.firstName?.type === "maxLength" ? (
                        <span className={loginStyles["helper-text"]}>
                            Ismingiz 30 ta belgidan oshmasligi kerak
                        </span>
                    ) : null}
                </div>
                <div style={{marginTop: "2.5rem"}}>
                    <input
                        {...register("lastName", {
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
                        data-name="lastName"
                        onKeyDown={handleLastNameInputKeyDown}
                        autoComplete="on"
                        placeholder="Familiyangizni kiriting"
                        style={errors?.lastName ? {borderColor: "red"} : null}
                    />
                    <span onClick={() => setFocus("lastName")} className={loginStyles.icon}>
                        <Login/>
                    </span>
                    {errors?.lastName?.type === "required" ? (
                        <span className={loginStyles["helper-text"]}>
                            Ushbu maydon to‘ldirilishi shart
                        </span>
                    ) : null}
                    {errors?.lastName?.type === "whiteSpace" ? (
                        <span className={loginStyles["helper-text"]}>
                            Bosh joy tashlash mumkin emas
                        </span>
                    ) : null}
                    {errors?.lastName?.type === "minLength" ? (
                        <span className={loginStyles["helper-text"]}>
                            Familiyangiz kamida 3 ta belgidan iborat bo‘lishi kerak
                        </span>
                    ) : null}
                    {errors?.lastName?.type === "maxLength" ? (
                        <span className={loginStyles["helper-text"]}>
                            Familiyangiz 30 ta belgidan oshmasligi kerak
                        </span>
                    ) : null}
                </div>

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
                                 field: {onChange, onBlur, value, ref},
                             }) => (
                        <InputMask
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            maskChar=""
                            alwaysShowMask={false}
                            mask="+\9\98 99 999 99 99"
                            placeholder="Telefon raqamingizni kiriting"
                        >
                            {(inputProps) => (
                                <div style={{marginTop: "2.5rem"}}>
                                    <input
                                        {...inputProps}
                                        type="text"
                                        data-name="phone"
                                        ref={ref}
                                        autoComplete="on"
                                        onKeyDown={(e) => handlePhoneInputKeyDown(e, value)}
                                        style={
                                            errors?.phone
                                                ? {borderColor: "red"}
                                                : null
                                        }
                                    />
                                    <span onClick={() => setFocus("phone")} className={loginStyles.icon}>
                                        <Phone/>
                                    </span>
                                    {errors?.phone ? (
                                        <span
                                            className={
                                                loginStyles["helper-text"]
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
            </form>
            <div className={loginStyles.buttons}>
                <button onClick={handleSubmit(onSubmit)} data-name="submit" type="button">Davom etish</button>
                <button
                    className={loginStyles.register}
                    onClick={() => handlePage(5)}
                    type="button"
                >
                    Orqaga
                </button>
            </div>
        </section>
    );
};

export default Register;