import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" 
      options={{
        tabBarIcon: ({color, size}) => <Ionicons name="home-sharp" size={size} color={color} />,
        tabBarLabel: 'Home',
        headerTitle: '',
        headerShown: false
        }}
      />
      <Tabs.Screen name="predict" 
      options={{
        tabBarIcon: ({color, size}) => <Entypo name="camera" size={size} color={color} />,
        tabBarLabel: 'Predict',
        headerTitle: '',
        headerShown: false
      }}
      />
      <Tabs.Screen name="profile" 
      options={{
        tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="account" size={size} color={color} />,
        tabBarLabel: 'Profile',
        headerTitle: '',
        headerShown: false
      }}
      />
    </Tabs>
  )
}