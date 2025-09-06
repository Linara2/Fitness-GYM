import { View, Text } from 'react-native'
import React from 'react'

export default function SafetyTips({equipment}) {
  return (
    <View style={{padding: 20}}>

        <Text style={{
            fontWeight: 'bold', 
            fontSize: 18,
            marginBottom: 10,
            color: '#10326b',
            marginTop: -10
        }}>Safety Tips when using {equipment?.name}</Text>
        <Text style={{
            fontSize: 14
        }}>{equipment?.safetyTips}</Text>
    </View>
  )
}