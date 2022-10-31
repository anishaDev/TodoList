

                            

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

const Datatable = () => {
  const [users, setUsers] = useState([]);


  







  const todoRef = firebase.firestore().collection("schools");

  // todoRef.onSnapshot((querySnapshot) => {
  //   let monthNumber = 0;
  //   let array = [];
  //   [
  //     { month: 1, servicecost: 15 },
  //     { month: 1, servicecost: 15 },
  //     { month: 1, servicecost: 15 },
  //     { month: 2, servicecost: 15 },
  //     { month: 3, servicecost: 15 },
  //   ].forEach((doc) => {
  //     monthNumber = parseInt(doc.month, 10);
  //     servicecostTotal = servicecostTotal + parseInt(doc.servicecost, 10  );
  //     array[monthNumber -1] = (array[monthNumber -1] || 0) + servicecostTotal;
  //     servicecostTotal = 0;
  //     const { servicecostTotal } = doc.data();
  //     array.push({
  //       id: doc.id,
  //       servicecostTotal

  //     })
  //   });
  //   console.log(array)

  // })

  useEffect(async () => {
    todoRef
      // .where('totalmarks', '<=', 356)
      .orderBy("totalmarks", "desc")

      .onSnapshot((querySnapshot) => {
        console.log('total students:' , querySnapshot.size)
        const users = [];

        querySnapshot.forEach((doc) => {
          console.log('User ID:' , doc.id, doc.data());
          sum=mark1+mark2;
          averagemark=sum/4
          const { title, mark1, mark2, totalmarks, desc,sum,averagemark } = doc.data();
          users.push({
            id: doc.id,
            title,
            mark1,
            mark2,
            totalmarks,
            desc,
            sum,
            averagemark

          });
        });
        setUsers(users);
      });
  }, []);

  //   const getdata =() =>{
  //     //check if we have a todo
  //     if (addData && addData.length > 0) {
  //         //get the timestamp
  //         const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  //         const data ={
  //             heading : addData,
  //             createdAt : timestamp
  //         };
  //         todoRef
  //         .add(data)
  //         .then (() => {
  //             setAddData(' ');
  //             //release keyboard
  //             Keyboard.dismiss();
  //         })
  //         .catch(error => {
  //             alert(error + "something went wrong")
  //         })

  // }
  // }

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <FlatList
        style={{ height: "100%" }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.title}</Text>
              <Text style={styles.itemText}>{item.mark1}</Text>
              <Text style={styles.itemText}>{item.mark2}</Text>
              <Text style={styles.itemText}>{item.totalmarks}</Text>
              <Text style={styles.itemText}>{item.desc}</Text>
              <Text style={styles.itemText}>{item.sum}</Text>
              <Text style={styles.itemText}>{item.averagemark}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
export default Datatable;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e4e4e4",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginLeft: 45,
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },
  itemText: {
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 22,
  },
});




