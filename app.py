import os
import random
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    questions = os.listdir(os.path.abspath(os.path.dirname(__name__)) + '/static' + '/question')
    return render_template('index.html', question=random.choice(questions))


if __name__ == '__main__':
    app.run(debug=True)
