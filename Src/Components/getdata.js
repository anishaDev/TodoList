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

import { firebase } from "./Config";

const Fetch = () => {
  const [users, setUsers] = useState([]);
  // const {currentUser} = useContext(AuthContext)
// const currentUserId = currentUserId ? currentUser.uid : null
  const todoRef = firebase.firestore().collection("todos");
 

  useEffect(async () => {
    todoRef
    // .where("heading", "==", currentUserId)
    .onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const { heading, text } = doc.data();
        users.push({
          id: doc.id,
          heading,
          text,
          
        });
      });
      setUsers(users);
    });
  }, []);


  const getdata =() =>{
    //check if we have a todo
    if (addData && addData.length > 0) {
        //get the timestamp
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data ={
            heading : addData,
            createdAt : timestamp
        };
        todoRef
        .add(data)
        .then (() => {
            setAddData(' ');
            //release keyboard
            Keyboard.dismiss();
        })
        .catch(error => {
            alert(error + "something went wrong")
        })
    

}
}
  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <FlatList
        style={{ height: "100%" }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.heading}</Text>
              <Text style={styles.itemText}>{item.text}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
export default Fetch;
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e4e4e4',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:5,
        flexDirection:'row',
        alignItems:'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:45,
    
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,
    },
    itemText:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,
    },
    
  
  
    
    
    
    
    })