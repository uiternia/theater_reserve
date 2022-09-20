<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Reserve;
use Inertia\Inertia;
use App\Service\EventService;

class VisitController extends Controller
{

  public function index()
  {
    $reservesVisit = Reserve::todayVisitPeople()->get();
    $reservesVisited = Reserve::todayVisitedPeople()->get();
    return Inertia::render('Admin/Reserves/Visit', ['reservesVisit' => $reservesVisit, 'reservesVisited' => $reservesVisited]);
  }

  public function true($id)
  {
    $reserve =  Reserve::findOrFail($id);

    $reserve->visit = true;
    $reserve->save();
    return to_route('admin.visit.index');
  }

  public function false($id)
  {
    $reserve =  Reserve::findOrFail($id);

    $reserve->visit = false;
    $reserve->save();
    return to_route('admin.visit.index');
  }
}
