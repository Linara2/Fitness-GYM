from fastapi import FastAPI, File, UploadFile
import numpy as np
import uvicorn
import tensorflow as tf
from PIL import Image
from io import BytesIO

mobile_application = FastAPI()

# Load Model
MODEL_PATH = "C:/Users/Linara/Desktop/Fitness GYM/frontend-test2/training_data/models/finalmodelCNN.h5"
model = tf.keras.models.load_model(MODEL_PATH)

EQUIPMENT_CLASSES = ['bench_press', 'dumb_bell', 'elliptical', 'multi_machine', 'treadmill']
CONFIDENCE_THRESHOLD = 0.80

DISPLAYING_CLASSES = {'bench_press': 'Bench Press', 'dumb_bell': 'Dumbbell', 'elliptical': 'Elliptical', 'multi_machine': 'Multi Machine', 'treadmill': 'Treadmill'}

CLASS_DESCRIPTION = {
    'bench_press': 'Bench Press is a free weight equipment where you lie on you back and lifts different weights, generally above your head. It targets the chest, shoulders, and arms. It requires both strength and balance to perform effectively.',
    'dumb_bell': 'Dumbbell is a free weight that is used for muscle training and weight loss. Dumbbells comes in different shapes and sizes, which is an equipment that can be commonly found in gyms.',
    'elliptical': 'Elliptical is a cardiovascular exercise machine that is used to burn calories and improve cardiovascular fitness. It can be used to get a full-body workout in a low-impact way, whcih can be used by both beginners and advanced exercisers.',
    'multi_machine': 'Multi Machine targets multiple mucle groups at the same time, such as the chest, legs, abs and arms. This machine is useful for people working out at home since it can be used for multiple workouts',
    'treadmill': 'Treadmill is one of the most common gym equipment that can be found in gyms and at home. It is used for weight loss and cardiovascular training, by walking, jogging or running on the moving belt.'
}

@mobile_application.get("/ping")
async def ping():
    return {"message": "Hello World"}

def read_imagefile(data) -> np.ndarray:
    input_image = Image.open(BytesIO(data))
    input_image = input_image.resize((256, 256))
    input_image = np.array(input_image)
    return input_image

@mobile_application.post("/predict")
async def predict_equipment(file: UploadFile = File(...)):
    try:
        input_image = read_imagefile(await file.read())
        image_batch = np.expand_dims(input_image, axis=0)

        prediction = model.predict(image_batch)
        class_predicted = EQUIPMENT_CLASSES[np.argmax(prediction[0])]
        confidence = np.max(prediction[0])
        equipment_description = CLASS_DESCRIPTION.get(class_predicted)

        if confidence < CONFIDENCE_THRESHOLD:
            return{
                "predicted_class": "No Prediction",
                "confidence": float(confidence),
                "equipment_description": "Image is not recognized"
            }
        
        return {"predicted_class": DISPLAYING_CLASSES.get(class_predicted, class_predicted), "confidence": float(confidence), "equipment_description": equipment_description}
    
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    uvicorn.run(mobile_application, host="0.0.0.0", port=8000)




