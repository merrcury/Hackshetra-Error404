import pyrebase
import json
from collections import OrderedDict
import collections
import time

config = {
  "apiKey": "AIzaSyCM3GLPNsTpRYuyeo5c-Kkf5-Hl6gKcCH8",
  "authDomain": "fir-76656.firebaseapp.com",
  "databaseURL": "https://fir-76656.firebaseio.com",
  "storageBucket": "fir-76656.appspot.com",
  "serviceAccount": "admin-sdk.json"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
# parent_temp = db.child("policestation").get()
# parent = parent_temp.val()
# #changing OrderedDict to RegularDict
# parent = dict(parent)
# keys = parent.keys()
# keys = [*keys]
# print(keys)
# for key in keys:
#     post = parent[key]
#     print(post)


# def stream_handler(message):
#     print(message["event"]) # put
#     print(message["path"]) # /-K7yGTTEp7O549EzTYtI
#     print(message["data"]) # {'title': 'Pyrebase', "body": "etc..."}
#
# my_stream = db.child("policestation").stream(stream_handler)

def stream_handler(self, message):
        action = message['event']
        #print(action)
        if action == 'patch':
            Data = message['data']
            print(Data)
            status = Data['status']
            if status == 0:
                while not self.bucket.get_blob(Data['img']):
                    if self.bucket.get_blob(Data['img']):
                        break
                xblob = self.bucket.get_blob(Data['img'])
                url = xblob.public_url
#                 blob = self.bucket.get_blob(Data['img'])
#                 url = blob.public_url
                req = request.urlopen(url)
                arr = np.asarray(bytearray(req.read()), dtype = np.uint8)
                img = cv2.imdecode(arr,-1)
                encoding = face_encodings(img)
                self.wanted_dict[Data['id']] = encoding
                self.wanted.append(encoding)
            else:
                try:
                    address = message['path']
                    address = address.split('/')
                    pop_img = address[2]
                    list_pop = self.wanted_dict[pop_img]
                    self.wanted.remove(list_pop)
                    del self.wanted_dict[pop_img]
                except:
                    pass
#             print(self.wanted)
        elif action == 'put' and message['path'] == "/":
            try:
                x = message["data"]
                keys = x.keys()
                for key in keys:
                    f_keys = message['data'][key].keys()
                    #print(f_keys)
                    for f_key in f_keys:
                        inner_dict = message['data'][key][f_key]
                        status = inner_dict['status']
                        if status == 0:
                                blob = bucket.get_blob(inner_dict['img'])
                                url = blob.public_url
                                req = request.urlopen(url)
                                arr = np.asarray(bytearray(req.read()), dtype = np.uint8)
                                img = cv2.imdecode(arr,-1)
                                encoding = face_encodings(img)
                                self.wanted_dict[f_key] = encoding
                                self.wanted.append(encoding)
                        else:
                            #Do Nothing as cause is already solved
                            pass
            except:
                pass
