#!/bin/bash

echo "Kill static server"
lsof -ti:8080 | xargs kill
echo "Kill api server"
lsof -ti:8041 | xargs kill
echo "kill api pact proxy server"
lsof -ti:8999 | xargs kill
