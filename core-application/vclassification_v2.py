import os

from ClassificationModule import Classifier

import tensorflow.keras
import numpy as np
import cv2
import urllib3
from PIL import Image
import requests
from PIL import Image
import requests
from io import BytesIO

cap = cv2.VideoCapture(0)

classifier = Classifier('Resources/Model/keras_model.h5', 'Resources/Model/labels.txt')
imgArrow = cv2.imread('Resources/arrow.png', cv2.IMREAD_UNCHANGED)
classIDBin = 0
# Import all the waste images
imgWasteList = []
pathFolderWaste = "Resources/Waste"
pathList = os.listdir(pathFolderWaste)
for path in pathList:
    imgWasteList.append(cv2.imread(os.path.join(pathFolderWaste, path), cv2.IMREAD_UNCHANGED))

# Import all the waste images
imgBinsList = []
pathFolderBins = "Resources/Bins"
pathList = os.listdir(pathFolderBins)
for path in pathList:
    imgBinsList.append(cv2.imread(os.path.join(pathFolderBins, path), cv2.IMREAD_UNCHANGED))

# 0 = Recyclable
# 1 = Hazardous
# 2 = Food
# 3 = Residual

classDic = {0: None,
            1: 0,
            2: 0,
            3: 3,
            4: 3,
            5: 1,
            6: 1,
            7: 2,
            8: 2}

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
    cv2.imshow('Image', image)
    cv2.waitKey(0)  # Wait until a key is pressed
    cv2.destroyAllWindows()  # Close all open windows


def predictImage(img):
    predection = classifier.getPrediction(img)
    print(predection)

    classID = predection[1]
    print(classID)

img = getImageFromDir()
# img = getImageFromUrl()
imageResize = cv2.resize(img, (454, 340))

predictImage(img)

display_image(img)
