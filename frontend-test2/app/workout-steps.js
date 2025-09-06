import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native'
import React , { useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function WorkoutStepsScreen() {
  const router = useRouter();
  const {workout} = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  
  let parseWorkout;
  try{
    parseWorkout = typeof(workout) === 'string' ? JSON.parse(workout) : workout;
  }catch(error){
    console.log(error);
    parseWorkout = null;
  }

  console.log(parseWorkout);

  const workoutDiets = {
    FatBurning: 'Breakfast: \n  - Scrambled Eggs + Spinach + Avocado Toast \n  - Smoothie of Banana, Almond Milk and Protein powder \n Lunch: \n  - Grilled Salmon + Brown Rice + Steamed Vegetables \n  - Chicken Salad + Avocado with Olive Oil \n Dinner: \n  - Grilled Chicken with Steamed Broccoli \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    PyramidWorkoutforCardioandCalorieburn: 'Breakfast: \n  - Scrambled Eggs + Spinach + Avocado Toast \n  - Smoothie of Banana, Almond Milk and Protein powder \n Lunch: \n  - Grilled Salmon + Brown Rice + Steamed Vegetables \n  - Chicken Salad + Avocado with Olive Oil \n Dinner: \n  - Grilled Chicken with Steamed Broccoli \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    LadderWorkoutforStaminaandSpeedbuild: 'Breakfast: \n  - Protein pancakes with honey and Greek yougurt \n  - Protein powder + Oats smoothie \n Lunch: \n  - Grilled chicken + boiled potatoes with steamed vegetables \n  - Greek yougurt with nuts \n Dinner: \n  - Salmon with Steamed Vegetables \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    GluteBuildingWorkout: 'Breakfast: \n  - Protein pancakes with honey and Greek yougurt \n  - Smoothie of Banana, oats, Almond and Protein powder \n Lunch: \n  - Grilled Chicken with Steamed Broccoli + Bolied potatoes \n  - Chicken Salad + Avocado with Olive Oil \n Dinner: \n  - Salmon with Steamed Vegetables \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    FlatBenchPressforTricepsandShoulders: 'Breakfast: \n  - Grain egg toast with a banana + Steamed broccoli or spinach \n Lunch: \n  - Mixed green salad with olive oil dressing + Grilled Chicken breast with brown rice \n Dinner: \n  - Grilled Fish + whole wheat pasta and Steamed vegetables (carrots, potatoes, bell peppers and beans.) ',
    DumbbellBicepCurls: 'Breakfast: \n  - 1 cup oatmeal + banana, 4 eggs and almond milk \n Lunch: \n  - Grilled fish with steamed vegetables + boiled potatoes and greek youghurt + honey and 1 dark chocolate square \n Dinner: \n  - Grilled Fish or chicken \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    InclineBenchPress : 'Breakfast: \n  - Grilled chicken breast + whole grain toast and Steamed broccoli or spinach \n Lunch: \n  - Grilled Salmon + Avacado + 1 boiled sweet potatoe and Few almonds and nuts \n Dinner: \n  - Salmon with Steamed Vegetables \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    OverheadDumbbellWorkout: 'Breakfast: \n  - Grilled chicken breast + whole grain toast and Steamed broccoli or spinach \n Lunch: \n  - Grilled Salmon + Avacado + 1 boiled sweet potatoe and Few almonds and nuts \n Dinner: \n  - Salmon with Steamed Vegetables \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    FlatBenchPressforChest: 'Breakfast: \n  - Grain egg toast with a banana + Steamed broccoli or spinach \n Lunch: \n  - Mixed green salad with olive oil dressing + Grilled Chicken breast with brown rice \n Dinner: \n  - Grilled Fish + whole wheat pasta and Steamed vegetables (carrots, potatoes, bell peppers and beans.) ',
    DumbbellRussianTwist: 'Breakfast: \n  - Eggs + Avacado toast and Almond milk \n Lunch: \n  - Grilled Fish with brown rice and steamed veggies \n Dinner: \n  - Grilled Fish or chicken \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    DumbbellSquats: 'Breakfast: \n  - Oatmeal + banana + strawberry + almonds and Greek yogurt + honey \n Lunch: \n  - Grilled Salmon + Avacado + 1 boiled sweet potatoe and Few almonds and nuts \n Dinner: \n  - Salmon with Steamed Vegetables \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    DumbbellStandingKickback: 'Breakfast: \n  - Green salad with olive oil + avacado and Protein shake and scrambled eggs \n Lunch: \n  - Grilled Salmon + Avacado + 1 boiled sweet potatoe and Few almonds and nuts \n Dinner: \n  - Salmon with Steamed Vegetables \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    DumbbellFloorFly: 'Breakfast: \n  - Wheat toast + eggs + tomatoes + peanut butter and Smoothie of Banana + Almond Milk + Protein powder \n Lunch: \n  - Grilled chicken breast with brown rice and steamed veggies \n Dinner: \n  - Grilled Fish or chicken \n  - Spinach soup + Steamed beans.',
    CurtseyLunge: 'Breakfast: \n  - Scrambled Eggs + Spinach + Avocado Toast \n Lunch: \n  - Grilled Chicken breast with steamed veggies and Greek yougurt + honey + granola \n Dinner: \n  - Grilled Fish or chicken \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    SeatedChestPress: 'Breakfast: \n  - Wheat toast + eggs + tomatoes + peanut butter and Smoothie of Banana + Almond Milk + Protein powder \n Lunch: \n  - Grilled chicken breast with brown rice and steamed veggies \n Dinner: \n  - Grilled Fish or chicken \n  - Spinach soup + Steamed beans.',
    LatPullDown: 'Breakfast: \n  - Protein pancakes with honey and Greek yougurt \n  - Smoothie of Banana, oats, Almond and Protein powder \n Lunch: \n  - Mixed green salad with olive oil dressing + Grilled Chicken breast with brown rice \n Dinner: \n  - Grilled Fish \n  - Chicken + Egg soup with Steamed vegetables.',
    SeatedChestFly: 'Breakfast: \n  - Greek yougurt + honey + walnuts + strawberry \n Lunch: \n  - Grilled Shirmp + Avacado + 1 boiled sweet potatoe and Few almonds and nuts \n Dinner: \ - Grilled Chicken + mashed potatoes with Steamed Broccoli',
    StraightArmPullover: 'Breakfast: \n  - Eggs + Avacado toast and Almond milk \n Lunch: \n  - Grilled Fish with brown rice and steamed veggies \n Dinner: \n  - Grilled Fish or chicken \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    BicepCurl: 'Breakfast: \n  - 1 cup oatmeal + banana, 4 eggs and almond milk \n Lunch: \n  - Grilled fish with steamed vegetables + boiled potatoes and greek youghurt + honey and 1 dark chocolate square \n Dinner: \n  - Grilled Fish or chicken \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',
    HighIntensityIntervalTrainingforFatburning: 'Breakfast: \n  - Oats + almond milk + protein powder \n Lunch: \n  - Grilled chicken breast + green veggie salad and Greek yougurt + honey\n Dinner: \n  - Baked salmon + steamed broccoli and steamed carrots',
    FatBurningforbeginners: 'Breakfast: \n  - Scrambled Eggs + Spinach + Avocado Toast \n  - Smoothie of Banana, Almond Milk and Protein powder \n Lunch: \n  - Grilled Salmon + Brown Rice + Steamed Vegetables \n  - Chicken Salad + Avocado with Olive Oil \n Dinner: \n  - Grilled Chicken with Steamed Broccoli \n  - Chicken + Spinach Soup + Side of Grilled Vegetables.',

    };

    const dietPlans = workoutDiets[parseWorkout?.name.replace(/\s/g, '')];

    if (!parseWorkout) {
      return (
        <View style={styles.container}>
          <Text style={styles.noWorkoutSteps}>No workouts steps available for this workout.</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerWorkout}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerWorkoutText}>Workout Steps</Text>
        </View>

        <Text style={styles.stepsTitle}>{parseWorkout?.name}</Text>

        <ScrollView style={styles.stepsContainer}>
          <Text style={styles.stepsText}>{parseWorkout?.steps}</Text>
        </ScrollView>

        {dietPlans && (
          <TouchableOpacity style={styles.dietButton} onPress={() => setModalVisible(true)}>
            <MaterialIcons name="assignment" size={24} color="white" />
            <Text style={styles.dietButtonText}>Diet Plan</Text>
          </TouchableOpacity>
        )}

        <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalSteps}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalStepsTitle}>Diet Plan 🥗</Text>
              <ScrollView>
              <Text style={styles.modalStepsText}>{dietPlans}</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWorkout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    margin: 5,
    marginTop: 12,
  },
  headerWorkoutText: {
    marginTop: -1,
    fontSize: 20,
    color: 'black',
    fontWeight: '800',
    marginLeft: 6,
  },
  stepsTitle: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#0e3f9e',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  stepsContainer: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 15,
    paddingBottom: 20,
    marginLeft: 14,
    marginRight: 14.5,
  },
  stepsText: {
    fontSize: 15.5,
    borderWidth: 1.5,
    borderColor: 'white',
    fontWeight: '300',
    lineHeight: 26,
    //borderWidth: 1.5,
    //borderColor: '#0e3f9e',
    color: 'black',
    backgroundColor: '#d4e8fc',
    padding: 20,
    paddingTop: 28,
    paddingBottom: 28,
    borderRadius: 6,
  },
  dietButton: {
    width: '60%',
    backgroundColor: '#0e3f9e',
    paddingVertical: 17,
    marginLeft: 75,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 40,
    alignItems: 'center',
  },
  dietButtonText: {
    color: 'white',
    fontSize: 17,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(4, 4, 4, 0.5)',
  },
  modalSteps: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '87%',
    borderWidth: 1.5,
    borderColor: '#0e3f9e',
  },
  modalStepsTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0e3f9e',
    marginBottom: 12,
  },
  modalStepsText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500',
    color: 'black',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,  
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    backgroundColor: '#0e3f9e',
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  noWorkoutSteps: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
})