<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Observation;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * GET /api/observations/{observation_id}/comments
     * Get comments for an observation
     * - Visitors: only public comments
     * - Rangers: all comments
     * - Admins: all comments
     */
    public function index(Request $request, $observationId)
    {
        $observation = Observation::find($observationId);
        
        if (!$observation) {
            return response()->json(['message' => 'Observation not found'], 404);
        }

        $user = $request->user();
        
        // Build query
        $query = Comment::where('observation_id', $observationId)
            ->with('user:id,username');

        // If user is not authenticated or is a Visitor, only show public comments
        if (!$user || $user->role->role_name === 'Visitor') {
            $query->where('is_public', true);
        }
        // Rangers and Admins see all comments (no additional filter needed)

        $comments = $query->orderBy('created_at', 'desc')->get();

        return response()->json($comments);
    }

    /**
     * POST /api/observations/{observation_id}/comments
     * Create a new comment
     * - Visitors: can create public comments only
     * - Rangers: can create public or private comments
     * - Admins: can create public or private comments
     */
    public function store(Request $request, $observationId)
    {
        $user = $request->user();
        $userRole = $user->role->role_name;

        $observation = Observation::find($observationId);
        
        if (!$observation) {
            return response()->json(['message' => 'Observation not found'], 404);
        }

        $validated = $request->validate([
            'body' => 'required|string',
            'is_public' => 'required|boolean',
        ]);

        // Visitors can only create public comments
        if ($userRole === 'Visitor' && !$validated['is_public']) {
            return response()->json([
                'message' => 'Unauthorized. Visitors can only create public comments.'
            ], 403);
        }

        $comment = Comment::create([
            'observation_id' => $observationId,
            'user_id' => $user->id,
            'body' => $validated['body'],
            'is_public' => $validated['is_public'],
        ]);

        // Load the user relationship for the response
        $comment->load('user:id,username');

        return response()->json($comment, 201);
    }

    /**
     * PUT /api/comments/{id}
     * Update a comment
     * - Admins: can update any comment
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();
        
        // Only Admins can update comments
        if ($user->role->role_name !== 'Admin') {
            return response()->json([
                'message' => 'Unauthorized. Only Admins can update comments.'
            ], 403);
        }

        $comment = Comment::find($id);
        
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $validated = $request->validate([
            'body' => 'sometimes|required|string',
            'is_public' => 'sometimes|required|boolean',
        ]);

        $comment->update($validated);
        $comment->load('user:id,username');

        return response()->json($comment);
    }

    /**
     * DELETE /api/comments/{id}
     * Delete a comment
     * - Admins: can delete any comment
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        
        // Only Admins can delete comments
        if ($user->role->role_name !== 'Admin') {
            return response()->json([
                'message' => 'Unauthorized. Only Admins can delete comments.'
            ], 403);
        }

        $comment = Comment::find($id);
        
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
