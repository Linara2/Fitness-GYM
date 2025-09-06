import { FlatList, View } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slide from '../../components/Home/Slide'
import EquipmentCategory from '../../components/Home/EquipmentCategory'

export default function home() {
  return (
    <FlatList
    ListHeaderComponent={
    <View style={{
      padding: 20, marginTop: 8
    }}>
      <Header />
      <Slide />
      <EquipmentCategory></EquipmentCategory>
    </View>
    }
    />
  )
}