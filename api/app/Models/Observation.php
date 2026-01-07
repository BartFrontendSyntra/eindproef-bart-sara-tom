<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Observation extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'coordinates',
        'observation_text',
        'photo_url',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Helper methods for working with coordinates
    public function setCoordinatesAttribute($value)
    {
        if (is_array($value) && isset($value['lat'], $value['lng'])) {
            $this->attributes['coordinates'] = \DB::raw("ST_GeomFromText('POINT({$value['lng']} {$value['lat']})', 4326)");
        } else {
            $this->attributes['coordinates'] = $value;
        }
    }

    public function getCoordinatesAttribute($value)
    {
        if ($value) {
            $coords = \DB::selectOne("SELECT ST_X(coordinates) as lng, ST_Y(coordinates) as lat FROM observations WHERE id = ?", [$this->id]);
            return $coords ? ['lat' => $coords->lat, 'lng' => $coords->lng] : null;
        }
        return null;
    }
}
