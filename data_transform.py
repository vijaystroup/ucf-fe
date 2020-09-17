import os
import re
from PyPDF2 import PdfFileReader

path = os.path.abspath(os.path.dirname(__name__)) + '/static/'
raw_dir = path + 'raw_tests/'
question_dir = path + 'question/'
answer_dir = path + 'answer/'
info_dir = path + 'info/'

input1 = PdfFileReader(open(raw_dir + 'FE-Aug20.pdf', 'rb'))
input2 = PdfFileReader(open(raw_dir + 'FE-Aug15.pdf', 'rb'))
input3 = PdfFileReader(open(raw_dir + 'FE-May18.pdf', 'rb'))

recQ = re.compile('^([1-9])\)')
recP = re.compile('^(Page)')


def getQuestion(pdf):
    for page in range(pdf.getNumPages()):
        text = pdf.getPage(page).extractText().splitlines()
        for i in text:
            resQ = re.search(recQ, i)
            if resQ is not None:
                print(resQ.group(0), page)


getQuestion(input1)