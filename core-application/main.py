
import random

# print data in console
print("Start python coding...")

# conditions
if 5 > 2:
    print("Five is greater than two!")

# variable
x = str(5)
s = "Hello"
i = int(6)
f = float(10)

print(s)
print(x)
print(i)
print(f)
print(s, i)

print(type(i))
print(type(s))

v = "Awesome"


def myFunction():
    global v  # Add this line to access the global variable
    v += " Language"
    print("Python is " + v)


myFunction()


# Random numbers
print(random.randrange(1,10))
