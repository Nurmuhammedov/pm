import React from "react";
import styles from "./Header.module.css";
import ColoredLogo from "../../assets/icons/coloredLogo/ColoredLogo";
import Logo from "../../assets/icons/logo/Logo";
import CustomSelect from "../UI/customSelect/CustomSelect";
import {Link, useNavigate} from "react-router-dom";
import Select, {components} from "react-select";
import Dropdown from "../../assets/icons/dropdown/Dropdown";

const Header = (
    {
        coloredLogo = false,
        selectOptions = [],
        dropdownOptions = [],
    }
) => {
    const navigate = useNavigate();
    const handleDropdown = ({value}) => {
        navigate(value)
    };
    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <Dropdown iconBackground={coloredLogo ? "" : "white"}/>
            </components.DropdownIndicator>
        );
    };


    return (
        <header style={{backgroundColor: coloredLogo ? "white" : "transparent"}}>
            <div className={`${styles["header-inner"]} container`}>
                <div>
                        <span style={{maxHeight: "6rem", cursor: "pointer"}} onClick={() => navigate("/")}>
                            {coloredLogo ? <ColoredLogo/> : <Logo/>}
                        </span>
                    <CustomSelect
                        backgroundColor={
                            coloredLogo
                                ? "rgba(65, 85, 114, 0.1)"
                                : "#FFFFFF"
                        }
                        handleValue={(value) => navigate(value)}
                        color={coloredLogo ? "#415572" : "#0173FF"}
                        options={selectOptions}
                        iconBackground={coloredLogo ? "" : "#0173FF"}
                    />
                </div>
                <nav>
                    <ul className={styles.menu}>
                        <li>
                            <Link className={coloredLogo ? styles.coloredLogo : null}
                                  style={!coloredLogo ? {color: "white"} : null} to="/">Asosiy</Link>
                        </li>
                        <li>
                            <Link className={coloredLogo ? styles.coloredLogo : null}
                                  style={!coloredLogo ? {color: "white"} : null} to="about-us">Biz haqimizda</Link>
                        </li>
                        <li>
                            <Link className={coloredLogo ? styles.coloredLogo : null}
                                  style={!coloredLogo ? {color: "white"} : null} to="news">Yangiliklar</Link>
                        </li>
                        <li>
                            <Link className={coloredLogo ? styles.coloredLogo : null}
                                  style={!coloredLogo ? {color: "white"} : null} to="rating">Reyting</Link>
                        </li>
                        <li>
                            <Select
                                options={dropdownOptions.filter(
                                    (item, index) => index !== 0
                                )}
                                value={dropdownOptions[0]}
                                onChange={handleDropdown}
                                isSearchable={false}
                                components={{
                                    DropdownIndicator,
                                    IndicatorSeparator: () => null,
                                }}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        backgroundColor: "transparent",
                                        border: 0,
                                        padding: "1.2rem 1.2rem 1.2rem 2.1rem",
                                        borderRadius: "323.2rem",
                                        boxShadow: "none",
                                        fontFamily:
                                            "'SourceSansPro',  sans-serif",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "1.8rem",
                                        lineHeight: "2.3rem",
                                        cursor: "pointer",
                                    }),
                                    valueContainer: (base) => ({
                                        ...base,
                                        padding: 0,
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                        margin: 0,
                                        padding: 0,
                                        color: coloredLogo ? "#14161A" : "white",
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        margin: 0,
                                        padding: 0,
                                    }),
                                    indicatorsContainer: (base) => ({
                                        ...base,
                                        marginLeft: "1.2rem",
                                    }),
                                    dropdownIndicator: (base, state) => ({
                                        ...base,
                                        padding: 0,
                                        transition: "all .3s ease-out",
                                        transform: state.selectProps.menuIsOpen
                                            ? "rotate(-180deg)"
                                            : null,
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        margin: 0,
                                        top: "calc(100% + .2rem)",
                                        left: "2rem",
                                        background: "#FFFFFF",
                                        borderRadius: "1.2rem",
                                        overflow: "hidden",
                                        minWidth: "calc(100% - 2rem)",
                                        width: "auto",
                                        boxShadow:
                                            "rgba(149, 157, 165, 0.2) 0 .8rem 2.4rem",
                                    }),
                                    menuList: (base) => ({
                                        ...base,
                                        padding: "1.6rem 0",
                                        margin: 0,
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        padding: ".4rem 1.6rem",
                                        fontFamily:
                                            '"SourceSansPro", sans-serif',
                                        fontStyle: "normal",
                                        fonWeight: "400",
                                        fontSize: "1.6rem",
                                        lineHeight: "2.5rem",
                                        whiteSpace: "nowrap",
                                        color:
                                            state.isSelected || state.isFocused
                                                ? "white"
                                                : "#14161A",
                                        backgroundColor: state.isSelected || state.isFocused
                                            ? "#0173FF"
                                            : "transparent",
                                        cursor: "pointer",
                                    }),
                                    noOptionsMessage: (base) => ({
                                        ...base,
                                        padding: ".8rem 1.6rem",
                                        fontFamily:
                                            '"SourceSansPro", sans-serif',
                                        fontStyle: "normal",
                                        fonWeight: "400",
                                        fontSize: "1.6rem",
                                        lineHeight: "2.5rem",
                                        cursor: "not-allowed",
                                        whiteSpace: "nowrap",
                                    }),
                                }}
                            />
                        </li>
                    </ul>
                </nav>
                <div>

                </div>
            </div>
        </header>
    );
};

export default Header;
