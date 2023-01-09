import React, {useEffect, useState} from 'react';
import homeChannelsStyles from "../homeTelegramChannels/HomeChannels.module.css";
import styles from './HomeNews.module.css'
import NewsItem from "../../../components/newsItem/NewsItem";
import Button from "../../../components/UI/button/Button";
import {Link} from "react-router-dom";

const HomeNews = () => {
    const [data, setData] = useState([{}, {}, {}])
    useEffect(()=>{
        setData([{}, {}, {}])
    }, [])
    return (
        <section style={{marginBottom: "10rem"}} className={`${homeChannelsStyles.self} container`}>
            <h2>Yangiliklarimiz</h2>
            <div className={styles["news-container"]}>
                {
                    data.map((item, index) => {
                        return (
                            <NewsItem  link="/" key={index} title="This is one of my first works." description="Have you ever stopped to think about how the objects around us came into being?"/>
                        )
                    })
                }
            </div>
            <Link to="/news"><Button color="#263751">Barchasi</Button></Link>
        </section>
    );
};

export default HomeNews;