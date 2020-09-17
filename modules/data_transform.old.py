"""
This module was using regex to find question pages without metadata.
Will possibly come back to this method in the future.
"""

import os
import re
from PyPDF2 import PdfFileReader

path = os.path.abspath(os.path.dirname(__name__)) + '/static/'
raw_dir = path + 'raw_tests/'
question_dir = path + 'question/'
answer_dir = path + 'answer/'
info_dir = path + 'info/'

input1 = PdfFileReader(open(raw_dir + 'FE-Aug15.pdf', 'rb'))
input2 = PdfFileReader(open(raw_dir + 'FE-Dec16.pdf', 'rb'))
input3 = PdfFileReader(open(raw_dir + 'FE-Jan17.pdf', 'rb'))
input4 = PdfFileReader(open(raw_dir + 'FE-May18.pdf', 'rb'))
input5 = PdfFileReader(open(raw_dir + 'FE-Jan19.pdf', 'rb'))
input6 = PdfFileReader(open(raw_dir + 'FE-Aug20.pdf', 'rb'))

recQ1 = re.compile('^([1-9])\)')
recQ2 = re.compile('^([1-9])')
recPg = re.compile('^(Page)')
recPo = re.compile('[1-9]|[0-9]{2}')


def getQuestion(pdf):
    for page in range(pdf.getNumPages()):
        text = pdf.getPage(page).extractText().splitlines()
        # print(text)
        # break
        for i, val in enumerate(text):
            resQ1 = re.search(recQ1, val)
            resQ2 = re.search(recQ2, text[i+1])
            if resQ1 is not None or resQ2 is not None:
                if re.search(recPo, text[i+1]) is not None or \
                   re.search(recPo, text[i+2]) is not None or \
                   re.search(recPo, text[i+3]) is not None:
                    if resQ1 is not None: print(resQ1.group(0), page+1)
                    if resQ2 is not None: print(resQ2.group(0), page+1)

getQuestion(input1)