import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './../../configuration/firebaseConfig'
import { FlatList } from 'react-native';
import { Image } from 'react-native';

export default function Slide() {
    
    const [slides, setSlides] = useState([]);
    useEffect(() => {
      GetSlides();
      }, [])

    const GetSlides = async () => {
      setSlides([]);
          const snapshot = await getDocs(collection(db, 'ImageSlider'));
          snapshot.forEach((doc) => {
            console.log(doc.data());
            setSlides(slides => [...slides, doc.data()])
          })
        }
  return (
    <View>
      <FlatList
        data={slides}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => (
          <View>
            <Image source={{uri: item?.imageUrl}}
            style={{width: Dimensions.get('screen').width * 0.9, height: 180, borderRadius: 12, marginRight: 15, marginTop: 15}} 
            />
          </View>
        )}
        />
    </View>
  )
}
