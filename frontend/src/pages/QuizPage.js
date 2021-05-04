import Layout from "../components/layout/Layout";
import BottomNav from "../components/bottom_nav/BottomNav";
import tamagotchi from "../images/tamagotchi.png";
import style from "../styles/pageStyles/playpage.module.scss";
import Button from "../components/button/Button";
import { useState, useEffect } from "react";
import Creature from "../components/creature/Creature";
import { authFetch } from "../auth/index";

const PlayPage = () => {

    const [selectedAnswer, setSelectedAnswer] = useState(false);

    const question = "";
    const correct_ans = "";
    const incorrect_ans_one = "";
    const incorrect_ans_two = "";

    useEffect(() => {
        authFetch("/api/play/quiz").then(response => {
            if (response.status === 401) {
                return null
            }
            return response.json()
        }).then(response => {
            if (response && response.message) {
                setSelectedAnswer(response.message)
                console.log(response)
            }
        })
    }, [])

    const handleBtn1 = () => {
        //setIsWaving(true);
        // setIsCheering(true);
    };
    const handleBtn2 = () => {
        //setIsWiggling(true);
    };
    const handleBtn3 = () => {
        //setIsJumping(true);
    };
   
    return (
        <Layout pageTitle="Tamagotcha">
            <div className={style.playPage}>
                <div className={style.imageContainer}>
                    {/* <HealthBar/>*/}
                    <img src={tamagotchi} alt="Tamagotcha toy" />
                    
                    <Button className={style.btn1} onClick={handleBtn1} />
                    <Button className={style.btn2} onClick={handleBtn2} />
                    <Button className={style.btn3} onClick={handleBtn3} />
                </div>
            </div>
            <BottomNav />
        </Layout>
    );
};

export default PlayPage;
