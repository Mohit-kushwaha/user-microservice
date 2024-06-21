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
 ```

##  Docker Setup
Docker Compose Configuration.
The docker-compose.yml file defines three services:

next-container: Runs the Next.js frontend.<br />
express-container: Runs the Express.js backend.<br />
mongo: Runs the MongoDB database.<br />
Environment Variables<br />
WATCHPACK_POLLING=true: Ensures hot-reloading works in some environments for the frontend.<br />
MONGO_URI=mongodb://root:secret@mongo:27017/users?authSource=admin: Connection string for the backend to connect to the MongoDB database.<br />
MONGO_INITDB_ROOT_USERNAME=root: MongoDB root username.<br />
MONGO_INITDB_ROOT_PASSWORD=secret: MongoDB root password.<br />
MONGO_INITDB_ROOT_DATABASE=users: Initial database to create in MongoDB.<br />
## Running the Application
To run the application, follow these steps:

Clone the repository:<br />

bash<br />
Copy code<br />
git clone https://github.com/Mohit-kushwaha/user-microservice.git<br />
cd user-microservice<br />
Navigate to the project directory:<br />

bash<br />
Copy code<br />
cd user-microservice<br />
Start the application:<br />

bash<br />
Copy code<br />
docker-compose up --build<br />
Access the services:<br />

Frontend (Next.js): http://localhost:3000<br />
Backend (Express.js): http://localhost:5000<br />
MongoDB: http://localhost:27017<br />
Additional Docker Commands<br />
Stop the application:
<br />
bash<br />
Copy code<br />
docker-compose down<br />
Rebuild the containers:<br />

bash<br />
Copy code<br />
docker-compose up --build<br />
View logs:<br />

bash<br />
Copy code<br />
docker-compose logs -f<br />
Volumes<br />
The following volumes are used to persist data:<br />

mongoData: Persists MongoDB data.<br />
Networks<br />
mern-stack-network: A Docker network to facilitate communication between the containers.<br />
## File Mounts
./frontend:/app: Mounts the frontend source code to the container for live reloading.<br />
./backend:/app: Mounts the backend source code to the container for live reloading.<br />
/app/node_modules: Excludes the node_modules folder from being overwritten by the mounted volume.<br />