import React from "react";
import styles from "./Login.module.css";
import {Controller, useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import {customTrim} from "../../utils/utils";
import LoginIcon from "../../assets/icons/loginIcons/Login"
import PasswordIcon from "../../assets/icons/loginIcons/Password";

const Login = () => {
    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: {errors},
    } = useForm({
        defaultValues: {
            login: "",
            comment: "",
        },
        mode: "onTouched",
    });


    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append('login', data.login.trim())
        formData.append('password', data.password.trim());
        console.log(data)
        reset()
    }


    return (
        <section className={styles.self}>
            <h3>Tizimga kirish</h3>
            <p>
                Tizimdan ro‘yhatdan o‘tmagan bo‘lsangiz <span
                style={{color: "#0173FF"}}>“Ro‘yatdan o‘tish”</span> tugmasini bosing
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="login"
                    rules={{
                        required: {
                            value: true,
                            message: "Ushbu maydon to‘ldirilishi shart",
                        },
                        minLength: {
                            value: 17,
                            message: "Kiritilgan telefon raqam yaroqli emas",
                        },
                    }}
                    render={({field: {onChange, onBlur, value, ref}}) => (
                        <InputMask
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            maskChar=""
                            alwaysShowMask={false}
                            mask="+\9\98 99 999 99 99"
                            placeholder="Telefon raqamingiz"
                        >
                            {(inputProps) => (
                                <div>
                                    <input
                                        {...inputProps}
                                        ref={ref}
                                        type="text"
                                        style={
                                            errors?.login
                                                ? {borderColor: "red"}
                                                : null
                                        }
                                    />
                                    <span>
                                        <LoginIcon/>
                                    </span>
                                </div>
                            )}
                        </InputMask>
                    )}
                />
                {
                    errors?.login ? (
                        <span style={{color: "red"}}>
                        {errors?.login?.message}
                    </span>
                    ) : null
                }

                <div>
                    <input
                        {...register('password', {
                            required: true,
                            validate: {
                                whiteSpace: value => customTrim(value).length > 0,
                                minLength: value => customTrim(value).length >= 6,
                                maxLength: value => customTrim(value).length <= 32
                            }
                        })}
                        type="password"
                        style={errors?.password ? {borderColor: "red"} : null}
                    />
                    <span>
                        <PasswordIcon/>
                    </span>
                </div>
                {errors?.password?.type === "required" ? <span style={{color: "red"}}>
                                Ushbu maydon to‘ldirilishi shart
                            </span> : null}
                {errors?.password?.type === "whiteSpace" ? <span style={{color: "red"}}>
                                Bosh joy tashlash mumkin emas
                            </span> : null}
                {errors?.password?.type === "minLength" ? <span style={{color: "red"}}>
                                Ismingiz kamida 6 ta belgidan iborat bo‘lishi kerak
                            </span> : null}
                {errors?.password?.type === "maxLength" ? <span style={{color: "red"}}>
                                Ismingiz 32 ta belgidan oshmasligi kerak
                            </span> : null}


                <button type="button">Ro‘yatdan o‘tish</button>
                <button type="submit">Davom etish</button>
            </form>
        </section>
    );
};

export default Login;
