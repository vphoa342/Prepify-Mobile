import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const routes = {
    home: "/",
    admin: "/admin",
    login: "/login",
    loginGoogle: "/login/google",
    register: "/register",
    logout: "/logout",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    about: "/about",
};

export enum AppScreens {
    HomeScreen = "Home",
    LoginScreen = "Login",
    ForgotPasswordScreen = "ForgotPassword",
    ResetPasswordScreen = "ResetPassword",
    ProfileScreen = "Profile",
    AppBottomTabScreen = "AppBottomTab",
}

export type AuthNavigationParamList = {
    [AppScreens.LoginScreen]: { code?: string } | undefined;
    [AppScreens.ForgotPasswordScreen]: { code?: string } | undefined;
    [AppScreens.ResetPasswordScreen]:
        | { token: string; code?: string }
        | undefined;
};

export type AppBottomTabNavigationParamList = {
    [AppScreens.HomeScreen]: undefined;
};

export type MainNavigationParamList = {
    [AppScreens.AppBottomTabScreen]:
        | NavigatorScreenParams<AppBottomTabNavigationParamList>
        | undefined;
    [AppScreens.ProfileScreen]: undefined;
};

export type MainScreenProps<T extends keyof MainNavigationParamList> = {
    navigation: DrawerNavigationProp<MainNavigationParamList, T>;
    route: RouteProp<MainNavigationParamList, T>;
};

export type AuthScreenProps<T extends keyof AuthNavigationParamList> = {
    navigation: NativeStackNavigationProp<AuthNavigationParamList, T>;
    route: RouteProp<AuthNavigationParamList, T>;
};

export type AppBottomTabScreenProps<
    T extends keyof AppBottomTabNavigationParamList
> = {
    navigation: NativeStackNavigationProp<AppBottomTabNavigationParamList, T>;
    route: RouteProp<AppBottomTabNavigationParamList, T>;
};
