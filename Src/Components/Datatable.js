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
import React, { useState, useEffect, useId } from "react";
import firestore from "@react-native-firebase/firestore";

import { firebase } from "./Config";

const Datatable = () => {
  const [users, setUsers] = useState([]);

  // firebase
  //   .firestore()
  //   .collection("schools")

  // .get()
  // .then((querySnapshot) => {
  //     let serviceCostTotal = 0; //Will hold currentMonth Total Income.
  //     let monthNumber = 0;
  //     let array = [];
  //     querySnapshot.forEach((doc) => {
  //       monthNumber = parseInt(doc.data().id, 1);
  //       serviceCostTotal =
  //         serviceCostTotal + parseInt(doc.data().mark1, 1); //Calculate Total Month income using this formula
  //       array[monthNumber - 1] = serviceCostTotal; //Push the income of month X to array in X place
  //       serviceCostTotal = 0; // after pushing, initialize the sum to 0
  //     });

  //   })

  const todoRef = firebase.firestore().collection("Mycollection");

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
    todoRef.onSnapshot((querySnapshot) => {
      console.log("total serviceid:", querySnapshot.size);
      // let monthNumber = 0;
    
      const users = [];

      [
        { id:1,month: 10, serviceCost: 1500 },
        {id:2, month: 10, serviceCost: 1500 },
        { id:3,month: 11, serviceCost: 1000 },
       
        
      ].forEach((doc) => {
      const  monthNumber = parseInt(doc.month);
        
     let  servicecostTotal =0;
        servicecostTotal + parseInt(doc.serviceCost);
        users[servicecostTotal] = (users[servicecostTotal] || 0)+ parseInt(doc.serviceCost)/3

      //  console.log(servicecostTotal);
      console.log(users)
        // users[monthNumber - 1] = (users[monthNumber - 1] || 0) + parseInt(doc.serviceCost)/3
      
       
        // serviceCostTotal=serviceCostTotal+parsInt(doc.serviceCost,10)
       

        const { month, serviceCost, serviceType } = doc;
        users.push({
          id: doc.id,
          month,
          serviceCost,
          serviceType,
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
              <Text style={styles.itemHeading}>{item.month}</Text>
              <Text style={styles.itemText}>{item.serviceCost}</Text>
              <Text style={styles.itemText}>{item.serviceType}</Text>
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
