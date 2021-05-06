import { useReducer, createContext } from "react";

export const StatsContext = createContext();

const initialState = {
  name: "Tamagotcha",
  breed: "Normal",
  timeBorn: 0,
  sleep: 50,
  thirst: 50,
  hunger: 50,
  fun: 50,
  avgHealth: 50,
};

const reducer = (state, action) => {
  // action is an object with keys of type and payload
  // where type is the event, and payload is the data being changed
  switch (action.type) {
    case "SET_STATS":
      // will need to use this to set from api
      let fromAPI = action.payload;
      return {
        name: fromAPI.name,
        breed: fromAPI.breed,
        timeBorn: fromAPI.time_of_birth,
        sleep: fromAPI.sleep,
        thirst: fromAPI.thirst,
        hunger: fromAPI.hunger,
        fun: fromAPI.fun,
        last_active: fromAPI.last_active,
        is_dead: fromAPI.is_dead,
        avgHealth: Math.floor(
          (fromAPI.sleep + fromAPI.thirst + fromAPI.hunger + fromAPI.fun) / 4
        ),
      };
    case "UPDATE_STATS":
      // this will be used to change a/some stat(s) and leave the rest alone
      let data = action.payload;
      let newState = {
        name: data.name ? data.name : state.name,
        breed: data.breed ? data.breed : state.breed,
        timeBorn: data.timeBorn ? data.timeBorn : state.timeBorn,
        sleep: data.sleep ? data.sleep : state.sleep,
        thirst: data.thirst ? data.thirst : state.thirst,
        hunger: data.hunger ? data.hunger : state.hunger,
        fun: data.fun ? data.fun : state.fun,
        last_active: data.last_active ? data.last_active : state.last_active,
        is_dead: data.is_dead ? data.is_dead : state.is_dead
      };
      let avgHealth = Math.floor(
        (newState.sleep + newState.thirst + newState.hunger + newState.fun) / 4
      );
      return { ...newState, avgHealth };
      //NEW CASE HERE TO SEND TO BACKEND (current state), WILL NEED HEADERS ETC FROM ACCOUNTS PAGE.
    default:
      throw new Error();
  }
};

export const StatsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //  dispatch, dispatches an event, like setState but can do multiple

  return (
    <StatsContext.Provider value={[state, dispatch]}>
      {children}
    </StatsContext.Provider>
  );
};
