# MERN Stack Application with Docker

This project is a MERN (MongoDB, Express.js, React, Node.js) stack application containerized using Docker. The application consists of a Next.js frontend, an Express.js backend, and a MongoDB database.

## Prerequisites

Make sure you have the following installed on your local machine:
- Docker
- Docker Compose

## Project Structure

```plaintext
.
├── backend
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   └── .dockerignore
│   └── ... rest of files
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── next.config.js
│   ├── src/
│   └── .dockerignore
│   └── ... rest of files
├── docker-compose.yml
└── README.md

Docker Setup
Docker Compose Configuration
The docker-compose.yml file defines three services:

next-container: Runs the Next.js frontend.
express-container: Runs the Express.js backend.
mongo: Runs the MongoDB database.
Environment Variables
WATCHPACK_POLLING=true: Ensures hot-reloading works in some environments for the frontend.
MONGO_URI=mongodb://root:secret@mongo:27017/users?authSource=admin: Connection string for the backend to connect to the MongoDB database.
MONGO_INITDB_ROOT_USERNAME=root: MongoDB root username.
MONGO_INITDB_ROOT_PASSWORD=secret: MongoDB root password.
MONGO_INITDB_ROOT_DATABASE=users: Initial database to create in MongoDB.
Running the Application
To run the application, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/Mohit-kushwaha/user-microservice.git
cd user-microservice
Navigate to the project directory:

bash
Copy code
cd user-microservice
Start the application:

bash
Copy code
docker-compose up --build
Access the services:

Frontend (Next.js): http://localhost:3000
Backend (Express.js): http://localhost:5000
MongoDB: http://localhost:27017
Additional Docker Commands
Stop the application:

bash
Copy code
docker-compose down
Rebuild the containers:

bash
Copy code
docker-compose up --build
View logs:

bash
Copy code
docker-compose logs -f
Volumes
The following volumes are used to persist data:

mongoData: Persists MongoDB data.
Networks
mern-stack-network: A Docker network to facilitate communication between the containers.
File Mounts
./frontend:/app: Mounts the frontend source code to the container for live reloading.
./backend:/app: Mounts the backend source code to the container for live reloading.
/app/node_modules: Excludes the node_modules folder from being overwritten by the mounted volume.