<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ObjectType extends Model
{
    use HasFactory;
    protected $table = 'object_types';
    protected $fillable = [
        'name',
        'image'
    ];

    public function objects()
    {
        return $this->hasMany(TrackingObject::class, 'object_type', 'id');
    }
}
