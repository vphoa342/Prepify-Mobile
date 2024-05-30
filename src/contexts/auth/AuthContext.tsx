import Loading from "$components/common/Loading";
import { AuthActionType, AuthContextType, AuthState } from "$types/auth.type";
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
} from "react";
import React from "react";
import { initialize, reducer } from "./auth.reducer";

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   useEffect(() => {
  //     dispatch(initialize({ isAuthenticated: true, user: null }));
  //   }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
