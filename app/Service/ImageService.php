<?php

namespace App\Service;

use InterventionImage;
use Illuminate\Support\Facades\Storage;

class ImageService
{
  public static function upload($imageFile)
  {
    $file = $imageFile;
    $fileName = uniqid(rand() . '_');
    $extension = $file->extension();
    $fileNameToPut = $fileName . '.' . $extension;
    $fileNameToStore = '/storage/images/' . $fileName . '.' . $extension;
    $resizedImage = InterventionImage::make($file)->resize(1920, 1080)->encode();
    Storage::put('public/images/' . $fileNameToPut, $resizedImage);

    return $fileNameToStore;
  }
}
