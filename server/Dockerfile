
FROM node:20-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install


# Bundle app source
COPY . /usr/src/app

EXPOSE 4000

CMD ["sh", "-c", "./cloud_sql_proxy -instances=hrm120825:asia-south1:hrm120825 & npm start"]