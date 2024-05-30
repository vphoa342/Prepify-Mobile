import { SuccessResponse } from "./response.type";
import { User } from "./user.type";
import { Dispatch } from "react";

export enum Role {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  SHIPPER = "SHIPPER",
}

export type AuthResponse = SuccessResponse<{
  access_token: string;
}>;

export enum AuthActionType {
  INITIALIZE = "INITIALIZE",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

export interface AuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: User | null;
}

export interface PayloadAction<T> {
  type: AuthActionType;
  payload: T;
}

export interface AuthContextType extends AuthState {
  dispatch: Dispatch<PayloadAction<AuthState>>;
}

export interface ReducerHandler {
  INITIALIZE(state: AuthState, action: PayloadAction<AuthState>): AuthState;
  SIGN_IN(state: AuthState, action: PayloadAction<AuthState>): AuthState;
  SIGN_OUT(state: AuthState): AuthState;
}
