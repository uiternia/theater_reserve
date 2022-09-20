<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class AnalysisService
{
  public static function perDay($subQuery)
  {
    $query =  $subQuery->where('visit', true)
      ->groupBy('id')
      ->selectRaw('id,sum(subtotal) as totalPurchase, 
              DATE_FORMAT(start_date,"%Y%m%d") as date');

    $data =  DB::table($query)
      ->groupBy('date')
      ->selectRaw('date,sum(totalPurchase) as total')
      ->get();

    $labels = $data->pluck('date');
    $totals = $data->pluck('total');

    return [$data, $labels, $totals];
  }

  public static function perMonth($subQuery)
  {
    $query =  $subQuery->where('visit', true)
      ->groupBy('id')->selectRaw('id,sum(subtotal) as totalPurchase, 
              DATE_FORMAT(start_date,"%Y%m") as date');

    $data =  DB::table($query)
      ->groupBy('date')
      ->selectRaw('date,sum(totalPurchase) as total')
      ->get();

    $labels = $data->pluck('date');
    $totals = $data->pluck('total');
    return [$data, $labels, $totals];
  }

  public static function perYear($subQuery)
  {
    $query =  $subQuery->where('visit', true)
      ->groupBy('id')->selectRaw('id,sum(subtotal) as totalPurchase, 
              DATE_FORMAT(start_date,"%Y") as date');

    $data =  DB::table($query)
      ->groupBy('date')
      ->selectRaw('date,sum(totalPurchase) as total')
      ->get();

    $labels = $data->pluck('date');
    $totals = $data->pluck('total');
    return [$data, $labels, $totals];
  }
}
