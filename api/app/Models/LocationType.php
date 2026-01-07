<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocationType extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'type_name',
    ];

    public function locations()
    {
        return $this->hasMany(Location::class);
    }
}
