FROM nginx:latest

ENV CAUCUS_JWT_KEY=123456abcdefghijklmnopqrstuvwxyz
ENV ZYME_JWT_KEY=abcdefghijklmnopqrstuvwxyz123456

RUN apt-get update && \
  apt-get install -y curl software-properties-common procps

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash - && \
  apt-get install -y nodejs

RUN openssl genrsa 2048 > nginx-selfsigned.key
COPY certificate.config .
RUN openssl req -newkey rsa:2048 -config certificate.config -new -nodes -x509 -days 3650 -key nginx-selfsigned.key -out nginx-selfsigned.crt

RUN mkdir -p /etc/nginx/certs && mv -t /etc/nginx/certs/ nginx-selfsigned.key nginx-selfsigned.crt
# Copy self signed certificiate and nginx configuration
# COPY nginx-selfsigned.crt nginx-selfsigned.key /etc/nginx/certs/
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

WORKDIR /root/zyme-caucus-mock
COPY index.js package.json package-lock.json ./
RUN npm i
# CMD node index.js
# RUN npm i && nohup node index.js > output.log &

COPY entrypoint.sh /root/
CMD "/root/entrypoint.sh"
