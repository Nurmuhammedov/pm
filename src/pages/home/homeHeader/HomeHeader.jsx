import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Button from "../../../components/UI/button/Button";
import styles from './HomeHeader.module.css';
import {ctx} from "../../../App";
import PurchaseTestModal from "../../../components/purchaseTestModal/PurchaseTestModal";

const HomeHeader = ({headerSection}) => {
    const navigate = useNavigate()
    const {user, handleLoginModal} = useContext(ctx)
    const [purchaseTest, setPurchaseTest] = useState(false)

    const handlePurchaseTest = () => {
        setPurchaseTest(false)
    }
    return (
        <section className={styles.self}>
            <div className={styles["self-inner"]}>
                <div className="container">
                    <h1>
                        Siz qidirayotgan sifatli testlar<br/><span style={{color: "#FFF61B"}}>shu yerda</span>
                    </h1>
                    <p>
                        {headerSection.short_description}
                    </p>
                    <div style={{display: 'flex', gap: ".8rem"}}>
                        {
                            !user ? <Button
                                onClick={() => handleLoginModal(true)}
                                fontFamily='"SourceSansPro-SemiBold", sans-serif'
                                fontWeight='600'
                                fontSize='1.8rem'
                                lineHeight='2rem'
                                padding="1.5rem 3rem"
                                color='#FFFFFF'
                                backgroundColor="rgba(255, 255, 255, 0.1)"
                            >
                                Ro‘yhatdan o‘tish
                            </Button> : null
                        }
                        {
                            user ? <Button
                                onClick={() => setPurchaseTest(true)}
                                fontFamily='"SourceSansPro-SemiBold", sans-serif'
                                fontWeight='600'
                                fontSize='1.8rem'
                                lineHeight='2rem'
                                padding="1.5rem 3rem"
                                color='#FFFFFF'
                                backgroundColor="rgba(255, 255, 255, 0.1)"
                            >
                                Hisobni to‘ldirish
                            </Button> : null
                        }
                        <Button
                            onClick={() => navigate("/tests/all")}
                            fontFamily='"SourceSansPro-SemiBold", sans-serif'
                            fontWeight='600'
                            fontSize='1.8rem'
                            lineHeight='2rem'
                            padding="1.5rem 3rem"
                            color='#0173FF'
                            backgroundColor="#FFFFFF"
                        >
                            Barcha testlar
                        </Button>
                    </div>
                </div>
            </div>
            {
                purchaseTest ?
                    <PurchaseTestModal balance={user?.balance} propPage={2} handlePurchaseTestModal={handlePurchaseTest}
                                       page={2}/> : null
            }
        </section>
    );
};

export default HomeHeader;