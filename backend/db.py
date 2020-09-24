import pyrebase
from temp import stories
import uuid


class FirebaseHelper:

    def __init__(self):
        config = {
            "apiKey": "AIzaSyDOXwnuSlP36o_tB3xiYELds0XOohJaxA4",
            "authDomain": "doodleup-f1847.firebaseapp.com",
            "databaseURL": "https://doodleup-f1847.firebaseio.com/",
            "storageBucket": "doodleup-f1847.appspot.com"
        }
        app = pyrebase.initialize_app(config)
        self.db = app.database()
        self.storage = app.storage()
        self.storage = app.auth()

    def get_all_users(self):
        return self.db.child('Users').get()

    def create_new_user(self, username, password):
        user = {"username": username, "password": password}
        story = {"username": username, "story": []}
        self.db.child('Users').push(user)
        self.db.child('progress').push(story)

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
                print(v['stories'][storyid])
                return v['stories'][storyid]
        except:
            return None

    def update_story_progress(self, username, storyid, content):
        try:
            progress = self.db.child('progress').order_by_child(
                'username').equal_to(username).get().val()
        except:
            print("No value found")
            return None
        for v in progress.values():
            for stage in v['stories'][storyid]["stages"]:
                if stage["stage_id"] == content["stage_id"]:
                    stage["image_url"] = content["image_url"]
                    stage["status"] = content["status"]
                    self.db.child('progress').update(progress)
        # did not find existing stage, create new stage instead
        self.start_new_stage(username, storyid, content["stage_id"])

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
        for k, v in log.items():
            if "stories" not in v:
                v["stories"] = {storyid: new_stage}
            else:
                stories = v["stories"]
                stories[storyid] = new_stage
        self.db.child('progress').update(log)
        return v["stories"][storyid]

    def start_new_stage(self, username, storyid, stageid):
        new_stage = {
            "image_url": "",
            "stage_id": stageid,
            "status": "incomplete"
        }
        try:
            progress = self.db.child('progress').order_by_child(
                'username').equal_to(username).get().val()
        except:
            return None
        for v in progress.values():
            stages = v['stories'][storyid]["stages"]
            stages.append(new_stage)
            self.db.child('progress').update(progress)

    def create_content(self, content):
        storyid = content['id']
        self.db.child('content').push(content)

    def get_content(self, storyid):
        log = self.db.child('content').order_by_child(
            "id").equal_to(storyid).get()
        try:
            for v in log.val().values():
                return v
        except:
            return None

    def upload_file(self, path, file):
        self.storage.child(path).put(file)
        return self.storage.child(path+"/"+file).get_url()


# pyrebase has some compatability issues with url, this is a workaround


def noquote(s):
    return s


pyrebase.pyrebase.quote = noquote
