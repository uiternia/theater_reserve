<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventService
{
  public static function checkDuplication($date, $startTime, $endTime)
  {
    $check = DB::table('events')
      ->whereDate('start_date', $date)
      ->whereTime('end_date', '>', $startTime)
      ->whereTime('start_date', '<', $endTime)
      ->exists();
    return $check;
  }

  public static function countDuplication($ownEventId, $eventDate, $startTime, $endTime)
  {
    $event = DB::table('events')
      ->whereDate('start_date', $eventDate)
      ->whereTime('end_date', '>', $startTime)
      ->whereTime('start_date', '<', $endTime)
      ->get()
      ->toArray();

    // そもそも日付が重複していない
    if (empty($event)) {
      return false;
    }

    // 重複があったイベントのidを取得
    $eventId = $event[0]->id;

    // 重複していたイベントが自身の場合、重なっていないと判定
    if ($ownEventId === $eventId) {
      return false;
    } else {
      return true;
    }
  }

  public static function joinDateAndTime($date, $time)
  {
    $join = $date . " " . $time;
    $dateTime = Carbon::createFromFormat('Y-m-d H:i:s', $join);
    return $dateTime;
  }

  public static function getWeekEvents($startDate, $endDate)
  {
    $reservedPeople = DB::table('reserves')
      ->select('event_id', DB::raw('sum(number_of_people) as number_of_people'))
      ->whereNull('canceled_date')
      ->groupBy('event_id');

    return DB::table('events')
      ->leftJoinSub($reservedPeople, 'reservedPeople', function ($join) {
        $join->on('events.id', '=', 'reservedPeople.event_id');
      })
      ->whereBetween('start_date', [$startDate, $endDate])
      ->orderBy('start_date', 'asc')
      ->get();
    return view(
      'chef.events.index',
      compact('events')
    );
  }
}
