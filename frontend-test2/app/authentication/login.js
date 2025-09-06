import { View, Text, Image, TouchableOpacity, Pressable, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from './../../configuration/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { userDetails } from './../../loginct/userDetails';

export default function login() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const {userDetail, setUserDetail} = useContext(userDetails);
    const onSignInClick=()=>{
      signInWithEmailAndPassword(auth,email,password)
      .then(async(userCredential)=>{
        const user=userCredential.user
        console.log(user)
        await getUserDetail();
        router.replace('/(tabs)/home');
      }).catch(e=>{
        console.log(e)
        ToastAndroid.show('Incorrect Email or Password',ToastAndroid.BOTTOM)
      })
    }

    const getUserDetail=async()=>{
      const result = await getDoc(doc(db, "users", email));
      console.log(result.data())
      setUserDetail(result.data());
    }

  return (
    <View style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 80,
        padding: 30,
        backgroundColor: "#fff",
        flex: 1	
    }}>
      <Image source={require("./../../assets/images/login.png")}
      style={{
        width: "230", 
        height: "230",
        marginTop: 15,
      }}
      />
      <Text style={{fontSize: 32, fontWeight: "bold", marginTop: 12, textShadowColor: "#0e3f9e", textShadowOffset: {width: 1, height: 1}, textShadowRadius: 2}}>Welcome Back</Text>

      <TextInput placeholder='Email' onChangeText={(value)=>setEmail(value)} style={{borderWidth: 2, borderColor: "#ccc", width: '100%', padding: 10, borderRadius: 10, marginTop: 25}}/>
      <TextInput placeholder='Password' onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={{borderWidth: 2, borderColor: "#ccc", width: '100%', padding: 10, borderRadius: 10, marginTop: 25}}/>

      <TouchableOpacity style={{width: '100%', backgroundColor: "#0e3f9e", padding: 12, borderRadius: 10, marginTop: 25}} onPress={onSignInClick}>
        <Text style={{color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 15}}>Login</Text>
      </TouchableOpacity>
      <View style={{flexDirection: "row", marginTop: 20}}>
        <Text style={{fontSize: 15}}>Don't have an account yet? </Text>
        <Pressable>
          <Text style={{color: "#0e3f9e", textDecorationLine: "underline", fontWeight: "bold", fontSize: 15}} onPress={() => {router.push('/authentication/register')}}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  )
}