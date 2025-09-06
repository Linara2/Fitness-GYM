import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../configuration/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { userDetails } from './../../loginct/userDetails';

export default function register() {
    const router = useRouter();
    const [fullName,setFullName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const {userDetail, setUserDetail} = useContext(userDetails);

    const CreateNewUser = () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        const user = userCredential.user;
        console.log(user);
        await SaveUser(user);
        //router.push('/authentication/login')
      })
      .catch(e => {
        console.log(e.message);
      })
    }

    const SaveUser = async(user) => {
      const data = {
        full_name: fullName,
        email: email,
        member:false,
        uid:user?.uid
      }
      await setDoc(doc(db, "users", email),data )    

      setUserDetail(data);
    }

      return (
        <View style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 20,
            padding: 30,
            backgroundColor: "#fff",
            flex: 1	
        }}>
          <Image source={require("./../../assets/images/register1.png")}
          style={{
            width: "340", 
            height: "340",
            marginTop: 10,
            marginBottom: -40
          }}
          />
          <Text style={{fontSize: 30, fontWeight: "bold", textShadowColor: "#0e3f9e", textShadowOffset: {width: 1, height: 1}, textShadowRadius: 2}}>Register to get started</Text>
    
          <TextInput placeholder='Full Name' onChangeText={(value)=>setFullName(value)} style={{borderWidth: 2, borderColor: "#ccc", width: '100%', padding: 10, borderRadius: 10, marginTop: 25}}/>
          <TextInput placeholder='Email' onChangeText={(value)=>setEmail(value)} style={{borderWidth: 2, borderColor: "#ccc", width: '100%', padding: 10, borderRadius: 10, marginTop: 18}}/>
          <TextInput placeholder='Password' secureTextEntry={true} onChangeText={(value)=>setPassword(value)} style={{borderWidth: 2, borderColor: "#ccc", width: '100%', padding: 10, borderRadius: 10, marginTop: 18}}/>
    
          <TouchableOpacity style={{width: '100%', backgroundColor: "#0e3f9e", padding: 12, borderRadius: 10, marginTop: 20}} onPress={CreateNewUser}>
            <Text style={{color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 15}}>Register</Text>
          </TouchableOpacity>
          <View style={{flexDirection: "row", marginTop: 20}}>
            <Text style={{fontSize: 15}}>Already have an account? </Text>
            <Pressable>
              <Text style={{color: "#0e3f9e", textDecorationLine: "underline", fontWeight: "bold", fontSize: 15}} onPress={() => {router.push('/authentication/login')}}>Login</Text>
            </Pressable>
          </View>
        </View>
      )
    }
    