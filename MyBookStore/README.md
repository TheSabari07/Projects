# Book Store MERN Project

This is a full-stack Book Store application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The project allows users to browse, add, update, and delete books while maintaining a structured backend database.



## Technologies Used

- **Frontend:** React, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Database:** MongoDB Atlas (or local MongoDB instance)
- **Authentication:** JSON Web Token (JWT)

## Installation

1. Clone the repository:
    
    ```
    sh
    CopyEdit
    git clone https://github.com/yourusername/book-store-mern.git
    cd book-store-mern
    
    ```
    
2. Install dependencies for both frontend and backend:
    
    ```
    sh
    CopyEdit
    cd backend
    npm install
    cd ../frontend
    npm install
    
    ```
    
3. Set up environment variables for the backend (`.env` file):
    
    ```
    env
    CopyEdit
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    
    ```
    
4. Start the development server:
    - Backend:
        
        ```
        sh
        CopyEdit
        cd backend
        npm run dev
        
        ```
        
    - Frontend:
        
        ```
        sh
        CopyEdit
        cd frontend
        npm run dev
        
        ```
        

## Contributing

Contributions are welcome. Feel free to submit pull requests for improvements or new features.

## License

This project is open-source
