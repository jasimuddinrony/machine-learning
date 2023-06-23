import os
import numpy as np
from tensorflow import keras
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Set the path to your dataset directory
train_data_dir = 'D://projects//documents//Time to throw away//Deeplearning//sample data//wast-data-12'

# Define image preprocessing and augmentation options
data_generator = ImageDataGenerator(
    rescale=1./255,
    # Add more preprocessing/augmentation options as needed
)

# Set batch size and image dimensions
batch_size = 32
image_width, image_height = 224, 224

# Generate batches of augmented/normalized data for training
data_generator = data_generator.flow_from_directory(
    train_data_dir,
    target_size=(image_width, image_height),
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=False  # Ensure the order is maintained
)

# Get the class labels
class_labels = sorted(data_generator.class_indices.keys())

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
    keras.layers.Dense(num_classes, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
epochs = 10
steps_per_epoch = data_generator.samples // batch_size

model.fit(data_generator, epochs=epochs, steps_per_epoch=steps_per_epoch)

# Save the trained model
model.save('keras_Model.h5')
