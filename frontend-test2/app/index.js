import { Image, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from "../configuration/firebaseConfig";
import { userDetails } from "@/loginct/userDetails";
import { useContext } from "react";

export default function Index() {
  
  const router = useRouter();
  const {userDetail, setUserDetail} = useContext(userDetails);

  onAuthStateChanged(auth,async(user) => {
    if(user) {
      console.log(user);
      const result = await getDoc(doc(db, "users", user?.email));
      setUserDetail(result.data());
      router.replace('/(tabs)/home');
    }
  })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white"
      }}
    >
      <Image source={require("../assets/images/landing_page.png")}
      style={{
        width: "100%", 
        height: "340",
        marginTop: 40,
        marginBottom: 40
      }}
      />
      <View style={{
        padding: 25,
        backgroundColor: '#0e3f9e',
        height: '100%',
        borderRadius: 35
      }}>
        <Text style={{
          fontSize:28, 
          fontWeight: 'bold', 
          textAlign: 'center',
          color: '#fff',
          marginTop: 20,
          textShadowColor: 'black',
          textShadowOffset: { width: 4, height: 4 },
          textShadowRadius: 5
        }}>Welcome to Fitness GYM</Text>

        <Text style={{
          fontSize: 16.5, 
          fontFamily: 'Roboto Condensed',
          textAlign: 'center',
          color: '#fff',
          marginTop: 22,
        }}>
          Not sure how to use that gym machine? Effortlessly identify gym equipment with a snap from your phone!
        </Text>

        <View>
          <TouchableOpacity style={{
          alignItems: 'center',
          backgroundColor: '#0e3f9e', 
          padding: 15,
          width: 350,
          alignSelf: 'center',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#fff', 
          marginTop: 30,
          }} onPress={() => router.push('/authentication/register')}>
          <Text style={{
            alignItems: 'center',
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            Get started
          </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={{
          alignItems: 'center',
          backgroundColor: '#fff', 
          padding: 15,
          width: 350,
          alignSelf: 'center',
          borderRadius: 10, 
          marginTop: 20,
          }} onPress={() => router.push('/authentication/login')}>
          <Text style={{
            alignItems: 'center',
            fontSize: 20, 
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold'
          }}>
            Already have an account?
          </Text>
          </TouchableOpacity>
        </View>

      </View>
      
    </View>
  );
}
