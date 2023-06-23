import os

from ClassificationModuleV2 import Classifier

import tensorflow.keras
import numpy as np
import cv2
import urllib3
from PIL import Image
import requests
from PIL import Image
import requests
from io import BytesIO
import tkinter as tk
from tkinter import filedialog
from PIL import ImageTk, Image

cap = cv2.VideoCapture(0)

classifier = Classifier('Resources/Model/keras_model.h5', 'Resources/Model/labels.txt')

def getImageFromCam():
    _, img = cap.read()
    return img

def getImageFromDir():
    image = cv2.imread('Resources/IMG_8891.jpeg')
    return image

def getImageFromUrl():
    url = "https://d3gnkch79pux2b.cloudfront.net/events/1687187208123_IMG_8594.jpeg"
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception if the request was unsuccessful
    
     # Convert the image content to a NumPy array
    image_array = np.frombuffer(response.content, np.uint8)
    
    # Decode the NumPy array to an image
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    
    return image

def display_image(image):
     # Calculate the new height maintaining aspect ratio
    # width = 500
    # height = int(image.shape[0] * (width / image.shape[1]))
    
    # Resize the image
    # resized_image = cv2.resize(image, (width, height))
    cv2.imshow('Image', image)
    cv2.waitKey(0)  # Wait until a key is pressed
    cv2.destroyAllWindows()  # Close all open windows


def predictImage(img):
    predection = classifier.getPrediction(img)
    print(predection)

    classID = predection[1]
    print(classID)

    classLabel = predection[2]
    print("classLabel " + classLabel)
    
    label_file = open('Resources/Model/labels.txt', "r")
    list_labels = []
    for line in label_file:
        stripped_line = line.strip()
        list_labels.append(stripped_line)
    label_file.close()

    predictCategoryName = list_labels[classID]
    print(predictCategoryName)

def choose_image():
    # Open a file dialog to choose the image file
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg;*.jpeg;*.png")])
    
    # Check if a file was selected
    if file_path:
        # Open and display the selected image
        # image = Image.open(file_path)
        image = cv2.imread(file_path)

        # Calculate the new height maintaining aspect ratio
        width = 500
        height = int(image.shape[0] * (width / image.shape[1]))
        
        # Resize the image
        resized_image = cv2.resize(image, (width, height))

        # img = getImageFromDir()
        predictImage(resized_image)

        display_image(resized_image)

        # image = image.resize((400, 400))  # Resize the image to fit the window
        # photo = ImageTk.PhotoImage(image)
        # image_label.config(image=photo)
        # image_label.image = photo

# Create the main application window
window = tk.Tk()

# Create a button to choose an image
button = tk.Button(window, text="Choose Image", command=choose_image)
button.pack()

# Create a label to display the selected image
image_label = tk.Label(window)
image_label.pack()

# Start the application
window.mainloop()


