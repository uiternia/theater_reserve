<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Image;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'information',
        'max_people',
        'image_id',
        'start_date',
        'end_date',
        'is_visible'
    ];

    public function image()
    {
        return $this->belongsTo(Image::class);
    }

    public function scopeEventAll($query)
    {
        $today = Carbon::today();

        return $query = DB::table('events')->whereDate('start_date', '>=', $today)
            ->orderBy('start_date', 'asc')
            ->leftjoin('images', 'events.image_id', '=', 'images.id')->select('events.*', 'images.image');
    }

    public function scopeEventImage($query, $id)
    {
        return $query = DB::table('events')
            ->where('events.id', $id)
            ->leftjoin('images', 'events.image_id', '=', 'images.id')
            ->select('events.*', 'images.image');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'reserves')
            ->withPivot('id', 'number_of_people', 'canceled_date', 'visit', 'price');
    }
}
