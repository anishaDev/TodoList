import { View, Text } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';

const Datatable = () => {


firestore()
  .collection('todos')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
  return (
    <View>
      <Text>Enter the name</Text>
    </View>
  )
}

export default Datatable