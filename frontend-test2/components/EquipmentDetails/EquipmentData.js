import { View, Text, Image } from 'react-native'
import React from 'react'

export default function EquipmentData({equipment}) {
  return (
    <View>
      <Image source={{uri: equipment?.imageUrl}}
      style={{width: '100%', height: 330, objectFit: 'cover'}}/>

      <View style={{padding: 20}}>
        <View>
            <Text style={{
                fontWeight: "800",
                color: '#11449c',
                fontSize: 25
                }}>{equipment?.name}</Text>

            <Text style={{
                fontFamily: 'outfit',
                fontStyle: 'italic',
                fontSize: 16,
                color: 'gray'
                }}>{equipment?.target}</Text>
        </View>
      </View>
    </View>
  )
}