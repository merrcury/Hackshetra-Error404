#import libraries

from google.cloud import storage
from firebase import firebase
from urllib import request
import numpy as np
import cv2

#create firebase object
firebase = firebase.FirebaseApplication('https://fir-76656.firebaseio.com/')
#client key activation
client = storage.Client.from_service_account_json('demo.json')
#firestore bucket location
bucket = client.get_bucket('fir-76656.appspot.com')

blob = bucket.get_blob('ketan.jpeg')
url = blob.public_url
req = request.urlopen(url)
arr = np.asarray(bytearray(req.read()), dtype = np.uint8)
img = cv2.imdecode(arr,-1)
cv2.imshow('image',img)
cv2.waitKey(5000)
cv2.destroyAllWindows()
