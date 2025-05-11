API:-User
This is an Express-based API for managing users. It allows for user registration, login, password updates, account verification, and user management functionalities like editing, deleting, and retrieving user details. The API also includes authentication and authorization to secure endpoints.

API Endpoints
1. POST /register
Description: Registers a new user with the provided details.

Request Body:

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "number": "1234567890"
}
Response:

200 OK: User successfully registered.

400 Bad Request: Required fields are missing or user already exists.

2. POST /verify-user
Description: Verifies the user by email and verification code.

Request Body:

json

{
  "email": "john.doe@example.com",
  "code": "123456"
}
Response:

200 OK: User verified successfully.

400 Bad Request: Invalid or expired verification code.

3. POST /login
Description: Allows a user to log in with their credentials.

Request Body:

json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
Response:

200 OK: User logged in successfully and a token is returned.

400 Bad Request: Invalid credentials.

403 Forbidden: User is not verified.

4. GET /get-users
Description: Retrieves a list of all users (authentication required).

Response:

200 OK: Returns an array of users (excluding passwords).

401 Unauthorized: User is not authenticated.

5. GET /get-user/:id
Description: Retrieves a user by their ID (authentication required).

Request Params:

id: The user's ID.

Response:

200 OK: Returns the user data.

404 Not Found: User not found.

401 Unauthorized: User is not authenticated.

6. PUT /edit-user/:id
Description: Edits a user's details (authentication required).

Request Params:

id: The user ID to update.

Request Body:

json

{
  "name": "Updated Name",
  "email": "updated.email@example.com",
  "number": "9876543210"
}
Response:

200 OK: User successfully updated.

404 Not Found: User not found.

401 Unauthorized: User is not authenticated.

7. DELETE /delete-user/:id
Description: Deletes a user by their ID (authentication required).

Request Params:

id: The user's ID to delete.

Response:

200 OK: User successfully deleted.

404 Not Found: User not found.

401 Unauthorized: User is not authenticated.

8. POST /forgot-password
Description: Sends a password reset code to the user's email (authentication required).

Request Body:

json

{
  "email": "john.doe@example.com"
}
Response:

200 OK: A reset code is sent to the user's email.

404 Not Found: User not found.

9. POST /reset-password
Description: Resets the user's password using the code sent to their email (authentication required).

Request Body:

json

{
  "email": "john.doe@example.com",
  "code": "123456",
  "password": "newpassword123"
}
Response:

200 OK: Password successfully reset.

400 Bad Request: Invalid or expired reset code.

10. PUT /update-password
Description: Updates the user's password (authentication required).

Request Body:

json

{
  "oldPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
Response:

200 OK: Password successfully updated.

400 Bad Request: Old password is incorrect.

401 Unauthorized: User is not authenticated.

11. POST /logout
Description: Logs the user out and clears the authentication token.

Response:

200 OK: User logged out successfully.

401 Unauthorized: User is not logged in.

Middleware
authenticateUser: This middleware is used to authenticate the user for certain routes. It checks for a valid JWT token in the request cookies. If the token is missing or invalid, the request is rejected with a 401 Unauthorized error.

Folder Structure
The following folder structure is used in this project:

bash

/controllers
  - user.controller.js       # All logic for handling user-related requests
/middleware
  - authenticateUser.js      # Middleware for authenticating users
/routes
  - user.routes.js           # User routes definition
Setup Instructions
1. Clone the repository:
bash

git clone <repo_url>
cd <repo_name>
2. Install dependencies:
bash

npm install
3. Create a .env file for environment variables:
env
Copy
Edit
PORT=4000
JWT_SECRET=<your_jwt_secret>
4. Run the server:
bash
Copy
Edit
npm start
Your API will now be running on http://localhost:4000
