import React from 'react';
import {useForm, Controller} from "react-hook-form";
import InputMask from 'react-input-mask';
import homeChannelsStyles from "../../pages/home/homeTelegramChannels/HomeChannels.module.css";
import backgroundImage from "../../assets/images/carousel.jpg"
import styles from "./ContactUs.module.css";
import {customTrim} from "../../utils/utils";
import FaceBook from "../../assets/icons/socialNetwoks/FaceBook";
import Telegram from "../../assets/icons/socialNetwoks/Telegram";
import YouTube from "../../assets/icons/socialNetwoks/YouTube";
import Instagram from "../../assets/icons/socialNetwoks/Instagram";

const ContactUs = () => {
    const {handleSubmit, register, reset, control, formState: {errors}} = useForm({
        defaultValues: {
            firstName: "",
            phone: "",
            comment: ""
        },
        mode: "onTouched"
    });


    return <section style={{marginBottom: "10rem"}} className={`${homeChannelsStyles.self} container`}>
        <h2 style={{marginBottom: "3rem"}}>Biz bilan bog‘lanish</h2>
        <div
            className={styles.self}
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
        >
            <div className={styles.title}>
                <h3>Savol va takliflaringiz bo‘lsa biz bilan bog‘laning</h3>
                <div className={styles["social-networks"]}>
                    <div>
                        <span>
                            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                                <FaceBook/>
                            </a>
                            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                                <Telegram/>
                            </a>
                            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                                <YouTube/>
                            </a>
                            <a href="https://www.google.com/" target="_blank" rel="noreferrer">
                                <Instagram/>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div className={styles["contact-us"]}>
                    <div className={styles["contact-us__title"]}>
                        O‘zimiz aloqaga chiqamiz
                    </div>
                    <form
                        onSubmit={handleSubmit(data => {
                            let formData = new FormData();
                            formData.append('firstName', data.firstName.trim())
                            formData.append('phone', data.phone.trim());
                            formData.append('comment', data.comment.trim());
                            reset()
                        })}
                        className={styles["contact-us__form"]}
                    >
                        <input
                            {...register('firstName', {
                                required: true,
                                validate: {
                                    whiteSpace: value => customTrim(value).length > 0,
                                    minLength: value => customTrim(value).length >= 3,
                                    maxLength: value => customTrim(value).length <= 50
                                }
                            })}
                            type="text"
                            placeholder="Ismingiz kiriting"
                            style={errors?.firstName ? {borderColor: "red"} : null}
                        />
                        {errors?.firstName?.type === "required" ? <span style={{color: "red"}}>
                                Ushbu maydon to‘ldirilishi shart
                            </span> : null}
                        {errors?.firstName?.type === "whiteSpace" ? <span style={{color: "red"}}>
                                Bosh joy tashlash mumkin emas
                            </span> : null}
                        {errors?.firstName?.type === "minLength" ? <span style={{color: "red"}}>
                                Ismingiz kamida 3 ta belgidan iborat bo‘lishi kerak
                            </span> : null}
                        {errors?.firstName?.type === "maxLength" ? <span style={{color: "red"}}>
                                Ismingiz 50 ta belgidan oshmasligi kerak
                            </span> : null}
                        <Controller
                            control={control}
                            name="phone"
                            rules={
                                {
                                    required: {value: true, message: "Ushbu maydon to‘ldirilishi shart"},
                                    minLength: {
                                        value: 17,
                                        message: "Kiritilgan telefon raqam yaroqli emas"
                                    },
                                }
                            }
                            render={({field: {onChange, onBlur, value, ref}}) => <InputMask
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                maskChar=""
                                alwaysShowMask={false}
                                mask="+\9\98 99 999 99 99"
                                placeholder="Telefon raqamingiz"
                            >
                                {
                                    inputProps => (
                                        <input
                                            {...inputProps}
                                            ref={ref}
                                            type="tel"
                                            style={errors?.phone ? {borderColor: "red"} : null}
                                        />
                                    )
                                }
                            </InputMask>
                            }
                        />
                        {errors?.phone ? <span style={{color: "red"}}>
                               {errors?.phone?.message}
                            </span> : null}
                        <textarea
                            {...register('comment', {
                                required: true,
                                validate: {
                                    whiteSpace: value => customTrim(value).length > 0,
                                    minLength: value => customTrim(value).length >= 5,
                                    maxLength: value => customTrim(value).length <= 3000
                                }
                            })}
                            rows={5}
                            placeholder="Murojaatingiz izohi"
                            style={errors?.comment ? {borderColor: "red"} : null}
                        />
                        {errors?.comment?.type === "required" ? <span style={{color: "red"}}>
                                Ushbu maydon to‘ldirilishi shart
                            </span> : null}
                        {errors?.comment?.type === "whiteSpace" ? <span style={{color: "red"}}>
                                Bosh joy tashlash mumkin emas
                            </span> : null}
                        {errors?.comment?.type === "minLength" ? <span style={{color: "red"}}>
                                Izoh kamida 5 ta belgidan iborat bo‘lishi kerak
                            </span> : null}
                        {errors?.comment?.type === "maxLength" ? <span style={{color: "red"}}>
                                Izoh 3000 ta belgidan oshmasligi kerak
                            </span> : null}
                        <button type="submit">Men bilan aloqaga chiqing</button>
                    </form>
                </div>
            </div>
            <div className={styles.overlay}></div>
        </div>
    </section>;
};

export default ContactUs;