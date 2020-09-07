import flask
from flask import jsonify
from temp import stories

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return jsonify(stories)


if __name__ == "__main__":
    app.run()
