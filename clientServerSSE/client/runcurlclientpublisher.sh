#!/bin/sh

#this file is use to send an event which will be broadcasted by the nodejs server to all clients
curl  -H Accept:text/event-stream http://localhost:3000/sendevent