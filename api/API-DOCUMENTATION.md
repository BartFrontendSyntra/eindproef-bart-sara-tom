# ForestMaster API Documentation

## Database Setup Complete ✅

The Laravel application is now fully integrated with the ForestMaster database schema.

### What's Been Implemented

1. **Database Configuration**
   - MySQL connection configured in `.env`
   - Database: `forestmaster_dev_db`

2. **Models Created**
   - `Role` - User access levels (Admin, Ranger, Visitor)
   - `LocationType` - Area categories
   - `Location` - Geographical areas
   - `User` - User accounts with role relationships
   - `Observation` - Wildlife/forest observations with GPS coordinates

3. **Migrations Created**
   - All tables match the `forestmaster-init-db.sql` schema
   - Proper foreign key relationships
   - Spatial POINT data type for coordinates (SRID 4326)

4. **Seed Data Loaded**
   - 3 roles (Admin, Ranger, Visitor)
   - 6 Belgian users (password: `password123` for all)
   - 6 location types
   - 15 Belgian forests and parks
   - 20 sample observations with Belgian coordinates

---

## API Endpoints

### Base URL
```
http://localhost:8000/api
```

---

## Authentication

### Register New User
**POST** `/api/register`

**Request Body:**
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 7,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

---

### Login
**POST** `/api/login`

**Request Body:**
```json
{
  "username": "sophiedevries",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "1|abc123...",
  "user": {
    "id": 2,
    "username": "sophiedevries",
    "email": "sophie.devries@forestmaster.be"
  }
}
```

**Note:** Use the returned token in the `Authorization` header for protected routes:
```
Authorization: Bearer 1|abc123...
```

---

## Public Endpoints (No Authentication Required)

### Get All Roles
**GET** `/api/roles`

**Response:**
```json
[
  { "id": 1, "role_name": "Admin" },
  { "id": 2, "role_name": "Ranger" },
  { "id": 3, "role_name": "Visitor" }
]
```

---

### Get All Location Types
**GET** `/api/location-types`

**Response:**
```json
[
  { "id": 1, "type_name": "Nationaal Park" },
  { "id": 2, "type_name": "Natuurreservaat" },
  ...
]
```

---

### Get All Locations
**GET** `/api/locations`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Nationaal Park Hoge Kempen",
    "location_type_id": 1,
    "location_type": {
      "id": 1,
      "type_name": "Nationaal Park"
    }
  },
  ...
]
```

---

### Get Single Location
**GET** `/api/locations/{id}`

**Example:** `GET /api/locations/1`

**Response:**
```json
{
  "id": 1,
  "name": "Nationaal Park Hoge Kempen",
  "location_type_id": 1,
  "location_type": {
    "id": 1,
    "type_name": "Nationaal Park"
  }
}
```

---

### Get All Observations
**GET** `/api/observations`

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 2,
    "longitude": 5.7833,
    "latitude": 50.9667,
    "observation_text": "Gezonde populatie van wilde zwijnen waargenomen...",
    "photo_url": "https://example.com/photos/wilde-zwijnen-1.jpg",
    "status": "verified",
    "created_at": "2025-12-15 09:30:00",
    "username": "sophiedevries",
    "email": "sophie.devries@forestmaster.be"
  },
  ...
]
```

---

### Get Single Observation
**GET** `/api/observations/{id}`

**Example:** `GET /api/observations/1`

---

### Get User Details
**GET** `/api/users/{id}`

**Example:** `GET /api/users/2`

**Response:**
```json
{
  "id": 2,
  "username": "sophiedevries",
  "email": "sophie.devries@forestmaster.be",
  "role": {
    "id": 2,
    "role_name": "Ranger"
  },
  "created_at": "2026-01-07T08:30:00.000000Z"
}
```

---

### Get User's Observations
**GET** `/api/users/{id}/observations`

**Example:** `GET /api/users/2/observations`

**Response:**
```json
[
  {
    "id": 1,
    "longitude": 5.7833,
    "latitude": 50.9667,
    "observation_text": "Gezonde populatie van wilde zwijnen...",
    "photo_url": "https://example.com/photos/wilde-zwijnen-1.jpg",
    "status": "verified",
    "created_at": "2025-12-15 09:30:00"
  },
  ...
]
```

---

## Protected Endpoints (Authentication Required)

### Create Location
**POST** `/api/locations`

**Headers:**
```
Authorization: Bearer {your-token}
```

**Request Body:**
```json
{
  "name": "Nieuwe Bos",
  "location_type_id": 3
}
```

**Response:**
```json
{
  "id": 16,
  "name": "Nieuwe Bos",
  "location_type_id": 3
}
```

---

### Create Observation
**POST** `/api/observations`

**Headers:**
```
Authorization: Bearer {your-token}
```

**Request Body:**
```json
{
  "latitude": 50.8503,
  "longitude": 4.3517,
  "observation_text": "Ree gezien bij de vijver",
  "photo_url": "https://example.com/photo.jpg"
}
```

**Response:**
```json
{
  "message": "Observation created successfully",
  "id": 21
}
```

**Notes:**
- `latitude`: Must be between -90 and 90
- `longitude`: Must be between -180 and 180
- `photo_url`: Optional, must be a valid URL
- `status`: Automatically set to 'pending'

