import { QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
// import { View } from "react-native-web";
import { View, Text ,FlatList,StyleSheet,TextInput,TouchableOpacity,Keyboard,Pressable} from 'react-native'
import { firebase } from "./Config";

const Marktable = () => {

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("schools");
  console.log(ref);


  function getSchools(){
    setLoading(true);
    ref.onSnapshot((QuerySnapshot) => {
        const items = [];
        QuerySnapshot.forEach((doc) => {
            items.push(doc.data());
        });
        setSchools(items);
        setLoading(false);
    })
  }
useEffect(() => {
    getSchools();

}, []);



  if (loading) {
    return <View>
        <Text>
        Loading
        </Text>
        </View>
  }

  return (
    <View>
      <Text>Schools</Text>
      {schools.map((school) => (
        <View styles={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View key={school.id}>
          <Text styles={{fontsize:16,color:'black'}}>{school.title}</Text>
          <Text> {school.desc}</Text>
          <Text> {school.marks}</Text>
        </View>
        </View>

      ))}
    
    </View>

    
  );

}
export default  Marktable ;
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
  formContainer:{
      flexDirection:'row',
      height:80,
      marginLeft:10,
      marginRight:10,
      marginTop:100
  
  
  },
  input:{
      flex:1,
      height:48,
      borderRadius:5,
      overflow:'hidden',
      backgroundColor:'#fff',
      paddingLeft:16,
      marginRight:5,
  
  
  },
  button:{
      height:47,
      borderRadius:5,
      backgroundColor:'#e3e',
      width:80,
      alignItems:'center',
      justifyContent: 'center',
  },
  buttonText:{
      color:'#fff',
      fontSize:18,
  },
  todoIcon:{
      marginTop:5,
      fontSize:20,
      marginLeft:14,
  }
  
  
  
  })