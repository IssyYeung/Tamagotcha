import Layout from "../components/layout/Layout";
import BottomNav from "../components/bottom_nav/BottomNav";
import tamagotchi from "../images/tamagotchi.png";
import Button from "../components/button/Button";
import { useState, useEffect, useContext } from "react";
import { authFetch } from "../auth/index";
import { useHistory } from "react-router-dom";
import style from "../styles/pageStyles/quizpage.module.scss";
import { StatsContext } from "../state/statsContext";
import Reward from 'react-rewards';

const QuizPage = () => {
  const [state, dispatch] = useContext(StatsContext);
  const history = useHistory();
  const [question, setQuestion] = useState();
  const [correct_ans, setCorrectAns] = useState();
  const [incorrect_ans_one, setIncorrectAnsOne] = useState();
  const [incorrect_ans_two, setIncorrectAnsTwo] = useState();
  const [count, setCount] = useState(0)
  const [array_of_ans, set_array_of_ans] = useState([correct_ans, incorrect_ans_one, incorrect_ans_two]);

  const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  useEffect(() => {
    try {
      authFetch("http://127.0.0.1:5000/api/play/quiz")
        .then((res) => res.json())
        .then((json) => {
          setQuestion(json.question);
          setCorrectAns(json.correct_ans);
          setIncorrectAnsOne(json.incorrect_ans_one);
          setIncorrectAnsTwo(json.incorrect_ans_two);
          let array_of_ans = [json.correct_ans, json.incorrect_ans_one, json.incorrect_ans_two]
          set_array_of_ans(shuffle(array_of_ans));
        })  
    } catch (err) {
      console.log("Error fetching API");
    }
  }, [count]);
  
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${window.$user_token["access_token"]}`
  );
  myHeaders.append("Content-Type", "application/json");

  const updateDB = ({
    food = "null",
    drink = "null",
    game = "null",
    sleep = "null",
  }) => {
    fetch("http://127.0.0.1:5000/api/update_tamagotcha", {
      method: "PUT",
      body: JSON.stringify({
        food: food,
        drink: drink,
        game: game,
        sleep: sleep,
      }),
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch({ type: "SET_STATS", payload: json });
      });
  };

  const handleBtn1 = () => {
    if (array_of_ans[0] === correct_ans) {
      Window.reward.rewardMe();
      updateDB({ game: "quiz" });
      history.push("/minigames/quiz");
      setCount(count + 1)
    } else{
      Window.reward.punishMe();
      history.push("/minigames/quiz");
    }
  };

  const handleBtn2 = () => {
    if (array_of_ans[1] === correct_ans) {
      Window.reward.rewardMe();
      updateDB({ game: "quiz" });
      history.push("/minigames/quiz");
      setCount(count + 1)
    } else{
      Window.reward.punishMe();
      history.push("/minigames/quiz");
    }
  };
  
  const handleBtn3 = () => {
    if (array_of_ans[2] === correct_ans) {
      Window.reward.rewardMe();
      updateDB({ game: "quiz" });
      history.push("/minigames/quiz");
      setCount(count + 1)
    } else{
      Window.reward.punishMe();
      history.push("/minigames/quiz");
    }
  };

  const requestOptionsFinish = {
    method: "PUT",
    headers: myHeaders,
  };

  const handleFinishButton = () => {
    fetch("http://127.0.0.1:5000/api/play/finish_quiz", requestOptionsFinish)
      .then(console.log("Quiz finished.."))
      .then(history.push("/play"))
  };

  return (
    <Layout pageTitle="Tamagotcha">
      <Reward
            ref={(ref) => { Window.reward = ref }}
            type='emoji'
            config= {{
              elementCount: 500,
              spread: 295,
              angle: 150,
              startVelocity: 50,
              zIndex:100,
              emoji:["🥚", "🐣", "🐼", "✔️"],
            }}
            >
          
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
      </Reward>
      <BottomNav />
    </Layout>
  );
};

export default QuizPage;
