#FROM node:12.16.2
FROM node:alpine
# Create app directory
#WORKDIR /usr/src/app
WORKDIR /app
# Install app dependencies
COPY package*.json ./

RUN npm install
# Copy app source code
COPY . .

#Expose port and start application
#EXPOSE 8000
EXPOSE 80
CMD [ "npm", "start" ]