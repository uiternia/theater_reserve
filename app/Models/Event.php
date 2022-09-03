<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'information',
        'max_people',
        'price',
        'image',
        'start_date',
        'end_date',
        'is_visible'
    ];
}
