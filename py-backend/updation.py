last_update = {}
def update(img, camera): # index of person detected in wanted, name of camera
        now = datetime.now()
        now = now.strftime("%m/%d/%Y, %H:%M:")
        for idx, img1 in self.wanted_dict.items():
            if img1 == self.wanted[img]:
                key = idx
        try:
            lu = last_update[key]
            if lu == now:
                #Do Nothing
            else:
                last_update[key] = now
                cam = camera
                previous_list = db.child('policestation').child(key[:3]).child(key).child('seen').get()
                previous_list = list(previous_list.val())
                previous_list.append("On "+now+" at "+cam)
                db.child('policestation').child(key[:3]).child(key).update({"seen":previous_list})
        except KeyError():
            cam = camera
            previous_list = db.child('policestation').child(key[:3]).child(key).child('seen').get()
            previous_list = list(previous_list.val())
            previous_list.append("On "+now+" at "+cam)
            db.child('policestation').child(key[:3]).child(key).update({"seen":previous_list})
            last_update[key] = now
