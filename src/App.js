import React, {createContext, useEffect, useState} from "react";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import {Route, Routes, useNavigate} from "react-router-dom";
import Tests from "./pages/tests/Tests";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import SuccessIcon from "./assets/icons/alertIcons/SuccessIcon";
import ErrorIcon from "./assets/icons/alertIcons/ErrorIcon";
import AlertIcon from "./assets/icons/alertIcons/AlertIcon";
import axios from "./axios";


export const ctx = createContext(null);

const selectOptions = [
    {value: "/", label: "Testlar"},
    {value: "/tests", label: "Barcha testlar"},
    {value: "/top-rated-tests", label: "Saralangan testlar"},
    {value: "/english-tests", label: "Ingliz tili"},
    {value: "/problematic-issues", label: "Muammoli masalalar"},
    {value: "/critical-thinking", label: "Tanqidiy fikrlash"},
];
const dropdownOptions = [
    {value: "/", label: "Bizning kanallar"},
    {value: "/english-tests", label: "Ingliz tili testlari"},
    {value: "/main-channel", label: "Asosiy kanal"},
    {value: "/premium-tests-channel", label: "Pullik testlar kanali"},
];

function App() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [authModal, setAuthModal] = useState(false)

    const handleAuthModal = (boolean) => {
        setAuthModal(!!boolean)
    }
    const handleAuth = (data = false) => {
        if (data) {
            setUser(data)
            localStorage.setItem("access_token", data.access)
        } else {
            setUser(null)
            localStorage.clear()
            navigate("/")
        }
    }

    useEffect(() => {
        axios.get("/v1/users/me/").then(() => {
            setUser({access: localStorage.getItem("access_token")})
        }).catch(error => {
            handleAuth()
            handleAlert("error", error?.response?.detail)
        })
    }, [])

    const handleAlert = (type, massage, autoClose = 10000, close = true) => {
        switch (type) {
            case "success":
                toast.success(massage, {
                    icon: <SuccessIcon/>,
                    progress: 0,
                    autoClose: !autoClose ? false : autoClose,
                    closeOnClick: close,
                    draggable: close,
                });
                break;
            case "error":
                toast.error(massage, {
                    icon: <ErrorIcon/>,
                    progress: 0,
                    autoClose: !autoClose ? false : autoClose,
                });
                break;
            default:
                toast.info(massage, {
                    icon: <AlertIcon/>,
                    autoClose: !autoClose ? false : autoClose,
                });
                break;
        }
    }

    return (
        <>
            <ctx.Provider value={{user, handleAlert, handleAuth, handleAuthModal}}>
                <main>
                    <Routes>
                        <Route path="/tests"
                               element={
                                   <Tests dropdownOptions={dropdownOptions} selectOptions={selectOptions}/>
                               }
                        />
                        <Route path="*"
                               element={
                                   <Home
                                       authModal={authModal}
                                       dropdownOptions={dropdownOptions}
                                       selectOptions={selectOptions}
                                   />
                               }
                        />
                    </Routes>
                </main>
                <Footer/>
            </ctx.Provider>
            <ToastContainer autoClose={10000} toastClassName="alert" bodyClassName="alert-inner"/>
        </>
    );
}

export default App;
