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
        'password' => Hash::make($validated['password']),
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
    ]);

    // Find the user by username
    $user = User::where('username', $validated['username'])->first();

    // Check if user exists and password matches
    if (!$user || !Hash::check($validated['password'], $user->password)) {
        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
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
        ],
    ]);
});


// TODO: implement this later
// Route::get('/observations', function () {
//     $observations = DB::select('select * from observations');
//     return response()->json($observations);
// })->middleware('auth:sanctum');

