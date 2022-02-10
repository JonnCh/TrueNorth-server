## TrueNort-SERVER

This is a job application for TrueNorth.

This server uses node js, express and mongodb to store data.

## Requirements

This project run in a docker image. The only requirement to run it, is that you have docker install on your machine.

## Start it
Just run the following command "docker-compose up -d build"

Server should be available on the following paths:

GET http://localhost:4000/task?quantity=2
PUT http://localhost:4000/task/:id