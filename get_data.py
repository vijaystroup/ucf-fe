from bs4 import BeautifulSoup
import re
import requests


def get_page(url):
    req = requests.get(url)
    if req.status_code == 200:
        try:
            return BeautifulSoup(req.text, features='lxml')
        except Exception as e:
            return e
    return f'error requesting: {url}\nstatus: {req.status_code}'


if __name__ == '__main__':
    url = 'http://www.cs.ucf.edu/registration/exm/'
    page = get_page(url)
    print(page)