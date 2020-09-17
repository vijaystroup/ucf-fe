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


def pre_existing_q(search):
    """check to see if we have already created questions for a specific test"""

    search = search.split('-')[1].split('.')[0]
    for q in created_q:
        if search in q:
            return True
    return False


def make_question():
    """make small question pdfs using metadata"""

    for q in raw_q:
        if not pre_existing_q(q):
            pdf = PdfFileReader(open(raw_dir + raw_q[i], 'rb'))


make_question()
