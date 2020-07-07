# Firebase Node JS project
this project whould try to implement the SSE client server SSE using nodejs and C++ 


# SSE Server

## Getting Started

go to project folder [server]

then login to firebase

$firebase login

Login to browser or Already logged in as [email] if already login


## Init project with firebase project for the first time project's created

$firebase init functions

- Select existing project, which already been created.
- select javascript, for this project in project set up then user ESLint
- install dependecy with npmm, by chosing y, the project folder [server/functions] will be generated and firebase.json will be created in project folder[server/firebase.json].

go to  functions folder then edit index.js as needed or use another file name  like server.js then edit the main tag in package.json  

$cd functions

[start coding and fun]

add required dependency 
$npm i express cors

this will add also the dependencies in package.json

## Test the project in local browser

$firebase emulators:start


- [Test the apps by accessing at local browser](http://localhost:3000/sendevent)


## deploy the poject to cloud function

$ firebase deploy --only functions


## Test the apps 
test the publisher using below url to publish an event, and use client project to cek the result
- [Test the apps by accessing](https://us-central1-the-sinoman.cloudfunctions.net/app/sendevent)


