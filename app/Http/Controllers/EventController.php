<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventsRequest;
use App\Http\Requests\UpdateEventsRequest;
use App\Models\Event;
use Inertia\Inertia;
use App\Service\EventService;

class EventController extends Controller
{

    public function index()
    {
        $events = Event::eventAll()->paginate(50);

        return Inertia::render('Admin/Events/Index', ['events' => $events]);
    }


    public function create()
    {
        return Inertia::render('Admin/Events/Create');
    }


    public function store(StoreEventsRequest $request)
    {
        //イベントが重複しないかのチェック
        $check = EventService::checkDuplication($request['date'], $request['start_time'], $request['end_time']);

        if ($check) {
            return Inertia::render('Admin/Events/Create')->with($request->session()->flash('error', 'この時間帯は既にイベントが存在します。'));
        }

        //年月と日時の結合
        $startDate = EventService::joinDateAndTime($request['date'], $request['start_time']);
        $endDate = EventService::joinDateAndTime($request['date'], $request['end_time']);

        Event::create([
            'name' => $request['name'],
            'information' => $request['information'],
            'image_id' => $request->image_id,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'max_people' => $request['max_people'],
        ]);
        return to_route('admin.events.index')->with($request->session()->flash('message', 'イベントの作成が完了しました'));
    }

    public function show(Event $event)
    {
        $eventShow = Event::eventImage($event->id)->first();

        return Inertia::render('Admin/Events/Show', ['event' => $eventShow]);
    }

    public function edit(Event $event)
    {
        $eventShow = Event::eventImage($event->id)->first();

        return Inertia::render('Admin/Events/Edit', ['event' => $eventShow]);
    }

    public function update(UpdateEventsRequest $request, Event $event)
    {
        $event->name = $request->name;
        $event->information = $request->information;
        $event->max_people = $request->max_people;
        $event->image_id = $request->image_id;
        $event->save();
        return to_route('admin.events.index')->with($request->session()->flash('message', 'イベントを編集しました。'));
    }


    public function destroy(Event $events)
    {
        //
    }
}
