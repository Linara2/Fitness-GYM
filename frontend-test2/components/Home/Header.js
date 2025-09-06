import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { userDetails } from './../../loginct/userDetails';

export default function Header() {
  const {userDetail, setUserDetail} = useContext(userDetails);
  return(
    <View>
      <View>
      <Text style={{
        fontSize: 28,
        fontWeight: "bold",
        color: "#10326b"
      }}>Hello {userDetail?.full_name} </Text>
      <Text style={{
        fontSize: 18,
      }}>Welcome back to Fitness GYM!</Text>
      </View>
    </View>
  )
}