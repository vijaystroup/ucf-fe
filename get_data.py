import os
import json
from bs4 import BeautifulSoup
import requests
from tqdm import tqdm
from data_transform import make_questions, make_answers
import metadata as md

path = os.path.abspath(os.path.dirname(__name__)) + '/public'


def get_page(url):
    """request the url for the past exams and return the soup for
    that request. if unable to get the page, return error message."""

    req = requests.get(url, timeout=3)
    if req.status_code == 200:
        try:
            return BeautifulSoup(req.text)
        except Exception as e:
            return (-1, e)
    return (-1, f'error requesting: {url}\nstatus: {req.status_code}')


def transform_table(table):
    """take in the souped table and transform it to a dictionary with
    the key being the date and the values being the pdf links."""

    rows = table.findChildren('tr')
    if len(rows) < 1: # check to make sure there are children
        return (-1, f'error finding "tr" children')
    rows.pop(0) # remove info row

    # uncomment to skip first row in table
    # rows = rows[2:]

    exams = {}
    for row in rows:
        exam_info = row.findChildren('td')
        if len(exam_info) < 1:
            return (-1, f'error finding "td" children')

        # make dict key
        key = exam_info[0].text.split(' ')
        key.pop(1)
        key = (' ').join(key)

        # get questions pdf url
        question = exam_info[1].find(href=True)['href']
        if question is None:
            return (-1, 'error finding question href')
        question = url + question

        # get answers pdf url
        answer = exam_info[2].find(href=True)['href']
        if answer is None:
            return (-1, 'error finding answer href')
        answer = url + answer

        # get info pdf url
        info = exam_info[3].find(href=True)['href']
        if info is None:
            return (-1, 'error finding info href')
        info = url + info

        # append exam to exams
        exams[key] = {
            'question': question,
            'answer': answer,
            'info': info
        }

    return exams


def dl_pdf(exams):
    questions = {}
    for key in tqdm(exams):
        linkQ, linkA, linkI = exams[key]['question'], exams[key]['answer'], exams[key]['info']
        link_nameQ, link_nameA, link_nameI = linkQ.split('/')[-1], linkA.split('/')[-1], linkI.split('/')[-1]

        rQ, rA, rI = requests.get(linkQ, timeout=3), requests.get(linkA, timeout=3), requests.get(linkI, timeout=3)

        with open(f'{path}/raw_question/' + link_nameQ, 'wb') as f:
            f.write(rQ.content)
        make_questions(link_nameQ)

        # make questions.json file
        for key in md.questions[link_nameQ].keys():
            questions[f'{link_nameQ.split(".")[0]}-{key}.pdf'] = None

        with open(f'{path}/raw_answer/' + link_nameA, 'wb') as f:
            f.write(rA.content)
        make_answers(link_nameA)

        with open(f'{path}/info/' + link_nameI, 'wb') as f:
            f.write(rI.content)
    
    with open('public/questions.json', 'w') as f:
        json.dump(questions, f)


if __name__ == '__main__':
    url = 'http://www.cs.ucf.edu/registration/exm/'

    # make dirs if not there
    dirs = ['/raw_question', '/raw_answer', '/question', '/answer', '/info', '/misc']
    for d in dirs:
        if not os.path.exists(path + d):
            os.makedirs(path + d)

    # page
    page = get_page(url)
    if isinstance(page, tuple):
        print('error page')

    # table
    table = page.find_all('table')[1]
    if isinstance(table, tuple):
        print('error table')

    # exams
    exams = transform_table(table)
    if isinstance(exams, tuple):
        print('error exams')

    # download pdfs
    dl_pdf(exams)
