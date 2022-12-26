import React, {useState} from 'react';
import {LazyLoadImage} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {Autoplay, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import styles from './HomeCarousel.module.css'
import LeftArrow from "../../../assets/icons/arrows/LeftArrow";
import RightArrow from "../../../assets/icons/arrows/RightArrow";
import carouselImg from '../../../assets/images/carousel.jpg'
import CardIcon1 from "../../../assets/icons/cardItemsIcons/CardIcon1";
import CardIcon2 from "../../../assets/icons/cardItemsIcons/CardIcon2";
import CardIcon3 from "../../../assets/icons/cardItemsIcons/CardIcon3";
import "./HomeCarousel.css"

const HomeCarousel = () => {
    const [swiper, setSwiper] = useState(null);
    const [data, setData] = useState([{},{},{},{},{}]);

    const nextSlide = () => {
        swiper.slideNext();
    };
    const prevSlide = () => {
        swiper.slidePrev();
    };

    return (
        <section className={`${styles.self} container`}>
            <div className={styles.cards}>
                <div className={styles["card-item"]}>
                    <CardIcon1/>
                    <h2>Bilim-Muvoffaqiyat</h2>
                    <p>Biz bilan prezident maktalarining 7 yillik grantiga(112 000$ lik) ega bo‘ling</p>
                </div>
                <div className={styles["card-item"]}>
                    <CardIcon2/>
                    <h2>Qulay narxlar</h2>
                    <p>Barcha turdagi testlarni bizning tizimda yechib boring</p>
                </div>
                <div className={styles["card-item"]}>
                    <CardIcon3/>
                    <h2>4000 foydalanuvchi</h2>
                    <p>Saytimiz prezident maktablariga tayyorlanayotgan barcha o‘quvchilar uchun mo‘ljallangan</p>
                </div>
            </div>

            <div className={styles.carousel}>
                <div className={styles.header}>
                    <div className={styles.title}>Prezident maktablari</div>
                    <div className={styles.buttons}>
                        <button onClick={prevSlide} className={styles.btn}>
                            <div className={styles["wrapper-left"]}>
                                <div className={styles["wrapper-inner"]}>
                                    <LeftArrow/>
                                </div>
                            </div>
                        </button>
                        <button onClick={nextSlide} id="nextButtonRef" className={styles.btn}>
                            <div className={styles["wrapper-right"]}>
                                <div className={styles["wrapper-inner"]}>
                                    <RightArrow/>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <Swiper
                    className="home-carousel"
                    autoplay={{delay: 5000, disableOnInteraction: false}}
                    // loop={true}
                    grabCursor={true}
                    pagination={{
                        dynamicBullets: true
                    }}
                    modules={[Autoplay, Pagination]}
                    onSwiper={(s) => {
                        setSwiper(s);
                    }}
                >
                    {
                        data.map(()=>{
                            return(
                                <SwiperSlide>
                                    <LazyLoadImage
                                        wrapperClassName={styles.slide}
                                        src={carouselImg}
                                        effect="blur"
                                        placeholderSrc="data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAUAB4DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUCAwYE/8QAKBAAAgEDBAEDBAMAAAAAAAAAAQIDEQQAIQUxEgYUUWETIkEVgaHx/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAIBA//EABkRAQADAQEAAAAAAAAAAAAAAAABEQJBMf/aAAwDAQACEQMRAD8A6rXdBJYSH6YkjiZXDdCrkc+1OD8ZlvIrY7j5FcNYI8gdo0Raakla0/rGcKypbSxwxyojgAIXLv140UfHvi2XcXS7l/XCrrMkizkinZQRoCOKGmuXcdSl4xGds31TdoVYQu1CB2BBIoP5GaHcdz6+nV0CAoz1Cszfca0NRT/MRrexy3sD3CMtx6coXBBVnqS3HvX4yd1NdXESTpDcMg+wOlWGn4oeDpi44Uh5rE22XkFpbzzGN0+oeza1OhpT8aZTbwxxwBVXQUAwwznpseKdzUekLAUaNqqRyNcdePxru2w9ZawrHNxCadjTkk1qdcMMYJf/2Q=="
                                    />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <div className={styles.footer}>
                    <div>
                        <div className={styles.title}>The Presidential School is</div>
                        <p>a specialized public educational institution whose activities are aimed at identifying.</p>
                    </div>
                    <p>The Presidential School is a specialized state general educational institution whose activities
                        are aimed at ensuring the identification and training of gifted children for the training of
                        highly qualified specialists. Our goal is to train future leaders of the nation, students who
                        will win international olympiads, competitions and be able to enter the best higher educational
                        institutions in the world. We nurture leaders who can be competitive on the global stage."</p>
                </div>
            </div>

        </section>
    );
};

export default HomeCarousel;