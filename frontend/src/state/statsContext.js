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
  switch (action.type) {
    case "getStats":
      return {};
    default:
      throw new Error();
  }
};

export const StatsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //  dispatch, dispatches an event, like setState but can do multiple
  return <StatsContext.Provider>{children}</StatsContext.Provider>;
};
