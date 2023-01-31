import React from 'react';
import homeChannelsStyles from "../homeTelegramChannels/HomeChannels.module.css";
import NewsItem from "../../../components/newsItem/NewsItem";
import Button from "../../../components/UI/button/Button";
import styles from './HomeNews.module.css'
import {Link} from "react-router-dom";

const HomeNews = ({data = []}) => {
    return (
        <section style={{marginBottom: "10rem"}} className={`${homeChannelsStyles.self} container`}>
            <h2>Yangiliklarimiz</h2>
            <div className={styles["news-container"]}>
                {data.map(item => <NewsItem {...item} key={item.id}/>)}
            </div>
            <Link to="/all-news">
                <Button color="#263751">Barchasi</Button>
            </Link>
        </section>
    );
};

export default HomeNews;