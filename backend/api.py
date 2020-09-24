import flask
from flask import jsonify, request, Response
# from temp import stories
from db import FirebaseHelper
from werkzeug.utils import secure_filename
import os


app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = './images'

helper = FirebaseHelper()


# USER AUTHENTICATION

# GAME PROGRESSION ENDPOINTS

# Save progress
@app.route('/progress', methods=['POST'])
def save():
    username = request.args.get('username')
    storyid = request.args.get('storyid')
    json = request.get_json()
    # TODO: Saving file needs testing
    # file = json["new_image"]
    file = request.files['new_image']
    # file = request.form['new_image']
    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        path = 'Progress/' + username
        url = helper.upload_file(path, filepath)
        json["content"]["image_url"] = url
        os.remove(filepath)
    helper.update_story_progress(username, storyid, json["content"])
    return "Progress saved", 200

# Get user's progress for the selected story, else initialize
# Important to note, storyid cannot me an integer string i.e. "1", "23"
# Firebase is sensitive and convert the data structure into an array
# /progress?username=xyz&storyid=1
@app.route('/progress', methods=['GET'])
def get_user_progress():
    username = request.args.get('username')
    storyid = request.args.get('storyid')
    progress = helper.get_story_progress(username, storyid)
    if not progress:
        progress = helper.start_new_story(username, storyid)
    return progress

# USER ENDPOINTS
@app.route('/register', methods=['POST'])
def register_user():
    username = request.form['username']
    password = request.form['password']
    if helper.get_user(username):
        return "The username has been taken.", 400
    helper.create_new_user(username, password)
    return "User created.", 200


@app.route('/user/<username>', methods=['GET'])
def get_user(username):
    result = helper.get_user(username)
    if not result:
        result = Response({"error": "User not found."},
                          status=404, mimetype='application/json')
    return result

# STORY CONTENT ENDPOINTS
# /content?storyid=001
@app.route('/content', methods=['GET'])
def get_content():
    storyid = request.args.get('storyid')
    content = helper.get_content(storyid)
    if not content:
        content = Response({"error": "Story not found."},
                           status=404, mimetype='application/json')
    return content


@app.route('/content', methods=['POST'])
def create_content():
    # needs the request content to be set to application/json
    content = request.get_json()
    helper.create_content(content)
    return "Content created.", 200


if __name__ == "__main__":
    app.run()
