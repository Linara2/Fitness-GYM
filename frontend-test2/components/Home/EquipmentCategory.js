import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Categories from './Categories'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../configuration/firebaseConfig';
import GymEquipmentList from './GymEquipmentList';


export default function EquipmentCategory() {

  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    GetEquipmentList('Back')
  }, [])

  const GetEquipmentList = async(category)=>{
    setEquipmentList([]);
    const q=query(collection(db,'Equipments'),where('category','==',category));
    const querySnapshot=await getDocs(q);

    querySnapshot.forEach((doc)=>{
      setEquipmentList(equipmentList=>[...equipmentList,doc.data()])
    })
  }
  return (
    <View>
      <Categories category={(value)=>GetEquipmentList(value)}/>
        <FlatList
        data={equipmentList}
        numColumns={2}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <GymEquipmentList equipment={item} />
        )}
        />
    </View>
  )
}