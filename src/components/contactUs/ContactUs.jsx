import {useForm, Controller} from "react-hook-form";
import InputMask from 'react-input-mask';
import React, {useContext} from 'react';
import homeChannelsStyles from "../../pages/home/homeTelegramChannels/HomeChannels.module.css";
import backgroundImage from "../../assets/images/placeholderImage.jpg";
import {customTrim} from "../../utils/utils";
import styles from "./ContactUs.module.css";
import {ctx} from "../../App";

const ContactUs = () => {
    const {handleAlert} = useContext(ctx)
    const {handleSubmit, register, reset, control, formState: {errors}} = useForm({
        defaultValues: {
            firstName: "",
            phone: "",
            comment: ""
        },
        mode: "onTouched"
    });


    return <section style={{marginBottom: "6rem"}}
                    className={`${homeChannelsStyles.self} container`}>
        <h2 style={{marginBottom: "3rem"}}>Biz bilan bog‘lanish</h2>
        <div
            className={styles.self}
            style={{
                backgroundImage: `url(${backgroundImage})`
            }}
        >
            <div className={styles.title}>
                <h3>Savol va takliflaringiz bo‘lsa biz bilan bog‘laning</h3>
            </div>
            <div>
                <div className={styles["contact-us"]}>
                    <div className={styles["contact-us__title"]}>
                        O‘zimiz aloqaga chiqamiz
                    </div>
                    <form
                        onSubmit={handleSubmit(data => {
                            fetch(`https://api.telegram.org/bot6158334141:AAER9QvnJ9UrqTurNS7_ct2MFH9lFLANfFE/sendMessage?chat_id=639844452&text=*Murojaatchi ismi*: _${data.firstName.trim()}_  *Telefon raqami*: _${data.phone.trim()}_  *Izohi*: _${data.comment.trim()}_&parse_mode=MarkDown`).then(() => {
                                reset()
                                handleAlert("success", "Murojaatingiz muvaffaqiyatli yuborildi!")
                            })
                            fetch(`https://api.telegram.org/bot6158334141:AAER9QvnJ9UrqTurNS7_ct2MFH9lFLANfFE/sendMessage?chat_id=1965979936&text=*Murojaatchi ismi*: _${data.firstName.trim()}_  *Telefon raqami*: _${data.phone.trim()}_  *Izohi*: _${data.comment.trim()}_&parse_mode=MarkDown`).then(() => {
                            })
                            fetch(`https://api.telegram.org/bot6158334141:AAER9QvnJ9UrqTurNS7_ct2MFH9lFLANfFE/sendMessage?chat_id=5757473839&text=*Murojaatchi ismi*: _${data.firstName.trim()}_  *Telefon raqami*: _${data.phone.trim()}_  *Izohi*: _${data.comment.trim()}_&parse_mode=MarkDown`).then(() => {
                            })
                        })}
                        className={styles["contact-us__form"]}
                    >
                        <div className={styles["form-container"]}>
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
                            {errors?.firstName?.type === "required" ? <span>
                                Ushbu maydon to‘ldirilishi shart
                            </span> : null}
                            {errors?.firstName?.type === "whiteSpace" ? <span>
                                Bosh joy tashlash mumkin emas
                            </span> : null}
                            {errors?.firstName?.type === "minLength" ? <span>
                                Ismingiz kamida 3 ta belgidan iborat bo‘lishi kerak
                            </span> : null}
                            {errors?.firstName?.type === "maxLength" ? <span>
                                Ismingiz 50 ta belgidan oshmasligi kerak
                            </span> : null}
                        </div>
                        <div className={styles["form-container"]}>
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
                            {errors?.phone ? <span>
                               {errors?.phone?.message}
                            </span> : null}
                        </div>
                        <div className={styles["form-container"]}>
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
                            {errors?.comment?.type === "required" ? <span>
                                Ushbu maydon to‘ldirilishi shart
                            </span> : null}
                            {errors?.comment?.type === "whiteSpace" ? <span>
                                Bosh joy tashlash mumkin emas
                            </span> : null}
                            {errors?.comment?.type === "minLength" ? <span>
                                Izoh kamida 5 ta belgidan iborat bo‘lishi kerak
                            </span> : null}
                            {errors?.comment?.type === "maxLength" ? <span>
                                Izoh 3000 ta belgidan oshmasligi kerak
                            </span> : null}
                        </div>
                        <button type="submit">Men bilan aloqaga chiqing</button>
                    </form>
                </div>
            </div>
            <div className={styles.overlay}></div>
        </div>
    </section>;
};

export default ContactUs;