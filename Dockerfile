FROM nginx:alpine

COPY app/default.conf /etc/nginx/conf.d/default.conf
RUN  nginx -s reload
COPY build/*  /usr/share/nginx/html/
