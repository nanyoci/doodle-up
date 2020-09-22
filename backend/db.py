import pyrebase
from temp import stories
import uuid


progress = {
    "stories": {
        "story_id": 1,
        "stages": {
            "image_url": "www.bestdog.com",
            "stage_id": 1.1,
            "status": "incomplete"
        }
    }
}

progress = {
    "stories": {
        "1": {
            "asd": 1
        },
        "2": {
            "asd": 2
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
        self.auth = pyrebase.initialize_app(config).auth()

    def get_all_users(self):
        return self.db.child('Users').get()

    def create_new_user(self, username, email, password):
        user = {"username": username, "email": email, "password": password}
        story = {"username": username, "story": []}
        self.auth.create_user_with_email_and_password(email, password)
        self.db.child('Users').push(user)
        self.db.child('progress').push(story)

    def sign_in_with_email_and_password(self, email, password):
        return self.auth.sign_in_with_email_and_password(email, password)
    def send_password_reset_email(self, email):
        return self.auth.send_password_reset_email(email)
    def get_account_info(self, idToken):
        return self.auth.get_account_info(idToken)

    def get_user(self, username):
        data = self.db.child('Users').order_by_child(
            "username").equal_to(username).get()
        try:
            for v in data.val().values():
                return v
        except:
            return None

    def get_story_progress(self, username, storyid):
        progress = self.db.child('progress').order_by_child(
            'username').equal_to(username).get()
        try:
            for v in progress.val().values():
                print(v)
                return v["stories"]
        except:
            return None

    def start_new_story(self, username, storyid):
        # Start story
        new_stage = {
            "stages": [
                    {
                        "image_url": "",
                        "stage_id": 1.1,
                        "status": "incomplete"
                    }]
        }
        log = self.db.child('progress').order_by_child(
            'username').equal_to(username).get().val()
        # log["stories"] = new_stage
        for k, v in log.items():
            if "stories" not in v:
                v["stories"] = {storyid: new_stage}
            else:
                stories = v["stories"]
                stories[storyid] = new_stage
        self.db.child('progress').update(log)
        return v

# print(fb.get_user_progress(1).val())
# print(users.val())

# pyrebase has some compatability issues with url, this is a workaround


def noquote(s):
    return s


pyrebase.pyrebase.quote = noquote
