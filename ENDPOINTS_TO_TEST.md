# API Endpoints to Test

Base URL: `http://localhost:7777/api/user`

## 1. List all users

- Method: `GET`
- Endpoint: `/users`
- Request body: none

### Expected success response

- `200 OK`
- JSON payload contains `message` and `users`

### Test cases

- No users in storage -> should return `200` and `users: []`
- One or more users present -> should return `200` and an array of user objects

---

## 2. Retrieve a user by ID

- Method: `GET`
- Endpoint: `/users/:id`
- Request body: none

### Expected success response

- `200 OK`
- JSON payload: `{ message: 'User retrieved successfully', user }`

### Test cases

- Valid existing `id` -> return user object
- Invalid or missing `id` -> return `404` with `message: 'User not found'`

---

## 3. Create a new user

- Method: `POST`
- Endpoint: `/users`
- Request body:
    ```json
    {
        "name": "Jane Doe",
        "email": "jane.doe@example.com"
    }
    ```

### Expected success response

- `201 Created`
- JSON payload: `{ message: 'User created successfully', user }`

### Failure cases to test

- Missing `name` -> `400 Bad Request` with `message: 'Name and email are required'`
- Missing `email` -> `400 Bad Request`
- Duplicate `email` -> `409 Conflict` with `message: 'User with this email already exists'`

---

## 4. Update an existing user

- Method: `PUT`
- Endpoint: `/users/:id`
- Request body examples:
    - Update name only:
        ```json
        {
            "name": "Jane Smith"
        }
        ```
    - Update email only:
        ```json
        {
            "email": "jane.smith@example.com"
        }
        ```
    - Update both:
        ```json
        {
            "name": "Jane Smith",
            "email": "jane.smith@example.com"
        }
        ```

### Expected success response

- `200 OK`
- JSON payload: `{ message: 'User updated successfully' }`

### Failure cases to test

- Nonexistent `id` -> `404 Not Found` with `message: 'User not found'`
- Empty body -> should still return `200` if user exists, but no fields changed

---

## 5. Delete a user

- Method: `DELETE`
- Endpoint: `/users/:id`
- Request body: none

### Expected success response

- `200 OK`
- JSON payload: `{ message: 'User deleted successfully' }`

### Failure cases to test

- Invalid or nonexistent `id` -> `404 Not Found` with `message: 'User not found'`

---

## Notes

- All request bodies are expected as JSON.
- The server uses `express.json()` and routes are mounted under `/api/user`.
- Use unique emails when creating users to avoid duplicate conflicts during tests.
