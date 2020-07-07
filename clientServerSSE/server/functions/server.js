/*
 * SSE server demo using nodejs
 * Based on: https://alligator.io/nodejs/server-sent-events-build-realtime-app/
 */

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;


app.use(cors());

const headerData = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
};


var userIndex = 0
var clients = [];

// This handler executed when client request listenning the stream
function clientsHandler(request, respond) {
    
    //return header with 200 statu code and header value
    respond.writeHead(200, headerData);

    //format the body of the data stream
    let firstStreamData = {
        'time': `${new Date()}`,
        'msg': 'Stream data for the listener!'
    }

    respond.write(`data: ${JSON.stringify(firstStreamData)}\n\n`);

    //generate new client data which its index and respond data
    const clientId = Date.now();
    const newClient = {
        index : userIndex,
        id: clientId,
        respond
      };
    clients.push(newClient);

    //Increment index of the client
    userIndex++;

    //Remove client when they close the  connection
    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(c => c.index !== userIndex);
    });
}

// Send events to all clients using SSE
function sendStreamToAllClients(str="automatic") {

    console.info(new Date()+'|Sending stream data to all clients, this is '+str+' event');

    let streamData = {
        'time': `${new Date()}`,
        'msg': 'Stream data for the listener! Event from : '+str
    }

    //Broadcast the data to all listed client in json database
    clients.forEach(c => c.respond.write(`data: ${JSON.stringify(streamData)}\n\n`))
}


//url for the client request submition ot the stream data.
app.get('/requeststreams', clientsHandler);



//push an event to server an respond ok to all subscribed clients
app.get('/sendevent', (request, respond) => {

  //console.info('sendevent');
  sendStreamToAllClients("manual");
  //respond.writeHead(200);
  respond.send('ok!');
  
})


//test with automatic even
//const WAITTIMER = 10000;
//setInterval(sendStreamToAllClients, WAITTIMER);

// Start server, For deploy to firebase  comment this line before deployment 
//app.listen(port, () => console.log(new Date()+`|SSE Server  listening on port ${port}`));


// Expose Express API as a single Cloud Function:
exports.app = functions.https.onRequest(app);