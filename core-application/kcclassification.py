import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

# Define the list of class labels
class_labels = ['Recyclable', 'Non-Recyclable']

# Data preprocessing
train_data_dir = 'D:\projects\documents\Time to throw away\Deeplearning\py_test\DATASET\TRAIN\R'
test_data_dir = 'D:\projects\documents\Time to throw away\Deeplearning\py_test\DATASET\TRAIN\R'
image_size = (224, 224)
batch_size = 32

train_datagen = ImageDataGenerator(rescale=1.0/255.0)
test_datagen = ImageDataGenerator(rescale=1.0/255.0)

train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical')

test_generator = test_datagen.flow_from_directory(
    test_data_dir,
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical')

# Model development
model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 3)))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(128, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(class_labels), activation='softmax'))

# Model training
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(train_generator, epochs=10)

# Model evaluation
test_images = test_generator.filenames
predictions = model.predict(test_generator)
predicted_labels = np.argmax(predictions, axis=1)

# Print the predicted class labels for each image
for i in range(len(test_images)):
    print(test_images[i], "->", class_labels[predicted_labels[i]])
