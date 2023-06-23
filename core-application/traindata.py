import tensorflow as tf
from tensorflow import keras
import numpy as np
import os

# Step 2: Load and preprocess the data
image_folder = 'D://projects//documents//Time to throw away//Deeplearning//py_test//Resources//recyclable_materials'
image_size = (224, 224)  # Adjust the size according to your requirements

images = []
labels = []

for class_folder in os.listdir(image_folder):
    class_path = os.path.join(image_folder, class_folder)
    if os.path.isdir(class_path):
        class_label = int(class_folder)
        for image_file in os.listdir(class_path):
            image_path = os.path.join(class_path, image_file)
            image = keras.preprocessing.image.load_img(image_path, target_size=image_size)
            image_array = keras.preprocessing.image.img_to_array(image)
            images.append(image_array)
            labels.append(class_label)

# Convert lists to numpy arrays
images = np.array(images)
labels = np.array(labels)

# Step 3: Split the data into training and validation sets
from sklearn.model_selection import train_test_split

X_train, X_val, y_train, y_val = train_test_split(images, labels, test_size=0.2, random_state=42)

# Step 4: Define the model architecture
model = keras.models.Sequential([
    keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Flatten(),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(10, activation='softmax')  # Adjust the output size based on your number of classes
])

# Step 5: Compile and train the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, validation_data=(X_val, y_val))

# Step 6: Save the trained model and labels
model.save('keras_Model.h5')

with open('labels.txt', 'w') as f:
    for class_label in range(10):  # Modify the range according to your number of classes
        f.write(str(class_label) + '\n')
