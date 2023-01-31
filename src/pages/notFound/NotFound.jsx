import React, {useEffect} from 'react';
import styles from "./NotFound.module.css";
import {Link, useNavigate} from "react-router-dom";
import NotFoundIcon from "../../assets/icons/notFound/NotFoundIcon";

const NotFound = ({handleIsNotFound}) => {
    const navigate = useNavigate()
    useEffect(() => {
        handleIsNotFound(true)
        return () => handleIsNotFound(false)
    }, [])
    return (
        <>
            <NotFoundIcon className={styles.svg}/>
            <div className={styles["message-box"]}>
                <h1>404</h1>
                <p>Sahifa topilmadi</p>
                <div className={styles["buttons-con"]}>
                    <div className={styles["action-link-wrap"]}>
                        <a onClick={() => navigate(-1)}
                           className={`${styles["link-button"]} ${styles[" link-back-button"]}`}>Ortga</a>
                        <Link to="/" className="link-button">Asosiy sahifaga qaytish</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;