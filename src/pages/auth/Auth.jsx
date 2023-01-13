import React, {useEffect, useState} from 'react';
import styles from "./Auth.module.css"
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "../../components/UI/modal";
import Login from "../../components/login/Login";

const Auth = () => {
    const {pathname} = useLocation()
    // const navigate = useNavigate()
    // const [sectionId, setSectionId] = useState(1)

    useEffect(() => {
        if (pathname === "/login") {
            document.querySelector("html").style.overflow = "hidden"
            document.querySelector("body").style.marginRight = ".6rem"
        } else {
            document.querySelector("html").style.overflow = "auto"
            document.querySelector("body").style.marginRight = "0"
        }
    }, [pathname])

    return (
        <Modal visible={pathname === "/login"} effect="fadeInRight">
            <Login/>
        </Modal>
    );
};

export default Auth;