---

### Update Observation
**PUT** `/api/observations/{id}`

**Headers:**
```
Authorization: Bearer {your-token}
```

**Request Body:** (all fields optional)
```json
{
  "observation_text": "Updated description",
  "photo_url": "https://example.com/new-photo.jpg",
  "status": "verified"
}
```

**Response:**
```json
{
  "message": "Observation updated successfully"
}
```

**Valid status values:** `pending`, `verified`, `flagged`

---

## Testing the API

### Using PowerShell

#### 1. Get All Observations
```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/observations" -Method GET | ConvertTo-Json
```

#### 2. Login
```powershell
$loginData = @{
    username = "sophiedevries"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:8000/api/login" -Method POST -Body $loginData -ContentType "application/json"
$token = $response.token
```

#### 3. Create Observation (Authenticated)
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$observationData = @{
    latitude = 50.8503
    longitude = 4.3517
    observation_text = "Test observation from PowerShell"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/observations" -Method POST -Headers $headers -Body $observationData
```

---

### Using curl (Git Bash / WSL)

#### 1. Get All Locations
```bash
curl http://localhost:8000/api/locations
```

#### 2. Login
```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"sophiedevries","password":"password123"}'
```

#### 3. Create Observation (replace TOKEN with actual token)
```bash
curl -X POST http://localhost:8000/api/observations \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 50.8503,
    "longitude": 4.3517,
    "observation_text": "New observation",
    "photo_url": "https://example.com/photo.jpg"
  }'
```

---

## Database Access

### Direct Database Queries

You can also use Laravel's Tinker for direct database access:

```bash
php artisan tinker
```

Then run queries:

```php
// Get all users
User::all();

// Find user by username
User::where('username', 'sophiedevries')->first();

// Get observations with user relationships
User::find(2)->observations;

// Count observations by status
DB::table('observations')->where('status', 'verified')->count();

// Get observations within a bounding box (spatial query)
DB::select("
    SELECT id, observation_text, 
           ST_X(coordinates) as lng, 
           ST_Y(coordinates) as lat
    FROM observations
    WHERE ST_Contains(
        ST_GeomFromText('POLYGON((4 50, 6 50, 6 52, 4 52, 4 50))', 4326),
        coordinates
    )
");
```

---

## Running the Server

```bash
cd c:\dev\syntra\groepswerken\eindproef-bart-sara-tom\api
php artisan serve
```

Server will run at: `http://127.0.0.1:8000`

---

## Comments

### Get Comments for an Observation
**GET** `/api/observations/{observation_id}/comments`

Returns comments for a specific observation.
- **Visitors**: Only public comments
- **Rangers**: All comments (public and private)
- **Admins**: All comments (public and private)

**No authentication required** (but permissions differ based on role)

**Response:**
```json
[
  {
    "id": 1,
    "observation_id": 5,
    "user_id": 2,
    "body": "This is a verified sighting of the species.",
    "is_public": true,
    "created_at": "2026-01-16T10:30:00.000000Z",
    "user": {
      "id": 2,
      "username": "sophiedevries"
    }
  }
]
```

### Create Comment
**POST** `/api/observations/{observation_id}/comments`

**Requires**: Authentication (All authenticated users)
- **Visitors**: Can only create public comments (`is_public` must be `true`)
- **Rangers & Admins**: Can create both public and private comments

**Request Body:**
```json
{
  "body": "This is a comment on the observation",
  "is_public": true
}
```

**Response:**
```json
{
  "id": 1,
  "observation_id": 5,
  "user_id": 2,
  "body": "This is a comment on the observation",
  "is_public": true,
  "created_at": "2026-01-16T10:30:00.000000Z",
  "user": {
    "id": 2,
    "username": "sophiedevries"
  }
}
```

### Update Comment
**PUT** `/api/comments/{id}`

**Requires**: Authentication (Admins only)

**Request Body:**
```json
{
  "body": "Updated comment text",
  "is_public": false
}
```

Both fields are optional.

**Response:**
```json
{
  "id": 1,
  "observation_id": 5,
  "user_id": 2,
  "body": "Updated comment text",
  "is_public": false,
  "created_at": "2026-01-16T10:30:00.000000Z",
  "user": {
    "id": 2,
    "username": "sophiedevries"
  }
}
```

### Delete Comment
**DELETE** `/api/comments/{id}`

**Requires**: Authentication (Admins only)

**Response:**
```json
{
  "message": "Comment deleted successfully"
}
```

---

| pieterjacobs | pieter.jacobs@gmail.com | Ranger |
| marieclaessens | marie.claessens@outlook.com | Visitor |
| lucwouters | luc.wouters@gmail.com | Visitor |
| emmapeeters | emma.peeters@hotmail.com | Visitor |

---

## Next Steps

To continue development:

1. **Add Controllers**: Move route logic to dedicated controllers
2. **Add Validation**: Create Form Request classes for validation
3. **Add Authorization**: Implement policies for role-based access
4. **Add Pagination**: Implement pagination for list endpoints
5. **Add Filtering**: Add query parameters for filtering observations
6. **Add File Upload**: Implement actual photo upload functionality
7. **Add Tests**: Write feature tests for all endpoints
