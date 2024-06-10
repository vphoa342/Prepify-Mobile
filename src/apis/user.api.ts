import { LoginFormType } from "$screens/LoginScreen/LoginScreen";
import { AuthResponse } from "$types/auth.type";
import { GoogleUrlResponse, UserResponse } from "$types/user.type";
import http from "$utils/http";

export const getMeQueryKey = "me";
export const getGoogleUrlQueryKey = "googleAuthUrl";

export const login = (body: LoginFormType) => {
    return http.post<AuthResponse>("/login", body);
};

export const getMe = () => {
    return http.get<UserResponse>("/me");
};

export const getGoogleAuthUrl = () => {
    return http.get<GoogleUrlResponse>("/login/google");
};

export const loginWithGoogle = (code: string | null, signal?: AbortSignal) => {
    return http.post<AuthResponse>("/login/google", { code }, { signal });
};

export const forgotPassword = (email: string) => {
    return http.post("/forgot-password", { email });
};

export const resetPassword = (token: string, password: string) =>
    http.post("/reset-password", { token, password });
