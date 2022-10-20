import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import {firebase} from './Config'
// import { db } from "./Core/Config";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { doc, QuerySnapshot } from "firebase/firestore";

const Detail = ({ route }) => {
  const todoRef = firebase.firestore().collection("todos");
  const [textHeading, onChangeHeadingText] = useState(route.params.item.name);
  const navigation = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      todoRef
        .doc(route.params.item.id)
        .update({
          heading: textHeading,
        })
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          alert(error + "Not updated");
        });
    }
  }

  return (
    <View  style={styles.container}>
        <TextInput
        style={styles.textField}
        placeholder="Update Todo"
        placeholderTextColor="#aaaa"
        onChangeText={onChangeHeadingText}
        value={textHeading}
   
        />
        <Pressable 
         style={styles.buttonUpdate}
         onPress= {() => {updateTodo()}}
        
        
        >
            <Text>UPDATE TODO</Text>

        </Pressable>
    </View>
  );
};

export default Detail;
const styles = StyleSheet.create({
    container:{
       marginTop:80,
       marginLeft:15,
       marginRight:15,
    },
    textField:{
        marginBottom:10,
        padding:10,
        fontSize:15,
        color:"#000",
        backgroundColor:"#e0e0e0",
        borderRadius:5,


    },
    buttonUpdate:{
        marginTop:25,
        alignItems:'center',
        justifyContent: 'center',
        paddingVertical:12,
        paddingHorizontal:32,
        borderRadius:4,
        elevation:10,
        backgroundColor:'#0de065',
    }
    
})