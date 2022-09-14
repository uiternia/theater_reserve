<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Models\Image;
use App\Models\Event;
use App\Service\ImageService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImageController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Images/Index', ['images' => DB::table('images')->get()]);
    }


    public function create()
    {
        return Inertia::render('Admin/Images/Create');
    }


    public function store(StoreImageRequest $request)
    {
        $image = $request->image;
        if (!is_null($image) && $image->isValid()) {
            $fileNameToStore = ImageService::upload($image);
        }

        Image::create([
            'image' => $fileNameToStore,
        ]);
        return to_route('admin.images.index')->with($request->session()->flash('message', 'イベント画像の作成が完了しました'));
    }


    public function show(Image $image)
    {
        //
    }


    public function edit(Image $image)
    {
        //
    }


    public function update(UpdateImageRequest $request, Image $image)
    {
        //
    }

    public function destroy(Image $image)
    {
        $file = $image->image;
        $fileName =  str_replace('/storage/images', '', $file);
        $filePath = 'public/images' . $fileName;
        $eventImage = Event::where('image_id', $image->id)->get();
        if ($eventImage) {
            $eventImage->each(function ($item) use ($image) {
                if ($item->image_id === $image->id) {
                    $item->image_id = null;
                    $item->save();
                }
            });
        }
        if (Storage::exists($filePath)) {
            Storage::delete($filePath);
        }
        $image->delete();
    }
}
