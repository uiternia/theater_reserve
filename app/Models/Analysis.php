<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Scopes\Subtotal;
use Carbon\Carbon;

class Analysis extends Model
{
  use HasFactory;

  protected static function booted()
  {
    static::addGlobalScope(new Subtotal);
  }

  public function scopeBetweenDate($query, $startDate = null, $endDate = null)
  {
    if (is_null($startDate) && is_null($endDate)) {
      return $query;
    }

    if (!is_null($startDate) && is_null($endDate)) {
      return $query->where('start_date', ">=", $startDate);
    }

    if (is_null($startDate) && !is_null($endDate)) {
      $endDate1 = Carbon::parse($endDate)->addDays(1);
      return $query->where('start_date', '<=', $endDate1);
    }

    if (!is_null($startDate) && !is_null($endDate)) {
      $endDate1 = Carbon::parse($endDate)->addDays(1);
      return $query->where('start_date', ">=", $startDate)
        ->where('start_date', '<=', $endDate1);
    }
  }
}
