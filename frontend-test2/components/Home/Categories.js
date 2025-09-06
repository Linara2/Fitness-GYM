import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {db} from './../../configuration/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Categories({category}) {

  const [categoryList, setCategories] = useState([]);
  const [clickedCategory, setClickedCategory] = useState(['Back']);
  useEffect(() => {
    GetCategories();
  }, [])

  const GetCategories =async() => {
    setCategories([]);
    const snapshot = await getDocs(collection(db, 'Categories'));
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setCategories(categoryList => [...categoryList, doc.data()])
    })
  }
  return (
    <View style={{
        marginTop: 18,

    }}>
        <Text style={{
            fontWeight: 'bold',
            fontSize: 25,
            color: '#10326b',
            marginBottom: 12
        }}>Categories</Text>

        <FlatList
        data={categoryList}
        numColumns={5}
        renderItem={({ item, index }) => (
          <TouchableOpacity
              onPress={() =>{
                setClickedCategory(item?.name)
                category(item?.name)
              }}
          style={{
            flex: 1
          }}>
            <View style={[styles.container,
            clickedCategory==item?.name&&styles.clickedCategoryContainer]}>
              <Image source={{uri: item?.imageUrl}}
              style={{
                width: 42,
                height: 42
              }}
              />
            </View>
            <Text style={{
              fontWeight: "500",
              textAlign: 'center'
            }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d4e8fc',
    padding: 15,
    borderRadius: 15,
    borderColor: '#d4e8fc',
    borderWidth: 1,
    alignItems: 'center',
    margin: 5,
  },
  clickedCategoryContainer: {
    backgroundColor: '#0e3f9e',
    borderColor: 'black'
  }
})