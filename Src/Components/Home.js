import { View, Text ,FlatList,StyleSheet,TextInput,TouchableOpacity,Keyboard,Pressable} from 'react-native'
import React, {useState,useEffect} from 'react';
// import { db } from "./Core/Config";
// import {firebase} from "./Core/Config";
import {firebase} from './Config'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';



const Home = () => {
const [todos, setTodos] = useState([]);
const todoRef = firebase.firestore().collection('todos');

//queries
// const q = query(todoRef,where('heading','==', 'guava'))
//real time collection data
// onSnapshot(q, (snapshot) => {
//     let todos = []
//     snapshot.docs.forEach((doc) => {
//         todos.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(todos)
// })



const [addData, setAddData] = useState(' ');

const navigation = useNavigation();





//fetch or read data from the database

//   .where('heading', 'in', ['orange', 'apple'])
//   .get()
// .where('name', 'in', ['anisha', 'garima'])
//     .get()
    // .then(querySnapshot => {
    //     console.log('Total no: ', querySnapshot.size);
  
    //     querySnapshot.forEach(documentSnapshot => {
    //       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //     })
    useEffect(() => {
        todoRef
  .orderBy('createdAt', 'desc')
  
  .onSnapshot(
    
    querySnapshot => {
        const todos = []
        querySnapshot.forEach((doc) => {
            const {heading} = doc.data()
            todos.push({
                id: doc.id,
                heading,
               
                
            })
            console.log(heading)
        })
        setTodos(todos)
    }
  )
    },[])
  //delete a todo from firestore db
  const deleteTodo = (todos) => {
    todoRef
    .doc(todos.id)
    .delete()
    .then(() => {
        alert("deleted successfully")
    })
    .catch(error => {
        alert(error + "something went wrong")
    })

  }
//add a todo to firestore db

const addTodo =() =>{
    //check if we have a todo
    if (addData && addData.length > 0) {
        //get the timestamp
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data ={
            heading : addData,
            createdAt : timestamp,
            
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
    <View style= {{flex:1}}>
    <View style={styles.formContainer}>
        <TextInput
        style={styles.input}
        placeholder="Add a new Todo"
        placeholderTextColor="#aaaa"
        onChangeText={(heading) => setAddData(heading)}
        value={addData}
        underlineColorAndroid="transparent"
        autoCapitalize='none'
        />
        <TouchableOpacity style ={styles.button}
        onPress={addTodo}
        >
<Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>

    </View>
    <FlatList
    data= {todos}
    numColumns={1}
    renderItem={({item}) => (
        <View>
            <Pressable 
            style={styles.container}
            // onPress={() => navigation.navigate('Detail', {item})}
            >
                <FontAwesome 
                name='trash-o'
                color='red'
                onPress={()=> deleteTodo(item)}
                style={styles.todoIcon}
                
                />
                  <TouchableOpacity onPress={() => navigation.navigate('Detail', {item})}>
                <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>
             {/* <TableExample/> */}
                <View style={styles.innerContainer}>
                    <Text style={styles.itemHeading}>
                        {item.heading[0].toUpperCase()+ item.heading.slice(1)}

                    </Text>
                </View>
              
            </Pressable>

        </View>
    )}
    
    />
</View>

);
  
}

export default Home;

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