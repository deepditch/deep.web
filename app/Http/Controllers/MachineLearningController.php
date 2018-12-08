<?php

namespace App\Http\Controllers;

use App\MachineLearning;
use App\Http\Resources\MachineLearning as MachineLearningResource;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class MachineLearningController extends Controller
{
    /**
     * Add authentication middleware.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Insert a machine learning model.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function insert(Request $request)
    {
        $request->validate([
            'model' => 'required|file',
        ]);

        if (
            $request->file('model')->getSize() !==
            Storage::size(MachineLearning::latest()->first()->path)
        ) {
            return response()->json(['The size of this model does not match the size of a previously uploaded model.', 422]);
        }

        try {
            $path = $request->file('model')->storeAs(
                '/models',
                Str::random(40).'.mlmodel'
            );
        } catch (\Exception $e) {
            return $e->getMessage();
        }

        $mlmodel = MachineLearning::create([
            'path' => $path,
        ]);

        return new MachineLearningResource($mlmodel);
    }

    /**
     * Get the latest machine learning model from storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function getLatestJson(Request $request)
    {
        return new MachineLearningResource(MachineLearning::latest()->first());
    }
}
