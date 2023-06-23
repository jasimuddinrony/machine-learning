import os
import cv2
import numpy as np
from sklearn.preprocessing import LabelEncoder
from tensorflow import keras
from tensorflow.keras import layers

# Step 1: Prepare the Data
data_dir = 'D://projects//documents//Time to throw away//Deeplearning//py_test//Resources//recyclable_materials'
image_paths = []
labels = []

for class_name in os.listdir(data_dir):
    class_dir = os.path.join(data_dir, class_name)
    if os.path.isdir(class_dir):
        for image_name in os.listdir(class_dir):
            image_path = os.path.join(class_dir, image_name)
            image_paths.append(image_path)
            labels.append(class_name)

# Step 2: Preprocess the Images
image_size = (224, 224)
images = []

for image_path in image_paths:
    image = cv2.imread(image_path)
    image = cv2.resize(image, image_size)
    image = (image.astype(np.float32) / 127.5) - 1
    images.append(image)

# Step 3: Encode the Labels
label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(labels)

# Step 4: Build and Train the Model
num_classes = len(label_encoder.classes_)

# Split the data into training and validation sets
x_train = np.array(images)
y_train = keras.utils.to_categorical(encoded_labels, num_classes)

# Build a CNN model using Keras
model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    # Add more layers as needed
    layers.Flatten(),
    layers.Dense(num_classes, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=10, validation_split=0.2)

# Step 5: Save the Model and Labels
model.save('keras_Model.h5')

with open('labels.txt', 'w') as file:
    for label in label_encoder.classes_:
        file.write(label + '\n')
