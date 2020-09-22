import flask
from flask import jsonify, request, Response
from temp import stories
from db import FirebaseHelper

app = flask.Flask(__name__)
app.config["DEBUG"] = True
helper = FirebaseHelper()


# creates user in firebase authentication 
# creates entry in realtime database
@app.route('/signup', methods=['POST'])
def sign_up():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    if helper.get_user(username):
        return "The username has been taken.", 400
    helper.create_new_user(username, email, password)
    return "User created.", 200

# able to return a string:token that expires in 60minutes - potentially good for prototyping secure access
@app.route('/signin', methods=['POST'])
def sign_in():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    if not helper.get_user(username):
        return "Does not exist, please create an account.", 400
    # return helper.sign_in_with_email_and_password(email, password)["idToken"]
    return "Account successfully logged in", 200

# /resetpassword?email=tsr@gmail.com
@app.route('/resetpassword', methods=['GET'])
def reset_password():
    email = request.args.get("email")
    returned_json = helper.send_password_reset_email(email)
    if "email" not in returned_json:
        return "Please re-enter your email", 400
    return "Sucessful! Please check your email", 200

# potentially checks token issue time, email
@app.route('/accountinfo/<string:idToken>', methods=['GET'])
def account_info(idToken):
    returned_json = helper.get_account_info(idToken)
    if "users" not in returned_json:
        return "Invalid token", 400
    return "Successful.", 200

# GAME PROGRESSION ENDPOINTS
# Save progress on every stage pass
@app.route('/autosave', methods=['POST'])
def autosave():
    return jsonify(stories)

# Save progress midstage
@app.route('/save', methods=['POST'])
def save():
    pass

# Get user's progress for the selected story, else initialize
# Important to note, storyid cannot me an integer string i.e. "1", "23"
# Firebase is sensitive and convert the data structure into an array
# /progress?username=xyz&story=1
@app.route('/progress', methods=['GET'])
def get_user_progress():
    username = request.args.get('username')
    storyid = request.args.get('story')
    progress = helper.get_story_progress(username, storyid)
    # TODO: if no story progress, create new one
    if not progress or storyid not in progress:
        progress = helper.start_new_story(username, storyid)
    return progress

# USER ENDPOINTS
# @app.route('/register', methods=['POST'])
# def register_user():
#     username = request.form['username']
#     password = request.form['password']
#     if helper.get_user(username):
#         return "The username has been taken.", 400
#     helper.create_new_user(username, password)
#     return "User created.", 200


@app.route('/user/<username>', methods=['GET'])
def get_user(username):
    result = helper.get_user(username)
    if not result:
        result = Response({"error": "User not found."},
                          status=404, mimetype='application/json')
    return result


if __name__ == "__main__":
    app.run()
