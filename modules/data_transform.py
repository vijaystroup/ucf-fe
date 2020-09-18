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


def make_questions(name):
    """make small question pdfs using metadata"""

    pdf = PdfFileReader(open(path_raw + f'/{name}', 'rb'))
    for key, val in md.questions[name].items():
        writer = PdfFileWriter()
        name = name.split('.')[0]
        for i in range(val[0]-1, val[1]):
            writer.addPage(pdf.getPage(i))
        with open(f'{path_question}/{name}-{key}.pdf', 'wb') as f:
            writer.write(f)
