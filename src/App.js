import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React, {createContext, useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import SuccessIcon from "./assets/icons/alertIcons/SuccessIcon";
import ErrorIcon from "./assets/icons/alertIcons/ErrorIcon";
import AlertIcon from "./assets/icons/alertIcons/AlertIcon";
import {handleTestsFieldsChange} from "./utils/utils";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import axios from "./axios";
import {createPortal} from "react-dom";
import SolvingTest from "./pages/solvingTest/SolvingTest";
import Tests from "./pages/tests/Tests";
import Profile from "./pages/profile/Profile";
import Rating from "./pages/rating/Rating";
import News from "./pages/news/News";
import NewsDetail from "./pages/newsDetail/NewsDetail";
import AboutUs from "./pages/aboutUs/AboutUs";
import NotFound from "./pages/notFound/NotFound";
import Channel from "./pages/channel/Channel";

export const ctx = createContext(null);

function App() {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [user, setUser] = useState(null)
    const [loginModal, setLoginModal] = useState(false)
    const [isNotFound, setIsNotFound] = useState(false)
    const [headerData, setHeaderData] = useState({
        tests: [{
            value: 0,
            label: "Bizning testlarimiz"
        }],
        channels: [{
            value: 0,
            label: "Bizning kanallarimiz"
        }]
    })

    const handleLoginModal = (boolean = false) => {
        setLoginModal(boolean)
    }
    const handleAuth = (data = null) => {
        if (data) {
            setUser(data)
        } else {
            setUser(null)
            localStorage.clear()
            navigate("/")
        }
    }


    useEffect(() => {
        axios.get("/v1/users/me/").then(res => {
            setUser(res.data)
        }).catch(error => {
            if (error?.response?.status === 401) {
                handleAuth()
            } else {
                handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
            }
        })

        axios.get("/v1/core/header/").then(res => {
            setHeaderData({
                tests: [
                    {
                        value: 0,
                        label: "Bizning testlarimiz"
                    },
                    {
                        value: "all",
                        label: "Barchasi"
                    }, ...handleTestsFieldsChange(res?.data?.test_subjects || [])],
                channels: [{
                    value: 0,
                    label: "Bizning kanallarimiz"
                }, ...handleTestsFieldsChange(res?.data?.channels || [])]
            })
        }).catch(error => {
            if (error?.response?.status === 401) {
                handleAuth()
            } else {
                handleAlert("error", error?.response?.data?.detail || "Tizimda nomaʼlum xatolik yuz berdi")
            }
        })
    }, [])

    const handleAlert = (type, massage, autoClose = 10000, close = true) => {
        switch (type) {
            case "success":
                toast.success(massage, {
                    icon: <SuccessIcon/>,
                    autoClose: !autoClose ? false : autoClose,
                    closeOnClick: close
                });
                break;
            case "error":
                toast.error(massage, {
                    icon: <ErrorIcon/>,
                    autoClose: !autoClose ? false : autoClose,
                    closeOnClick: close
                });
                break;
            default:
                toast.info(massage, {
                    icon: <AlertIcon/>,
                    autoClose: !autoClose ? false : autoClose,
                    closeOnClick: close
                });
                break;
        }
    }

    return (
        <ctx.Provider value={{user, handleAuth, handleAlert, handleLoginModal}}>
            <div className="app">
                {
                    !isNotFound ?
                        <Header data={headerData} coloredLogo={pathname !== "/"}/> : null
                }
                <main
                    style={isNotFound ? {backgroundColor: "#2F3242"} : pathname.split("/")[1] === "premium-tests" || pathname.split("/")[1] === "free-tests" || pathname.split("/")[1] === "see-answers" ? {backgroundColor: "white"} : null}
                >
                    < Routes>
                        <Route
                            path="/"
                            element={
                                <Home/>
                            }
                        />
                        < Route
                            path="/tests/:id"
                            element={
                                <Tests tests={headerData.tests.slice(1)}/>
                            }
                        />
                        < Route
                            path="/channels/:id"
                            element={
                                <Channel/>
                            }
                        />
                        < Route
                            path="/rating/:id"
                            element={
                                <Rating tests={headerData.tests.slice(1)}/>
                            }
                        />
                        < Route
                            path="/news/:id"
                            element={
                                <NewsDetail/>
                            }
                        />
                        <Route
                            path="/premium-tests/:id"
                            element={
                                <SolvingTest freeTest={false}/>
                            }
                        />
                        <Route
                            path="/free-tests/:id"
                            element={
                                <SolvingTest freeTest={true}/>
                            }
                        />
                        <Route
                            path="/see-answers/:id"
                            element={
                                <SolvingTest checkAnswers={true}/>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <Profile/>
                            }
                        />
                        <Route
                            path="/about-us"
                            element={
                                <AboutUs/>
                            }
                        />
                        <Route
                            path="/all-news"
                            element={
                                <News/>
                            }
                        />
                        <Route
                            path="*"
                            element={
                                <NotFound handleIsNotFound={b => setIsNotFound(b)}/>
                            }
                        />
                    </Routes>
                </main>
                {
                    !isNotFound && (pathname.split("/")[1] !== "premium-tests" && pathname.split("/")[1] !== "free-tests" && pathname.split("/")[1] !== "see-answers") ?
                        <Footer data={headerData}/> : null
                }
            </div>
            {
                loginModal ? <Auth loginModal={loginModal}/> : null
            }
            {
                createPortal(
                    <ToastContainer
                        autoClose={10000}
                        toastClassName="alert"
                        bodyClassName="alert-inner"
                    />, document.querySelector("body")
                )
            }
        </ctx.Provider>
    );
}

export default App;
