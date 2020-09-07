from bs4 import BeautifulSoup
import re
import requests


def get_page(url):
    """request the url for the past exams and return the soup for
    that request. if unable to get the page, return error message."""

    req = requests.get(url)
    if req.status_code == 200:
        try:
            return BeautifulSoup(req.text, features='lxml')
        except Exception as e:
            return e
    return f'error requesting: {url}\nstatus: {req.status_code}'


def transform_table(table):
    """take in the souped table and transform it to a dictionary with
    the key being the date and the values being the pdf links."""

    try:
        rows = table.findChildren('tr')
        rows.pop(0) # remove info row
    except Exception as e:
        return f'error finding "tr" children: {e}'

    exams = {}
    for row in rows[::2]:
        try:
            exam_info = row.findChildren('td')
        except Exception as e:
            return f'error finding "td" children: {e}'

        try:
            # make dict key
            key = exam_info[0].text.split(' ')
            key.pop(1)
            key = (' ').join(key)

            # get questions pdf url
            question = exam_info[1].find(href=True)['href']
            question = url + question

            # get answers pdf url
            answer = exam_info[2].find(href=True)['href']
            answer = url + answer

            # get info pdf url
            info = exam_info[3].find(href=True)['href']
            info = url + info
        except Exception as e:
            return f'error getting dict attributes: {e}'

        # append exam to exams
        exams[key] = {
            'question': question,
            'answer': answer,
            'info': info
        }

    return exams


if __name__ == '__main__':
    url = 'http://www.cs.ucf.edu/registration/exm/'

    page = get_page(url)

    table = page.find_all('table')[1]
    exams = transform_table(table)
    print(exams)
