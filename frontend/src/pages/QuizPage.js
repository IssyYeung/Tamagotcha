import Layout from "../components/layout/Layout";
import BottomNav from "../components/bottom_nav/BottomNav";
import tamagotchi from "../images/tamagotchi.png";
import Button from "../components/button/Button";
import { useState, useEffect } from "react";
import { authFetch } from "../auth/index";
import { useHistory } from "react-router-dom";
import style from "../styles/pageStyles/quizpage.module.scss";

const QuizPage = () => {
  const history = useHistory();

  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [question, setQuestion] = useState([]);
  const [correct_ans, setCorrectAns] = useState();
  const [incorrect_ans_one, setIncorrectAnsOne] = useState();
  const [incorrect_ans_two, setIncorrectAnsTwo] = useState();
  const [sleep, setSleep] = useState();
  const [thirst, setThirst] = useState();
  const [hunger, setHunger] = useState();
  const [fun, setFun] = useState();

  let array_of_ans = [correct_ans, incorrect_ans_one, incorrect_ans_two];

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    try {
      authFetch("http://127.0.0.1:5000/api/tamagotcha_stats")
        .then((res) => res.json())
        .then((json) => {
          setSleep(json[0].sleep);
          setThirst(json[0].thirst);
          setHunger(json[0].hunger);
          setFun(json[0].fun);
        });
      authFetch("http://127.0.0.1:5000/api/play/quiz")
        .then((res) => res.json())
        .then((json) => {
          setQuestion(json.question);
          setCorrectAns(json.correct_ans);
          setIncorrectAnsOne(json.incorrect_ans_one);
          setIncorrectAnsTwo(json.incorrect_ans_two);
        });
      shuffle(array_of_ans);
    } catch (err) {
      console.log("Error fetching API");
    }
  }, []);

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${window.$user_token["access_token"]}`
  );
  // Hackers please ignore above line - fixed
  myHeaders.append("Content-Type", "application/json");

  const requestOptionsFun = {
    method: "PUT",
    body: JSON.stringify({
      fun: `${Math.min(100, fun + 10)}`,
      sleep: `${Math.min(100, sleep)}`,
      hunger: `${Math.min(100, hunger)}`,
      thirst: `${Math.min(100, thirst)}`,
    }),
    headers: myHeaders,
  };

  const incrementFun = () => {
    fetch("http://127.0.0.1:5000/api/update_tamagotcha", requestOptionsFun)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(console.log("Fun stat incremented."))
      .then(console.log(requestOptionsFun.body))
      .then(history.push("/minigames/quiz"));
  };

  const handleBtn1 = () => {
    setSelectedAnswer(array_of_ans[0]);
    console.log(selectedAnswer);
    if (selectedAnswer === correct_ans) {
      incrementFun();
    }
  };
  const handleBtn2 = () => {
    setSelectedAnswer(array_of_ans[1]);
    console.log(selectedAnswer);
    if (selectedAnswer === correct_ans) {
      incrementFun();
    }
  };
  const handleBtn3 = () => {
    setSelectedAnswer(array_of_ans[2]);
    console.log(selectedAnswer);
    if (selectedAnswer === correct_ans) {
      incrementFun();
    }
  };

  const requestOptionsFinish = {
    method: "PUT",
    body: JSON.stringify({}),
    headers: myHeaders,
  };

  const handleFinishButton = () => {
    fetch("http://127.0.0.1:5000/api/play/finish_quiz", requestOptionsFinish)
      .then(console.log("Quiz finished.."))
      .then(console.log(requestOptionsFinish.body));
  };

  console.log(`Question: ${question}`);
  console.log(`Answers: ${array_of_ans}`);
  return (
    <Layout pageTitle="Tamagotcha">
      <div className={style.quizPage}>
        <div className={style.imageContainer}>
          <img src={tamagotchi} alt="Tamagotcha toy" />
          <p className={style.question}>{question}</p>
          <p className={style.answer1}>A: {array_of_ans[0]}</p>
          <p className={style.answer2}>B: {array_of_ans[1]}</p>
          <p className={style.answer3}>C: {array_of_ans[2]}</p>
          <Button className={style.btn1} onClick={handleBtn1}>
            A
          </Button>
          <Button className={style.btn2} onClick={handleBtn2}>
            B
          </Button>
          <Button className={style.btn3} onClick={handleBtn3}>
            C
          </Button>
          <Button className={style.finishBtn} onClick={handleFinishButton}>
            Finish quiz
          </Button>
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
};

export default QuizPage;
