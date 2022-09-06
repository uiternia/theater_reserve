<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventsRequest;
use App\Http\Requests\UpdateEventsRequest;
use App\Models\Event;
use Inertia\Inertia;
use App\Service\ImageService;
use App\Service\EventService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{

    public function index()
    {
        $today = Carbon::today();

        $events = DB::table('events')->whereDate('start_date', '>=', $today)
            ->orderBy('start_date', 'asc')
            ->paginate(50);

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

        //requestイメージのintervention storageへ保存
        $image = $request->image;
        if (!is_null($image) && $image->isValid()) {
            $fileNameToStore = ImageService::upload($image);
        }

        Event::create([
            'name' => $request['name'],
            'information' => $request['information'],
            'image' => $fileNameToStore,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'max_people' => $request['max_people'],
        ]);
        return Inertia::render('Admin/Events/Index')->with($request->session()->flash('message', 'イベントの作成が完了しました'));
    }

    public function show(Event $event)
    {
        return Inertia::render('Admin/Events/Show', ['event' => $event]);
    }


    public function edit(Event $event)
    {
        return Inertia::render('Admin/Events/Edit', ['event' => $event]);
    }


    public function update(UpdateEventsRequest $request, Event $event)
    {
        //悲しい
        dd($event, $request);
    }


    public function destroy(Event $events)
    {
        //
    }
}
