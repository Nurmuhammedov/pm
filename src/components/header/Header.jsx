import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import ColoredLogo from "../../assets/icons/coloredLogo/ColoredLogo";
import Dropdown from "../../assets/icons/dropdown/Dropdown";
import CustomSelect from "../UI/customSelect/CustomSelect";
import Account from "../../assets/icons/account/Account";
import Logo from "../../assets/icons/logo/Logo";
import Select, {components} from "react-select";
import styles from "./Header.module.css";
import {ctx} from "../../App";
import ProfileIcon from "../../assets/icons/logoutIcons/ProfileIcon";
import LogoutIcon from "../../assets/icons/logoutIcons/LogoutIcon";
import Burger from "../../assets/icons/burger/Burger";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel, Box} from "@chakra-ui/react";
import "./Accordion.css"

const Header = ({coloredLogo = false, data, ratingId}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const {user, handleLoginModal, handleAuth} = useContext(ctx)
    const [accountIsOpen, setAccountIsOpen] = useState(false)
    const [isMenuOPen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        if (user) {
            document.addEventListener(
                "click",
                function (event) {
                    if (!event.target.closest(`#account-control-division`)) {
                        setAccountIsOpen(false);
                    }
                },
                false
            );
        }
    }, [user]);

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <Dropdown iconBackground={coloredLogo ? "" : "white"}/>
            </components.DropdownIndicator>
        );
    };

    const NoOptionsMessage = (props) => {
        return (
            <components.NoOptionsMessage {...props}>
                Hech narsa topilmadi
            </components.NoOptionsMessage>
        );
    };


    const handleLogout = () => {
        handleAuth()
        setTimeout(() => {
            setAccountIsOpen(false)
        }, 0)
    }

    const menuToggle = () => {
        setIsMenuOpen((p) => !p);
    };
    return (
        <header
            style={{background: `${pathname.split("/")[1] === "premium-tests" || pathname.split("/")[1] === "free-tests" ? "#F6F7F8" : coloredLogo ? "white" : "#0139FF"}`}}>
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
                        value={data?.tests[0]}
                        handleValue={(value) => navigate(`/tests/${value}`)}
                        color={coloredLogo ? "#415572" : "#0173FF"}
                        options={data.tests.slice(1)}
                        defaultValue={false}
                        iconBackground={coloredLogo ? "" : "#0173FF"}
                        label="Bizning testlar" f
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
                                  style={!coloredLogo ? {color: "white"} : null} to="/about-us">Biz haqimizda</Link>
                        </li>
                        <li>
                            <Link className={coloredLogo ? styles.coloredLogo : null}
                                  style={!coloredLogo ? {color: "white"} : null} to="/all-news">Yangiliklar</Link>
                        </li>
                        <li>
                            <Link className={coloredLogo ? styles.coloredLogo : null}
                                  style={!coloredLogo ? {color: "white"} : null}
                                  to="/rating/all">Reyting</Link>
                        </li>
                        <li>
                            <Select
                                options={data.channels.slice(1)}
                                value={data.channels[0]}
                                onChange={({value}) => navigate(`/channels/${value}`)}
                                isSearchable={false}
                                components={{
                                    NoOptionsMessage,
                                    DropdownIndicator,
                                    IndicatorSeparator: () => null,
                                }}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        backgroundColor: " transparent",
                                        border: 0,
                                        padding: "1.2rem 1.2rem 1.2rem 2.1rem",
                                        borderRadius: "323.2rem",
                                        boxShadow: "none",
                                        fontFamily:
                                            "'SourceSansPro', sans-serif",
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
                                        zIndex: "10000000",
                                        top: "calc(100% + .2rem)",
                                        left: "2rem",
                                        background: "#FFFFFF",
                                        borderRadius: "1.2rem",
                                        overflow: "hidden",
                                        minWidth: "calc(100% - 2rem)",
                                        // width: "auto",
                                        boxShadow:
                                            "rgba(149, 157, 165, 0.2) 0 .8rem 2.4rem",
                                    }),
                                    menuList: (base, state) => ({
                                        ...base,
                                        padding: state.children?.length > 0 ? "1.6rem 0" : "0",
                                        margin: 0
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
                                    }),
                                }}
                            />
                        </li>
                    </ul>
                </nav>
                <section
                    className={`${styles.mobileMenu} ${
                        isMenuOPen && styles.openMobileMenu
                    }`}
                >
                    <div style={{position: "relative"}} className="container">
                        <svg
                            onClick={menuToggle}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${styles.mobileMenuIcon} ${
                                !isMenuOPen &&
                                styles.mobileMenuIconDisplayNone
                            }`}
                            fill="none"
                            name="x-icon"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <ul className={styles.mobile}>
                            <li>
                                <Link onClick={menuToggle} to="/">Asosiy</Link>
                            </li>
                            <li>
                                <Link onClick={menuToggle} to="/about-us">Biz haqimizda</Link>
                            </li>
                            <li>
                                <Link onClick={menuToggle} to="/all-news">Yangiliklar</Link>
                            </li>
                            <li>
                                <Link onClick={menuToggle} to="/rating/all">Reyting</Link>
                            </li>
                            <li>
                                <Accordion allowToggle>
                                    <AccordionItem>
                                        {({isExpanded}) => (
                                            <>
                                                <AccordionButton>
                                                    <Box>
                                                        <span
                                                            style={
                                                                isExpanded
                                                                    ? {color: "#0065c1"}
                                                                    : {}
                                                            }
                                                        >
                                                            {data.channels[0].label}
                                                        </span>
                                                    </Box>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        style={{
                                                            transform: `${
                                                                isExpanded
                                                                    ? "rotate(-180deg)"
                                                                    : "rotate(0)"
                                                            }`,
                                                        }}
                                                        className={`${
                                                            isExpanded && "chakraAccordionSvgOpen"
                                                        }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                        />
                                                    </svg>
                                                </AccordionButton>
                                                <AccordionPanel>
                                                    <ul>
                                                        {
                                                            data.channels.slice(1).map(channel => {
                                                                return (
                                                                    <li>
                                                                        <Link
                                                                            onClick={menuToggle}
                                                                            to={`/channels/${channel.value}`}
                                                                        >
                                                                            {channel.label}
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })

                                                        }
                                                    </ul>
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                </Accordion>
                            </li>
                        </ul>
                    </div>
                </section>
                <div>
                    <span
                        onClick={() => {
                            if (!user) {
                                handleLoginModal(true)
                            } else {
                                setAccountIsOpen(true)
                            }
                        }}
                        style={pathname === "/profile" ? {backgroundColor: "#0173FF"} : !coloredLogo ? {backgroundColor: "white"} : null}
                        className={styles.account}
                        id="account-control-division"
                    >
                        <Account
                            stroke={pathname === "/profile" ? "white" : !coloredLogo ? "#0173FF" : "#415572"}
                        />
                        <div
                            style={{cursor: "auto"}}
                            className={`${styles["account-dropdown"]}  ${accountIsOpen ? styles["active-account"] : null}`}
                            id="account"
                        >
                                <Link to="/profile" onClick={() => {
                                    setTimeout(() => {
                                        setAccountIsOpen(false)
                                    }, 0)
                                }}>
                                    <ProfileIcon/>
                                    <span>Shaxsiy kabinet</span>
                                </Link>
                                <div onClick={handleLogout} style={{marginTop: ".5rem"}}>
                                    <LogoutIcon/>
                                    <span>Tizimdan chiqish</span>
                                </div>
                            </div>
                    </span>
                    <span onClick={menuToggle}
                          className={`${styles.burger} ${!coloredLogo ? styles["home-burger"] : null}`}>
                        <Burger/>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
