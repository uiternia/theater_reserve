<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class Subtotal implements Scope
{

  public function apply(Builder $builder, Model $model)
  {
    $sql =
      'select reserves.id as id
        , reserves.price as subtotal
        , reserves.visit as visit
        , events.start_date as start_date
        from reserves
        left join events on reserves.event_id = events.id
        ';
    $builder->fromSub($sql, 'order_subtotals');
  }
}
