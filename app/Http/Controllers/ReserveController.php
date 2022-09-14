<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReserveRequest;
use App\Http\Requests\UpdateReserveRequest;
use App\Jobs\SendMailJob;
use App\Models\Event;
use App\Models\Reserve;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;


class ReserveController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        if ($request->search === null) {
            $reserves = Reserve::reserveAll()->paginate(100);
        } else {
            $reserves = Reserve::reserveSearch($search)->paginate(100);
        }

        return Inertia::render('Admin/Reserves/Index', ['reserves' => $reserves]);
    }
    public function create()
    {
        $today = Carbon::today();
        $program_name = DB::table('events')->whereDate('start_date', '>=', $today)->select('name')->distinct()->get();
        return Inertia::render('Admin/Reserves/Create', ['program_name' => $program_name]);
    }

    public function store(StoreReserveRequest $request)
    {
        $event = Event::findOrFail($request->event_id);

        $price = 0;

        if ($request->introduction === 0) {
            $price = 3000;
        } else {
            $price = 5000;
        }

        //渡ってきたeventに対して何人既に予約しているかの確認メソッド
        $reservedPeople = Reserve::reservedPeople($request->event_id)->first();

        if (
            is_null($reservedPeople) ||
            $event->max_people >= $reservedPeople->number_of_people + $request->number_of_people ||
            $event->max_people >= $request->number_of_people
        ) {
            Reserve::create([
                'user_id' => $request->user_id,
                'event_id' => $request->event_id,
                'price' => $price,
                'number_of_people' => $request->number_of_people,
                'introduction' => $request->introduction,
            ]);

            $name = User::findOrFail($request->user_id)->name;

            $email = User::findOrFail($request->user_id)->email;

            $number_of_people = $request->number_of_people;

            $status = "create";

            SendMailJob::dispatch($event, $name, $email, $number_of_people, $status);

            return to_route('admin.reserves.index')->with($request->session()->flash('message', 'イベントの予約が完了しました'));
        } else {
            return to_route('admin.reserves.index')->with($request->session()->flash('error', '予約人数が定員を超えています。予約に失敗しました。'));
        }
    }

    public function edit($id)
    {
        $reserve = Reserve::reserveShow($id)->first();

        $reservedPeople = Reserve::reservedPeople($reserve->event_id)->first();
        return Inertia::render('Admin/Reserves/Edit', ['reserve' => $reserve, 'reservedPeople' => $reservedPeople]);
    }

    public function update(UpdateReserveRequest $request, $id)
    {
        $reserve =  Reserve::findOrFail($id);

        $event = Event::findOrFail($request->event_id);

        $price = 0;

        if ($request->introduction === 0) {
            $price = 3000;
        } else {
            $price = 5000;
        }

        //渡ってきたeventに対して何人既に予約しているかの確認メソッド
        $reservedPeople = Reserve::reservedPeople($request->event_id)->first();

        if (
            is_null($reservedPeople) ||
            $event->max_people >= $reservedPeople->number_of_people + $request->number_of_people ||
            $event->max_people >= $request->number_of_people
        ) {
            $reserve->number_of_people = $request->number_of_people;
            $reserve->price = $price;
            $reserve->introduction = $request->introduction;
            $reserve->save();
            $name = User::findOrFail($request->user_id)->name;

            $email = User::findOrFail($request->user_id)->email;

            $number_of_people = $request->number_of_people;

            $status = "update";

            SendMailJob::dispatch($event, $name, $email, $number_of_people, $status);

            return to_route('admin.reserves.index')->with($request->session()->flash('message', 'イベントの予約の更新が完了しました'));
        } else {
            return to_route('admin.reserves.index')->with($request->session()->flash('error', '予約人数が定員を超えています。予約更新に失敗しました。'));
        }
    }

    public function destroy($id)
    {
        $reservation = Reserve::where('id', '=', $id)
            ->latest()
            ->first();

        $event_id = $reservation->event_id;

        $event = Event::where('id', '=', $event_id)->first();
        $user_id = $reservation->user_id;
        $user = User::where('id', '=', $user_id)->first();
        $status = 'cancel';

        SendMailJob::dispatch($event, $user->name, $user->email, $reservation->number_of_people, $status);

        $reservation->canceled_date = Carbon::now()->format('Y-m-d H:i:s');
        $reservation->save();
        return to_route('admin.reserves.index');
    }
}
