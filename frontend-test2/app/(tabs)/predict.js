import { View, Text, Image, Alert, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useState} from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import {MaterialIcons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';

const ImageUpload = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const [predictionButton, setPrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const router = useRouter();

  const imageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageSelected(result.assets[0].uri);
      setPrediction(null);
    }
  };

  const imageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageSelected(result.assets[0].uri);
      setPrediction(null);
    }
  };

  const deleteButton = () => {
    setImageSelected(null);
    setPrediction(null);
  };

  const imageUpload = async () => {
    if (!imageSelected) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imageSelected,
      type: 'image/jpeg',
      name: 'uploaded_image.jpg',
    });

    setPredictionLoading(true);

    try{
      const response = await axios.post("http://192.168.117.203:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const class_predicted = response.data.predicted_class;
      console.log("Predicted Class:", class_predicted);

      setPrediction({
        predicted_class: response.data.predicted_class,
        confidence: (response.data.confidence*100).toFixed(2),
        equipment_description: response.data.equipment_description,
      });
    }catch(error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Prediction failed. Check the backend.");
    }finally {
      setPredictionLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.imagePredict}>
      {!predictionButton && (
        <Text style={styles.title}>Upload and Predict</Text>
      )}
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          {!imageSelected && (
            <Image source={require('./../../assets/images/hand-in-pocket.png')} style={styles.boxImage} />
          )}
          <Text style={styles.boxText}>What’s This Equipment? Find Out Now!</Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={imageGallery}>
              <MaterialIcons name="photo-library" size={24} color="white" />
              <Text style={styles.buttonText}>Pick an image</Text>
            </TouchableOpacity>
            <View style={{height: 8}}></View>
            <TouchableOpacity style={styles.button} onPress={imageCamera}>
              <MaterialIcons name="camera-alt" size={24} color="white" />
              <Text style={styles.buttonText}>Take a Photo</Text>
            </TouchableOpacity>
          </View>

          {imageSelected && (
            <View style={styles.imageUploadedDisplay}>
              <Image source={{ uri: imageSelected }} style={styles.image} />
              <TouchableOpacity style={styles.imageDelete} onPress={deleteButton}>
                <Text style={styles.imageDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          {predictionLoading ? (
            <ActivityIndicator size="large" color="black" style={styles.predictionLoading} />
          ) : (
            <>

            {!predictionButton && (
              <TouchableOpacity style={styles.predictButton} onPress={imageUpload}>
              <MaterialIcons name="cloud-upload" size={24} color="#0e3f9e" />
                <Text style={styles.predictButtonText}>Predict</Text>
              </TouchableOpacity>
            )}

            {predictionButton && (
              <View style={styles.predictContainer}>
                <Text style={styles.imagePredictText}>Equipment : {predictionButton.predicted_class}</Text>
                <Text style={styles.confidenceText}>Accuracy: {predictionButton.confidence}%</Text>
                <Text style={styles.imageDescriptionText}>{predictionButton.equipment_description} </Text>

                <TouchableOpacity style={styles.recommendationButton} onPress={() => 
                  router.push({
                    pathname: '/workout-recommendations',
                    params: { equipment: predictionButton.predicted_class },
                  })
                }
                >
                <Text style={styles.recommendationButtonText}>Workout Recommendations</Text>
                </TouchableOpacity>
              </View>
            )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagePredict: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    marginTop: 22,
    marginBottom: -70,
    color: 'black',
    textAlign: 'center',
  },
  boxContainer: {
    width: '94%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 243,
  },
  box: {
    backgroundColor: '#d4e8fc',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '97%',
    maxWidth: 365,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3.84,
    elevation: 4,
    borderWidth: 1.7,
    borderColor: '#0e3f9e',
  },
  boxImage: {
    width: 120,
    height: 150,
    position: 'absolute',
    top: -135,
    right: -20,
    resizeMode: 'contain',
  },
  boxText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 28,
    color: '#0e3f9e',
    textAlign: 'center',
  },
  buttons: {
    width: '85%',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e3f9e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 5,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  imageUploadedDisplay: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 230,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0e3f9e',
    objectFit: 'cover',
  },
  imageDelete: {
    marginTop: 15,
    backgroundColor: '#0e3f9e',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  imageDeleteText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  predictButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0e3f9e',
    marginTop: 14,
    marginBottom: 8,
  },
  predictButtonText: {
    marginLeft: 8,
    color: '#0e3f9e',
    fontWeight: '500',
    fontSize: 17,
  },
  predictContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  imagePredictText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#0e3f9e',
    textAlign: 'center',
  },
  confidenceText: {
    fontSize: 15,
    fontWeight: "500",
    fontStyle: 'italic',
    marginTop: 4,
    color: '#0e3f9e',
    textAlign: 'center',
  },
  imageDescriptionText: {
    fontSize: 15,
    marginTop: 28,
    color: 'black',
    fontWeight: "300",
    fontStyle: 'medium',
    textAlign: 'center',
  },
  recommendationButton: { 
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1.8,
    borderColor: '#0e3f9e',
    marginTop: 24,
  },
  recommendationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0e3f9e',
  },
  predictionLoading: {
    marginTop: 15,
    color: '#0e3f9e',
  },
});
 
export default ImageUpload;
