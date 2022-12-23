import React from 'react';
import styles from './Header.module.css'
import ColoredLogo from "../../assets/icons/coloredLogo/ColoredLogo";
import Logo from "../../assets/icons/logo/Logo";
import CustomSelect from "../UI/customSelect/CustomSelect";

const Header = ({coloredLogo = false}) => {
    return (
        <header className="container">
            <div className={styles["header-inner"]}>
                <div>
                    {
                        coloredLogo ? <ColoredLogo/> : <Logo/>
                    }
                    <CustomSelect
                        options={
                            [
                                {value: 1, label: 'Saralash testlari'},
                                {value: 2, label: 'Ingliz tili'},
                                {value: 3, label: 'Muammoli masalalar'},
                                {value: 4, label: 'Tanqidiy fikrlash'}
                            ]
                        }
                    />
                </div>
                <nav></nav>
                <div></div>

            </div>
        </header>
    );
};

export default Header;