import requests
import os
from PyPDF2 import PdfFileReader
from scrape_data import exams

path = os.path.abspath(os.path.dirname(__name__)) + '/'
question_dir = path + 'data/question/'
answer_dir = path + 'data/answer/'
info_dir = path + 'data/info/'

for key in exams:
    link = exams[key]['question']
    r = requests.get(link)
    open(question_dir + link.split('/')[-1], 'wb').write(r.content)
    break