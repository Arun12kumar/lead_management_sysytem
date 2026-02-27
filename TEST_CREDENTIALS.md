# Test Credentials & API Examples

## 📋 Test Accounts

Use these credentials to test the login endpoint. **Note:** First register these users or use the register endpoint to create test accounts.

### Admin Account
```json
{
  "email": "admin@scholigence.com",
  "password": "admin123456"
}
```

### Agent Account
```json
{
  "email": "agent@scholigence.com",
  "password": "agent123456"
}
```

### Manager Account
```json
{
  "email": "manager@scholigence.com",
  "password": "manager123456"
}
```

---

## 🔐 Register a New User First

If test accounts don't exist, create them:

**cURL:**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@scholigence.com",
    "password": "admin123456",
    "role": "Admin"
  }'
```

**JavaScript (Fetch):**
```javascript
fetch('http://localhost:4000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Admin User",
    email: "admin@scholigence.com",
    password: "admin123456",
    role: "Admin"
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 🚀 Login & Get JWT Token

### cURL
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@scholigence.com",
    "password": "admin123456"
  }'
```

### JavaScript (Fetch)
```javascript
fetch('http://localhost:4000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: "admin@scholigence.com",
    password: "admin123456"
  })
})
.then(res => res.json())
.then(data => {
  console.log('Login Response:', data);
  if (data.success && data.token) {
    // Save token for authenticated requests
    localStorage.setItem('authToken', data.token);
    console.log('Token saved:', data.token);
  }
});
```

### Python (Requests)
```python
import requests
import json

url = 'http://localhost:4000/api/auth/login'
data = {
    "email": "admin@scholigence.com",
    "password": "admin123456"
}

response = requests.post(url, json=data)
print(json.dumps(response.json(), indent=2))

if response.json().get('success'):
    token = response.json()['token']
    print(f"Token: {token}")
```

### Postman
1. Set method to `POST`
2. URL: `http://localhost:4000/api/auth/login`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "email": "admin@scholigence.com",
  "password": "admin123456"
}
```

---

## ✅ Expected Response (Success)

```json
{
  "success": true,
  "message": "Login successfull",
  "data": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@scholigence.com",
    "role": "Admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBzY2hvbGlnZW5jZS5jb20iLCJuYW1lIjoiQWRtaW4gVXNlciIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcwODkwODAwMCwiZXhwIjoxNzA5NTEyODAwfQ.xxx"
}
```

---

## ❌ Error Responses

### Missing Email or Password
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### User Not Found
```json
{
  "success": false,
  "message": "User is notFound"
}
```

### Invalid Password
```json
{
  "success": false,
  "message": "Invalid password"
}
```

---

## 🔒 Using JWT Token in Authenticated Requests

After login, include the token in the `Authorization` header:

### cURL
```bash
curl -X GET http://localhost:4000/api/protected-route \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### JavaScript (Fetch)
```javascript
const token = localStorage.getItem('authToken');

fetch('http://localhost:4000/api/protected-route', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### Postman
1. Go to the **Authorization** tab
2. Select **Bearer Token** from dropdown
3. Paste your token in the token field
4. Send the request

---

## 📚 Swagger UI

Visit the interactive API documentation at:
```
http://localhost:4000/api/docs
```

You can test all endpoints directly from the Swagger UI. Use the test credentials above.

---

## 🛠️ Environment Variables

Ensure `.env` includes JWT configuration:
```
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```
