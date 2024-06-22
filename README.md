Ardhangini Backend Application for both customer facing ui and admin panel
technology used : Nest js, docker
To run this we need to have docker installed and run
dev - docker compose -f docker-compose-dev.yaml watch
prod - docker compose up

Please note need to update the environment variables for interfacing with database and other components.

default port is 3000

swagger documentation url is - http://<host-ip>:3000/swagger
