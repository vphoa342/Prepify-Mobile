import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
    adaptNavigationTheme,
    MD3LightTheme as DefaultTheme,
} from "react-native-paper";

const PrepifyTheme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
        ...DefaultTheme.colors,
        primary: "#F97316",
    },
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedPrepifyTheme = {
    ...PrepifyTheme,
    ...LightTheme,
    colors: {
        ...LightTheme.colors,
        ...PrepifyTheme.colors,
    },
};

export default CombinedPrepifyTheme;
