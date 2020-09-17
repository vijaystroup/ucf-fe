import os
from PyPDF2 import PdfFileReader, PdfFileWriter
import metadata as md

# paths
path = os.path.abspath(os.path.dirname(__name__)) + '/static'
path_raw = path + '/raw_question'
path_question = path + '/question'

# raw question and questions created pdfs
raw_q = os.listdir(path_raw)
created_q = os.listdir(path_question)

# FE-Aug20-12
def pre_existing_q(search):
    """check to see if we have already created questions for a specific test"""
    search = search.split('-')[1].split('.')[0]
    for q in created_q:
        if search in q:
            return True
    return False


def make_question():
    for i in range(len(raw_q)):
        pdf = PdfFileReader(open(raw_dir + raw_q[i], 'rb'))


# print(md.questions[raw_q[0]])

# print(created_q)
# print()
# print(raw_q)
pre_existing_q(raw_q[0])
# make_question()
