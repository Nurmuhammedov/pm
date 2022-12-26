import React from "react";
import styles from "./Button.module.css";

const Button = ({
                    onClick = () => {
                    },
                    children,
                    backgroundColor = "rgba(65, 85, 114, 0.1)",
                    padding = "1.2rem 2.4rem",
                    color = "#263751",
                    fontFamily = 'SourceSansPro, sans-serif',
                    fontWeight = "400",
                    fontSize = "1.6rem",
                    lineHeight = "2.5rem"
                }) => {
    return <button onClick={onClick} style={{
        backgroundColor,
        padding,
        color,
        fontFamily,
        fontWeight,
        fontSize,
        lineHeight,
    }} className={styles.btn}>{children}</button>;
};

export default Button;
