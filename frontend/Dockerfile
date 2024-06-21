# # frontend/Dockerfile
# FROM node:20.11.0
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "run", "dev"]


# ./nextjs/Dockerfile
FROM node:20.11.0

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose port
# EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
