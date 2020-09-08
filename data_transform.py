import os
from PyPDF2 import PdfFileReader

path = os.path.abspath(os.path.dirname(__name__)) + '/'
question_dir = path + 'data/question/'
answer_dir = path + 'data/answer/'
info_dir = path + 'data/info/'

input1 = PdfFileReader(open(question_dir + 'FE-Aug20.pdf', 'rb'))
print(input1.getPage(1).extractText())