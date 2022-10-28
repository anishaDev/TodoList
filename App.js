import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
//using db reference
// import { db } from "./Config";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Src/Components/Home";
import Detail from "./Src/Components/Detail";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import App1 from "./Src/Components/Table";
import Fetch, { AddToOrganization } from "./Src/Components/getdata";

const Stack = createStackNavigator();

export default function App() {

  return (
   
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen 
        name="Home"
        component={Home}
        
        />
         <Stack.Screen 
        name="Detail"
        component={Detail}
        
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
