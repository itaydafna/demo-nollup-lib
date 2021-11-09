ARG ECR
FROM ${ECR}/ubuntu:16.04

RUN apt-get -y update && apt-get install -y nginx nginx-extras

COPY docker-resources/nginx.conf docker-resources/mime.types /etc/nginx/

RUN rm -f /etc/nginx/sites-available/default

COPY docker-resources/marketplace-react /etc/nginx/sites-available
RUN ln -s /etc/nginx/sites-available/marketplace-react /etc/nginx/sites-enabled/marketplace-react

RUN rm /var/www/html/index.nginx-debian.html
COPY public/ /var/www/html/

EXPOSE 8443

CMD ["nginx", "-g", "daemon off;"]
