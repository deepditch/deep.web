<?php

namespace App\Http\Controllers;

use App\MachineLearning;
use App\Http\Resources\MachineLearning as MachineLearningResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class MachineLearningController extends Controller
{
    /**
     * Insert a machine learning model.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function insert(Request $request)
    {
        $request->validate([
            'model' => 'file',
        ]);

        $name = Str::random(40).".mlmodel";

        try {
            $path = $request->file('model')->storeAs(
                '/models', $name
            );
        } catch (\Exception $e) {
            return $e->getMessage();
        }

        var_dump($path);
        $mlmodel = MachineLearning::create([
            'path' => $path
        ]);

        return new MachineLearningResource($mlmodel);
    }

    /**
     * Get the latest machine learning model from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getLatestJson(Request $request)
    {
        return new MachineLearningResource(MachineLearning::latest()->first());
    }

}
