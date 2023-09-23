import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:4000";

const UniContext = createContext();

const initialState = {
  backInfo: [],
  isLoading: false,
  currentInfo: {},
  error: "",
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: "hello" };

    case "info/loaded":
      return {
        ...state,
        isLoading: false,
        backInfo: action.payload,
        error: "bye",
      };

    // case "icon/loaded":
    //   return { ...state, isLoading: false, currentIcon: action.payload };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "login":
      return { ...state, isAuthenticated: true };

    default:
      throw new Error("Unknon action type");
  }
}

function UniProvider({ children }) {
  const [
    { backInfo, isLoading, currentInfo, error, isAuthenticated },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchUni() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/login`);
        const data = await res.json();
        dispatch({ type: "info/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    fetchUni();
  }, []);

  //   async function getUni(id) {
  //     if (Number(id) === currentIcon.id) return;

  //     dispatch({ type: "loading" });
  //     try {
  //       const res = await fetch(`${BASE_URL}/icons/${id}`);
  //       const data = await res.json();
  //       dispatch({ type: "icon/loaded", payload: data });
  //     } catch {
  //       dispatch({
  //         type: "rejected",
  //         payload: "There was an error loading data...",
  //       });
  //     }
  //   }

  function login() {
    dispatch({ type: "login" });
  }

  return (
    <UniContext.Provider
      value={{
        backInfo,
        isLoading,
        currentInfo,
        error,
        login,
        isAuthenticated,
      }}
    >
      {children}
    </UniContext.Provider>
  );
}

function useUni() {
  const context = useContext(UniContext);
  if (context === undefined)
    throw new Error("UniContext was used outside the UniProvider");
  return context;
}

export { UniProvider, useUni };
