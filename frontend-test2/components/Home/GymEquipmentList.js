import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function GymEquipmentList({equipment}) {
  const router = useRouter();
  return (
    <TouchableOpacity
    onPress={() => router.push({pathname: '/equipment-detail', params: equipment})}
     style={{
        padding: 5,
        width: 180,
        height: 225,
        marginRight:12,
        backgroundColor: '#aad1fa',
        borderRadius: 10,
        marginBottom: 10,
        //borderWidth: 1,
        //borderColor: 'black',
    }}>
      <Image source={{uri: equipment?.imageUrl}}
      style={{
        marginTop: 5,
        marginLeft: 5,
        width: 118,
        height: 115,
        borderRadius: 10,
        //borderWidth: 1,
        //borderColor: 'black',
        objectFit: 'cover'
    }}
      />
      <Text style={{
        marginTop: 12,
        marginLeft: 5,
        fontSize: 15,
        fontWeight: 'bold',
      }}>{equipment?.name}</Text>
      <View>
        <Text style={{
            color: 'grey',
            marginTop: 3,
            marginLeft: 5,
            fontSize: 12,
        }}>{equipment?.target}</Text>
      </View>
    </TouchableOpacity>
  )
}