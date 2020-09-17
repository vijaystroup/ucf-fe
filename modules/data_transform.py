import os
from PyPDF2 import PdfFileWriter
import metadata as md

# paths
path = os.path.abspath(os.path.dirname(__name__)) + '/static'
path_raw = path + '/raw_question'
path_question = path + '/question'

# raw question pdfs
raw_q = os.listdir(path_raw)



print(md.questions[raw_q[0]])