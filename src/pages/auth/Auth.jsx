import React, {useContext, useEffect, useState} from 'react';
import Modal from "../../components/UI/modal";
import Login from "../../components/login/Login";
import Register from "../../components/register/Register";
import VerifyingPhoneNumber from "../../components/verifyingPhoneNumber/VerifyingPhoneNumber";
import ConfirmPassword from "../../components/confirmPassword/ConfirmPassword";
import ResetPassword from "../../components/resetPassword/ResetPassword";
import {ctx} from "../../App";

const Auth = ({authModal}) => {
    const {handleAuthModal} = useContext(ctx)
    const [user, setUser] = useState(null)
    const [page, setPage] = useState(5)

    useEffect(() => {
        if (authModal) {
            document.querySelector("html").style.overflow = "hidden"
            document.querySelector("body").style.marginRight = ".6rem"
        } else {
            document.querySelector("html").style.overflow = "auto"
            document.querySelector("body").style.marginRight = "0"
        }
    }, [authModal])
    const handleUser = (data) => {
        setUser(data)
    }
    const handlePage = (n) => {
        setPage(+n)
    }
    return (
        <Modal
            visible={authModal}
            effect="fadeInRight"
            onClick={() => handleAuthModal(false)}
        >
            {
                page === 1 ? <Register handlePage={handlePage} handleUser={handleUser} user={user}/> :
                    page === 2 ? <VerifyingPhoneNumber handlePage={handlePage} user={user}/> :
                        page === 3 ? <ConfirmPassword handlePage={handlePage} handleUser={handleUser} user={user}/> :
                            page === 4 ? <ResetPassword handleUser={handleUser} handlePage={handlePage}/> :
                                <Login handlePage={handlePage}/>
            }
        </Modal>
    );
};

export default Auth;