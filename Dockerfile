FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN  nginx -s reload
COPY build/*  /usr/share/nginx/html/
