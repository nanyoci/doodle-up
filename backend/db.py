import pyrebase
from temp import stories

progress = {
    "story": {
        "story_id": 1,
        "stages": {
            "image_url": "www.bestdog.com",
            "stage_id": 1.1,
            "status": "incomplete"
        }
    }
}


class FirebaseHelper:

    def __init__(self):
        config = {
            "apiKey": "AIzaSyDOXwnuSlP36o_tB3xiYELds0XOohJaxA4",
            "authDomain": "doodleup-f1847.firebaseapp.com",
            "databaseURL": "https://doodleup-f1847.firebaseio.com/",
            "storageBucket": "doodleup-f1847.appspot.com"
        }
        self.db = pyrebase.initialize_app(config).database()

    def get_all_users(self):
        return self.db.child('Users').get()

    def create_new_user(self, username, userid):
        user = {"name": username}
        self.db.child('Users').child(userid).set(user)

    def get_story_progress(self, userid, storyid):
        progress = self.db.child('progress').child(userid).get()
        if progress.val() is None:
            print("asd")
            self.start_new_story(userid, storyid)
        else:
            return progress.val()

    def start_new_story(self, userid, storyid):
        # Start story
        new_stage = {
            "story": {
                "story_id": storyid,
                "stages": [
                    {
                        "image_url": "",
                        "stage_id": 1.1,
                        "status": "incomplete"
                    }
                ]
            }
        }
        print(userid, storyid)
        self.db.child('progress').child(
            userid).set(new_stage)


fb = FirebaseHelper()
p = fb.get_story_progress(3, 1)
print(p)
# print(fb.get_user_progress(1).val())
# print(users.val())
