import React, {useEffect} from 'react';
import HomeHeader from "./homeHeader/HomeHeader";
import HomeCarousel from "./homeCarousel/HomeCarousel";
import HomeChannels from "./homeTelegramChannels/HomeChannels";
import HomeTests from "./homeTests/HomeTests";
import HomeNews from "./homeNews/HomeNews";
import ContactUs from "../../components/contactUs/ContactUs";
import {useLocation} from "react-router-dom";
import Auth from "../auth/Auth";

const Home = ({dropdownOptions, selectOptions}) => {
    return (
        <>
            <HomeHeader dropdownOptions={dropdownOptions} selectOptions={selectOptions}/>
            <HomeCarousel/>
            <HomeChannels/>
            <HomeTests/>
            <HomeNews/>
            <ContactUs/>
            <Auth/>
        </>
    );
};

export default Home;