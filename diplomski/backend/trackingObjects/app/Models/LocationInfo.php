<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocationInfo extends Model
{
    use HasFactory;
    protected $table = 'location_info';
    protected $fillable = [
        'lat',
        'long',
        'objectId',
        'date_and_time'
    ];
    public function objectLocation()
    {
        return $this->belongsTo(TrackingObject::class);
    }
}