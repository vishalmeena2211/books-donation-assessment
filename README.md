# Book Donation System

Welcome to the Book Donation System! This project is designed to facilitate the donation and distribution of books using a modern web application.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Book Donation System allows users to donate books and request books from others. The system is built with a React frontend and an Express backend, with MongoDB as the database.

## Features
- User authentication and authorization
- Book donation and request management
- Search functionality for books
- User profiles and book history

## Technologies Used
- **Frontend:** React
- **Backend:** Express
- **Database:** MongoDB

## Installation
### Prerequisites
- Node.js
- MongoDB

## Backend .env

```bash
    MONGO_URI="your mongo uri"
    JWT_SECRET="your_secret"
    ORIGIN="Your Client Origin"
```
## Frontend .env

```bash
    BASE_URL="Server URL
```


### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/vishalmeena2211/books-donation-assessment.git
    ```
2. Navigate to the project directory:
    ```bash
    cd books-donation-assessment
    ```
3. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```
4. Run the backend server:
    ```bash
    npm start
    ```
5. Run the frontend server:
    ```bash
    cd ../frontend
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Register or log in to your account.
3. Start donating or requesting books!

