<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    /**
     * Mime type to image file extensions.
     */
    const MIME_TYPE_FILE_EXTENSIONS = [
      'image/jpg' => '.jpg',
      'image/jpeg' => '.jpeg',
      'image/png' => '.png',
      'image/gif' => '.gif',
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'image_name',
    ];

    /**
     * Take image as a Base64 string, store it as a file, return Image.
     *
     * @param string image
     *
     * @return App\Image
     */
    public static function newImageFromBase64(string $image): Image
    {
        if (!empty($image)) {
            try {
                $filename = uniqid('damage_', true).
                Image::MIME_TYPE_FILE_EXTENSIONS[
                    getimagesizefromstring(base64_decode($image))['mime']
                ];
                Storage::disk('local')->put(
                    $filename,
                    base64_decode($image),
                    'public'
                );

                return Image::create([
                  'image_name' => Storage::url($filename),
                ]);
            } catch (\Exception $e) {
                return $e->getMessage();
            }
        }

        return new Image();
    }
}
