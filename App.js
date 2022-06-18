import Navigation from "./Navigation";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Startpage from "./Components/Startpage";
import { createStackNavigator } from "@react-navigation/stack";
import CreateWorkoutScreen from "./Components/CreateWorkoutScreen";
import { Provider } from "react-native-paper";
import "react-native-get-random-values";
import { Context } from "./Components/Context/Context";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";
import merge from "deepmerge";
import { useState, useCallback, useMemo } from "react";
import * as SQLite from "expo-sqlite";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const DefaultThemeNew = {
  ...CombinedDefaultTheme,
  roundness: 2,
  colors: {
    ...CombinedDefaultTheme.colors,
    background: "#fefbe9",
    primary: "#fefbe9",
    accent: "#f0a04b",
    greenDark: "#183a1d",
    greenBright: "#e1eedd",
    header: "#cb7d8c",
    searchbar: "#ffffff",
    text: "black",
    listitem: "#f0a04b",
  },
};

const DarkThemeNew = {
  ...CombinedDarkTheme,
  roundness: 2,
  colors: {
    ...CombinedDarkTheme.colors,
    background: "#212121",
    header: "#000000",
    searchbar: "#e1eedd",
    accent: "#183a1d",
    text: "white",
    listitem: "#183a1d",
  },
};

const Stack = createStackNavigator();

// SQLite
const database = SQLite.openDatabase("appData.db");

export default function App() {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [sqlDB, setSqlDB] = useState([]);

  // Der Funktion executeSQL, können normale SQL befehle übergeben werden
  // Hier kann eine neue Tablle (Workouts) in der Datenbank "appData.db" erstellt werden
  useEffect(() => {
    database.transaction((transaction) => transaction.executeSql(""));
  }, [sqlDB]);

  let theme = isThemeDark ? DarkThemeNew : DefaultThemeNew;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const updateSQLDB = useCallback(
    (data) => {
      alert(data);
      setSqlDB([]);
    },
    [sqlDB]
  );

  const preferences = useMemo(
    () => ({
      updateSQLDB,
      sqlDB,
      toggleTheme,
      isThemeDark,
    }),
    [updateSQLDB, sqlDB, toggleTheme, isThemeDark]
  );

  return (
    <>
      <Context.Provider value={preferences}>
        <Provider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Startpage"
                  component={Startpage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Navigation"
                  component={Navigation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreateWorkout"
                  component={CreateWorkoutScreen}
                  options={{
                    headerBackTitleStyle: {
                      color: "white",
                      backgroundColor: "green",
                    },
                    headerTitle: "Neues Workout erstellen",
                    headerTitleStyle: { color: "white" },
                    headerStyle: { backgroundColor: "grey" },
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="inverted" />
          </SafeAreaView>
        </Provider>
      </Context.Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
