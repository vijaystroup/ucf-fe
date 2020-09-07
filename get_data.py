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

    rows = table.findChildren('tr')
    rows.pop(0) # remove info row

    exams = {}
    for row in rows[::2]:
        print(row.findChildren('td'))
        print()


if __name__ == '__main__':
    url = 'http://www.cs.ucf.edu/registration/exm/'

    page = get_page(url)

    table = page.find_all('table')[1]
    transform_table(table)
