#FROM node:10.9.0

# Create app directory
#WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

#RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .

#EXPOSE 8080
#CMD [ "node", "index.js" ]



FROM node:12.13.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install -g nodemon
RUN npm install

COPY . /usr/src/app

EXPOSE 8000
CMD ["npm", "start"]