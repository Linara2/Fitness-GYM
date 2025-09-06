import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import EquipmentData from '../../components/EquipmentDetails/EquipmentData';
import SafetyTips from '../../components/EquipmentDetails/SafetyTips';
import EquipmentAbout from '../../components/EquipmentDetails/EquipmentAbout';

export default function EquipmentDetail() {
    const equipment = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
      });
    }, []);
  return (
    <View>
        <ScrollView>
      <EquipmentData equipment={equipment}/>
      <SafetyTips equipment={equipment} />
      <EquipmentAbout equipment={equipment} />
        </ScrollView>    
    </View>
  )
}