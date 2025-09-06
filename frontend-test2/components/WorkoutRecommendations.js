import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const WorkoutRecommendations = ({ equipment }) => {
  const router = useRouter();

  const equipmentNames = {
    'Treadmill' : 'treadmill',
    'Bench Press' : 'bench_press',
    'Multi Machine' : 'multi_machine',
    'Elliptical' : 'elliptical',
    'Dumbbell' : 'dumb_bell'
  };

  const workoutTypes = {
    treadmill: require('./../assets/images/treadmill.png'),
    bench_press: require('./../assets/images/treadmill.png'),
    multi_machine: require('./../assets/images/treadmill.png'),
    elliptical: require('./../assets/images/treadmill.png'),
    dumb_bell: require('./../assets/images/treadmill.png'),
  };

  const workoutOptions = {
    treadmill: [
      { name: 'Fat Burning', steps: '1. Walk at a speed of 3 mph as a warm up for 5 minutes, keep the incline at 0% (if your treadmill has an incline option) \n2. Sprint for 30 sec by increasing the speed upto 8 mph \n3. Decrease the speed and walk at 3 mph slowly for 1 minute \n4. Repeat the step 2 and 3 for another 15 minutes \n5. Inrease the speed and jog at a fast speed of 5-6 mph for 5 minutes \n 6. As for the final step, walk at a slow speed of 2-3 mph for 5 minutes' },
      { name: 'Pyramid Workout for Cardio and Calorie burn', steps: '1. Incline the treadmill at 1% for and walk at speed on 3 mph for 5 minutes \n2. Increase the speed gradually until 8 mph for 10 minutes \n3. Keep the current speed (8 mph) and run for 1 minute \n4. Decrease the speed to 0.5 mph and jog for 5 minutes \n5. Reduce the incline to 1% and walk at a slow speed of 2-3 mph for 5 minutes' },
      { name: 'Ladder Workout for Stamina and Speed build', steps: '1. Incline the treadmill for 4% and walk at a speed of 3.5 mph for 5 minutes \n2. Start to jog slowlt at a speed of 4 mph for 3 minutes \n3. Increase the speed gradually to 7 mph for 5 minutes \n4. Decrease the speed gradually to 0.5 mph for 2 minutes until the speed is 4.5 mph \n5. Finally, walk at a slow speed of 2-3 mph for 5 minutes' },
      { name: 'Glute Building Workout', steps: '1. Walk at a speed of 3 mph for 5 minutes at 3% incline \n2. Walk for 3 minutes at a speed of 3 mph at the incline of 5% \n3. Increase the incline to 6% and walk for 3 minutes at the speed of 3 mph \n4. Increase the incline a bit more hiher and walk for 5 minutes \n5. Keep walking a speed of 3 mph by increasing and decraesing the incline (5% to 12%) \n6. Finally, walk at a slow speed of 2-3 mph for 5 minutes' },
    ],
    bench_press: [
      { name: 'Flat Bench Press for Triceps and Shoulders', steps: '1. Lie flat on the bench with your hands at your sides, feet attached to the ground, knees tucked out and raise you back a little to form a small arch \n2. Take the barbell bar and raise it above your chest with both arms fully extended and straight over your shoulders \n3. Push the weight back up to the mid chest and keep your elbows at a 45 degree angle \n4. Lower the weight back down to the starting position \n5. Repeat the exercise for 5 to 10 minutes at a set number of repetitions.' },
      { name: 'Dumbbell Bicep Curls', steps: '1. Incline the the bench press to a 50 degree angle \n2. Lie on the bench and hold dumbbell in each hand at your sides \n3. Curl the dumbbells up to your shoulders with your elbow kept stationary and hold the dumbbell like that for few seconds \n4. Slowly lower the dumbbells back to the starting position and strech your arms \n5. Repeat the exercise for 5 to 10 minutes at a set number of repetitions (3-4 sets).' },
      { name: 'Incline Bench Press', steps: '1. Incline the bench press at an angle around 30% \n2. Lie on the inclined bench and grip the barbell to your hands slighlty wider than shoulder width \n3. Lower the barbell to your upper chest slowly \n4. Push the barbell up with your elbows slightly tucked \n5. Repeat the exercise for 5 to 10 minutes at a set number of repetitions (3-4 sets).' },
      { name: 'Decline Bench Press', steps: '1. Decline the bench press to an angle around 20-30% \n2. Lie on the bench with your feet attached to the ground \n3. Place your palms on the shoulder with your arms cross over your chest \n4. Put strength to your lower abs and slowly raise by bringing your chest towards your knees \n5. Lower yourself back to the bench slowly \n6. Repeat the exercise for 5 to 10 minutes at a set number of repetitions (3-4 sets).' },
      { name: 'Overhead Dumbbell Workout', steps: '1. Sit on the flat bench press with both of your hands holding a dumbbell in each hand \n2. Lift the dumbbell above your head with your elbows tucked in \n3. Pull the dumbbell slowly back behind your head \n4. Extend both your arms back up fully above your head \n5. Repeat the exercise for 5 to 10 minutes at a set number of repetitions (3-4 sets). ' },
      { name: 'Flat Bench Press for Chest', steps: '1. Lie flat on the bench with your hands at your sides, feet attached to the ground, knees tucked out and raise you back a little to form a small arch \n2. Grab the barbell a bit wider than you shoulders width (to focus on the chest muscles) \n3. Keep your elbows at a 80-90 degree angle \n4. Raise you arms straight upwards with your arms fully extended \n5. Repeat the exercise for 5 to 10 minutes at a set number of repetitions.'},
    ],
    multi_machine: [
      { name: 'Seated Chest Press', steps: '1. Sit on the machine and adjust the seat so the handles are at chest level, feet flat on the ground and back should be straight \n2. Grab the handles and bent your elbows at a 90 degree angle \n3. Exhale and push the handles forward by extending your arms fully  \n4. Inhale and slowly return the handles to the starting position \n5. Repeat the exercise for 10-15 minutes at a set number of repetitions.' },
      { name: 'Lat Pull Down', steps: '1. Sit on the seat with your front facing the machine and keep you knees tucked out \n2. Grip the bar with your hands placed slightly wider than shoulder width and lean back a little \n3. Pull the bar down slowly towards you upper chest \n4. Extend you arms upwards and pull the bar back to the starting position \n5. Repeat the exercise for 10-15 minutes at a set number of repetitions. ' },
      { name: 'Seated Chest Fly', steps: '1. Sit on the machine and adjust the seat so the handles are at chest level, feet flat on the ground, back should be straight and knees should be tucked out \n2. Grab the handles and form your arms a wide T shape with your back straight \n3. Exhale and bring the handles together infront of your chest with your elbows bent \n4. Inhale and slowly return the handles to the starting position \n5. Repeat the exercise for 10-15 minutes at a set number of repetitions.' },
      { name: 'Straight Arm Pullover', steps: '1. Stand facing the machine with both your feet shoulder width apart \n2. Grip the bar at the top of the machine and step back a little \n3. Keep your posture straight and pull the bar slowly downwards towards your lower body \n4. Push the bar back to the starting position with your arms extending fully upwards by bending your upper body and knees forwards \n5. Repeat the exercise for 10-15 minutes at a set number of repetitions.' },
      { name: 'Bicep Curl', steps: '1. Stand facing the machine with both your feet shoulder width apart \n2. Take the bar with a cable that is at the bottom of the machine and pull upwards towards you shoulder so that the biceps contract (keep your elbows close to your side) \n3. Extend the bar and your arms downwards for your biceps to relax \n4. Repeat the exercise for 10-15 minutes at a set number of repetitions.' },
      { name: 'Crunches', steps: '1. Sit on the machine and keep your legs close together \n2. Grip the bar with the cable at the top above your head \n3. Pull it down by bending your body downwards and be like that for 4-5 seconds, focus on contracting your abs as ypu crunch down  \n4. Inhale and slowly return back to the starting (sitting) position \n5. Repeat the exercise for 10-15 minutes at a set number of repetitions.' },
    ],
    elliptical: [
      { name: 'Fat Burning for beginners', steps: '1. Set the resistance to level 1 or 2 and move at a steady (slow) speed as a warm up for 5 minutes \n2. Increase the resistance to level 3-5 and ove at a much faster speed than the warm up speed for 2 minutes \n3. Decrease the resistance to level 1 or 2 and move at a steady (slow) speed for 2 minutes \n4. Repeat this exercise for 20 minutes \n5. As the final step, reduce the resisatnce level to 1 and move at a slow speed for 5 minutes and then stop.' },
      { name: 'High Intensity Interval Training for Fat burning', steps: '1. Set the resistance to level 1-3 and move at a steady (slow) speed as a warm up for 3-5 minutes \n2. Increase the resistance to level 6-8 and push the pedals as fast as you can be engaging your arms for 40 seconds \n3. Decrease the resistance to level 3-5 and move at more steady pace for 1 minute \n4. Repeat this exercise for 10-15 minutes \n5. As the final step, reduce the resisatnce level to 3 and move at a slow speed for 3 minutes and then stop.' },
      { name: 'Stamina and Endurance building workout', steps: '1. Set the resistance to level 1 or 2 and move at a steady (slow) speed as a warm up for 5 minutes \n2. Increase the resistance to level 4-6 and move at steady speed \n3. Increase the resistance to level 7-8 move at a much faster pace \n4. Lower the resistance to 3-5 and slow down \n5. Repeat this exercise for 15 minutes \n6. As the final step, reduce the resisatnce level to 1 and move at a slow speed for 3-5 minutes and then stop.' },
    ],
    dumb_bell: [
      { name: 'Dumbbell Squats', steps: '1. Stand with both your feet shoulder width apart and hold a dumbbell in each of you hand at you sides \n2. Bend ypu kness to lower your body by keeping your back straight \n3. Push back your body up into the starting postion \n4. Repeat the exercise for 10-15 minutes at a set number of repetitions' },
      { name: 'Dumbbell Russian Twist', steps: '1. Sit on the floor with both your knees bent \n2. Grab the dumbbell in each hand and lean back a bit so that the workout focus on your core \n3. Slowly twist your torso to the right by bringing the dumbbells down \n4. Slowly twist your torso to the left by bringing the dumbbells down \n4. Repeat the exercise for 10-15 minutes at a set number of repetitions' },
      { name: 'Dumbbell Bicep Curls', steps: '1. Stand straight with dumbbells in both of your hands, full extended downwards on your sides \n2. Bring up your right hand by bending your elbow to the sholder level \n3. Slowly lower your right hand back to the starting position \n4. Bring up your left hand by bending your elbow to the sholder level \n5. Slowly lower your left hand back to the starting position \n6. Repeat the exercise for 10-15 minutes at a set number of repetitions' },
      { name: 'Dumbbell Standing Kickback', steps: '1. Hold a dumbbell in each of your hand with your body and knees bend sligly forwards from the hips \n2. Raise your arms from your elbows to form a 90 degree angle parallel to the ground \n3. Slowly extend your arms fully backwards \n4. Slowly bring your arms back to the starting position \n5. Repeat the exercise for 10-15 minutes at a set number of repetitions' },
      { name: 'Dumbbell Floor Fly', steps: '1. Lie on your back on the floor, knees bent and feet flat \n2. Hold a dumbbell in each of your hand and hands extended above your chest \n3. Slowly lower your arms to the sides, witha slight bend with your elbows \n4. Once both elbows touch the floor, bring back the dumbbells to the starting position \n5. Repeat the exercise for 10-15 minutes at a set number of repetitions' },
      { name: 'Curtsey Lunge', steps: '1. Stand by holding a dumbbell vetically with both of your hands  \n2. Step your left foot behind diagonally (crossing) to the right \n3. Lower your body by bending your knees nearly to the ground (do not touch the ground) \n4. Push your body back to the starting position using your front leg \n5. Step your right foot behind diagonally (crossing) to the left \n6. Lower your body by bending your knees nearly to the ground (do not touch the ground) \n7. Push your body back to the starting position using your front leg \n8. Repeat the exercise for 10-15 minutes at a set number of repetitions'  },
      { name: 'Overhead Dumbbell Workout', steps: '1. Sit on the flat bench press with both of your hands holding a dumbbell in each hand \n2. Lift the dumbbell above your head with your elbows tucked in \n3. Pull the dumbbell slowly back behind your head \n4. Extend both your arms back up fully above your head \n5. Repeat the exercise for 5 to 10 minutes at a set number of repetitions (3-4 sets). ' },
    ],
  };

  const equipmentKey = equipmentNames[equipment];

  if (!equipment || !workoutOptions[equipmentKey]) {
    return (
      <View style={styles.container}>
        <Text style={styles.noRecommendations}>No workout recommendations available</Text>
        </View>
    );
  }

  const handleWorkout = (workout) => {
    if (workout) {
    router.push({
      pathname: '/workout-steps',
      params: { workout: JSON.stringify(workout) },
    });
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Workout Recommendations</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {workoutOptions[equipmentKey].map((workout, index) => (
          <TouchableOpacity
            key={index}
            style={styles.workoutContainer}
            onPress={() => handleWorkout(workout)}
          >
            <View style={styles.workoutImageContainer}>
              <Image
                source={workoutTypes[equipmentKey]}
                style={styles.workoutImage}
              />
            </View>

            <Text style={styles.workoutName}>{workout.name}</Text>
            <Text style={styles.workoutDetails}>{workout.detail}</Text>

            <Text style={styles.textCard}>View workout steps and diet plan</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',  
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    margin: 5,
    marginTop: 12
  },
  title: {
    marginTop: -1,
    fontSize: 20,
    color: 'black',
    fontWeight: '800',
    marginLeft: 6,
  },
  scrollContainer: {
    marginTop: -5,
    padding: 16,
  },
  workoutContainer: {
    backgroundColor: '#d4e8fc',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
    height: 115,
    borderColor: '#0e3f9e',
    borderWidth: 1.2,
    justifyContent: 'center', 
    margin: 10,
  },
  workoutImageContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  workoutImage: {
    marginTop: -2,
    width: 40,
    height: 40,
  },
  workoutName: {
    marginLeft: 3,
    marginRight: 55,
    fontSize: 16,
    marginTop: 24,
    marginBottom: -29,
    fontWeight: 'bold',
    color: '#0e3f9e',
  },
  workoutDetails: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  textCard: {
    marginLeft: 3,
    fontSize: 13,
    color: 'gray',
    marginTop: 2,
    fontStyle: 'italic'
  },
  noRecommendations: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
});

export default WorkoutRecommendations;