<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Reserve extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
        'number_of_people',
        'price',
        'introduction'
    ];

    public function scopeReserveAll($query)
    {
        $today = Carbon::today();

        return $query = DB::table('reserves')->rightjoin('events', 'reserves.event_id', '=', 'events.id')
            ->rightjoin('users', 'reserves.user_id', '=', 'users.id')
            ->whereNull('reserves.canceled_date')
            ->whereDate('events.start_date', '>=', $today)->orderBy('events.start_date', 'asc')
            ->select('reserves.*', 'events.start_date', 'events.name as e_name', 'users.name', 'users.email', 'introduction');
    }

    public function scopeReserveSearch($query, $search)
    {
        $today = Carbon::today();

        return $query = DB::table('reserves')->rightjoin('events', 'reserves.event_id', '=', 'events.id')
            ->rightjoin('users', 'reserves.user_id', '=', 'users.id')
            ->whereNull('reserves.canceled_date')
            ->where('users.name', 'like', $search . '%')
            ->orWhere('users.email', 'like', $search . '%')
            ->whereDate('events.start_date', '>=', $today)->orderBy('events.start_date', 'asc')
            ->select('reserves.*', 'events.start_date', 'events.name as e_name', 'users.name', 'users.email', 'introduction');
    }

    public function scopeReserveShow($query, $id)
    {
        return $query = DB::table('reserves')->where('reserves.id', '=', $id)->rightjoin('events', 'reserves.event_id', '=', 'events.id')
            ->rightjoin('users', 'reserves.user_id', '=', 'users.id')
            ->select('reserves.*', 'events.start_date', 'events.name as e_name', 'users.name', 'users.email', 'introduction');
    }

    public function scopeReservedPeople($query, $id)
    {
        return $query = DB::table('reserves')
            ->select(DB::raw('sum(number_of_people) as number_of_people'))
            ->whereNull('canceled_date')
            ->groupBy('event_id')
            ->having('event_id', $id);
    }

    public function scopeTodayVisitPeople($query)
    {
        $today = Carbon::today();

        //selectはUser情報だけにします。
        return $query = DB::table('reserves')->rightjoin('events', 'reserves.event_id', '=', 'events.id')
            ->rightjoin('users', 'reserves.user_id', '=', 'users.id')
            ->whereNull('reserves.canceled_date')
            ->whereDate('events.start_date', '=', $today)->where('visit', '=', true)->orderBy('events.start_date', 'asc')
            ->select('reserves.*', 'events.start_date', 'events.name as e_name', 'users.name', 'users.email', 'introduction');
    }

    public function scopeTodayVisitedPeople($query)
    {
        $today = Carbon::today();

        //selectはUser情報だけにします。
        return $query = DB::table('reserves')->rightjoin('events', 'reserves.event_id', '=', 'events.id')
            ->rightjoin('users', 'reserves.user_id', '=', 'users.id')
            ->whereNull('reserves.canceled_date')
            ->whereDate('events.start_date', '=', $today)->where('visit', '=', false)->orderBy('events.start_date', 'asc')
            ->select('reserves.*', 'events.start_date', 'events.name as e_name', 'users.name', 'users.email', 'introduction');
    }
}
