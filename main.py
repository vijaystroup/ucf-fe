import os
import random
from flask import Flask, render_template, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')


@app.route('/question')
def question():
    questions = os.listdir(os.path.abspath(os.path.dirname(__name__)) + '/static' + '/question')
    question = random.choice(questions)

    answer = question.split('.')[0]
    answer = answer.split('-')
    answer.append(answer[-1])
    answer[-2] = 'Sol'
    answer = '-'.join(answer)

    question_info = 'Info-' + question.split('-')[1]

    data = {
        'question': '/static/question/' + question,
        'answer': '/static/answer/' + answer + '.pdf',
        'info': '/static/info/' + question_info + '.pdf'
    }

    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
