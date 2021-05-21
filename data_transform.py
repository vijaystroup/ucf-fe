import os
from PyPDF2 import PdfFileReader, PdfFileWriter
import metadata as md

# paths
path = os.path.abspath(os.path.dirname(__name__)) + '/public'
raw_question = path + '/raw_question'
path_question = path + '/question'
raw_answer = path + '/raw_answer'
path_answer = path + '/answer'


def write_pdf(mode_path, name, key, val, pdf):
    name = name.split('.')[0]
    writer = PdfFileWriter()
    for i in range(val[0]-1, val[1]):
        writer.addPage(pdf.getPage(i))
    with open(f'{mode_path}/{name}-{key}.pdf', 'wb') as f:
        writer.write(f)


def make_questions(name):
    """make small question pdfs using metadata"""

    pdf = PdfFileReader(open(raw_question + f'/{name}', 'rb'))
    for key, val in md.questions[name].items():
        write_pdf(path_question, name, key, val, pdf)


def make_answers(name):
    """make small answer pdfs using metadata"""

    pdf = PdfFileReader(open(raw_answer + f'/{name}', 'rb'))
    for key, val in md.answers[name].items():
        write_pdf(path_answer, name, key, val, pdf)
