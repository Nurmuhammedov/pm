import React, {useContext, useEffect, useState} from 'react';
import VerifyingPhoneNumber from "../../components/verifyingPhoneNumber/VerifyingPhoneNumber";
import ConfirmPassword from "../../components/confirmPassword/ConfirmPassword";
import ResetPassword from "../../components/resetPassword/ResetPassword";
import Register from "../../components/register/Register";
import Login from "../../components/login/Login";
import Modal from "../../components/UI/modal";
import {ctx} from "../../App";

const Auth = () => {
    const {handleLoginModal} = useContext(ctx)
    const [visible, setVisible] = useState(false)
    const [user, setUser] = useState(null)
    const [page, setPage] = useState(5)

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 0)

        return () => {
            setTimeout(() => {
                setVisible(false)
                document.querySelector("body").style.overflow = "auto"
            }, 0)
        }
    }, [])

    useEffect(() => {
        if (visible) {
            document.querySelector("body").style.overflow = "hidden"
        } else {
            document.querySelector("body").style.overflow = "auto"
        }
    }, [visible])
    const handleUser = (data) => {
        setUser(data)
    }
    const handlePage = (n) => {
        setPage(+n)
    }
    return (
        <Modal
            visible={visible}
            effect="fadeInRight"
            onClick={() => handleLoginModal(false)}
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