FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

WORKDIR /app
COPY . .
RUN apk add libxml2 libxslt -y
RUN pip install -r requirements.txt
RUN python3 modules/get_data.py
