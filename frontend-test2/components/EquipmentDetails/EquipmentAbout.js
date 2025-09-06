import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useState } from 'react'

export default function EquipmentAbout({equipment}) {
    const [readMore, setReadMore] = useState(true);
  return (
    <View style={{padding: 20}}>

        <Text style={{
            fontFamily: 'outfit',
            fontWeight: 'bold', 
            fontSize: 18,
            marginBottom: 10,
            color: '#10326b',
            marginTop: -12,
        }}>What is a {equipment?.name}?</Text>
        <Text numberOfLines={readMore?3:15} style={{
            fontFamily: 'outfit',
            fontSize: 14
        }}>{equipment?.about}</Text>
        {readMore&&
        <Pressable onPress={() => setReadMore(false)}>
        <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 14,
            fontWeight: 'bold',
            color: 'blue'
        }}>Read More</Text>
        </Pressable>}
    </View>
  )
}