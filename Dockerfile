FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

WORKDIR /app
COPY . .
RUN python3 modules/get_data.py
