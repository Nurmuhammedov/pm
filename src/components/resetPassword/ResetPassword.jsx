import React, {useContext, useEffect} from 'react';
import {Controller, useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import Phone from "../../assets/icons/loginIcons/Phone";
import loginStyles from "../login/Login.module.css";
import axios from "../../axios";
import {ctx} from "../../App";

const ResetPassword = ({handlePage, handleUser}) => {
    const {handleAlert, handleAuth} = useContext(ctx)
    const {
        handleSubmit,
        reset,
        setFocus,
        control,
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

    const onSubmit = (data) => {
        handleUser({...data, resetPwd: true})
        data.phone = data.phone.trim().split(" ").join("").slice(1).toLowerCase()
        axios.post("/v1/users/send-sms-code/", {
            phone: data.phone
        }).then(() => {
            handleAlert("success", "Ko‘rsatilgan telefon raqamiga tasdiqlash kodi yuborildi")
            handlePage(2)
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
            <h3>Telefon raqamingizni <br/> kiriting</h3>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    document.querySelector("[data-name='submit']").click();
                }}
            >
                <Controller
                    name="phone"
                    control={control}
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
                                <div style={{marginTop: "2.5rem"}}>
                                    <input
                                        {...inputProps}
                                        type="text"
                                        data-name="phone"
                                        ref={ref}
                                        autoComplete="on"
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

export default ResetPassword;