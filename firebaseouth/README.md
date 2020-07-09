# Firebase Oauth with Node JS project
This project  tries to implement the ouath client and server using nodejs


# Oauth Server

## Getting Started

go to project folder 

then login to firebase

$firebase login

Login to browser


## Init project with firebase project for the first time project's created

$firebase init functions

- Select existing project, which's already been created in firebase.
- select javascript, for this project in project set up,and then use ESLint
- install dependecy with npmm, by chosing y, the project folder [functions] will be generated and firebase.json will be created in project folder[firebase.json].

go to  functions folder then edit index.js as needed

$cd functions

[start coding and have fun]

add required dependency 

$npm i express cors firebase

this will add also the dependencies in package.json


## Test the project in local browser

$firebase emulators:start


- Test the apps by accessing at local browser  (http://localhost:3001/login) to get the token


## Deploy the poject to cloud function

$ firebase deploy --only functions


# SSE Client

To test the end to End scenario we use 2 file, as the listerner and as the publishser 

## Run the Ouath NodeJs Server 

Run the server in local emulator, go to functions folder

$firebase emulators:start

## Login to get the access token and use the token to access the hallo resources
$./client/curlhallo.sh

