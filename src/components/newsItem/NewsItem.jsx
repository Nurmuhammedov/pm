import React from 'react';
import {Link} from "react-router-dom";
import styles from "./NewsItem.module.css";
import carouselImg from "../../assets/images/carousel.jpg";
import {LazyLoadImage} from "react-lazy-load-image-component";

const NewsItem = ({link = "/", title, description}) => {
    return (
        <Link className={styles.self} to={link}>
            <LazyLoadImage
                wrapperClassName={styles.slide}
                src={carouselImg}
                effect="blur"
                placeholderSrc="data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAUAB4DASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUCAwYE/8QAKBAAAgEDBAEDBAMAAAAAAAAAAQIDEQQAIQUxEgYUUWETIkEVgaHx/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAIBA//EABkRAQADAQEAAAAAAAAAAAAAAAABEQJBMf/aAAwDAQACEQMRAD8A6rXdBJYSH6YkjiZXDdCrkc+1OD8ZlvIrY7j5FcNYI8gdo0Raakla0/rGcKypbSxwxyojgAIXLv140UfHvi2XcXS7l/XCrrMkizkinZQRoCOKGmuXcdSl4xGds31TdoVYQu1CB2BBIoP5GaHcdz6+nV0CAoz1Cszfca0NRT/MRrexy3sD3CMtx6coXBBVnqS3HvX4yd1NdXESTpDcMg+wOlWGn4oeDpi44Uh5rE22XkFpbzzGN0+oeza1OhpT8aZTbwxxwBVXQUAwwznpseKdzUekLAUaNqqRyNcdePxru2w9ZawrHNxCadjTkk1qdcMMYJf/2Q=="
            />
            <div className={styles.desc}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.description}>{description}</div>
            </div>
        </Link>
    );
};

export default NewsItem;