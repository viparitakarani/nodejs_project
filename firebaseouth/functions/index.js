const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const express = require('express');
const cors = require('cors');


//this configuration is created in the firebase console project application
var firebaseConfig = {
    apiKey: "[YOUR FIREBASE API KEY]",
    authDomain: "[firebase web application].firebaseapp.com",
    databaseURL: "https://clntauth.firebaseio.com",
    projectId: "[YOUR FIREBASE PROJECTID]",
    storageBucket: "clntauth.appspot.com",
    messagingSenderId: "[SENDER ID]",
    appId: "[APP ID]"
  };


  // Initialize Firebase
admin.initializeApp();
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const app = express();
const port = 3001;

app.use(cors());
// Decodes the Firebase JSON Web Token
app.use(decodeIDToken);
//var decodedTokenData=null;

/**
 * Decodes the JSON Web Token sent via the frontend app
 * Makes the currentUser (firebase) data available on the body.
 */
async function decodeIDToken(req, res, next) 
{

  if(!req || !req.headers.authorization) return next();

  const authHeader = req.headers.authorization;

  if (authHeader) 
  {
  		const token = authHeader.split('Bearer ')[1];
  		//console.log(`TOKEN: ${token}`);

  		admin.auth().verifyIdToken(token).then(function(decodedToken) {
  				//console.log(decodedToken);
			    req['currentUser'] = decodedToken;
			    next();
			    // ...
			  }).catch(function(error) {
			   console.log(error);
		  });
	    
   } 
  else 
  {
        console.log('authheader');
  }
 
 
}



//the authentication server url
app.get('/login', async (req, res) => {

    auth.signInWithEmailAndPassword("[userid/eamil]", "[password]").then( (user) =>  
    {
 	    auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(token) {
		  		//console.log('login sucess');
                res.writeHead(200, {"Content-Type": "application/json"});
                //res.end(JSON.stringify({token:token}));
                res.end(token);
		  // ...
		}).catch(function(error) {
		   res.writeHead(500, {"Content-Type": "application/json"});
           res.end(JSON.stringify({error:error}));
		});

    }).catch((err)=>
    {
    		console.log(err);
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error:err}));
    });
	
    
});



//the resources server url
app.get('/hello', (req, res) => {

    const user = req['currentUser'];
    //console.log(user);

    if (!user) { 
        res.status(403).send('You must be logged in!');
    }
    else{
     let data="Hello Worl";
     res.writeHead(200, {"Content-Type": "application/json"});
     res.end(JSON.stringify({data:data}));
 	}

})

app.listen(port, () => console.log(new Date()+`|SSE Client listening on port ${port}`));


// Expose Express API as a single Cloud Function:
exports.app = functions.https.onRequest(app);
