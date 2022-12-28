import React, {useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";
import {LazyLoadImage} from "react-lazy-load-image-component";
import homeCarouselStyles from "../homeCarousel/HomeCarousel.module.css";
import styles from "./HomeTests.module.css";
import LeftArrow from "../../../assets/icons/arrows/LeftArrow";
import RightArrow from "../../../assets/icons/arrows/RightArrow";
import carouselImg from "../../../assets/images/carousel.jpg";
import "./HomeTestsCarousel.css"
import Button from "../../../components/UI/button/Button";

const HomeTests = () => {
    const [swiper, setSwiper] = useState(null);
    const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]);
    const nextSlide = () => {
        swiper.slideNext();
    };
    const prevSlide = () => {
        swiper.slidePrev();
    };
    return (
        <section style={{marginBottom: "10rem"}}>
            <div className={`${homeCarouselStyles.header} container`}>
                <div className={homeCarouselStyles.title}>Biznig testlar</div>
                <div className={homeCarouselStyles.buttons}>
                    <button onClick={prevSlide} className={homeCarouselStyles.btn}>
                        <div className={homeCarouselStyles["wrapper-left"]}>
                            <div className={homeCarouselStyles["wrapper-inner"]}>
                                <LeftArrow/>
                            </div>
                        </div>
                    </button>
                    <button onClick={nextSlide} id="nextButtonRef" className={homeCarouselStyles.btn}>
                        <div className={homeCarouselStyles["wrapper-right"]}>
                            <div className={homeCarouselStyles["wrapper-inner"]}>
                                <RightArrow/>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <Swiper
                className="home-tests__carousel"
                slidesPerView={2.5}
                autoplay={{delay: 5000, disableOnInteraction: false}}
                grabCursor={true}
                loop={true}
                spaceBetween={24}
                modules={[Autoplay]}
                onSwiper={(s) => {
                    setSwiper(s);
                }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <SwiperSlide>
                                    <div className={styles.card}>
                                        <LazyLoadImage
                                            wrapperClassName={styles.slide}
                                            src={carouselImg}
                                            effect="blur"
                                            placeholderSrc="data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAUAB4DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUCAwYE/8QAKBAAAgEDBAEDBAMAAAAAAAAAAQIDEQQAIQUxEgYUUWETIkEVgaHx/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAIBA//EABkRAQADAQEAAAAAAAAAAAAAAAABEQJBMf/aAAwDAQACEQMRAD8A6rXdBJYSH6YkjiZXDdCrkc+1OD8ZlvIrY7j5FcNYI8gdo0Raakla0/rGcKypbSxwxyojgAIXLv140UfHvi2XcXS7l/XCrrMkizkinZQRoCOKGmuXcdSl4xGds31TdoVYQu1CB2BBIoP5GaHcdz6+nV0CAoz1Cszfca0NRT/MRrexy3sD3CMtx6coXBBVnqS3HvX4yd1NdXESTpDcMg+wOlWGn4oeDpi44Uh5rE22XkFpbzzGN0+oeza1OhpT8aZTbwxxwBVXQUAwwznpseKdzUekLAUaNqqRyNcdePxru2w9ZawrHNxCadjTkk1qdcMMYJf/2Q=="
                                        />
                                        <div className={styles.title}>
                                            Have you ever stopped to think abou
                                        </div>
                                        <div>
                                            <Button
                                                backgroundColor="#37756A"
                                                padding="2rem 4rem"
                                                color="#FFFFFF"
                                            >Testni boshlash</Button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.card}>
                                        <LazyLoadImage
                                            wrapperClassName={styles.slide}
                                            src={carouselImg}
                                            effect="blur"
                                            placeholderSrc="data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAUAB4DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUCAwYE/8QAKBAAAgEDBAEDBAMAAAAAAAAAAQIDEQQAIQUxEgYUUWETIkEVgaHx/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAIBA//EABkRAQADAQEAAAAAAAAAAAAAAAABEQJBMf/aAAwDAQACEQMRAD8A6rXdBJYSH6YkjiZXDdCrkc+1OD8ZlvIrY7j5FcNYI8gdo0Raakla0/rGcKypbSxwxyojgAIXLv140UfHvi2XcXS7l/XCrrMkizkinZQRoCOKGmuXcdSl4xGds31TdoVYQu1CB2BBIoP5GaHcdz6+nV0CAoz1Cszfca0NRT/MRrexy3sD3CMtx6coXBBVnqS3HvX4yd1NdXESTpDcMg+wOlWGn4oeDpi44Uh5rE22XkFpbzzGN0+oeza1OhpT8aZTbwxxwBVXQUAwwznpseKdzUekLAUaNqqRyNcdePxru2w9ZawrHNxCadjTkk1qdcMMYJf/2Q=="
                                        />
                                        <div className={styles.title}>
                                            Have you ever stopped to think about how the objects around us came into
                                            being? You know, how the letter opener on our desk, the broom in our closet
                                        </div>
                                        <div>
                                            <Button
                                                backgroundColor="#37756A"
                                                padding="2rem 4rem"
                                                color="#FFFFFF"
                                            >Testni boshlash</Button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </React.Fragment>
                        )
                    })
                }
            </Swiper>
        </section>
    );
};

export default HomeTests;