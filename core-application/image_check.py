import tkinter as tk
from tkinter import filedialog
from PIL import ImageTk, Image

def choose_image():
    # Open a file dialog to choose the image file
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg;*.jpeg;*.png")])
    
    # Check if a file was selected
    if file_path:
        # Open and display the selected image
        image = Image.open(file_path)
        image = image.resize((400, 400))  # Resize the image to fit the window
        photo = ImageTk.PhotoImage(image)
        image_label.config(image=photo)
        image_label.image = photo

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