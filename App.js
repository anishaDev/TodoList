import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button,TextInput } from "react-native";
//using db reference
import { db } from "./Core/Config";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
// import { TextInput } from "react-native-web";

export default function App() {
  //storing user data
  const [userDoc, setUserDoc] = useState(null);
  const [text, setText] = useState(null);

  //CRUD function

  const Create = () => {
    //creating new doc in firebaase
    const myDoc = doc(db, "Mycollection", "MyDocument");
    //doc stores here
    const docData = {
      name: "ipangram",
      email: "ipangram@gmail.com",
      mobile: "987654678",
    };
    setDoc(myDoc, docData)
      //handling promises
      .then(() => {
        //succes
        alert("document created successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const Read = () => {
    //reading Doc
    //read doc by changing collection and documents path here
    const myDoc = doc(db, "Mycollection", "MyDocument");
    getDoc(myDoc)
      //handling promises
      .then((snapshot) => {
        //succes
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
        } else {
          alert("No Doc found");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const Update = (value, merge) => {
    //updating doc
    const myDoc = doc(db, "Mycollection", "MyDocument");
    //if set the merge true then it will merge with existing doc otherwise it will be a fresh one
    setDoc(myDoc, value, { merge: merge })
      .then(() => {
        //succes
        alert("Updated successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const Delete = () => {
    //deleting doc
    const myDoc = doc(db, "Mycollection", "MyDocument");

    deleteDoc(myDoc)
    .then(() => {
      //succes
      alert("Deleted successfully");
    })
    .catch((error) => {
      alert(error.message);
    });


  };
  return (
    <View style={styles.container}>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "space-evenly",
          // margin: 20,
        }}
      >
        <Button title="create new doc" onPress={Create}></Button>
        <Button title="Read doc" onPress={Read}></Button>
        {userDoc != null && <Text>name: {userDoc.name}</Text>}
      </View>
      <TextInput
        style={{
          width: "20%",
          fontSize: 18,
          borderColor: "gray",
          borderWidth: 0.2,
          padding: 12,
        }}
        placeholder="type here"
        onChangeText={(text) => {setText(text)}}
        value={text}
      ></TextInput>
 <Button title="Update doc" onPress={()=>{
  Update({
    "name": text
  },true)
 }}disabled={text == ""}
>



 </Button>
 <Button title="Delete doc" onPress={Delete}></Button>
      <StatusBar style="auto" />
    </View>
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
