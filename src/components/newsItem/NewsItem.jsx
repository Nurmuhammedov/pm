import "react-lazy-load-image-component/src/effects/blur.css";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Link} from "react-router-dom";
import React from 'react';
import styles from "./NewsItem.module.css";
import img from "../../assets/images/defaultImage.jpg"

const NewsItem = ({id, link, image, title, short_description, isNewsItem = true, school_title, student_count}) => {
    return (
        <>
            {
                isNewsItem ?
                    <Link className={styles.self} to={link ? link : `/news/${id}`}>
                        <LazyLoadImage
                            wrapperClassName={styles.slide}
                            src={image || img}
                            effect="blur"
                        />
                        <div className={styles.desc}>
                            <div className={styles.title}>
                                {title}
                            </div>
                            <div className={styles.description}>{short_description}</div>
                        </div>
                    </Link> :
                    <div className={styles.self}>
                        <LazyLoadImage
                            wrapperClassName={styles.slide}
                            src={image}
                            effect="blur"
                        />
                        <div className={styles.desc}>
                            <div className={styles["school-title"]}>
                                {school_title}
                            </div>
                            <div className={styles["school-desc"]}>
                                {student_count}+ o‘quvchilarimiz tahsil oladi
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default NewsItem;