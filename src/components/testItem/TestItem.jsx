import React from 'react';
import styles from "./TestItem.module.css"
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import TestDurationIcon from "../../assets/icons/testDurationIcon/TestDurationIcon";
import {Link} from "react-router-dom";
import carouselImg from '../../assets/images/carousel.jpg'

const TestItem = ({
                      id,
                      title,
                      price,
                      discount_price,
                      is_sale,
                      is_free,
                      duration,
                      questions_count,
                      image,
                      user_test
                  }) => {
    return (
        /*
        *
        *  {
                          is_solution,
                          is_sold,
                          score
                      }
        *
        * */

        <div className={styles.self}>
            <div className={styles.header}>
                <LazyLoadImage
                    wrapperClassName={styles.slide}
                    src={image || carouselImg}
                    effect="blur"
                />
                {
                    user_test && user_test?.is_solution ? <div className={styles["free-test"]}>
                        {user_test.score}
                    </div> : null
                }
            </div>
            <div className={styles.body}>
                <div className={styles["title-container"]}>
                    <div className={styles.title}>
                        <div>{title}</div>
                        {is_sale && <del className={styles['discount-price']}>{discount_price} uzs</del>}
                        {
                            is_free ? <span>Bepul</span> :
                                <span>{price} uzs</span>
                        }
                    </div>
                    <div className={styles.duration}>
                        <TestDurationIcon/>
                        <span>{duration} min</span>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.count}>
                        {questions_count}ta savol
                    </div>
                    {
                        user_test && user_test?.is_solution ?
                            <Link to={`/view-solution/${id}`}>
                                <button>
                                    Yechimni ko‘rish
                                </button>
                            </Link> : user_test && user_test?.is_sold ?
                                <Link to={`/test/${id}`}>
                                    <button>
                                        Testni yechish
                                    </button>
                                </Link> : <Link to={`/purchase/${id}`}>
                                    <button>
                                        Sotib olish
                                    </button>
                                </Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default TestItem;