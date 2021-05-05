import Layout from "../components/layout/Layout";
import BottomNav from "../components/bottom_nav/BottomNav";
import tamagotchi from "../images/tamagotchi.png";
import style from "../styles/pageStyles/playpage.module.scss";
import Button from "../components/button/Button";
import { useState, useEffect } from "react";
import { authFetch } from "../auth/index";

const QuizPage = () => {

    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [question, setQuestion] = useState([]);
    const [correct_ans, setCorrectAns] = useState([]);
    const [incorrect_ans_one, setIncorrectAnsOne] = useState([]);
    const [incorrect_ans_two, setIncorrectAnsTwo] = useState([]);
    const [sleep, setSleep] = useState([]);
    const [thirst, setThirst] = useState([]);
    const [hunger, setHunger] = useState([]);
    const [fun, setFun] = useState([]);

    useEffect(() => {
        authFetch("http://127.0.0.1:5000/api/tamagotcha_stats")
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setSleep(json[0].sleep);
                setThirst(json[0].thirst);
                setHunger(json[0].hunger);
                setFun(json[0].fun);
            });
        authFetch("http://127.0.0.1:5000/api/play/quiz")
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setQuestion(json.question);
                setCorrectAns(json.correct_ans);
                setIncorrectAnsOne(json.incorrect_ans_one);
                setIncorrectAnsTwo(json.incorrect_ans_two);
            });
    });

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    let array_of_ans = [correct_ans, incorrect_ans_one, incorrect_ans_two];
    console.log(array_of_ans)
    let shuffled_ans = shuffle(array_of_ans);

    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${window.$user_token["access_token"]}`)
    myHeaders.append("Content-Type", "application/json")

    const requestOptionsFun = {
        method: "PUT",
        body: JSON.stringify({ "fun": `${Math.min(0, fun + 10)}`, "sleep": `${Math.min(100, sleep)}`, "hunger": `${Math.min(100, hunger)}`, "thirst": `${Math.min(100, thirst)}` }),
        headers: myHeaders
    };

    const incrementFun = () => {
        fetch("http://127.0.0.1:5000/api/update_tamagotcha", requestOptionsFun)
            .then(console.log("Fun stat incremented.")).then(console.log(requestOptionsFun.body))
    }

    const handleBtn1 = () => {
        setSelectedAnswer(shuffled_ans[0])
        if (selectedAnswer === correct_ans) {
            incrementFun();
        };
    };
    const handleBtn2 = () => {
        setSelectedAnswer(shuffled_ans[1])
        if (selectedAnswer === correct_ans) {
            incrementFun();
        };
    };
    const handleBtn3 = () => {
        setSelectedAnswer(shuffled_ans[2])
        if (selectedAnswer === correct_ans) {
            incrementFun();
        };
    };

    return (
        <Layout pageTitle="Tamagotcha">
            <div className={style.playPage}>
                <div className={style.imageContainer}>

                    <img src={tamagotchi} alt="Tamagotcha toy" />
                    <text>{question}</text>
                    <text>{shuffled_ans[0]}</text>
                    <text>{shuffled_ans[1]}</text>
                    <text>{shuffled_ans[2]}</text>
                    <Button className={style.btn1} onClick={handleBtn1} />
                    <Button className={style.btn2} onClick={handleBtn2} />
                    <Button className={style.btn3} onClick={handleBtn3} />
                </div>
            </div>
            <BottomNav />
        </Layout>
    );
};

export default QuizPage;
