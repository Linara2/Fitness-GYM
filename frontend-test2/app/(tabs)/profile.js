import { View, Text, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { userDetails } from './../../loginct/userDetails'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import predictionIcon from './../../assets/images/predict.png';
import userDetailsIcon from './../../assets/images/details.png';
import logOut from './../../assets/images/logout.png';

export default function Profile() {
  const {userDetail} = useContext(userDetails);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [userLogoutModal, setUserLogoutModal] = useState(false);
  const [username, setFullName] = useState(userDetail?.full_name);
  const [email, setUserEmail] = useState(userDetail?.email);
  const [password] = useState('********');
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const usersData = async () => {
      const userFullName = await AsyncStorage.getItem('username');
      const userEmail = await AsyncStorage.getItem('email');

      if (userFullName && userEmail) {
        setFullName(userFullName);
        setUserEmail(userEmail);
      };
      usersData();
    }
  });

  const userLogout = async() => {
    setUserLogoutModal(true);
  };

  const predictionOption = () => {
    router.push('predict');
  };

  const menuList = [
    {id: 1, name: 'User Details', icon: userDetailsIcon, action: () => setUserDetailsModal(true)},
    {id: 2, name: 'Predict', icon: predictionIcon, action: predictionOption},
    {id: 3, name: 'Logout', icon: logOut, action: () => userLogout(true)},
  ]

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 18,
    }}>
      <View style={{
        position: 'absolute',
        top: 20,
        left: 20,
      }}>
        <Text style={{
          marginTop: 8,
          marginLeft: 110,
          fontSize: 28,
          fontWeight: "900",
          color: '#0e3f9e'
        }}>User Profile</Text>
      </View>

      <View style={{
        alignItems: 'center',
        marginTop: 60
      }}>
        <Image source={require("./../../assets/images/profile.png")}
        style={{
          width: "190", 
          height: "190",
          marginTop: 20,
          marginBottom: -40
        }}
        />
    </View>

    <View style={{
      alignItems: 'center',
      marginTop: 50
    }}>
      <Text style={{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black'
      }}>{username}</Text>
      <Text style={{
        fontSize: 14,
        color: 'gray',
        marginTop: 5
      }}>{email}</Text>
    </View>

    <View style={{
      marginTop: 32,
      width: '85%',
    }}>
      {menuList.map((item) =>(
        <TouchableOpacity
        key={item.id} onPress={item.action} style={{ 
          alignItems: 'center',
          marginBottom: 13,
        }}>
          <View style={{
            padding: 11,
            backgroundColor: '#d4e8fc',
            width: '98%',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#0e3f9e',
            borderRadius: 12
          }}>
            <Image source={item.icon} style={{
              width: 42,
              height: 42,
            }}/>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#0e3f9e',
              marginTop: 5
            }}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
      </View>

      <Modal animationType='slide' visible={userDetailsModal} transparent={true} onRequestClose={() => setUserDetailsModal(false)}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(19, 19, 19, 0.5)'
        }}>
          <View style={{
            width: '85%',
            backgroundColor: 'white',
            padding: 20,
          }}>
            <Text style={{
              fontSize: 20,
              color: '#0e3f9e',
              fontWeight: 'bold',
              marginBottom: 15
            }}>{username} Details</Text>

            <Text style={{
              fontSize: 15,
              fontWeight: "500",
            }}>Full Name:</Text>
            <TextInput value={username} editable={false} style={{
              width: '100%',
              marginTop: 4,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#0e3f9e',
              padding: 10,
              backgroundColor: '#d4e8fc',
              marginBottom: 10,
            }} />

            <Text style={{
              fontSize: 15,
              fontWeight: "500",
            }}>Email:</Text>
            <TextInput value={email} editable={false} style={{
              width: '100%',
              marginTop: 4,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#0e3f9e',
              padding: 10,
              backgroundColor: '#d4e8fc',
              marginBottom: 10,
            }} />
            <Text style={{
              fontSize: 15,
              fontWeight: "500"
            }}>Password:</Text>
            <TextInput value={password} editable={false} secureTextEntry={true} style={{
              width: '100%',
              borderWidth: 1,
              marginTop: 4,
              borderRadius: 5,
              borderColor: '#0e3f9e',
              padding: 10,
              backgroundColor: '#d4e8fc',
              marginBottom: 10,
            }} />

            <TouchableOpacity onPress={() => setUserDetailsModal(false)} style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 24,
              backgroundColor: '#0e3f9e',
              borderRadius: 12,
              height: 24,
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
              <Text style={{
                color: 'white',
                fontSize: 14,
                fontWeight: 'bold'
              }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType='fade' visible={userLogoutModal} transparent={true} onRequestClose={() => setUserLogoutModal(false)}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(19, 19, 19, 0.5)'
        }}>
          <View style={{
            width: '80%',
            backgroundColor: 'white',
            alignItems: 'center',
            padding: 22,
          }}>
            <Text style={{
              fontSize: 20,
              color: '#0e3f9e',
              fontWeight: 'bold',
              marginBottom: 15
            }}>Confirm Logout</Text>
            <Text style={{
              fontSize: 15,
              fontWeight: "500",
              textAlign: 'center',
              marginBottom: 30
            }}>Are you sure you want to logout?</Text>
            <View style={{
              flexDirection: 'row',
              width: '85%'
            }}>
              <TouchableOpacity onPress={() => setUserLogoutModal(false)} style={{
                flex: 1,
                backgroundColor: '#0e3f9e',
                padding: 10,
                borderRadius: 5,
                marginRight: 17,
                alignItems: 'center'  
              }}>
                <Text style={{  
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={async() => await AsyncStorage.clear().then(() => router.replace('/'))} style={{
                flex: 1,
                backgroundColor: '#0e3f9e',
                padding: 10,
                borderRadius: 5,
                marginLeft: 17,
                alignItems: 'center'  
              }}>
                <Text style={{  
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}