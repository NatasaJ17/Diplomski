<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ObjectType;

class TrackingObject extends Model
{
    use HasFactory;
    protected $table = 'objects';
    protected $fillable = [
        'objectId',
        'name',
        'object_type',
        'description',
        'userId'
    ];
    
    public function objectType()
    {
        return $this->belongsTo(ObjectType::class, 'object_type', 'id');
    } 

    public function locations()
    {
         return $this->hasMany(LocationInfo::class, 'objectId', 'id'); 
    }
}
