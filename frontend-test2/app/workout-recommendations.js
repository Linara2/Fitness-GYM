import { useLocalSearchParams } from 'expo-router';
import React from 'react'
import WorkoutRecommendations from './../components/WorkoutRecommendations';

export default function WorkoutRecommendationsScreen() {
  const params = useLocalSearchParams();
  const equipment = params.equipment;
  
  return <WorkoutRecommendations equipment={equipment} />;
}