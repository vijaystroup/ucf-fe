import os
from bs4 import BeautifulSoup
import requests

path = os.path.abspath(os.path.dirname(__name__)) + '/static/raw_tests'


def get_page(url):
    """request the url for the past exams and return the soup for
    that request. if unable to get the page, return error message."""

    req = requests.get(url, timeout=3)
    if req.status_code == 200:
        try:
            return BeautifulSoup(req.text, features='lxml')
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

    exams = {}
    for row in rows[::2]:
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
    pre_existing = os.listdir(path)
    for key in exams:
        link = exams[key]['question']
        link_name = link.split('/')[-1]
        if link_name not in pre_existing:
            r = requests.get(link, timeout=3)
            open(f'{path}/' + link_name, 'wb').write(r.content)


if __name__ == '__main__':
    url = 'http://www.cs.ucf.edu/registration/exm/'

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
