<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\DB;



/**
 * POST /api/register
 * 
 * Create a new user account.
 * Expects: username, email, password, password_confirmation
 * Returns: success message + user data
 */
Route::post('/register', function (Request $request) {
        
    try {
        
    // Validate the incoming request
    $validated = $request->validate([
        'username' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    // Create the user with hashed password
    $user = User::create([
        'username' => $validated['username'],
        'email' => $validated['email'],
        'password_hash' => Hash::make($validated['password']),
        'role_id' => 3, // Default to Visitor role
    ]);
            


    // Return success response
    return response()->json([
        'message' => 'User registered successfully',
        'user' => [
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
        ],
    ], 201);

} catch (\Exception $e) {
        return response()->json([
            'message' => 'Registration failed',
            'error' => $e->getMessage(),
        ], 400);
    }
});

/**
 * POST /api/login
 * 
 * Authenticate a user and return a Sanctum token.
 * Expects: username, password
 * Returns: Bearer token + user data
 */
Route::post('/login', function (Request $request) {
 
    // Validate credentials
    $validated = $request->validate([
        'username' => 'required|string',
        'password' => 'required',
        'requiredRole' => 'nullable|string'
    ]);

    // Find the user by username
    $user = User::where('username', $validated['username'])->first();

    // Check if user exists and password matches
    if (!$user || !Hash::check($validated['password'], $user->password_hash)) {
        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }
    // Check for required role if provided
    if ($request->has('requiredRole')) {
        if ($user->role->role_name !== $request->requiredRole) {
            return response()->json([
                'message' => 'Unauthorized: You do not have the required permissions.'
            ], 403); // 403 Forbidden is the correct code here
        }
    }
    // Create a new Sanctum token for this user
    // The token name 'auth_token' is just a label for reference
    $token = $user->createToken('auth_token')->plainTextToken;

    // Return the token and user data
    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
        ],
    ]);
});


// ============================================
// FORESTMASTER API ROUTES
// ============================================

use App\Models\Role;
use App\Models\Location;
use App\Models\LocationType;
use App\Models\Observation;

/**
 * GET /api/roles
 * Get all roles
 */
Route::get('/roles', function () {
    return response()->json(Role::all());
});

/**
 * GET /api/location-types
 * Get all location types
 */
Route::get('/location-types', function () {
    return response()->json(LocationType::all());
});

/**
 * GET /api/locations
 * Get all locations with their types
 */
Route::get('/locations', function () {
    return response()->json(
        Location::with('locationType')->get()
    );
});

/**
 * GET /api/locations/{id}
 * Get a specific location
 */
Route::get('/locations/{id}', function ($id) {
    $location = Location::with('locationType')->find($id);
    
    if (!$location) {
        return response()->json(['message' => 'Location not found'], 404);
    }
    
    return response()->json($location);
});

/**
 * POST /api/locations
 * Create a new location
 * Expects: name, location_type_id
 */
Route::post('/locations', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'location_type_id' => 'required|exists:location_types,id',
    ]);

    $location = Location::create($validated);
    
    return response()->json($location, 201);
})->middleware('auth:sanctum');

/**
 * GET /api/observations
 * Get all observations with user data
 */
