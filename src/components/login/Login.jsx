import React, {useState} from "react";
import styles from "./Login.module.css";
import {Controller, useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import {customTrim} from "../../utils/utils";
import LoginIcon from "../../assets/icons/loginIcons/Login";
import PasswordIcon from "../../assets/icons/loginIcons/Password";
import {Link, useNavigate} from "react-router-dom";
import Eye from "../../assets/icons/loginIcons/Eye";

const Login = () => {
    const navigate = useNavigate();
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
            login: "",
        },
        mode: "onSubmit",
    });

    const handleLoginInputKeyDown = (e) => {
        if (e.key === "Enter") {
            document.querySelector("[data-name='password']").focus();
        }
    };

    const handlePasswordInputKeyDown = (e) => {
        if (e.key === "Enter") {
            document.querySelector("[data-name='submit']").click();
            document.querySelector("[data-name='login']").focus();
        }
    };
    const onSubmit = (data) => {
        data.login = data.login.trim().split(" ").join("").slice(1, -1).toLowerCase()
        data.password = data.password.trim().toLowerCase()
        let formData = new FormData();
        formData.append("login", data.login.trim().split(" ").join("").slice(1, -1).toLowerCase());
        formData.append("password", data.password.trim().toLowerCase());
        console.log(data);
        reset();
    };

    return (
        <section className={styles.self}>
            <h3>Tizimga kirish</h3>
            <p>
                Tizimdan ro‘yhatdan o‘tmagan bo‘lsangiz <span
                style={{color: "#0173FF", cursor: "pointer"}}
                onClick={() => navigate("/register")}
            >
                    “Ro‘yatdan o‘tish”
                </span>{" "}
                tugmasini bosing
            </p>
            <form>
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
                                <div>
                                    <input
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && value.length === 17) {
                                                document.querySelector("[data-name='password']").focus();
                                            } else {
                                                document.querySelector("[data-name='login']").focus();

                                            }
                                        }}
                                        {...inputProps}
                                        type="text"
                                        data-name="login"
                                        ref={ref}
                                        autoComplete="on"
                                        style={
                                            errors?.login
                                                ? {borderColor: "red"}
                                                : null
                                        }
                                    />
                                    <span onClick={() => setFocus("login")} className={styles.icon}>
                                            <LoginIcon/>
                                        </span>
                                    {errors?.login ? (
                                        <span
                                            className={
                                                styles["helper-text"]
                                            }
                                        >
                                                {errors?.login?.message}
                                            </span>
                                    ) : null}
                                </div>
                            )}
                        </InputMask>
                    )}
                />
                <div className={styles["pwd-container"]} style={{marginTop: "3rem"}}>
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
                        onBlur={() => setIsPasswordInputTypeText(false)}
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
                        onClick={() => setIsPasswordInputTypeText(p => !p)}
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
                <Link to="/reset-password" style={{marginTop: "2rem"}} className={styles["reset-password"]}>
                    Maxfiy so‘zni unutdingizmi?
                </Link>
            </form>
            <div className={styles.buttons}>
                <button onClick={handleSubmit(onSubmit)} data-name="submit" type="button">Davom etish</button>
                <Link to="/register">
                    <button type="button">Ro‘yatdan o‘tish</button>
                </Link>
            </div>
        </section>
    );
};

export default Login;
