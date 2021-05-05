
import { authFetch } from "../../auth/index";
import {useState, useEffect} from "react";


export const Decrement_stats = () => {
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
  }, []);
    
    const [count, setCount] = useState(0)

    const myHeaders = new Headers()
    myHeaders.append("Authorization", `Bearer ${window.$user_token["access_token"]}`)
    myHeaders.append("Content-Type", "application/json")

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({"hunger": `${Math.max(-100000000, hunger-2)}`, "thirst": `${Math.max(0, thirst-5)}`, "fun": `${Math.max(0, fun-3)}`, "sleep": `${Math.max(0, sleep-2)}`})
    };


  

    // const fetch_decremented_stats  = () => {
    //   fetch("http://127.0.0.1:5000/api/update_tamagotcha", requestOptions)
    //         .then(console.log("Stats decremented."))
    // }

    // setInterval( () => { fetch_decremented_stats() }, 5000)


};