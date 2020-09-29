FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

WORKDIR /app
COPY . .
RUN chmod +x setup && ./setup
