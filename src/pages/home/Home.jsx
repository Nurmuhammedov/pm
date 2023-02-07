import React, {useContext, useEffect, useState} from 'react';
import ContactUs from "../../components/contactUs/ContactUs";
import HomeCarousel from "./homeCarousel/HomeCarousel";
import HomeHeader from "./homeHeader/HomeHeader";
import HomeNews from "./homeNews/HomeNews";
import axios from "../../axios";
import {ctx} from "../../App";
import Loader from "../../components/loader/Loader";
import HomeChannels from "./homeTelegramChannels/HomeChannels";
import HomeTests from "./homeTests/HomeTests";


const Home = () => {
    const {handleAuth, handleAlert} = useContext(ctx)
    const [data, setData] = useState({
        user_count: 0,
        test_subjects: [],
        news: [],
        schools: [{
            title: "",
            content: "",
            images: [],
            short_description: "",
            students_count: 0,
            subjects_count: 0,
            teachers_count: 0,
        }],
        channels: [],
        header_section: {
            short_description: ""
        }
    })
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get('v1/core/home/').then(res => {
            setData(res.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 0)
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
    return (
        <>
            {
                isLoading ? <Loader/> : <>
                    <HomeHeader headerSection={data.header_section}/>
                    <HomeCarousel schools={data.schools} usersCount={data.user_count}/>
                    <HomeChannels channels={data.channels}/>
                    {
                        data.test_subjects.length > 0 && <HomeTests data={data.test_subjects}/>
                    }

                    {
                        data.news.length > 0 && <HomeNews data={data.news}/>
                    }
                    <ContactUs/>
                </>
            }
        </>
    );
};

export default Home;