#Base image
FROM node:latest

#Working directory
WORKDIR /app

#Copy package.json file
COPY package.json .

#Install dependencies
RUN npm install

#Copy the rest of the code
COPY . .

#Expose the port that the app runs on
EXPOSE 3000

#Command to run the application
CMD [ "npm", "run", "start" ]