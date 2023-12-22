import COLORS, { ColorSchemas } from "@/constants/colors";
import { navigationRef } from "@/services/navigation";
import { RootStackParamList } from "@/types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LinkingOptions,
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { FC, ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";
import { StatusBar, Text, View, useColorScheme } from "react-native";
import {
  ActivityIndicator,
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const lightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    error: COLORS.RedInput,
    gray: COLORS.GrayLight,
    white: COLORS.White,
    black: COLORS.Black,
    surfaceContainer: "#ECE6F0",
    blackText: "#1D1B20",
  },
};

const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    error: COLORS.RedInput,
    gray: COLORS.Gray,
    white: COLORS.Black,
    black: COLORS.White,
    surfaceContainer: "#2B2930",
    blackText: "#E6E0E9",
  },
};

export type Theme = typeof lightTheme;
export type ThemeType = "dark" | "light";

export interface ThemeContextValues {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValues>({
  theme: lightTheme,
  themeType: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
interface ThemeContextProviderProps {
  children: ReactNode;
  linking: LinkingOptions<RootStackParamList>;
}

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

AsyncStorage.removeItem(PERSISTENCE_KEY);

const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children, linking }) => {
  const colorScheme = useColorScheme();

  const [themeType, setThemeType] = useState<ThemeType>(colorScheme || "dark");

  const toggleTheme = useCallback(
    () => setThemeType((prev) => (prev === "dark" ? "light" : "dark")),
    []
  );

  const theme = useMemo(() => (themeType === "dark" ? darkTheme : lightTheme), [themeType]);

  // const [isReady, setIsReady] = useState(false);
  // const [initialState, setInitialState] = useState();

  // useEffect(() => {
  //   const restoreState = async () => {
  //     try {
  //       const initialUrl = await Linking.getInitialURL();

  //       if (Platform.OS !== "web" && initialUrl == null) {
  //         // Only restore state if there's no deep link and we're not on web
  //         const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
  //         const state = savedStateString ? JSON.parse(savedStateString) : undefined;

  //         if (state !== undefined) {
  //           setInitialState(state);
  //         }
  //       }
  //     } finally {
  //       setIsReady(true);
  //     }
  //   };

  //   if (!isReady) {
  //     restoreState();
  //   }
  // }, [isReady]);

  // if (!isReady) {
  //   return <ActivityIndicator />;
  // }

  return (
    <NavigationContainer
      // initialState={initialState}
      linking={linking}
      theme={theme}
      fallback={
        <>
          <StatusBar
            backgroundColor={"transparent"}
            translucent
            animated
            barStyle={themeType === "dark" ? "light-content" : "dark-content"}
          />
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={"large"} color={ColorSchemas.blue} />
          </View>
        </>
      }
      ref={navigationRef}
    >
      <PaperProvider theme={theme}>
        <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
          <StatusBar
            backgroundColor={"transparent"}
            translucent
            animated
            barStyle={themeType === "dark" ? "light-content" : "dark-content"}
          />
          {children}
        </ThemeContext.Provider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default ThemeContextProvider;
