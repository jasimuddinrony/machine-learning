from ClassificationModuleV2 import Classifier
import numpy as np
import cv2
import requests
import requests

classifier = Classifier('Resources/Model/keras_model.h5', 'Resources/Model/labels.txt')


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
    return classID

img = getImageFromUrl()
predictCategoryIndex = predictImage(img)

label_file = open('Resources/Model/labels.txt', "r")
list_labels = []
for line in label_file:
    stripped_line = line.strip()
    list_labels.append(stripped_line)
label_file.close()

predictCategoryName = list_labels[predictCategoryIndex]
print(predictCategoryName)