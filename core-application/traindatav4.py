import os
import numpy as np
from tensorflow import keras
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Set the path to your dataset directory
train_data_dir = 'D://projects//documents//Time to throw away//Deeplearning//sample data//wast-data-12'

# Define image preprocessing and augmentation options
data_generator = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split=0.2  # Split data into training and validation sets
)

# Set batch size and image dimensions
batch_size = 32
image_width, image_height = 224, 224

# Generate batches of augmented/normalized data for training and validation
train_generator = data_generator.flow_from_directory(
    train_data_dir,
    target_size=(image_width, image_height),
    batch_size=batch_size,
    class_mode='categorical',
    subset='training',  # Use the training subset
    shuffle=True
)

validation_generator = data_generator.flow_from_directory(
    train_data_dir,
    target_size=(image_width, image_height),
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation',  # Use the validation subset
    shuffle=True
)

# Get the class labels
class_labels = sorted(train_generator.class_indices.keys())

# Save the class labels to labels.txt
with open('labels.txt', 'w') as f:
    for label in class_labels:
        f.write(label + '\n')

# Get the number of classes
num_classes = len(class_labels)

# Load the pre-trained model (e.g., MobileNetV2)
base_model = keras.applications.MobileNetV2(
    include_top=False,
    weights='imagenet',
    input_shape=(image_width, image_height, 3),
)

# Freeze the base model's layers
base_model.trainable = False

# Add your own classification layers on top
model = keras.Sequential([
    base_model,
    keras.layers.GlobalAveragePooling2D(),
    keras.layers.Dense(256, activation='relu'),
    keras.layers.Dropout(0.5),
    keras.layers.Dense(num_classes, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
epochs = 20

model.fit(
    train_generator,
    epochs=epochs,
    steps_per_epoch=train_generator.samples // batch_size,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // batch_size
)

# Save the trained model
model.save('keras_Model.h5')
