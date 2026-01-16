<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'observation_id',
        'user_id',
        'body',
        'is_public',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'is_public' => 'boolean',
    ];

    /**
     * Get the observation that this comment belongs to.
     */
    public function observation()
    {
        return $this->belongsTo(Observation::class);
    }

    /**
     * Get the user (author) who created this comment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
