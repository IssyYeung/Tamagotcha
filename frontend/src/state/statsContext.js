import { useReducer, createContext, useEffect, useState } from "react";

export const StatsContext = createContext();

const initialState = {
  name: "Tamagotcha",
  breed: "Normal",
  timeFeedBy: Date.now(),
  timeDrinkBy: Date.now(),
  timeSleepBy: Date.now(),
  timePlayBy: Date.now(),
  timeBorn: 0,
  sleep: 50,
  thirst: 50,
  hunger: 50,
  fun: 50,
  avgHealth: 50,
  isInitial: true,
};

const reducer = (state, action) => {
  // action is an object with keys of type and payload
  // where type is the event, and payload is the data being changed
  switch (action.type) {
    case "SET_STATS":
      // will need to use this to set from api
      let fromAPI = action.payload;
      console.log(`setting stats ${Date.parse(fromAPI.time_feed_by)}`);
      console.log(fromAPI);
      if (fromAPI === undefined) {
        return state;
      }
      return {
        ...state,
        name: fromAPI.name,
        timeBorn: fromAPI.time_of_birth,
        // * NEW:
        timeFeedBy: Date.parse(fromAPI.time_feed_by),
        timeDrinkBy: Date.parse(fromAPI.time_drink_by),
        timeSleepBy: Date.parse(fromAPI.time_sleep_by),
        timePlayBy: Date.parse(fromAPI.time_play_by),
        isInitial: false,
        avgHealth: Math.floor(
          (fromAPI.sleep + fromAPI.thirst + fromAPI.hunger + fromAPI.fun) / 4
        ),
      };
    case "UPDATE_STATS":
      // this will be used to change a/some stat(s) and leave the rest alone
      let data = action.payload;
      let newState = {
        name: data.name ? data.name : state.name,
        timeBorn: data.timeBorn ? data.timeBorn : state.timeBorn,
        // * done today:
        timeFeedBy: data.timeFeedBy ? data.timeFeedBy : state.timeFeedBy,
        timeDrinkBy: data.timeDrinkBy ? data.timeDrinkBy : state.timeDrinkBy,
        timeSleepBy: data.timeSleepBy ? data.timeSleepBy : state.timeSleepBy,
        timePlayBy: data.timePlayBy ? data.timePlayBy : state.timePlayBy,

        sleep: data.sleep ? data.sleep : state.sleep,
        thirst: data.thirst ? data.thirst : state.thirst,
        hunger: data.hunger ? data.hunger : state.hunger,
        fun: data.fun ? data.fun : state.fun,
        isInitial: false,
      };
      let avgHealth = Math.floor(
        (newState.sleep + newState.thirst + newState.hunger + newState.fun) / 4
      );

      // TODO: here we could set/send newState to backend

      return { ...newState, avgHealth };
    default:
      throw new Error();
  }
};

export const StatsContextProvider = ({ children }) => {
  //  dispatch, dispatches an event, like setState but can do multiple
  const [state, dispatch] = useReducer(reducer, initialState);
  // this is used to refresh the component every 20 seconds
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 2000);
    let timeTillStarve = state.timeFeedBy - Date.now();
    let hunger = Math.round((timeTillStarve / 21600000) * 100);
    let timeTillParched = state.timeDrinkBy - Date.now();
    let thirst = Math.round((timeTillParched / 14400000) * 100);
    let timeTillExhaustion = state.timeSleepBy - Date.now();
    let sleep = Math.round((timeTillExhaustion / 64800000) * 100);
    let timeTillHeartBreak = state.timePlayBy - Date.now();
    let fun = Math.round((timeTillHeartBreak / 28800000) * 100);

    dispatch({
      type: "UPDATE_STATS",
      payload: { hunger: hunger, thirst: thirst, sleep: sleep, fun: fun },
    });

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <StatsContext.Provider value={[state, dispatch]}>
      {children}
    </StatsContext.Provider>
  );
};
