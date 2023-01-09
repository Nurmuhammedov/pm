import React from 'react';
import HomeHeader from "./homeHeader/HomeHeader";
import HomeCarousel from "./homeCarousel/HomeCarousel";
import HomeChannels from "./homeTelegramChannels/HomeChannels";
import HomeTests from "./homeTests/HomeTests";
import HomeNews from "./homeNews/HomeNews";
import ContactUs from "../../components/contactUs/ContactUs";

const Home = ({dropdownOptions, selectOptions}) => {
    return (
        <>
            <HomeHeader dropdownOptions={dropdownOptions} selectOptions={selectOptions}/>
            <HomeCarousel/>
            <HomeChannels/>
            <HomeTests/>
            <HomeNews/>
            <ContactUs/>
        </>
    );
};

export default Home;