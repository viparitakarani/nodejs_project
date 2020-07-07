#!/bin/sh

#this file is use to listen to the events which will be sent by the nodejs server
curl  -H Accept:text/event-stream http://localhost:3000/requeststreams