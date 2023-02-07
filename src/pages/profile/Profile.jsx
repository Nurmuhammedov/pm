import React, {useContext, useEffect, useRef, useState} from 'react';
import "react-lazy-load-image-component/src/effects/blur.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import styles from "./Profile.module.css"
import {ctx} from "../../App";
import axios from "../../axios";
import Loader from "../../components/loader/Loader";
import TestsStyles from "../tests/Tests.module.css";
import Login from "../../assets/icons/loginIcons/Login";
import Phone from "../../assets/icons/loginIcons/Phone";
import Password from "../../assets/icons/loginIcons/Password";
import BankIcon from "../../assets/icons/bankIcon/BankIcon";
import PurchaseTestModal from "../../components/purchaseTestModal/PurchaseTestModal";
import UpdateUserData from "../../components/updateUserData/UpdateUserData";
import defaultImage from "../../assets/images/logo.jpg"

const Profile = () => {
    const {user, handleAuth, handleAlert} = useContext(ctx)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [purchaseTest, setPurchaseTest] = useState(false)
    const [updateUserData, setUpdateUserData] = useState(false)
    const fileInputRef = useRef();
    const [data, setData] = useState({
        user_test: [],
        balances: [],
        first_name: "",
        last_name: "",
        rank: "",
        photo: "",
        phone: "",
        password_length: "",
        check_balance: "",
        birth_date: "",
    })

    useEffect(() => {
        axios.get(`/v1/users/user-detail-update/`).then(res => {
            setData(res?.data || {
                user_test: [],
                balances: [],
                first_name: "",
                last_name: "",
                rank: "",
                photo: "",
                phone: "",
                password_length: "",
                check_balance: "",
                birth_date: "",
            })
            setTimeout(() => {
                setIsLoading(false)
            }, 0)
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }).catch(error => {
            if (error?.response?.status === 401) {
                handleAuth()
            } else {
                handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
            }
            setTimeout(() => {
                setIsLoading(false)
            }, 0)
        })
    }, [])


    const handlePurchaseTest = () => {
        setPurchaseTest(false)
    }
    const handleUpdateUserData = () => {
        setUpdateUserData(false)
    }

    const handleAccountPhoto = () => {
        const formData = new FormData();
        formData.append('photo', fileInputRef.current.files[0], fileInputRef.current.files[0].name);
        console.log(fileInputRef.current.files[0])
        console.log(fileInputRef.current.files[0].name)
        axios.patch('/v1/users/user-detail-update/', formData).then(res => {
            handleAlert("success", "Rasm muvaffaqiyatli yangilandi")
            setData(p => ({...p, ...res?.data}))
        }).catch(error => {
            if (error?.response?.status === 401) {
                handleAuth()
            } else {
                handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
            }
        })
    }

    return (
        <>
            {
                isLoading ? <Loader/> :
                    <section className={`${styles.self} container`}>
                        <div className={styles.profile}>
                            <div className={styles["photo-container"]}>
                                <div className={styles["back-photo-container"]}></div>
                                <span className={styles["back-image"]}>
                                    <img src={data.photo || defaultImage} alt="Account photo"/>
                                </span>
                                <div className={styles["account-photo-container"]}>
                                    <label className={styles["photo-input-label"]} htmlFor="photo-input">
                                        <LazyLoadImage
                                            wrapperClassName={styles["account-image"]}
                                            src={data.photo || defaultImage}
                                            effect="blur"
                                        />
                                    </label>
                                    <input
                                        onChange={handleAccountPhoto}
                                        ref={fileInputRef}
                                        className={styles["photo-input"]}
                                        type="file"
                                        id="photo-input"
                                        accept="image/*"
                                    />
                                    <div className={styles.name}>{data.last_name} {data.first_name}</div>
                                    <div className={styles.rating}>Sizning reyting balingiz: {data.rank}</div>
                                </div>
                            </div>

                            <div className={styles.form}>
                                <div className={styles["form-item"]}>
                                    {data.first_name}
                                    <span>
                                        <Login/>
                                    </span>
                                </div>
                                <div className={styles["form-item"]}>
                                    {data.last_name}
                                    <span>
                                        <Login/>
                                    </span>
                                </div>
                                <div className={styles["form-item"]}>
                                    {
                                        data.phone ? `+${data.phone}` : ""
                                    }
                                    <span>
                                        <Phone/>
                                    </span>
                                </div>
                                <div className={styles["form-item"]}>
                                    {"*".repeat(data.password_length)}
                                    <span>
                                        <Password/>
                                    </span>
                                </div>
                                <button
                                    onClick={() => setUpdateUserData(true)}
                                    style={{marginTop: ".8rem", marginBottom: "3rem"}}
                                >
                                    Maʼlumotlarni o‘zgartirish
                                </button>
                                <div className={styles["form-item"]}>
                                    {data.check_balance || 0} so‘m
                                    <span>
                                        <BankIcon/>
                                    </span>
                                </div>
                                <button
                                    onClick={() => setPurchaseTest(true)}
                                    style={{
                                        marginTop: ".8rem",
                                        marginBottom: "0",
                                        background: "#0173FF",
                                        color: "white"
                                    }}
                                >
                                    Hisobni to‘ldirish
                                </button>
                            </div>

                        </div>
                        <div className={styles.history}>
                            <div style={{marginBottom: "2.4rem"}} className={TestsStyles.navigation}>
                                <button
                                    style={{background: "#ECEEF1"}}
                                    onClick={() => setPage(1)}
                                    className={page === 1 ? TestsStyles.active : null}
                                >
                                    Mening testlarim
                                </button>
                                <button
                                    style={{background: "#ECEEF1"}}
                                    onClick={() => setPage(2)}
                                    className={page === 2 ? TestsStyles.active : null}
                                >
                                    Mening hisob tarixim
                                </button>
                            </div>
                            <div className={styles.table}>
                                {
                                    page === 1 ?
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>№</th>
                                                <th>Test nomi</th>
                                                <th>Sana</th>
                                                <th>Narxi</th>
                                                <th><span style={{marginLeft: "1rem"}}>Ball</span></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                data.user_test.map((test, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{test.title}</td>
                                                            <td>{test.test_time}</td>
                                                            <td>{test?.price ? `${test.price} so‘m` : "Bepul"}</td>
                                                            <td><span
                                                                style={{
                                                                    color: "#0FC341",
                                                                    marginLeft: "1rem"
                                                                }}>{test.score}</span>/{test.questions_count}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table> :
                                        <>
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>№</th>
                                                    <th>Pul miqdori</th>
                                                    <th>Sana</th>
                                                    <th>Holati</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    data.balances.map((test, index) => {
                                                        return (
                                                            <tr key={index}>

                                                                <td>{index + 1}</td>
                                                                <td>
                                                                    {
                                                                        test.amount.slice(0, 1) === "-" ?
                                                                            <span
                                                                                style={{color: "red"}}
                                                                            >
                                                                                {test.amount.slice(0, -3)}
                                                                            </span> :
                                                                            <span style={{color: "#0FC341"}}>
                                                                               +{test.amount.slice(0, -3)}
                                                                            </span>
                                                                    }
                                                                </td>
                                                                <td>{test?.pay_time}</td>
                                                                <td>{test?.test}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </>
                                }
                            </div>
                        </div>
                        {
                            purchaseTest ?
                                <PurchaseTestModal balance={user?.balance} propPage={2}
                                                   handlePurchaseTestModal={handlePurchaseTest}
                                                   page={2}/> : null
                        }
                        {
                            updateUserData ?
                                <UpdateUserData
                                    handleRefreshData={(data) => setData(p => {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                        return {...p, ...data}
                                    })}
                                    name={data.first_name}
                                    surname={data.last_name}
                                    handlePurchaseTestModal={handleUpdateUserData}
                                    page={2}/>
                                : null
                        }
                    </section>
            }
        </>
    );
};

export default Profile;