Route::get('/observations', function () {
    $observations = DB::select('
        SELECT 
            o.id,
            o.user_id,
            ST_X(o.coordinates) as longitude,
            ST_Y(o.coordinates) as latitude,
            o.observation_text,
            o.photo_url,
            o.status,
            o.location_id,
            o.created_at,
            u.username,
            u.email,
            l.name as location_name,
            lt.type_name as location_type
        FROM observations o
        JOIN users u ON o.user_id = u.id
        LEFT JOIN locations l ON o.location_id = l.id
        LEFT JOIN location_types lt ON l.location_type_id = lt.id
        ORDER BY o.created_at DESC
    ');
    
    return response()->json($observations);
});

/**
 * GET /api/observations/{id}
 * Get a specific observation
 */
Route::get('/observations/{id}', function ($id) {
    $observation = DB::selectOne('
        SELECT 
            o.id,
            o.user_id,
            ST_X(o.coordinates) as longitude,
            ST_Y(o.coordinates) as latitude,
            o.observation_text,
            o.photo_url,
            o.status,
            o.location_id,
            o.created_at,
            u.username,
            u.email,
            l.name as location_name,
            lt.type_name as location_type
        FROM observations o
        JOIN users u ON o.user_id = u.id
        LEFT JOIN locations l ON o.location_id = l.id
        LEFT JOIN location_types lt ON l.location_type_id = lt.id
        WHERE o.id = ?
    ', [$id]);
    
    if (!$observation) {
        return response()->json(['message' => 'Observation not found'], 404);
    }
    
    return response()->json($observation);
});

/**
 * POST /api/observations
 * Create a new observation
 * Expects: latitude, longitude, observation_text, photo_url (optional)
 */
Route::post('/observations', function (Request $request) {
    $validated = $request->validate([
        'latitude' => 'required|numeric|between:-90,90',
        'longitude' => 'required|numeric|between:-180,180',
        'observation_text' => 'nullable|string',
        'photo_url' => 'nullable|url|max:512',
        'location_id' => 'nullable|exists:locations,id',
    ]);

    $user = $request->user();
    
    DB::insert('
        INSERT INTO observations (user_id, coordinates, observation_text, photo_url, status, location_id, created_at)
        VALUES (?, ST_GeomFromText(?, 4326), ?, ?, ?, ?, NOW())
    ', [
        $user->id,
        "POINT({$validated['longitude']} {$validated['latitude']})",
        $validated['observation_text'] ?? null,
        $validated['photo_url'] ?? null,
        'pending',
        $validated['location_id'] ?? null,
    ]);
    
    $id = DB::getPdo()->lastInsertId();
    
    return response()->json([
        'message' => 'Observation created successfully',
        'id' => $id,
    ], 201);
})->middleware('auth:sanctum');

/**
 * PUT /api/observations/{id}
 * Update an observation (status, text, photo)
 */
Route::put('/observations/{id}', function (Request $request, $id) {
    $validated = $request->validate([
        'observation_text' => 'nullable|string',
        'photo_url' => 'nullable|url|max:512',
        'status' => 'nullable|in:pending,verified,flagged',
    ]);

    $updates = [];
    $params = [];
    
    if (isset($validated['observation_text'])) {
        $updates[] = 'observation_text = ?';
        $params[] = $validated['observation_text'];
    }
    
    if (isset($validated['photo_url'])) {
        $updates[] = 'photo_url = ?';
        $params[] = $validated['photo_url'];
    }
    
    if (isset($validated['status'])) {
        $updates[] = 'status = ?';
        $params[] = $validated['status'];
    }
    
    if (empty($updates)) {
        return response()->json(['message' => 'No fields to update'], 400);
    }
    
    $params[] = $id;
    
    DB::update('UPDATE observations SET ' . implode(', ', $updates) . ' WHERE id = ?', $params);
    
    return response()->json(['message' => 'Observation updated successfully']);
})->middleware('auth:sanctum');

/**
 * GET /api/users/{id}
 * Get user details with role
 */
Route::get('/users/{id}', function ($id) {
    $user = User::with('role')->find($id);
    
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    
    return response()->json([
        'id' => $user->id,
        'username' => $user->username,
        'email' => $user->email,
        'role' => $user->role,
        'created_at' => $user->created_at,
    ]);
});

/**
 * GET /api/users/{id}/observations
 * Get all observations by a specific user
 */
Route::get('/users/{id}/observations', function ($id) {
    $observations = DB::select('
        SELECT 
            o.id,
            ST_X(o.coordinates) as longitude,
            ST_Y(o.coordinates) as latitude,
            o.observation_text,
            o.photo_url,
            o.status,
            o.created_at
        FROM observations o
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC
    ', [$id]);
    
    return response()->json($observations);
});

/**
 * POST /api/locations/{id}/subscribe
 * Subscribe the authenticated user to a location
 */
Route::post('/locations/{id}/subscribe', function (Request $request, $id) {
    $user = $request->user();
    
    // Check if user is a Ranger
    if ($user->role->role_name !== 'Ranger') {
        return response()->json(['message' => 'Only Rangers can subscribe to locations'], 403);
    }
    $location = Location::find($id);
    
    if (!$location) {
        return response()->json(['message' => 'Location not found'], 404);
    }
    
    // Check if already subscribed
    if ($user->subscribedLocations()->where('location_id', $id)->exists()) {
        return response()->json(['message' => 'Already subscribed to this location'], 400);
    }
    
    $user->subscribedLocations()->attach($id);
    
    return response()->json(['message' => 'Successfully subscribed to location'], 201);
})->middleware('auth:sanctum');

/**
 * DELETE /api/locations/{id}/unsubscribe
 * Unsubscribe the authenticated user from a location
 */
Route::delete('/locations/{id}/unsubscribe', function (Request $request, $id) {
    $user = $request->user();
        // Check if user is a Ranger
    if ($user->role->role_name !== 'Ranger') {
        return response()->json(['message' => 'Only Rangers can unsubscribe from locations'], 403);
    }
    
    if (!$user->subscribedLocations()->where('location_id', $id)->exists()) {
        return response()->json(['message' => 'Not subscribed to this location'], 400);
    }
    
    $user->subscribedLocations()->detach($id);
    
    return response()->json(['message' => 'Successfully unsubscribed from location']);
})->middleware('auth:sanctum');

/**
 * GET /api/users/{id}/subscriptions
 * Get all locations a user is subscribed to
 */
Route::get('/users/{id}/subscriptions', function ($id) {
    $user = User::with(['subscribedLocations.locationType'])->find($id);
    
    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }
    
    return response()->json($user->subscribedLocations);
})->middleware('auth:sanctum');

/**
 * GET /api/locations/{id}/subscribers
 * Get all users subscribed to a location
 */
Route::get('/locations/{id}/subscribers', function ($id) {
    $location = Location::with('subscribers.role')->find($id);
    
    if (!$location) {
        return response()->json(['message' => 'Location not found'], 404);
    }
    
    return response()->json($location->subscribers);
})->middleware('auth:sanctum');

//     return response()->json($observations);
// })->middleware('auth:sanctum');

