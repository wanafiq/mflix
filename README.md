# MFlix - Movie Database GraphQL API

MFlix is a GraphQL API for a movie database that allows users to query and manage movie data, user information, and comments.

## Features

- GraphQL API for efficient data querying
- User management (create, read, update, delete)
- Comment functionality for movies
- Movie database access
- MongoDB integration
- GraphQL playground for API exploration

## Technologies Used

- Node.js
- Express
- GraphQL (graphql-yoga)
- MongoDB
- Ruru (GraphQL playground)
- dotenv (for environment variables)

## Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Copy the `env.example` file to create a `.env` file:
     ```
     cp env.example .env
     ```
   - Edit the .env file and add your MongoDB connection string:
     ```
     DATABASE_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
     ```
   - The project is configured to use MongoDB Atlas with the `sample_mflix` sample database. You can create a new account at `https://www.mongodb.com/cloud/atlas/register`. Create a new cluster with a sample dataset.

## Usage

1. Start the server:
   ```
   node --watch server.js
   ```

2. Access the GraphQL playground:
   - Open your browser and navigate to `http://localhost:8080`
   - This will open the Ruru GraphQL playground where you can explore and test the API

## Project Structure

- `server.js` - Main application entry point
- `src/graphql/` - GraphQL schema definitions and resolvers
- `src/mongo/` - MongoDB connection and setup
- `src/graphql/models/` - Data models
