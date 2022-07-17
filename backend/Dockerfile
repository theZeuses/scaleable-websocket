FROM node:14.15.4
RUN mkdir -p /var/www/backend
WORKDIR /var/www/backend
COPY . /var/www/backend
RUN npm install
CMD npm run dev