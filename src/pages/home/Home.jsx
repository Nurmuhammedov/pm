import React from 'react';
import HomeHeader from "./homeHeader/HomeHeader";
import Header from "../../components/header/Header";
import HomeCarousel from "./homeCarousel/HomeCarousel";
import HomeChannels from "./homeTelegramChannels/HomeChannels";

const Home = ({dropdownOptions, selectOptions}) => {
    return (
        <>
            <HomeHeader dropdownOptions={dropdownOptions} selectOptions={selectOptions}/>
            <HomeCarousel/>
            <HomeChannels/>
        </>
    );
};

export default Home;