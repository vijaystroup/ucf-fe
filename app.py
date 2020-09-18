import os
import random
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    questions = os.listdir(os.path.abspath(os.path.dirname(__name__)) + '/static' + '/question')
    question = random.choice(questions)
    question_info = 'Info-' + question.split('-')[1] + '.pdf'
    return render_template('index.html', question=question, question_info=question_info)


if __name__ == '__main__':
    app.run(debug=True)
