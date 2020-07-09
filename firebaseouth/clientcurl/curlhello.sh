#!/bin/bash

echo "REQUESTING...."
result="$(curl http://localhost:3001/login)"
echo "the result is: ${result}"

result="$(curl -i -H 'Accept: application/json' -H "Authorization: Bearer ${result}" http://localhost:3001/hello)"
echo "the result is: ${result}"


