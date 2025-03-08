# GlassHub Certificates Service

Welcome to the GlassHub Certificates APIs written in NodeJS using NestJS framework.
This is a service orchestration layer responsible for connecting frontend applications to GlassHub Certificates backend business systems.

## Development
### Development Prerequisites

To start development on this project install the following applications:

1. VS Code (https://code.visualstudio.com/download)
2. Docker (https://docs.docker.com/engine/install/) It's better to run everything using docker as a capsulated application instead.
3. NodeJS (https://nodejs.org/en/download/)
4. NestJS cli on your computer `npm install -g @nestjs/cli`
4. PostgreSQL (https://www.postgresql.org/download/)

### Installation

Clone the repository and install project dependencies by running the below commands.

- Clone repository

```sh
git clone https://github.com/AalaaGhanam/glasshub
cd glasshub-backend
```

- Install node dependencies

```sh
npm i
```
Once all dependencies are installed start you can run the service using docker compose,
To set up environment variables copy and paste then rename the .dev.env files to .env.

- Run Service
- Run Throw Docker
```sh
# Run
docker-compose up --build

# Stop
docker-compose down
```

Check swagger for detailed breakdown of the API endpoints:

http://localhost:3000/api/docs/#/


### Service Structure and Endpoints
 
Certificates service consists of main controller (Certificates), here's a detailed breakdown of the API endpoints:

1. **Certificates Controller Endpoints:**<br />
**- Submit a certificate** <br />
**- Get a certificate by ID** <br />
**- Get all certificates** <br />

#### Ping 

```sh
# check service connection
GET: http://localhost:8080/ping
```

#### Users 

```sh
# Submit a certificate
POST: http://localhost:8080/v1/certificates

# Get a certificate by ID
GET: http://localhost:8080/v1/certificates/1

# Get all certificates
GET: http://localhost:8080/v1/certificates
```